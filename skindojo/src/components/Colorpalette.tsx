import { useState, useEffect } from "react"
import { PaletteColor } from "./PaletteColor"
import colorsBasic from "../res/colors_predefined.json"

interface IProps {
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const Colorpalette = ({ setColor }: IProps) => {
  // States
  const [colorsCustom, setColorsCustom] = useState([
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
  ])

  // Persistant data
  useEffect(() => {
    //s Runs once the component loads
    const data = localStorage.getItem("colors-custom")
    if (data) setColorsCustom(JSON.parse(data))
  }, [])

  useEffect(() => {
    // Runs every reload
    localStorage.setItem("colors-custom", JSON.stringify(colorsCustom))
  })

  const updateCustomColors = (color: string) => {
    // Removes the first color and adds the new color at the end
    setColorsCustom([...colorsCustom, color].slice(1))
  }

  return (
    <section className="palette">
      <p className="label">Basic Colors</p>
      <section className="palette-predefined">
        {colorsBasic.map((color, index) => (
          <PaletteColor
            color={color}
            setColor={setColor}
            updateCustomColors={updateCustomColors}
            key={index}
          />
        ))}
      </section>
      <p className="label">Custom Colors</p>
      <section className="palette-user-defined">
        {[...colorsCustom].reverse().map((color, index) => (
          <PaletteColor
            color={color}
            setColor={setColor}
            updateCustomColors={updateCustomColors}
            key={index}
          />
        ))}
      </section>
    </section>
  )
}
