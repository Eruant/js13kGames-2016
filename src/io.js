export default () => {
  const state = {
    direction: {
      x: 0,
      y: 0
    }
  }

  const keyDown = (event) => {
    switch (event.keyCode) {
      case 37: state.direction.x = -1; return
      case 38: state.direction.y = -1; return
      case 39: state.direction.x = 1; return
      case 40: state.direction.y = 1; return
    }
  }

  const keyUp = (event) => {
    switch (event.keyCode) {
      case 37:
      case 39:
        state.direction.x = 0
        return
      case 38:
      case 40:
        state.direction.y = 0
        return
    }
  }

  window.addEventListener('keydown', keyDown)
  window.addEventListener('keyup', keyUp)

  const getInput = () => state

  return {
    getInput
  }
}
