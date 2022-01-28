import { useState } from "react"

export const Colorpicker = () => {
  const [RGB, setRGB] = useState({ R: 0, G: 0, B: 0 })

  const updateRGB = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Checks the validity of the pattern passed in the value of the input
    let value = event.target.validity.valid ? Number(event.target.value) : 0
    const name = event.target.name

    // Limit value to 0 - 255
    if (value > 255) value = 255
    else if (value < 0) value = 0

    // Update RGB value
    if (name === "R") setRGB({ ...RGB, R: value })
    else if (name === "G") setRGB({ ...RGB, G: value })
    else if (name === "B") setRGB({ ...RGB, B: value })
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
