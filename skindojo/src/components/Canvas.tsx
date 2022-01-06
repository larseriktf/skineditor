import { useRef, useState, useEffect } from "react"

interface Events {
  nativeEvent: MouseEvent
}

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const drawnPixels: Array<[number, number]> = []

  useEffect(() => {
    const canvas = canvasRef.current!
    canvas.width = 32
    canvas.height = 32
    canvas.id = "canv"

    const context = canvas.getContext("2d")!
    context.strokeStyle = "black"
    context.lineWidth = 1
    contextRef.current = context
  }, [])

  const getRealCoordinates = (mouseEvent: MouseEvent) => {
    const canvas = canvasRef.current!
    let { offsetX, offsetY } = mouseEvent

    offsetX = Math.floor((canvas.width * offsetX) / canvas.clientWidth)
    offsetY = Math.floor((canvas.height * offsetY) / canvas.clientHeight)
    return { offsetX, offsetY }
  }

  const startDrawing = () => {
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
    const { offsetX, offsetY } = getRealCoordinates(nativeEvent)

    // Draw
    if (isDrawing) draw(offsetX, offsetY)
  }

  return (
    <section className="canvas">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={moveCursor}
      />
    </section>
  )
}
