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

const heroImage = window.document.createElement('img')
heroImage.src = 'hero.png'

const state = stateFactory({screen, heroImage})

const update = updateFactory(state)
const render = renderFactory(state)

const game = loop({update, render})

heroImage.onload = () => {
  game.start()
}

