import { ImageSize, ImageContent, PaintTool } from './types.js'
import { Config } from './config.js'
import { Tools } from './tools.js'
import { Palette } from './palette.js'

export class Editor {

    public static dimensions: ImageSize
    
    private static editor_container: HTMLElement
    private static editor_el: HTMLElement
    private static editor_mouse_down: boolean
    private static image_name: string

    public static get image_data(): ImageContent {

        let data: ImageContent = {
            dimensions: Editor.dimensions,
            swatch: Palette.swatch_data,
            frames: []
        }
        
        let frame: string[] = []
        let pixels = Editor.editor_el.querySelectorAll('i')
        
        pixels.forEach((pixel) => { frame.push(pixel.dataset.color) })
        data.frames.push(frame)
        return data
    }

    public static init() {

        Editor.editor_container = document.querySelector('.editor-container')
        Editor.editor_el = document.querySelector('.editor')

        Editor.editor_el.onmousedown = (ev) => { Editor.editor_mouse_down = true }
        Editor.editor_el.onmouseup = (ev) => { Editor.editor_mouse_down = false }
        Editor.editor_el.onmouseleave = (ev) => { Editor.editor_mouse_down = false }

        Editor.editor_el.onmousemove = Editor.on_mouse_move

        Editor.new_image(Config.default_size)
        window.onresize = Editor.resize_editor
    }

    public static clear() {
        
        while (Editor.editor_el.firstChild) {
            Editor.editor_el.removeChild(Editor.editor_el.firstChild)
        }
    }

    public static load_image(data: ImageContent) {

        Palette.load_swatch(data.swatch)
        Editor.image_name = data.name
        Editor.dimensions = data.dimensions
        Editor.clear()

        let frame_data = data.frames[0]
        let size = Editor.dimensions.height * Editor.dimensions.width
        for (var i = 0, ii = size; i != ii; ++i) {
        
            let pixel = document.createElement('i')
            pixel.style.height = pixel.style.width = '0px'
            pixel.onclick = Editor.on_click_pixel
            Editor.update_pixel(pixel, frame_data[i])
            Editor.editor_el.appendChild(pixel) 
        }

        Editor.resize_editor()
    }

    public static new_image(dimensions: ImageSize) {

        Palette.reset_swatch()
        Palette.init_swatch()
        Editor.dimensions = dimensions
        Editor.clear()
        
        let size = Editor.dimensions.height * Editor.dimensions.width
        for (var i = 0, ii = size; i != ii; ++i) {
       
            let pixel = document.createElement('i')
            pixel.style.height = pixel.style.width = '0px'
            pixel.onclick = Editor.on_click_pixel
            Editor.editor_el.appendChild(pixel) 
        }

        Editor.resize_editor()
    }

    public static resize_editor() {

        let bound_rect = Editor.editor_container.getBoundingClientRect()
        let dims = { height: bound_rect.height - 24, width: bound_rect.width - 24 }
        let px_size = Math.min((dims.width / Editor.dimensions.width), (dims.height / Editor.dimensions.height))

        Editor.editor_el.style.height = (px_size * Editor.dimensions.height) + "px"
        Editor.editor_el.style.width = (px_size * Editor.dimensions.width) + "px"

        Editor.editor_el.childNodes.forEach((node) => {

            let el = <HTMLElement>node
            el.style.width = el.style.height = px_size + 'px'
        })
    }

    public static update_pixel(pixel: HTMLElement, color?: string) {

        pixel.style.backgroundColor = (color) ? '#' + color : null
        pixel.dataset.color = color
    }

    public static on_click_pixel(ev) {

        switch (Tools.current_tool) {

            case (PaintTool.Paint):
                Editor.update_pixel(ev.target, Palette.current_color)
                return

            case (PaintTool.Erase):
                Editor.update_pixel(ev.target, null)
        }
    }

    public static on_mouse_move(ev) {

        if (!Editor.editor_mouse_down) return

        switch (Tools.current_tool) {

            case (PaintTool.Paint):
                Editor.update_pixel(ev.target, Palette.current_color)
                return
            
            case (PaintTool.Erase):
                Editor.update_pixel(ev.target, null)
        }
    }
}