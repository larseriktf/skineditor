import { useState } from "react"
import { getMenuAction } from "../res/menu"
import { MenuSubItem } from "./MenuSubItem"

type Props = {
  name: string
  items: string[],
  selected: boolean,
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>
}

export const MenuItem = ({ name, items, selected, setSelectedItem }: Props) => {
  const select = () => setSelectedItem(name)

  const deselect = () => setSelectedItem(null)

  const toggleSelect = () => {
    if (selected) deselect()
    else select()
  }

  return (
    <>
      <div className="menu-bar-item" onClick={toggleSelect}>
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
