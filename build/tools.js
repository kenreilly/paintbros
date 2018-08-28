import { PaintTool } from './types.js';
export class Tools {
    static init() {
        document.querySelectorAll('.tools > button').forEach((node) => {
            var button = node;
            button.onclick = Tools.on_click_tool.bind(Tools, button);
            Tools.tool_buttons.push(button);
        });
    }
    static on_click_tool(button) {
        switch (PaintTool[button.name]) {
            case PaintTool.Line:
            case PaintTool.Rect:
            case PaintTool.Ellipse:
                alert('Not yet implemented');
                return;
        }
        Tools.current_tool = PaintTool[button.name];
        Tools.tool_buttons.forEach(node => node.classList.remove('selected'));
        button.classList.add('selected');
    }
}
Tools.current_tool = PaintTool.Paint;
Tools.tool_buttons = [];
