import { useRef, useState, useEffect } from "react"

interface Events {
  nativeEvent: MouseEvent
}

export const Canvas = () => {
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
  const width = 32
  const height = 32

  useEffect(() => {
    // setup Refs
    const canvas = canvasRef.current!
    canvas.width = width
    canvas.height = height
    canvas.id = "canv"

    contextRef.current = canvas.getContext("2d")!

    setOutlineSize(canvas.clientWidth / canvas.width)

    hideOutline()
  }, [])

  const getRealCoordinates = (event: MouseEvent) => {
    const canvas = canvasRef.current!
    let { offsetX, offsetY } = event

    offsetX = Math.floor((canvas.width * offsetX) / canvas.clientWidth)
    offsetY = Math.floor((canvas.height * offsetY) / canvas.clientHeight)

    return { offsetX, offsetY }
  }

  const startDrawing = ({ nativeEvent }: Events) => {
    let { offsetX, offsetY } = getRealCoordinates(nativeEvent)

    // Draw initial pixel
    draw(offsetX, offsetY)
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    // clears array
    drawnPixels.length = 0
  }

  const draw = (x: number, y: number) => {
    const context = contextRef.current!

    // Prevents drawing the same pixel multiple times
    for (const pixel of drawnPixels) {
      if (pixel.toString() === [x, y].toString()) return
    }
    // Draw pixel
    context.fillStyle = "red"
    context.fillRect(x, y, 1, 1)
    // Add pixel to array
    drawnPixels.push([x, y])
  }

  const moveCursor = ({ nativeEvent }: Events) => {
    const canvas = canvasRef.current!
    let { offsetX, offsetY } = nativeEvent

    showOutline()
    setOutlineCoords([
      (Math.ceil((offsetX / width) * 2) * width) / 2 - outlineSize / 2,
      (Math.ceil((offsetY / height) * 2) * height) / 2 - outlineSize / 2,
    ])

    offsetX = Math.floor((canvas.width * offsetX) / canvas.clientWidth)
    offsetY = Math.floor((canvas.height * offsetY) / canvas.clientHeight)

    // Draw
    if (isDrawing) draw(offsetX, offsetY)
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
              width: outlineSize + "px",
              height: outlineSize + "px",
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
