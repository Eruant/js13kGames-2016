import mobFactory from './mob'
import cameraActions from './camera'
import mapFactory from './map'
import ioFactory from './io'

export default ({screen}) => {
  const map = mapFactory()

  const underground = {
    canvas: window.document.createElement('canvas')
  }

  underground.canvas.width = screen.getWidth()
  underground.canvas.height = screen.getHeight()

  const undergroundContext = underground.canvas.getContext('2d')

  const pixelSize = 8
  for (let y = 0, yLen = screen.getHeight() / pixelSize; y < yLen; y++) {
    for (let x = 0, xLen = screen.getWidth() / pixelSize; x < xLen; x++) {
      undergroundContext.fillStyle = `hsl(50, 100%, ${Math.floor(Math.random() * 20)}%)`
      undergroundContext.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    }
  }

  const surface = {
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

  const particles = {
    canvas: window.document.createElement('canvas'),
    particles: []
  }

  // initialize particle array will null values
  for (let i = 0, len = 20; i < len; i++) {
    particles.particles[i] = null
  }

  map.renderMap(surface)

  mobs.canvas.width = surface.canvas.width
  mobs.canvas.height = surface.canvas.height
  particles.canvas.width = surface.canvas.width
  particles.canvas.height = surface.canvas.height

  const layers = {
    underground,
    surface,
    mobs,
    particles
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
