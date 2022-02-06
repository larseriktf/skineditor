import { useState, useEffect, useContext } from "react"
import { PaletteColor } from "./PaletteColor"
import colorsBasic from "../res/colors_basic.json"
import customColors from "../res/colors_custom.json"
import { ColorContext } from "./ColorContext"

export const Colorpalette = () => {
  const [colorsCustom, setColorsCustom] = useState(customColors)
  const { color, setColor } = useContext(ColorContext)

  // Persistant data
  useEffect(() => {
    // Runs once the component loads
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
      <section className="palette-basic">
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
      <section className="palette-custom">
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
