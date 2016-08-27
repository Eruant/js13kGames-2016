import tileFactory from './tiles'

export default () => {
  const tileTypes = tileFactory()

  const generateMap = ({width, height}) => {
    const numberOfTiles = width * height
    const tiles = []

    for (let i = 0, len = numberOfTiles; i < len; i++) {
      tiles.push(Math.floor(Math.random() * 2))
    }

    return {width, height, tiles}
  }

  const getTile = ({type}) => {
    return tileTypes[type]
  }

  const renderMap = ({canvas, tileMap}) => {
    const {width, height, tiles} = tileMap

    const tile = getTile({
      type: tileMap.tiles[0]
    })
    const tileWidth = tile.width
    const tileHeight = tile.height

    canvas.width = width * tileWidth
    canvas.height = height * tileHeight

    const ctx = canvas.getContext('2d')

    tiles.forEach((tileType, index) => {
      const tile = getTile({type: tileType})

      const x = index % width
      const y = Math.floor(index / width)

      ctx.putImageData(tile.imageData, x * tileWidth, y * tileHeight)
    })
  }

  return {generateMap, getTile, renderMap}
}
