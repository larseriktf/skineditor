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
  var theta = Math.atan2(dy, dx)

  // Convert to range [0, 2 * Math.pi]
  if (theta < 0) theta += 2 * Math.PI

  return theta
}
