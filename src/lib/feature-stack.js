// Circular fan positions from the supplied flick-cards reference.
export function featureStackPosition(index, active, total) {
  let diff = (index - active + total) % total
  if (diff > total / 2) diff -= total
  const distance = Math.abs(diff)
  const direction = Math.sign(diff)
  if (!distance) return { x: '0%', y: '0%', rotate: 0, scale: 1, opacity: 1, zIndex: 5 }
  if (distance === 1) return { x: `${50 * direction}%`, y: '1%', rotate: 10 * direction, scale: 0.9, opacity: 1, zIndex: 4 }
  if (distance === 2) return { x: `${90 * direction}%`, y: '5%', rotate: 15 * direction, scale: 0.8, opacity: 1, zIndex: 3 }
  return { x: `${110 * direction}%`, y: '5%', rotate: 20 * direction, scale: 0.6, opacity: 0, zIndex: 2 }
}
