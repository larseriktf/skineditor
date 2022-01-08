import { useRef, useState, useEffect } from "react"
import { angleBetweenTwoPoints } from "../res/calculation"

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

  // Variables
  let prevX = -1
  let prevY = -1

  useEffect(() => {
    // setup Refs
    const canvas = canvasRef.current!
    canvas.width = width
    canvas.height = height
    canvas.id = "canv"

    contextRef.current = canvas.getContext("2d")!

    setOutlineSize(canvas.clientWidth / canvas.width)

    hideOutline()

    // Testing
    draw(5, 20)
    draw(15, 15)
  }, [height, width])

  const startDrawing = ({ nativeEvent }: IEvents) => {
    const { offsetX, offsetY } = nativeEvent
    const { realX, realY } = getRealCoordinates(offsetX, offsetY)

    // Draw initial pixel
    drawPixel(realX, realY)
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const draw = (x: number, y: number) => {
    // Implement checks to prevent multiple unecessary drawings
    // Implement feature to fill unpainted gaps

    drawPixel(x, y)

    // Draw a line if previous X and Y are defined
    if (prevX !== -1 && prevY !== -1) drawLine(prevX, prevY, x, y)

    prevX = x
    prevY = y
  }

  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    const angle = angleBetweenTwoPoints(x1, y1, x2, y2)

    // Calculate for horizontal-ish lines
    const amount = x2 - x1

    for (let i = 1; i <= amount; i++) {
      const x = x1 + i
      const y = Math.floor(x * Math.sin(angle * -1)) + y1 + 2
      drawPixel(x, y)
    }

    // Calculate for vertical-ish lines
  }

  const drawPixel = (x: number, y: number) => {
    const context = contextRef.current!
    context.fillStyle = color
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
