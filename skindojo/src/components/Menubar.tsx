import { menuItems } from "../res/menu"
import { MenuItem } from "./MenuItem"
import { useState } from "react"

// Great custom hook by zhaluza :)
import { useDetectClickOutside } from "react-detect-click-outside"

export const Menubar = () => {
  // Refs
  const ref = useDetectClickOutside({
    onTriggered: () => setIsExpanded(false),
  })

  // States
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <header className="menu-bar" ref={ref}>
      <div className="menu-bar-logo"></div>
      <ul>
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            <MenuItem
              name={menuItem.name}
              items={menuItem.items}
              selected={selectedItem === menuItem.name && isExpanded}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              setSelectedItem={setSelectedItem}
            />
          </li>
        ))}
      </ul>
    </header>
  )
}
