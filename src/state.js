import cameraActions from './camera'
import mapFactory from './map'

export default ({ctx, canvas}) => {
  const map = mapFactory()

  // make a canvas to pre-render to
  const background = {
    canvas: window.document.createElement('canvas'),
    tileMap: map.generateMap({
      width: 100,
      height: 100
    })
  }

  map.renderMap(background)

  const layers = [background]

  const camera = Object.assign({}, cameraActions(), {
    position: {
      x: canvas.getWidth() * 0.5,
      y: canvas.getHeight() * 0.5
    },
    speed: {
      x: 2,
      y: 2
    }
  })

  return {
    ctx,
    canvas,
    camera,
    map,
    layers
  }
}
