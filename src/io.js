export default () => {
  const state = {
    direction: {
      x: 0,
      y: 0
    },
    action: null
  }

  /* Key codes
   * 37 left
   * 38 up
   * 39 right
   * 40 down
   * 90 z
   * 88 x
   * 67 c
   */

  const keyDown = (event) => {
    switch (event.keyCode) {
      case 37: state.direction.x = -1; return
      case 38: state.direction.y = -1; return
      case 39: state.direction.x = 1; return
      case 40: state.direction.y = 1; return
      case 90: state.action = true; return
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
      case 90:
        state.action = null
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
