import { createContext } from "react";

type DefaultValue = {
  color: string,
  setColor: React.Dispatch<React.SetStateAction<string>>
}

const initialValue = {
  color: "#000000",
  setColor: (): void => {
    throw new Error("setColor must be overridden")
  }
}

export const ColorContext = createContext<DefaultValue>(initialValue)