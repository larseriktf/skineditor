import menuItems from "../res/menu.json"
import { MenuItem } from "./MenuItem"

export const Menubar = () => {
  return (
    <header className="menu-bar">
      <ul className="menu-bar-list">
        {menuItems.map((menuItem, index) => (
          <li>
            <MenuItem name={menuItem.name} items={menuItem.items} key={index} />
          </li>
        ))}
      </ul>
    </header>
  )
}
