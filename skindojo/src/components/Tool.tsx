import { ToolType } from "../res/tools"

type Props = {
  tool: ToolType
  setActiveTool: React.Dispatch<React.SetStateAction<ToolType>>
}

export const Tool = ({ tool, setActiveTool }: Props) => {
  const changeTool = () => {
    setActiveTool(tool)
  }

  return (
    <button className="tool" onClick={changeTool}>
      <img src={tool.image} alt="Brush tool" />
    </button>
  )
}
