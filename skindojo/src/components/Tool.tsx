interface IProps {
  imageURL: string
}

export const Tool = ({ imageURL }: IProps) => {
  return (
    <button className="tool">
      <img src={imageURL} alt="Brush tool" />
    </button>
  )
}
