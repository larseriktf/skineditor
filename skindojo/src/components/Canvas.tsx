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

  // Variables
  const drawnPixels: Array<[number, number]> = []

  useEffect(() => {
    // setup Refs
    const canvas = canvasRef.current!
    canvas.width = width
    canvas.height = height
    canvas.id = "canv"

    contextRef.current = canvas.getContext("2d")!

    setOutlineSize(canvas.clientWidth / canvas.width)

    hideOutline()
  }, [height, width])

  const startDrawing = ({ nativeEvent }: IEvents) => {
    let { offsetX, offsetY } = nativeEvent
    const { realX, realY } = getRealCoordinates(offsetX, offsetY)

    // Draw initial pixel
    draw(realX, realY)
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    // clears array
    drawnPixels.length = 0
  }

  const draw = (x: number, y: number) => {
    // Prevents drawing the same pixel multiple times
    for (const pixel of drawnPixels) {
      if (pixel.toString() === [x, y].toString()) return
    }

    const context = contextRef.current!

    // Draw pixel
    context.fillStyle = color
    context.fillRect(x, y, 1, 1)
    // Add pixel to array
    drawnPixels.push([x, y])
  }

  const getRealCoordinates = (offsetX: number, offsetY: number) => {
    const canvas = canvasRef.current!

    const realX = Math.floor((canvas.width * offsetX) / canvas.clientWidth)
    const realY = Math.floor((canvas.height * offsetY) / canvas.clientHeight)

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
