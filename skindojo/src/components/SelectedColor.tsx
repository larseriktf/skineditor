import { useContext } from "react"
import { ColorContext } from "./ColorContext"

export const SelectedColor = () => {
  const { color } = useContext(ColorContext)

  return (
    <section className="selected-color">
      <p className="label">Selected Color</p>
      <div
        className="selected-color-preview"
        style={{ background: color } as React.CSSProperties}
      />
    </section>
  )
}
