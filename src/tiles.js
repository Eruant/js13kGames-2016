export default () => {
  const tileSize = 32

  const makeTexture = ({width, height, pattern, color}) => {
    const scale = tileSize / width
    const canvas = window.document.createElement('canvas')
    canvas.width = width * scale
    canvas.height = height * scale
    canvas.style.imageRendering = 'pixelated'

    const ctx = canvas.getContext('2d')

    pattern.forEach((lightness, index) => {
      const x = index % width
      const y = Math.floor(index / width)

      ctx.fillStyle = `hsl(${color}, 100%, ${lightness * 10}%)`
      ctx.save()
      ctx.translate(x * scale, y * scale)
      ctx.fillRect(0, 0, scale, scale)
      ctx.restore()
    })

    return ctx.getImageData(0, 0, width * scale, height * scale)
  }

  const makeTile = ({name, texture, color}) => {
    const imageData = makeTexture(texture)

    return {
      name,
      imageData,
      width: tileSize,
      height: tileSize
    }
  }

  const grassTile = makeTile({
    name: 'grass',
    texture: {
      width: 4,
      height: 4,
      pattern: [
        2, 8, 5, 4,
        6, 4, 8, 5,
        5, 2, 6, 3,
        3, 6, 4, 8
      ],
      color: 112
    }
  })

  const dirtTile = makeTile({
    name: 'dirt',
    texture: {
      width: 4,
      height: 4,
      pattern: [
        7, 4, 6, 5,
        3, 6, 2, 8,
        5, 8, 6, 4,
        7, 3, 5, 8
      ],
      color: 50
    }
  })

  return [
    grassTile,
    dirtTile
  ]
}
