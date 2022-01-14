// Bresenham algorithm for drawing lines

type drawCallback = (x: number, y: number, color: string) => void

const plotlineLow = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  draw: drawCallback
) => {
  let deltaX = x1 - x0
  let deltaY = y1 - y0
  let yi = 1

  if (deltaY < 0) {
    yi = -1
    deltaY = -deltaY
  }

  let D = 2 * deltaY - deltaX
  let y = y0

  if (D > 0) {
    y = y + yi
    D = D + 2 * (deltaY - deltaX)
  } else D = D + 2 * deltaY

  for (let x = x0 + 1; x < x1; x++) {
    draw(x, y, "red")

    if (D > 0) {
      y = y + yi
      D = D + 2 * (deltaY - deltaX)
    } else D = D + 2 * deltaY
  }
}

const plotlineHigh = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  draw: drawCallback
) => {
  let deltaX = x1 - x0
  let deltaY = y1 - y0
  let xi = 1

  if (deltaX < 0) {
    xi = -1
    deltaX = -deltaX
  }
  let D = 2 * deltaX - deltaY
  let x = x0

  if (D > 0) {
    x = x + xi
    D = D + 2 * (deltaX - deltaY)
  } else D = D + 2 * deltaX

  for (let y = y0 + 1; y < y1; y++) {
    draw(x, y, "red")

    if (D > 0) {
      x = x + xi
      D = D + 2 * (deltaX - deltaY)
    } else D = D + 2 * deltaX
  }
}

export const plotline = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  draw: drawCallback
) => {
  if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
    // Horizontal
    if (x0 < x1) {
      plotlineLow(x0, y0, x1, y1, draw)
    } else {
      plotlineLow(x1, y1, x0, y0, draw)
    }
  } else {
    // Vertical
    if (y0 < y1) {
      plotlineHigh(x0, y0, x1, y1, draw)
    } else {
      plotlineHigh(x1, y1, x0, y0, draw)
    }
  }
}
