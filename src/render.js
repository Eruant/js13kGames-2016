export default ({ctx, canvas, camera, layers, map}) => {
  return () => {
    ctx.fillStyle = 'hsl(0, 100%, 50%)'
    ctx.fillRect(0, 0, canvas.getWidth(), canvas.getHeight())

    const viewBox = camera.currentView(camera.position, canvas)

    layers.forEach(layer => {
      ctx.drawImage(
        layer.canvas,
        viewBox.x,
        viewBox.y,
        viewBox.width,
        viewBox.height,
        0,
        0,
        canvas.getWidth(),
        canvas.getHeight()
      )

      // ctx.drawImage(layer.canvas, -camera.position.x, -camera.position.y)
    })
  }
}
