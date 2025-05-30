export const menuItems = [
  {
    name: "File",
    items: ["New File", "Open File", "Save", "Save As"],
  },
  {
    name: "View",
    items: ["Toggle Grid", "Toggle Overlay"],
  },
  {
    name: "Settings",
    items: [],
  },
]

export const getMenuAction = (item: string, cvs: HTMLCanvasElement) => {
  let func = () => {
    console.log("Hello There")
  }

  if (item === "New File") {
    func = () => console.log("General Kenobi..!")
  } else if (item === "Open File") {
  } else if (item === "Save") {
  } else if (item === "Save As") {
    func = () => saveCanvasToFile(cvs)
  } else if (item === "Toggle Grid") {
  } else if (item === "Toggle Overlay") {
  }

  return func
}

const saveCanvasToFile = (cvs: HTMLCanvasElement) => {
  const dataURL = cvs.toDataURL("image/png")
  const newTab = window.open('about:blank','image from canvas');
  newTab?.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
}
