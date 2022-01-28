import { Menubar } from "./Menubar"
import { Toolbox } from "./Toolbox"
import { Canvas } from "./Canvas"
import { Viewbox } from "./Viewbox"
import { Color } from "./Color"

export const Skineditor = () => {
  return (
    <div id="main-grid">
      <Menubar />
      <Toolbox />
      <Canvas width={32} height={32} color={"green"} />
      <Viewbox />
      <Color />
    </div>
  )
}
