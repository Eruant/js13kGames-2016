export default ({position}) => {
  const isValidPosition = (obj) => (
    typeof obj === 'object' &&
    obj.hasOwnProperty('x') &&
    typeof obj.x === 'number' &&
    obj.hasOwnProperty('y') &&
    typeof obj.y === 'number'
  )

  const mobError = (message) => new Error(`Mob Error: ${message}`)

  const setTargetPosition = ({currentPosition, direction}) => {
    if (!isValidPosition(currentPosition)) {
      throw mobError('currentPosition is not a valid object')
    }

    const tileSize = 32

    return {
      x: currentPosition.x + (direction.x * tileSize),
      y: currentPosition.y + (direction.y * tileSize)
    }
  }

  const move = ({currentPosition, speed}) => {
    if (!isValidPosition(currentPosition)) {
      throw mobError('currentPosition is not a valid object')
    }

    return {
      x: currentPosition.x + speed.x,
      y: currentPosition.y + speed.y
    }
  }

  return Object.create({
    move,
    position,
    setTargetPosition,
    speed: {
      x: 0,
      y: 0
    },
    previousPosition: Object.assign({}, position),
    targetPosition: Object.assign({}, position),
    direction: 'EAST'
  })
}
