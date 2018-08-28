import { PaintTool } from './types.js'

export class Tools {

    public static current_tool: PaintTool = PaintTool.Paint

    private static tool_buttons: HTMLButtonElement[] = []

    public static init() {

        document.querySelectorAll('.tools > button').forEach((node) => {
            
            var button = <HTMLButtonElement>node
            button.onclick = Tools.on_click_tool.bind(Tools, button)
            Tools.tool_buttons.push(<HTMLButtonElement>button)
        })
    }

    private static on_click_tool(button) {
        
        switch (<any>PaintTool[button.name]) {
            
            case PaintTool.Line:
            case PaintTool.Rect:
            case PaintTool.Ellipse:
                alert('Not yet implemented')
                return
        }

        Tools.current_tool = <any>PaintTool[button.name]
        Tools.tool_buttons.forEach(node => node.classList.remove('selected'))
        button.classList.add('selected')
    }
}