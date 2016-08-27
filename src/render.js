export default ({ctx, canvas, camera, layers}) => {
  return () => {
    // const viewBox = camera.currentView(camera.position, canvas)

    // copy from pre-rendered layers to live canvas
    ctx.fillRect(0, 0, canvas.getWidth(), canvas.getHeight())
  }
}
