interface IProps {
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
  updateCustomColors: (color: string) => void
}

export const PaletteColor = ({
  color,
  setColor,
  updateCustomColors,
}: IProps) => {
  const updateColor = () => {
    setColor(color)
    updateCustomColors(color)
  }

  return (
    <div
      className="palette-color"
      style={{ background: color } as React.CSSProperties}
      onClick={updateColor}
    />
  )
}
