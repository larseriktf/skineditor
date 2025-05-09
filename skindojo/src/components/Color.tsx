import { Colorpalette } from "./Colorpalette"
import { Colorpicker } from "./Colorpicker"
import { SelectedColor } from "./SelectedColor"

export const Color = () => {
  return (
    <section className="color">
      <SelectedColor/>
      <Colorpalette/>
      <Colorpicker/>
    </section>
  )
}
