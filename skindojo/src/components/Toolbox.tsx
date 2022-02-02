import { Tool } from "./Tool"
import { ToolType } from "../res/tools"

type Props = {
  tools: ToolType[]
  setActiveTool: React.Dispatch<React.SetStateAction<ToolType>>
}

export const Toolbox = ({ tools, setActiveTool }: Props) => {
  return (
    <section className="toolbox">
      {tools.map((tool, index) => (
        <Tool tool={tool} setActiveTool={setActiveTool} key={index} />
      ))}
    </section>
  )
}
