import { getMenuAction } from "../res/menu"
import { MenuSubItem } from "./MenuSubItem"

type Props = {
  name: string
  items: string[],
  selected: boolean,
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>
}

export const MenuItem = ({ name, items, selected, isExpanded, setIsExpanded, setSelectedItem }: Props) => {
  const select = () => setSelectedItem(name)

  const toggleExpand = () => {
    if (isExpanded) setIsExpanded(false)
    else setIsExpanded(true)
  }

  return (
    <>
      <div className="menu-bar-item" onMouseOver={select} onClick={toggleExpand}>
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
          <MenuSubItem item={item} action={getMenuAction(item)} key={index} />
        ))}
      </ul>
    </>
  )
}
