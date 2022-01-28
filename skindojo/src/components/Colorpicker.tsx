import { useState } from "react"
import { PaletteColor } from "./PaletteColor"

export const Colorpicker = () => {
  // States

  // Variables
  const colorsPredefined = [
    "#FFFFFF",
    "#dfdfdf",
    "#bfbfbf",
    "#7f7f7f",
    "#424242",
    "#000000",
    "#ffbec0",
    "#ff7c82",
    "#ff0023",
    "#c5001a",
    "#83000f",
    "#440003",
    "#ffdec2",
    "#ffbc87",
    "#ff7a31",
    "#c53d1f",
    "#834019",
    "#63230d",
    "#fffdc5",
    "#fffc8e",
    "#fffc50",
    "#c1bc3c",
    "#807d28",
    "#434115",
    "#bbfec4",
    "#74fe8c",
    "#00bd37",
    "#007e25",
    "#007e25",
    "#004211",
    "#b9fffe",
    "#6efffe",
    "#00fffe",
    "#00c0be",
    "#00807e",
    "#004342",
    "#bdc1fb",
    "#7a85f8",
    "#0032f6",
    "#0025b8",
    "#00197a",
    "#000840",
    "#ffc0fb",
    "#ff82f9",
    "#ff24f7",
    "#c31bb9",
    "#820f7b",
    "#440440",
  ]

  const colorsUserDefined = ["#00c0be", "#00807e", "#004342", "#bdc1fb"]
  let userDefinedPickers = 16

  return (
    <section className="colorpicker">
      <section className="palette">
        <p className="label">Basic Colors</p>
        <section className="palette-predefined">
          {colorsPredefined.map((color) => (
            <PaletteColor color={color} />
          ))}
        </section>
        <p className="label">Custom Colors</p>
        <section className="palette-user-defined">
          {colorsUserDefined.map((color, index) => (
            <PaletteColor color={color} key={index} />
          ))}
          {[...Array(userDefinedPickers - colorsUserDefined.length)].map(
            (e, index) => (
              <PaletteColor color="transparent" key={index} />
            )
          )}
        </section>
      </section>
    </section>
  )
}
