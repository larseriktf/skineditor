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
    context.scale(1, 1)
    context.strokeStyle = "black"
    context.lineWidth = 1
    contextRef.current = context
  }, [])

  const startDrawing = ({ nativeEvent }: Events) => {
    const context = contextRef.current!
    const canvas = canvasRef.current!

    let { offsetX, offsetY } = nativeEvent
    console.log("before: " + offsetX)
    offsetX = Math.floor((canvas.width * offsetX) / canvas.clientWidth)
    offsetY = Math.floor((canvas.height * offsetY) / canvas.clientHeight)
    console.log("after: " + offsetX)
    console.log("client: " + canvas.clientHeight)
    console.log("real: " + canvas.height)

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

    const canvas = canvasRef.current!
    const context = contextRef.current!
    const rect = canvas.getBoundingClientRect()

    let { offsetX, offsetY } = nativeEvent
    offsetX = Math.floor((canvas.width * offsetX) / canvas.clientWidth)
    offsetY = Math.floor((canvas.height * offsetY) / canvas.clientHeight)

    context.lineTo(offsetX, offsetY)
    context.stroke()

    // console.log(rect.top, rect.right, rect.bottom, rect.left)
    // console.log(offsetX, offsetY)
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
