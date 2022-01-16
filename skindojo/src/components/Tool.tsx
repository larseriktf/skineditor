export const Tool: React.FC<{ image: string }> = ({ image }) => {
  return (
    <button className="tool">
      <img src={image} alt="Brush tool" />
    </button>
  )
}
