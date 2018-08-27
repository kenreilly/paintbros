import { Palette } from './palette.js'

interface ImageSize {
    height: number;
    width: number;
}

enum PaintTool {
    Erase = 0, 
    Paint = 1,
    Line = 2,
    Rect = 3,
    Ellipse = 4,
    Clone = 5
}

enum ToolMode {
    Select = 0,
    Update = 1
}

class PaintBros {

    private static default_size: ImageSize = { width: 32, height: 32 }

    private static image_size: ImageSize

    private static canvas: HTMLCanvasElement

    private static ctx: CanvasRenderingContext2D

    private static color_palette: Array<number[]>

    private static pallette_el: HTMLElement

    private static current_el: HTMLElement

    private static recent_el: HTMLElement

    private static editor_container: HTMLElement

    private static editor_el: HTMLElement

    private static editor_style: HTMLStyleElement

    private static current_color: string

    private static editor_mouse_down: boolean

    private static current_tool: PaintTool = PaintTool.Paint

    private static tool_buttons: HTMLButtonElement[] = []

    private static make_color_el(color): HTMLElement {
        
        let el = document.createElement('div')
        el.dataset.color = color
        el.style.backgroundColor = '#' + color
        return el;
    }

    public static init_palette() {
     
        PaintBros.pallette_el = document.querySelector('.palette')
        PaintBros.current_el = document.querySelector('.current-color')
        PaintBros.recent_el = document.querySelector('.recent-colors')

        while (PaintBros.recent_el.firstChild) {
            PaintBros.recent_el.removeChild(PaintBros.recent_el.firstChild)
        }
        
        Palette.forEach(color => {

            let el = PaintBros.make_color_el(color)
            el.onclick = PaintBros.on_pick_color.bind(PaintBros, color)
            PaintBros.pallette_el.appendChild(el)
        })

        let el = PaintBros.make_color_el(Palette[0])
        PaintBros.current_el.appendChild(el) 
        PaintBros.current_color = Palette[0]
    }

    public static init_buttons() {

        document.querySelectorAll('.tools > button').forEach((node) => {
            
            var button = <HTMLButtonElement>node
            button.onclick = PaintBros.on_click_tool.bind(PaintBros, button)
            PaintBros.tool_buttons.push(<HTMLButtonElement>button)
        })
    }

    public static init_editor() {

        PaintBros.editor_container = document.querySelector('.editor-container')
        PaintBros.editor_el = document.querySelector('.editor')
        PaintBros.editor_style = document.createElement('style')

        PaintBros.editor_el.onmousedown = (ev) => { PaintBros.editor_mouse_down = true }
        PaintBros.editor_el.onmouseup = (ev) => { PaintBros.editor_mouse_down = false }
        PaintBros.editor_el.onmouseleave = (ev) => { PaintBros.editor_mouse_down = false }

        PaintBros.editor_el.onmousemove = PaintBros.on_mouse_move

        while (PaintBros.editor_el.firstChild) {
            PaintBros.editor_el.removeChild(PaintBros.editor_el.firstChild)
        }
        
        let size = PaintBros.image_size.height * PaintBros.image_size.width
        for (var i = 0, ii = size; i != ii; ++i) {
       
            let pixel = document.createElement('i')
            pixel.style.height = pixel.style.width = '0px'
            pixel.onclick = PaintBros.on_click_pixel
            PaintBros.editor_el.appendChild(pixel) 
        }

        PaintBros.resize_editor()
        window.onresize = PaintBros.resize_editor
    }

    public static resize_editor() {

        let bound_rect = PaintBros.editor_container.getBoundingClientRect()
        let dims = { height: bound_rect.height - 24, width: bound_rect.width - 24 }

        let px_size = Math.min((dims.width / PaintBros.image_size.width), (dims.height / PaintBros.image_size.height))

        PaintBros.editor_el.style.height = (px_size * PaintBros.image_size.height) + "px"
        PaintBros.editor_el.style.width = (px_size * PaintBros.image_size.width) + "px"


        PaintBros.editor_el.childNodes.forEach((node) => {

            let el = <HTMLElement>node
            el.style.width = el.style.height = px_size + 'px'
        })
    }

    public static on_pick_color(color) {

        if ((<HTMLElement>PaintBros.current_el.firstChild).dataset.color == color) return

        for (var i = 0, ii = PaintBros.recent_el.children.length; i != ii; ++i) {

            try {
                if ((<HTMLElement>PaintBros.recent_el.children[i]).dataset.color == color) {
    
                    PaintBros.recent_el.removeChild(PaintBros.recent_el.childNodes[i])
                }
            }
            catch (ex) { break }
        }

        let current = PaintBros.current_el.firstChild
        let current_color = (<HTMLElement>current).dataset.color
        let next_recent_el = PaintBros.make_color_el(current_color)
       
        
        PaintBros.current_el.removeChild(current)
        PaintBros.current_el.appendChild(PaintBros.make_color_el(color))
        PaintBros.recent_el.insertBefore(next_recent_el, PaintBros.recent_el.firstChild) 
        
        while (PaintBros.recent_el.children.length > 28) {
            
            var ln = PaintBros.recent_el.children.length
            PaintBros.recent_el.removeChild(PaintBros.recent_el.childNodes[ln - 1])
        }
        
        next_recent_el.onclick = PaintBros.on_pick_color.bind(PaintBros, current_color)
        PaintBros.current_color = color
    }

    public static update_pixel(pixel: HTMLElement, color?: string) {

        pixel.style.backgroundColor = (color) ? '#' + color : null
        pixel.dataset.color = color
    }

    public static on_click_pixel(ev) {

        switch (PaintBros.current_tool) {

            case (PaintTool.Paint):
                PaintBros.update_pixel(ev.target, PaintBros.current_color)
                return

            case (PaintTool.Erase):
                PaintBros.update_pixel(ev.target, null)
        }
    }

    public static on_mouse_move(ev) {

        if (!PaintBros.editor_mouse_down) return

        switch (PaintBros.current_tool) {

            case (PaintTool.Paint):
                PaintBros.update_pixel(ev.target, PaintBros.current_color)
                return
            
            case (PaintTool.Erase):
                PaintBros.update_pixel(ev.target, null)
        }
    }

    public static on_click_tool(button) {

        PaintBros.current_tool = <any>PaintTool[button.name]
        PaintBros.tool_buttons.forEach(node => node.classList.remove('selected'))
        button.classList.add('selected')
    }
    
    public static init() {
 
        PaintBros.image_size = PaintBros.default_size

        PaintBros.init_palette()
        PaintBros.init_editor()
        PaintBros.init_buttons()

        // Paintbros.canvas = document.querySelector('canvas')
        // Paintbros.ctx = Paintbros.canvas.getContext('2d')
        
        // let imagedata = Paintbros.ctx.createImageData(32, 32)
        // let data = imagedata.data

        // for (var i = 0, ii = data.length; i != ii; i += 4) {
        //     data[i + 3] = 255
        //     data[i + 2] = data[i + 1] = data[i] = !(i % 8) ? 255 : 0
        //     console.log(data[i])
        // }

        // Paintbros.ctx.putImageData(imagedata, 20, 20)
        // Paintbros.ctx.fillRect(10, 10, 10, 10)
        // let ix = Paintbros.ctx.getImageData(10, 10, 10, 10)

        // Paintbros.ctx.putImageData(ix, 25, 25)
    }
}

PaintBros.init()