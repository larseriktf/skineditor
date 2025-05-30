import { useEffect, useState } from "react"
import { Menubar } from "./Menubar"
import { Toolbox } from "./Toolbox"
import { Canvas } from "./Canvas"
import { Viewbox } from "./Viewbox"
import { Color } from "./Color"
import { tools } from "../res/tools"
import { ColorContext } from "./ColorContext"

export const SkinEditor = () => {
  const [color, setColor] = useState("white")
  const [activeTool, setActiveTool] = useState(tools[0])
  const [cvs, setCvs] = useState<HTMLCanvasElement>(new HTMLCanvasElement())

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
      <ColorContext.Provider value={{ color, setColor }}>
        <Menubar cvs={cvs} />
        <Toolbox tools={tools} setActiveTool={setActiveTool} />
        <Canvas width={32} height={32} tool={activeTool} setCvs={setCvs} />
        <Viewbox />
        <Color />
      </ColorContext.Provider>
    </div>
  )
}
