import { getMenuAction } from "../res/menu"

type Props = {
  name: string
  items: string[]
  selected: boolean
  isExpanded: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>
  cvs: HTMLCanvasElement
}

export const MenuItem = ({
  name,
  items,
  selected,
  isExpanded,
  setIsExpanded,
  setSelectedItem,
  cvs
}: Props) => {
  const select = () => setSelectedItem(name)

  const toggleExpand = () => {
    if (isExpanded) setIsExpanded(false)
    else setIsExpanded(true)
  }

  return (
    <>
      <div
        className={`menu-bar-item ${selected ? "selected" : ""}`}
        onMouseOver={select}
        onClick={toggleExpand}
      >
        {name}
      </div>
      <ul
        className="drop-down"
        style={
          {
            visibility: selected ? "visible" : "hidden",
          } as React.CSSProperties
        }
      >
        {items.map((item, index) => (
          <li onClick={getMenuAction(item, cvs)} key={index}>
            <div className="menu-bar-subitem">{item}</div>
          </li>
        ))}
      </ul>
    </>
  )
}
