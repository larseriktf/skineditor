import { useEffect } from "react"
import { useState } from "react"
import { Menubar } from "./Menubar"
import { Toolbox } from "./Toolbox"
import { Canvas } from "./Canvas"
import { Viewbox } from "./Viewbox"
import { Color } from "./Color"

export const Skineditor = () => {
  const [color, setColor] = useState("white")

  // Persistant data
  useEffect(() => {
    // Runs once the component loads
    const data = localStorage.getItem("color")
    if (data) setColor(JSON.parse(data))
  }, [])

  useEffect(() => {
    // Runs every reload
    localStorage.setItem("color", JSON.stringify(color))
  })

  return (
    <div id="main-grid">
      <Menubar />
      <Toolbox />
      <Canvas width={32} height={32} color={color} />
      <Viewbox />
      <Color color={color} setColor={setColor} />
    </div>
  )
}
