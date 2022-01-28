interface IProps {
  color: string
}

export const SelectedColor = ({ color }: IProps) => {
  return (
    <section className="selected-color">
      <p className="label">Selected Color</p>
      <div
        className="selected-color-preview"
        style={{ background: color } as React.CSSProperties}
      />
    </section>
  )
}
