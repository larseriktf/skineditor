type Props = {
  item: string
  action: () => void
}

export const MenuSubItem = ({ item, action }: Props) => {
  return <li onClick={action}><div className="menu-bar-subitem">{item}</div></li>
}
