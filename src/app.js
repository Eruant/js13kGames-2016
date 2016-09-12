import loop from './loop'
import canvasFactory from './canvas'
import updateFactory from './update'
import renderFactory from './render'
import stateFactory from './state'
import fontFactory from './font'

let game

const screen = canvasFactory()

screen.setSize({
  width: 600,
  height: 400
})

const assets = [
  {
    name: 'hero',
    src: 'hero.png',
    loaded: false,
    el: window.document.createElement('img')
  },
  {
    name: 'font',
    src: 'font.png',
    loaded: false,
    el: window.document.createElement('img')
  }
]

const font = fontFactory({
  fontImage: assets[1].el
})

const state = stateFactory({
  screen,
  heroImage: assets[0].el,
  endFunction: (attempts) => {
    game.stop()

    // need to wait for next frame to render
    setTimeout(() => {
      const ctx = screen.getContext()
      ctx.fillStyle = 'hsl(180, 20%, 50%)'
      ctx.fillRect(0, 0, screen.getWidth(), screen.getHeight())

      if (attempts === null) {
        font.draw({ctx, position: {x: 10, y: 10}, text: 'treasure hunt'})
        font.draw({ctx, position: {x: 10, y: 50}, text: 'you fell down a hole you dug'})
        font.draw({ctx, position: {x: 10, y: 70}, text: 'game over'})
      } else {
        font.draw({ctx, position: {x: 10, y: 10}, text: 'treasure hunt'})
        font.draw({ctx, position: {x: 10, y: 50}, text: 'well done you found it'})
        font.draw({ctx, position: {x: 10, y: 70}, text: `you dug ${attempts} holes`})
      }
    }, 0)
  }
})

const update = updateFactory(state)
const render = renderFactory(state)

game = loop({update, render})

const renderStartScreen = () => {
  const ctx = screen.getContext()
  ctx.imageSmoothingEnabled = false

  ctx.fillStyle = 'hsl(180, 20%, 50%)'
  ctx.fillRect(0, 0, screen.getWidth(), screen.getHeight())

  font.draw({ctx, position: {x: 10, y: 10}, text: 'treasure hunt'})
  font.draw({ctx, position: {x: 10, y: 50}, text: 'use the arrow keys to move and z to dig'})
  font.draw({ctx, position: {x: 10, y: 70}, text: 'red icons indicate you are getting closer'})
  font.draw({ctx, position: {x: 10, y: 90}, text: 'blue icons indicate you are further away'})
  font.draw({ctx, position: {x: 10, y: 130}, text: 'press any key to begin'})

  let pressAnyKeyListener

  pressAnyKeyListener = () => {
    window.document.removeEventListener('keydown', pressAnyKeyListener)
    game.start()
  }

  window.document.addEventListener('keydown', pressAnyKeyListener)
}

const isLoadComplete = () => {
  const itemsLoaded = assets.filter(asset => asset.loaded).length
  const totalItems = assets.length
  if (itemsLoaded === totalItems) {
    renderStartScreen()
  }
}

assets.forEach(asset => {
  asset.el.src = asset.src
  asset.el.onload = () => {
    asset.loaded = true
    isLoadComplete()
  }
})
