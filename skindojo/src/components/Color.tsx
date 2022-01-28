import { Colorpalette } from "./Colorpalette"

interface IProps {
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const Color = ({ setColor }: IProps) => {
  return (
    <section className="color">
      <Colorpalette setColor={setColor} />
    </section>
  )
}
