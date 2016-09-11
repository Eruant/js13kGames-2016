export default ({screen, camera, layers, map, player}) => {
  const screenContext = screen.getContext('2d')

  const drawLayer = ({canvas}) => {
    const viewBox = camera.currentView(camera.position, screen)

    screenContext.drawImage(
      canvas,
      viewBox.x,
      viewBox.y,
      viewBox.width,
      viewBox.height,
      0,
      0,
      screen.getWidth(),
      screen.getHeight()
    )
  }

  return () => {
    // - draw mobs layer to memory ---------------------------------------------
    const mobs = layers.mobs.mobs
    const mobCanvas = layers.mobs.canvas
    const mobContext = mobCanvas.getContext('2d')

    // clear previous position
    mobs.forEach(mob => {
      mobContext.clearRect(mob.previousPosition.x - 32, mob.previousPosition.y - 50, 64, 150)
    })

    mobs.forEach(mob => {
      const frame = Math.floor(mob.frame)

      if (mob.action) {
        mobContext.drawImage(
          mob.image,
          (frame * 8) + 144, 0, 8, 32,
          mob.position.x + 8, mob.position.y - 32, 16, 64
        )
        return
      }

      switch (mob.direction) {
        case 'NORTH':
          mobContext.drawImage(
            mob.image,
            (frame * 8) + 64, 0, 8, 32,
            mob.position.x + 8, mob.position.y - 32, 16, 64
          )
          break
        case 'SOUTH':
          mobContext.save()
          mobContext.translate(mob.position.x + 8, mob.position.y - 32)
          mobContext.drawImage(
            mob.image,
            (frame * 8) + 64, 0, 8, 32,
            0, 0, 16, 64
          )
          mobContext.restore()
          break
        case 'WEST':
        case 'NORTH-WEST':
        case 'SOUTH-WEST':
          mobContext.save()
          mobContext.translate(mob.position.x + 8 + 16, mob.position.y - 32)
          mobContext.scale(-1, 1)
          mobContext.drawImage(
            mob.image,
            (frame * 8), 0, 8, 32,
            0, 0, 16, 64
          )
          mobContext.restore()
          break
        case 'EAST':
        case 'NORTH-EAST':
        case 'SOUTH-EAST':
          mobContext.drawImage(
            mob.image,
            (frame * 8), 0, 8, 32,
            mob.position.x + 8, mob.position.y - 32, 16, 64
          )
          break
        default:
          mobContext.drawImage(
            mob.image,
            ((frame % 2) * 8) + 128, 0, 8, 32,
            mob.position.x + 8, mob.position.y - 32, 16, 64
          )
          break
      }
    })

    // - draw particles to memory ----------------------------------------------
    const particles = layers.particles.particles
    const particlesCanvas = layers.particles.canvas
    const particlesContext = particlesCanvas.getContext('2d')

    particlesCanvas.width = particlesCanvas.width
    particles.forEach(particle => {
      if (particle === null) {
        return
      }

      const size = particle.position.z * 0.1
      const halfSize = size * 0.5

      particlesContext.fillStyle = particle.color
      particlesContext.fillRect(
        particle.position.x - halfSize,
        particle.position.y - halfSize,
        size,
        size
      )
    })

    // - draw hud to memory ----------------------------------------------------
    const hudElements = layers.hud.elements
    const hudCanvas = layers.hud.canvas
    const hudContext = hudCanvas.getContext('2d')

    hudContext.clearRect(
      mobs[0].position.x - 100,
      mobs[0].position.y - 100,
      232,
      232
    )

    hudElements.forEach(element => {
      if (element === null) {
        return
      }

      const size = (100 - element.lifeRemaining) * 0.25 + 32
      const halfSize = size * 0.5
      const opacity = element.lifeRemaining * 0.01

      let strokeStyle = `hsla(0, 100%, 100%, ${opacity})`

      switch (element.type) {
        case 'status-warmer':
          strokeStyle = `hsla(0, 100%, 70%, ${opacity})`
          break
        case 'status-cooler':
          strokeStyle = `hsla(240, 100%, 70%, ${opacity})`
          break
        case 'status-found':
          strokeStyle = `hsla(60, 100%, 50%, ${opacity})`
          break
      }

      hudContext.strokeStyle = strokeStyle
      hudContext.lineWidth = 8
      hudContext.strokeRect(
          element.position.x + 16 - halfSize,
          element.position.y + 16 - halfSize,
          size,
          size
      )
    })

    // - draw to screen
    screenContext.drawImage(layers.underground.canvas, 0, 0)
    drawLayer(layers.surface)
    drawLayer(layers.mobs)
    drawLayer(layers.particles)
    drawLayer(layers.hud)
  }
}
