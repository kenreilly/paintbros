export var PaintTool;
(function (PaintTool) {
    PaintTool[PaintTool["Erase"] = 0] = "Erase";
    PaintTool[PaintTool["Paint"] = 1] = "Paint";
    PaintTool[PaintTool["Line"] = 2] = "Line";
    PaintTool[PaintTool["Rect"] = 3] = "Rect";
    PaintTool[PaintTool["Ellipse"] = 4] = "Ellipse";
    PaintTool[PaintTool["Clone"] = 5] = "Clone";
})(PaintTool || (PaintTool = {}));
export var ToolMode;
(function (ToolMode) {
    ToolMode[ToolMode["Select"] = 0] = "Select";
    ToolMode[ToolMode["Update"] = 1] = "Update";
})(ToolMode || (ToolMode = {}));
