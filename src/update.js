export default ({ctx, canvas, camera, layers}) => {
  return () => {
    camera.position = camera.move(camera.position, camera.speed)
  }
}
