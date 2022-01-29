import { useState, useEffect, useRef } from "react"

interface IProps {
  setColor: React.Dispatch<React.SetStateAction<string>>
}

interface IRGB {
  R: number
  G: number
  B: number
}

interface IMouseEvent {
  nativeEvent: MouseEvent
}

export const Colorpicker = ({ setColor }: IProps) => {
  // Refs
  const gradientPickerRef = useRef<HTMLCanvasElement>(null)
  const gradientPickerContextRef = useRef<CanvasRenderingContext2D | null>(null)
  const huePickerRef = useRef<HTMLCanvasElement>(null)
  const huePickerContextRef = useRef<CanvasRenderingContext2D | null>(null)

  // States
  const [RGB, setRGB] = useState({ R: 255, G: 255, B: 255 })

  // Do Once
  useEffect(() => {
    // setup Refs
    const gradientCvs = gradientPickerRef.current!
    gradientPickerContextRef.current = gradientCvs.getContext("2d")!

    const hueCvs = huePickerRef.current!
    huePickerContextRef.current = hueCvs.getContext("2d")!

    // Draw pickers
    drawGradientPicker("blue")
    drawHuePicker()
  }, [])

  const drawGradientPicker = (color: string) => {
    const ctx = gradientPickerContextRef.current!

    // Draw horizontal colored to white gradient
    const gradientH = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0)
    gradientH.addColorStop(0, "white")
    gradientH.addColorStop(1, color)
    ctx.fillStyle = gradientH
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw vertical black gradient
    const gradientV = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
    gradientV.addColorStop(0, "transparent")
    gradientV.addColorStop(1, "black")
    ctx.fillStyle = gradientV
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const drawHuePicker = () => {
    const ctx = huePickerContextRef.current!
    // Draw rainbow gradient
    let gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)

    // Add rainbow colors to gradient
    const rainbow = ["red", "yellow", "lime", "cyan", "blue", "magenta", "red"]
    rainbow.map((color, index) => {
      const fraction = (1 / (rainbow.length - 1)) * index
      gradient.addColorStop(fraction, color)
    })

    // Fill context with gradient
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const toHex = (n: number) => {
    const hex = n.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  const rgbToHex = (rgb: IRGB) =>
    "#" + toHex(rgb.R) + toHex(rgb.G) + toHex(rgb.B)

  const updateRGB = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Checks the validity of the pattern passed in the value of the input
    let value = event.target.validity.valid ? Number(event.target.value) : 0
    const name = event.target.name

    // Limit value to 0 - 255
    if (value > 255) value = 255
    else if (value < 0) value = 0

    let newRGB = RGB

    // Update RGB value
    if (name === "R") newRGB = { ...RGB, R: value }
    else if (name === "G") newRGB = { ...RGB, G: value }
    else if (name === "B") newRGB = { ...RGB, B: value }

    setRGB(newRGB)
    setColor(rgbToHex(newRGB))
  }

  const grabColor = ({ nativeEvent }: IMouseEvent) => {
    const ctx = gradientPickerContextRef.current!

    // Grab pixel data
    const imgData = ctx.getImageData(
      nativeEvent.offsetX,
      nativeEvent.offsetY,
      1,
      1
    )
    const pixel = imgData.data

    // Update colors
    const newRGB = { ...RGB, R: pixel[0], G: pixel[1], B: pixel[2] }
    setRGB(newRGB)
    setColor(rgbToHex(newRGB))
  }

  const grabHue = ({ nativeEvent }: IMouseEvent) => {
    const ctx = huePickerContextRef.current!

    // Grab pixel data
    const imgData = ctx.getImageData(
      nativeEvent.offsetX,
      nativeEvent.offsetY,
      1,
      1
    )
    const pixel = imgData.data
    const color = rgbToHex({ R: pixel[0], G: pixel[1], B: pixel[2] })
    drawGradientPicker(color)
  }

  return (
    <section className="colorpicker">
      <div className="gradient-picker">
        <p className="label">Colorpicker</p>
        <canvas
          id="gradient-picker"
          width="200"
          height="200"
          ref={gradientPickerRef}
          onClick={grabColor}
        />
      </div>
      <div className="hue-picker">
        <p className="label">Hue</p>
        <canvas
          id="hue-picker"
          width="20"
          height="200"
          ref={huePickerRef}
          onClick={grabHue}
        />
      </div>
      <div className="rgb-picker">
        <p className="label">Red</p>
        <input
          type="text"
          pattern="[0-9]*"
          value={RGB.R}
          onChange={updateRGB}
          name="R"
        />
        <p className="label">Green</p>
        <input
          type="text"
          pattern="[0-9]*"
          value={RGB.G}
          onChange={updateRGB}
          name="G"
        />
        <p className="label">Blue</p>
        <input
          type="text"
          pattern="[0-9]*"
          value={RGB.B}
          onChange={updateRGB}
          name="B"
        />
      </div>
    </section>
  )
}
