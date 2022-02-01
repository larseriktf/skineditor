import move from "../images/move.png"
import pencil from "../images/pencil.png"
import pencilColor from "../images/pencil_color.png"
import brush from "../images/brush.png"
import eyedropper from "../images/eyedropper.png"
import selection from "../images/selection.png"
import bucket from "../images/bucket.png"
import eraser from "../images/eraser.png"
import eraserColor from "../images/eraser_color.png"
import { Tool } from "./Tool"

export const Toolbox = () => {
  return (
    <section className="toolbox">
      <Tool imageURL={pencilColor} />
      <Tool imageURL={eraserColor} />
    </section>
  )
}
