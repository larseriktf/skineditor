interface IProps {
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const PaletteColor = ({ color, setColor }: IProps) => {
  const updateColor = () => {
    setColor(color)
  }

  return (
    <div
      className="palette-color"
      style={{ background: color } as React.CSSProperties}
      onClick={updateColor}
    />
  )
}
