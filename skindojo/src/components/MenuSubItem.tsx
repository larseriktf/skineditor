import { getMenuAction } from "../res/menu"

type Props = {
  item: string
}

export const MenuSubItem = ({item}: Props) => {
  const clickItem = () => {
    const action = getMenuAction(item)
    action()
  }

  return <li onClick={clickItem}>{item}</li>;
};
