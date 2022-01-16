import move from "../images/move.png"
import pencil from "../images/pencil.png"
import brush from "../images/brush.png"
import eyedropper from "../images/eyedropper.png"
import selection from "../images/selection.png"
import bucket from "../images/bucket.png"
import eraser from "../images/eraser.png"
import { Tool } from "./Tool"

export const Toolbox = () => {
  return (
    <section className="toolbox">
      <Tool image={move} />
      <Tool image={pencil} />
      <Tool image={brush} />
      <Tool image={eyedropper} />
      <Tool image={selection} />
      <Tool image={bucket} />
      <Tool image={eraser} />
    </section>
  )
}
