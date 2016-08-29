import loop from './loop'
import canvasFactory from './canvas'
import updateFactory from './update'
import renderFactory from './render'
import stateFactory from './state'

const screen = canvasFactory()

screen.setSize({
  width: 600,
  height: 400
})

const state = stateFactory({screen})

const update = updateFactory(state)
const render = renderFactory(state)

loop({update, render}).start()
