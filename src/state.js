import cameraActions from './camera'

export default ({ctx, canvas}) => {
  const background = []
  const middleground = []
  const foreground = []

  const layers = [background, middleground, foreground]

  const camera = Object.assign({}, cameraActions(), {
    position: {
      x: 0,
      y: 0
    },
    speed: {
      x: 0,
      y: 0
    }
  })

  return {
    ctx,
    canvas,
    camera,
    layers
  }
}
