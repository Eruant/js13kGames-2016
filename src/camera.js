export default () => {
  const isValidPosition = (obj) => (
    typeof obj === 'object' &&
    obj.hasOwnProperty('x') &&
    typeof obj.x === 'number' &&
    obj.hasOwnProperty('y') &&
    typeof obj.y === 'number'
  )

  const cameraError = (message) => new Error(`Camera Error: ${message}`)

  const currentView = (cameraPosition, canvas) => {
    if (!isValidPosition(cameraPosition)) {
      throw cameraError('cameraPosition is not a valid object')
    }

    const width = canvas.getWidth()
    const height = canvas.getHeight()

    return {
      x: cameraPosition.x - (width * 0.5),
      y: cameraPosition.y - (height * 0.5),
      width: width,
      height: height
    }
  }

  const move = (currentPosition, distanceTraveled) => {
    if (!isValidPosition(currentPosition)) {
      throw cameraError('currentPosition is not a valid object')
    }

    if (!isValidPosition(distanceTraveled)) {
      throw cameraError('distanceTraveled is not a valid object')
    }

    return {
      x: currentPosition.x + distanceTraveled.x,
      y: currentPosition.y + distanceTraveled.y
    }
  }

  return {
    currentView,
    move
  }
}
