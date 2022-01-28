interface IProps {
  color: string
}

export const PaletteColor = ({ color }: IProps) => {
  return (
    <div
      className="palette-color"
      style={{ background: color } as React.CSSProperties}
    />
  )
}
