import { useState } from "react"
import { PaletteColor } from "./PaletteColor"
import colorsBasic from "../res/colors_predefined.json"

interface IProps {
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const Colorpalette = ({ setColor }: IProps) => {
  // States

  // Variables
  const colorsCustom = [
    "#00c0be",
    "#00807e",
    "#004342",
    "#bdc1fb",
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
  ]

  return (
    <section className="palette">
      <p className="label">Basic Colors</p>
      <section className="palette-predefined">
        {colorsBasic.map((color, index) => (
          <PaletteColor color={color} setColor={setColor} key={index} />
        ))}
      </section>
      <p className="label">Custom Colors</p>
      <section className="palette-user-defined">
        {colorsCustom.map((color, index) => (
          <PaletteColor color={color} key={index} setColor={setColor} />
        ))}
      </section>
    </section>
  )
}
