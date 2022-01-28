import { useState } from "react"

interface IProps {
  setColor: React.Dispatch<React.SetStateAction<string>>
}

interface IRGB {
  R: number
  G: number
  B: number
}

export const Colorpicker = ({ setColor }: IProps) => {
  const [RGB, setRGB] = useState({ R: 0, G: 0, B: 0 })

  const numberToHex = (n: number) => {
    const hex = n.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  const rgbToHex = (rgb: IRGB) =>
    "#" + numberToHex(rgb.R) + numberToHex(rgb.G) + numberToHex(rgb.B)

  const updateRGB = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Checks the validity of the pattern passed in the value of the input
    let value = event.target.validity.valid ? Number(event.target.value) : 0
    const name = event.target.name

    // Limit value to 0 - 255
    if (value > 255) value = 255
    else if (value < 0) value = 0

    let newRGB = RGB

    // Update RGB value
    if (name === "R") newRGB = { ...RGB, R: value }
    else if (name === "G") newRGB = { ...RGB, G: value }
    else if (name === "B") newRGB = { ...RGB, B: value }

    setRGB(newRGB)
    setColor(rgbToHex(newRGB))
  }

  return (
    <section className="colorpicker">
      <p className="label">Red</p>
      <input
        type="text"
        pattern="[0-9]*"
        value={RGB.R}
        onChange={updateRGB}
        name="R"
      />
      <p className="label">Green</p>
      <input
        type="text"
        pattern="[0-9]*"
        value={RGB.G}
        onChange={updateRGB}
        name="G"
      />
      <p className="label">Blue</p>
      <input
        type="text"
        pattern="[0-9]*"
        value={RGB.B}
        onChange={updateRGB}
        name="B"
      />
    </section>
  )
}
