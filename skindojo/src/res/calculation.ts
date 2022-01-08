export const distanceBetweenTwoPoints = () => {}

export const angleBetweenTwoPoints = (
  cx: number,
  cy: number,
  ex: number,
  ey: number
) => {
  // Arctan formula
  const dy = ey - cy
  const dx = ex - cx
  var theta = Math.atan2(dy, dx) // * -1

  // From radians to degrees
  theta *= 180 / Math.PI

  // Convert to range [0, 360]
  if (theta < 0) theta = 360 + theta

  return theta
}
