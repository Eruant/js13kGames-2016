export default ({ctx, canvas}) => {
  return () => {
    ctx.fillRect(0, 0, canvas.getWidth(), canvas.getHeight())
  }
}
