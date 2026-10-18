export function materialGeometry(progress, count, compact = false) {
  const widths = Array.from({ length: count }, (_, i) => Math.max(compact ? 0.16 : 0.12, (compact ? 0.82 : 0.56) - Math.abs(i - progress) * (compact ? 0.58 : 0.24)))
  const starts = widths.map((_, i) => widths.slice(0, i).reduce((sum, width) => sum + width, 0))
  const index = Math.floor(progress)
  const desiredOffset = starts[index] + (progress - index) * widths[index]
  const offset = Math.min(desiredOffset, Math.max(0, widths.reduce((sum, width) => sum + width, 0) - 1))
  return widths.map((width, i) => ({ left: (starts[i] - offset) * 100, width: width * 100 }))
}
