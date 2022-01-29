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

  // States
  const [RGB, setRGB] = useState({ R: 255, G: 255, B: 255 })

  // Do Once
  useEffect(() => {
    // setup Refs
    const canvas = gradientPickerRef.current!
    gradientPickerContextRef.current = canvas.getContext("2d")!
  }, [])

  const numberToHex = (n: number) => {
    const hex = n.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  const rgbToHex = (rgb: IRGB) =>
    "#" + numberToHex(rgb.R) + numberToHex(rgb.G) + numberToHex(rgb.B)

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
    const context = gradientPickerContextRef.current!
    const imageData = context.getImageData(
      nativeEvent.offsetX,
      nativeEvent.offsetY,
      1,
      1
    )
    const rgba = imageData.data

    console.log(rgba)

    let newRGB = { ...RGB, R: rgba[0], G: rgba[1], B: rgba[2] }
    setRGB(newRGB)
    setColor(rgbToHex(newRGB))
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
          style={
            {
              backgroundImage: `linear-gradient(0deg, black, transparent),
              linear-gradient(270deg, ${"red"}, transparent),
              linear-gradient(90deg, white, transparent)`,
            } as React.CSSProperties
          }
        />
      </div>
      <div className="hue-picker">
        <p className="label">Hue</p>
        <div />
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
