import { menuItems } from "../res/menu"
import { MenuItem } from "./MenuItem"
import { useState } from "react"

export const Menubar = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  return (
    <header className="menu-bar">
      <div className="menu-bar-logo"></div>
      <ul>
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            <MenuItem
              name={menuItem.name}
              items={menuItem.items}
              selected={selectedItem === menuItem.name}
              setSelectedItem={setSelectedItem}
            />
          </li>
        ))}
      </ul>
    </header>
  )
}
