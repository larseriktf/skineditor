import pencilColor from "../images/pencil_color_24x24.png"
import eraserColor from "../images/eraser_color_24x24.png"
import cursorPencil from "../images/pencil_outline_24x24.png"
import cursorEraser from "../images/eraser_outline_24x24.png"

export const tools = [
  {
    type: "pencil",
    image: pencilColor,
    cursor: cursorPencil,
  },
  {
    type: "eraser",
    image: eraserColor,
    cursor: cursorEraser,
  },
]

export type ToolType = {
  type: string
  image: string
  cursor: string
}
