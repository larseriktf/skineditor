import { useState } from "react"
import { MenuSubItem } from "./MenuSubItem"

type Props = {
  name: string
  items: string[]
}

export const MenuItem = ({ name, items }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const expand = () => {
    setIsExpanded(true)
  }

  const minimize = () => {
    setIsExpanded(false)
  }

  const toggleExpand = () => {
    if (isExpanded) minimize()
    else expand()
  }

  return (
    <>
      <button className="menu-bar-button" onClick={toggleExpand}>
        {name}
      </button>
      <ul
        className="drop-down"
        style={
          {
            visibility: isExpanded ? "visible" : "hidden",
          } as React.CSSProperties
        }
        onMouseLeave={minimize}
      >
        {items.map((item, index) => (
          <MenuSubItem item={item} key={index} />
        ))}
      </ul>
    </>
  )
}
