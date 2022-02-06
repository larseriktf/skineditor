import { useRef, useState, useEffect, useContext } from "react"
import { plotline } from "../res/bresenham"
import { ToolType } from "../res/tools"
import { ColorContext } from "./ColorContext"

type Props = {
  width: number
  height: number
  tool: ToolType
}

type Events = {
  nativeEvent: MouseEvent
}

export const Canvas = ({ width, height, tool }: Props) => {
  const color = useContext(ColorContext).color

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  // States
  const [isDrawing, setIsDrawing] = useState(false)
  const [outlineVisibility, setOutlineVisibility] = useState("hidden")
  const [outlineSize, setOutlineSize] = useState({ width: 10, height: 10 })
  const [outlineCoords, setOutlineCoords] = useState({ x: 0, y: 0 })
  const [prevPoint, setPrevPoint] = useState({ x: -1, y: -1 })

  // Do Once
  useEffect(() => {
    // setup Refs
    const canvas = canvasRef.current!
    contextRef.current = canvas.getContext("2d")!

    setOutlineSize({
      width: canvas.clientWidth / canvas.width,
      height: canvas.clientHeight / canvas.height,
    })

    hideOutline()
  }, [height, width])

  // Functions
  const startDrawing = ({ nativeEvent }: Events) => {
    const { offsetX, offsetY } = nativeEvent
    const { canvasX, canvasY } = getcanvasCoordinates(offsetX, offsetY)

    // Draw initial pixel
    if (tool.type === "pencil")
      drawPixel(canvasX, canvasY)
    else if (tool.type === "eraser")
      erasePixel(canvasX, canvasY)

    setPrevPoint({ x: canvasX, y: canvasY })
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    setPrevPoint({ x: -1, y: -1 })
  }

  const draw = (x: number, y: number, drawFunction: (x: number, y: number) => void ) => {
    // Implement checks to prevent multiple unecessary drawings
    drawFunction(x, y)

    // Draw a line if previous X and Y are defined
    if (prevPoint.x !== -1 && prevPoint.y !== -1) {
      plotline({ x: prevPoint.x, y: prevPoint.y }, { x, y }, drawFunction)
    }

    setPrevPoint({ x: x, y: y })
  }

  const drawPixel = (x: number, y: number) => {
    const context = contextRef.current!
    context.fillStyle = color
    context.fillRect(x, y, 1, 1)
  }

  const erasePixel = (x: number, y: number) => {
    const context = contextRef.current!
    context.clearRect(x, y, 1, 1)
  }

  const getcanvasCoordinates = (x: number, y: number) => {
    const canvas = canvasRef.current!
    const canvasX = Math.floor((canvas.width * x) / canvas.clientWidth)
    const canvasY = Math.floor((canvas.height * y) / canvas.clientHeight)

    return { canvasX, canvasY }
  }

  const moveCursor = ({ nativeEvent }: Events) => {
    const { offsetX, offsetY } = nativeEvent
    const { canvasX, canvasY } = getcanvasCoordinates(offsetX, offsetY)

    showOutline()
    setOutlineCoords({
      x: (Math.floor((offsetX / width) * 2) * width + outlineSize.width) / 2,
      y: (Math.floor((offsetY / height) * 2) * height + outlineSize.height) / 2,
    })

    // Draw
    if (isDrawing && tool.type === "pencil") draw(canvasX, canvasY, drawPixel)
    else if (isDrawing && tool.type === "eraser") draw(canvasX, canvasY, erasePixel)
  }

  const showOutline = () => setOutlineVisibility("visible")

  const hideOutline = () => setOutlineVisibility("hidden")

  return (
    <section className="canvas">
      <div
        className="canvasWrapper"
        style={
          {
            cursor: `url(${tool.cursor}) 0 32, auto`,
          } as React.CSSProperties
        }
      >
        <div
          id="cursorOutline"
          style={
            {
              visibility: outlineVisibility,
              left: outlineCoords.x,
              top: outlineCoords.y,
              width: outlineSize.width,
              height: outlineSize.height,
            } as React.CSSProperties
          }
        />
        <canvas
          id="canv"
          width={width}
          height={height}
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={moveCursor}
          onMouseLeave={hideOutline}
        />
      </div>
    </section>
  )
}
