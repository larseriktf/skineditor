import { useRef, useState, useEffect } from "react"
import { plotline } from "../res/bresenham"

interface IProps {
  width: number
  height: number
  color: string
}

interface IEvents {
  nativeEvent: MouseEvent
}

export const Canvas = ({ width, height, color }: IProps) => {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  // States
  const [isDrawing, setIsDrawing] = useState(false)
  const [outlineCoords, setOutlineCoords] = useState([0, 0])
  const [outlineVisibility, setOutlineVisibility] = useState("hidden")
  const [outlineSize, setOutlineSize] = useState(10)
  const [prevPoint, setPrevPoint] = useState({ x: -1, y: -1 })

  useEffect(() => {
    // setup Refs
    const canvas = canvasRef.current!
    contextRef.current = canvas.getContext("2d")!

    setOutlineSize(canvas.clientWidth / canvas.width)

    hideOutline()
  }, [height, width])

  const startDrawing = ({ nativeEvent }: IEvents) => {
    const { offsetX, offsetY } = nativeEvent
    const { realX, realY } = getRealCoordinates(offsetX, offsetY)

    // Draw initial pixel
    drawPixel(realX, realY, "green")
    setPrevPoint({ x: realX, y: realY })
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    setPrevPoint({ x: -1, y: -1 })
  }

  const draw = (x: number, y: number) => {
    // Implement checks to prevent multiple unecessary drawings
    drawPixel(x, y, "blue")

    // Draw a line if previous X and Y are defined
    if (prevPoint.x !== -1 && prevPoint.y !== -1) {
      plotline({ x: prevPoint.x, y: prevPoint.y }, { x, y }, drawPixel)
    }

    setPrevPoint({ x: x, y: y })
  }

  const drawPixel = (x: number, y: number, bruh: string) => {
    const context = contextRef.current!
    context.fillStyle = bruh
    context.fillRect(x, y, 1, 1)
  }

  const getRealCoordinates = (x: number, y: number) => {
    const canvas = canvasRef.current!
    const realX = Math.floor((canvas.width * x) / canvas.clientWidth)
    const realY = Math.floor((canvas.height * y) / canvas.clientHeight)

    return { realX, realY }
  }

  const moveCursor = ({ nativeEvent }: IEvents) => {
    const { offsetX, offsetY } = nativeEvent
    const { realX, realY } = getRealCoordinates(offsetX, offsetY)

    showOutline()
    setOutlineCoords([
      (Math.floor((offsetX / width) * 2) * width + outlineSize) / 2,
      (Math.floor((offsetY / height) * 2) * height + outlineSize) / 2,
    ])

    // Draw
    if (isDrawing) draw(realX, realY)
  }

  const showOutline = () => setOutlineVisibility("visible")

  const hideOutline = () => setOutlineVisibility("hidden")

  return (
    <section className="canvas">
      <div className="canvasWrapper">
        <div
          id="cursorOutline"
          style={
            {
              visibility: outlineVisibility,
              left: outlineCoords[0],
              top: outlineCoords[1],
              width: outlineSize,
              height: outlineSize,
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
