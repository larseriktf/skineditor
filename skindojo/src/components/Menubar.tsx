import { menuItems } from "../res/menu"
import { MenuItem } from "./MenuItem"
import { useState } from "react"

// Great custom hook by zhaluza :)
import { useDetectClickOutside } from "react-detect-click-outside"

type Props = {
  cvs: HTMLCanvasElement
}

export const Menubar = ({cvs}: Props) => {
  const ref = useDetectClickOutside({
    onTriggered: () => setIsExpanded(false),
  })

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
              cvs={cvs}
            />
          </li>
        ))}
      </ul>
    </header>
  )
}
