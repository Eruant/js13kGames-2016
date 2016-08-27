export default ({update, render, fps = 1000 / 60} = {}) => {
  let state = {
    mode: 'stopped',
    startTime: new Date().getTime(),
    timeSinceLastUPdate: 0,
    frameTime: fps
  }

  if (!update || !render) {
    throw new Error('You need to declare an update an a render method')
  }

  const tick = (timestamp) => {
    window.requestAnimationFrame((rafTimestamp) => {
      if (state.mode !== 'stopped') {
        tick(rafTimestamp)
      }
    })

    const timePassed = new Date().getTime() - state.startTime
    const delta = timestamp - timePassed

    state.timeSinceLastUpdate += delta

    if (state.timeSinceLastUpdate >= state.frameTime) {
      update(state.timeSinceLastUpdate)
      state.timeSinceLastUpdate = 0
    }

    render()
  }

  const loop = {}

  loop.start = () => {
    state.mode = 'playing'
    state.startTime = new Date().getTime()
    state.timeSinceLastUpdate = 0
    tick(0)
    return loop
  }

  loop.stop = () => {
    state.mode = 'stopped'
    return loop
  }

  loop.pause = () => {
    state.mode = 'paused'
    return loop
  }

  loop.getState = () => state.mode

  return loop
}
