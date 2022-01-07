import { useRef, useState, useEffect } from "react"

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

  useEffect(() => {
    // setup Refs
    const canvas = canvasRef.current!
    canvas.width = width
    canvas.height = height
    canvas.id = "canv"

    contextRef.current = canvas.getContext("2d")!
    // contextRef.current!.translate(0.5, 0.5)
    // contextRef.current!.imageSmoothingEnabled = false

    setOutlineSize(canvas.clientWidth / canvas.width)

    hideOutline()

    // Testing
    draw(4, 4)
    draw(4, 8)
  }, [height, width])

  const startDrawing = ({ nativeEvent }: IEvents) => {
    const { offsetX, offsetY } = nativeEvent
    const { realX, realY } = getRealCoordinates(offsetX, offsetY)

    // Draw initial pixel
    draw(realX, realY)
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const draw = (x: number, y: number) => {
    const context = contextRef.current!

    // Draw pixel
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
      (Math.floor((offsetX / width) * 2) * width) / 2 + outlineSize / 2,
      (Math.floor((offsetY / height) * 2) * height) / 2 + outlineSize / 2,
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
