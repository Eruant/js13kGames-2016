import loop from './loop'
import canvasFactory from './canvas'
import updateFactory from './update'
import renderFactory from './render'
import stateFactory from './state'

const canvas = canvasFactory()
const ctx = canvas.getContext()

const state = stateFactory({ctx, canvas})

const update = updateFactory(state)
const render = renderFactory(state)

canvas.setSize({
  width: 600,
  height: 400
})

loop({update, render}).start()
