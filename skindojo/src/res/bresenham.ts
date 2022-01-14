// Bresenham algorithm for drawing lines
interface IPoint {
  x: number
  y: number
}

type drawCallback = (x: number, y: number, color: string) => void

const plotlineLow = (start: IPoint, end: IPoint, draw: drawCallback) => {
  let deltaX = end.x - start.x
  let deltaY = end.y - start.y
  let yi = 1

  if (deltaY < 0) {
    yi = -1
    deltaY = -deltaY
  }

  let D = 2 * deltaY - deltaX
  let y = start.y

  if (D > 0) {
    y = y + yi
    D = D + 2 * (deltaY - deltaX)
  } else D = D + 2 * deltaY

  for (let x = start.x + 1; x < end.x; x++) {
    draw(x, y, "red")

    if (D > 0) {
      y = y + yi
      D = D + 2 * (deltaY - deltaX)
    } else D = D + 2 * deltaY
  }
}

const plotlineHigh = (start: IPoint, end: IPoint, draw: drawCallback) => {
  let deltaX = end.x - start.x
  let deltaY = end.y - start.y
  let xi = 1

  if (deltaX < 0) {
    xi = -1
    deltaX = -deltaX
  }
  let D = 2 * deltaX - deltaY
  let x = start.x

  if (D > 0) {
    x = x + xi
    D = D + 2 * (deltaX - deltaY)
  } else D = D + 2 * deltaX

  for (let y = start.y + 1; y < end.y; y++) {
    draw(x, y, "red")

    if (D > 0) {
      x = x + xi
      D = D + 2 * (deltaX - deltaY)
    } else D = D + 2 * deltaX
  }
}

export const plotline = (start: IPoint, end: IPoint, draw: drawCallback) => {
  if (Math.abs(end.y - start.y) < Math.abs(end.x - start.x)) {
    // Horizontal
    if (start.x < end.x) {
      plotlineLow(start, end, draw)
    } else {
      plotlineLow(end, start, draw)
    }
  } else {
    // Vertical
    if (start.y < end.y) {
      plotlineHigh(start, end, draw)
    } else {
      plotlineHigh(end, start, draw)
    }
  }
}
