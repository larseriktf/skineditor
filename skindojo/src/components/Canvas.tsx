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
  const [prevX, setPrevX] = useState(-1)
  const [prevY, setPrevY] = useState(-1)

  // let prevX = -1
  // let prevY = -1

  useEffect(() => {
    // setup Refs
    const canvas = canvasRef.current!
    contextRef.current = canvas.getContext("2d")!

    setOutlineSize(canvas.clientWidth / canvas.width)

    hideOutline()

    // draw(10, 10)
    // draw(20, 16)
    // draw(12, 23)
    // draw(5, 18)
    // draw(8, 12)
  }, [height, width])

  const startDrawing = ({ nativeEvent }: IEvents) => {
    const { offsetX, offsetY } = nativeEvent
    const { realX, realY } = getRealCoordinates(offsetX, offsetY)

    // Draw initial pixel
    drawPixel(realX, realY, "green")
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    setPrevX(-1)
    setPrevY(-1)
    // prevX = -1
    // prevY = -1
  }

  const draw = (x: number, y: number) => {
    // Implement checks to prevent multiple unecessary drawings
    // Implement feature to fill unpainted gaps

    drawPixel(x, y, "blue")

    // Draw a line if previous X and Y are defined
    console.log(prevX, prevY)
    if (prevX !== -1 && prevY !== -1) {
      plotline(prevX, prevY, x, y, drawPixel)
    }

    setPrevX(x)
    setPrevY(y)
    // prevX = x
    // prevY = y
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
