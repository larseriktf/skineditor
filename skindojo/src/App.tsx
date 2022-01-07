import { Canvas } from "./components/Canvas"
import { Colorpicker } from "./components/Colorpicker"
import { Menubar } from "./components/Menubar"
import { Toolbox } from "./components/Toolbox"
import { Viewbox } from "./components/Viewbox"

function App() {
  return (
    <div id="main-grid">
      <Menubar />
      <Toolbox />
      <Canvas width={32} height={32} color={"red"} />
      <Viewbox />
      <Colorpicker />
    </div>
  )
}

export default App
