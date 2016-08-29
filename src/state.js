import mobFactory from './mob'
import cameraActions from './camera'
import mapFactory from './map'
import ioFactory from './io'

export default ({screen}) => {
  const map = mapFactory()

  const background = {
    canvas: window.document.createElement('canvas'),
    tileMap: map.generateMap({
      width: 300,
      height: 150
    })
  }

  const mobs = {
    canvas: window.document.createElement('canvas'),
    mobs: [
      mobFactory({
        position: {
          x: 0,
          y: 0
        }
      })
    ]
  }

  map.renderMap(background)

  mobs.canvas.width = background.canvas.width
  mobs.canvas.height = background.canvas.height

  const layers = {
    background,
    mobs
  }

  const camera = cameraActions({
    position: {
      x: screen.getWidth() * 0.5,
      y: screen.getHeight() * 0.5
    }
  })

  const io = ioFactory()

  return {
    screen,
    camera,
    map,
    layers,
    io
  }
}
