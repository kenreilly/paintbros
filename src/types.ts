export interface ImageSize {
    height: number
    width: number
}

export interface ImageContent {
    name?: string
    dimensions: ImageSize
    swatch: Array<string>
    frames: Array<Array<string>>
}

export enum PaintTool {
    Erase = 0, 
    Paint = 1,
    Line = 2,
    Rect = 3,
    Ellipse = 4,
    Clone = 5
}

export enum ToolMode {
    Select = 0,
    Update = 1
}