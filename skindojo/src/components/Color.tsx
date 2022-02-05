import { Colorpalette } from "./Colorpalette"
import { Colorpicker } from "./Colorpicker"
import { SelectedColor } from "./SelectedColor"
import { ColorContext } from "./ColorContext"
import { useContext } from "react"

export const Color = () => {
  const {color, setColor} = useContext(ColorContext)

  return (
    <section className="color">
      <SelectedColor color={color} />
      <Colorpalette setColor={setColor} />
      <Colorpicker setColor={setColor} />
    </section>
  )
}
