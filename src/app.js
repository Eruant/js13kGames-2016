import loop from './loop'
import canvasFactory from './canvas'
import updateFactory from './update'
import renderFactory from './render'

const canvas = canvasFactory()
const ctx = canvas.getContext()

const state = {ctx, canvas}

const update = updateFactory(state)
const render = renderFactory(state)

canvas.setSize({
  width: 600,
  height: 400
})

loop({update, render}).start()
