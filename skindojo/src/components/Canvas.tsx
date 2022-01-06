import { useRef, useState, useEffect } from "react"

interface Events {
  nativeEvent: MouseEvent
}

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

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

  const startDrawing = ({ nativeEvent }: Events) => {
    const context = contextRef.current!
    const { offsetX, offsetY } = getRealCoordinates(nativeEvent)

    context.beginPath()
    context.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const stopDrawing = () => {
    const context = contextRef.current!

    context.closePath()
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }: Events) => {
    if (!isDrawing) return

    const context = contextRef.current!
    const { offsetX, offsetY } = getRealCoordinates(nativeEvent)

    context.lineTo(offsetX, offsetY)
    context.stroke()
  }

  return (
    <section className="canvas">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />
    </section>
  )
}
