import { Colorpalette } from "./Colorpalette"
import { Colorpicker } from "./Colorpicker"
import { SelectedColor } from "./SelectedColor"

interface IProps {
  setColor: React.Dispatch<React.SetStateAction<string>>
  color: string
}

export const Color = ({ color, setColor }: IProps) => {
  return (
    <section className="color">
      <SelectedColor color={color} />
      <Colorpalette setColor={setColor} />
      <Colorpicker setColor={setColor} />
    </section>
  )
}
