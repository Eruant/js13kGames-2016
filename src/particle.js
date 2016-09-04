export default ({position, speed, color = 'hsla(50, 100%, 50%, 0.3)', lifetime = 100, isAffectedByGravity = true}) => {
  const isValidObj = (obj) => (
    typeof obj === 'object' &&
    obj.hasOwnProperty('x') &&
    typeof obj.x === 'number' &&
    obj.hasOwnProperty('y') &&
    typeof obj.y === 'number' &&
    obj.hasOwnProperty('z') &&
    typeof obj.z === 'number'
  )

  const particleError = (message) => new Error(`Particle Error: ${message}`)

  if (!isValidObj(position) || !isValidObj(speed)) {
    throw particleError('position or speed is not valid')
  }

  const gravity = (speed) => {
    if (!isValidObj(speed)) {
      throw particleError('speed is not a valid object')
    }

    return {
      x: speed.x,
      y: speed.y,
      z: speed.z - 2
    }
  }

  const move = ({currentPosition, speed}) => {
    if (!isValidObj(currentPosition)) {
      throw particleError('currentPosition is not a valid object')
    }

    if (!isValidObj(speed)) {
      throw particleError('speed is not a valid object')
    }

    return {
      x: currentPosition.x + speed.x,
      y: currentPosition.y + speed.y,
      z: currentPosition.z + speed.z
    }
  }

  return Object.create({
    move,
    gravity,
    speed,
    position,
    color,
    isAffectedByGravity,
    liveRemaining: lifetime
  })
}
