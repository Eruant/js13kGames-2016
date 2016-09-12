import particleFactory from './particle'
import hudFactory from './hud'

export default ({screen, camera, layers, io, endFunction, attempts, sfx}) => {
  return () => {
    // - Player ----------------------------------------------------------------
    // const [player, ...mobs] = layers.mobs.mobs
    const [player] = layers.mobs.mobs

    const input = io.getInput()
    const speed = 2

    player.frame += 0.2
    if (player.frame > 7) {
      player.frame = 0
    }

    // set speed.x if not in resting position
    if (player.targetPosition.x !== player.position.x) {
      player.speed.x = (player.targetPosition.x < player.position.x) ? -speed : speed
    } else {
      player.speed.x = 0
    }

    // set speed.y if not in resting position
    if (player.targetPosition.y !== player.position.y) {
      player.speed.y = (player.targetPosition.y < player.position.y) ? -speed : speed
    } else {
      player.speed.y = 0
    }

    if (player.speed.x === 0 && player.speed.y === 0) {
      player.direction = null
    }

    // if player not moving take an input
    if (
      player.speed.x === 0 &&
      player.speed.y === 0 &&
      (input.direction.x !== 0 || input.direction.y !== 0) &&
      player.action === null
    ) {
      player.targetPosition = player.setTargetPosition({
        currentPosition: player.position,
        direction: input.direction
      })

      if (input.direction.x > 0 && input.direction.y === 0) {
        player.direction = 'EAST'
      } else if (input.direction.x < 0 && input.direction.y === 0) {
        player.direction = 'WEST'
      } else if (input.direction.x === 0 && input.direction.y < 0) {
        player.direction = 'NORTH'
      } else if (input.direction.x === 0 && input.direction.y > 0) {
        player.direction = 'SOUTH'
      } else if (input.direction.x < 0 && input.direction.y < 0) {
        player.direction = 'NORTH-WEST'
      } else if (input.direction.x > 0 && input.direction.y < 0) {
        player.direction = 'NORTH-EAST'
      } else if (input.direction.x < 0 && input.direction.y > 0) {
        player.direction = 'SOUTH-WEST'
      } else if (input.direction.x > 0 && input.direction.y > 0) {
        player.direction = 'SOUTH-EAST'
      }

      sfx.walk()
    }

    // move the player
    player.previousPosition = Object.assign({}, player.position)
    player.position = player.move({
      currentPosition: player.position,
      speed: player.speed
    })

    // stop player moving off screen
    if (player.position.x < 0) {
      player.position.x = 0
      player.targetPosition.x = player.position.x
    } else if (player.position.x + 32 > layers.mobs.canvas.width) {
      player.position.x = layers.mobs.canvas.width - 32
      player.targetPosition.x = player.position.x
    }

    if (player.position.y < 0) {
      player.position.y = 0
      player.targetPosition.y = player.position.y
    } else if (player.position.y + 32 > layers.mobs.canvas.height) {
      player.position.y = layers.mobs.canvas.height - 32
      player.targetPosition.y = player.position.y
    }

    if (player.action === null && input.action) {
      player.action = player.setAction({type: 'DIG'})
    }

    if (player.action) {
      if (player.action.stepsToComplete > 0) {
        if (Math.random() > 0.6) {
          const particle = particleFactory({
            position: {
              x: player.position.x + 16,
              y: player.position.y + 16,
              z: 1
            },
            speed: {
              x: Math.random() * 10 - 5,
              y: Math.random() * 10 - 5,
              z: 50
            },
            color: `hsla(50, 100%, ${Math.floor(Math.random() * 100)}%, 0.8)`
          })
          for (let i = 0, len = 20; i < len; i++) {
            if (layers.particles.particles[i] === null) {
              layers.particles.particles[i] = particle
              break
            }
          }
        }
        player.action.stepsToComplete--
        sfx.dig()
      } else {
        attempts += 1
        const treasurePosition = layers.treasure.position
        const playerPositionX = Math.floor(player.position.x / 32)
        const playerPositionY = Math.floor(player.position.y / 32)
        const playerTileX = Math.abs(treasurePosition.x - playerPositionX)
        const playerTileY = Math.abs(treasurePosition.y - playerPositionY)
        const distanceAway = playerTileX + playerTileY

        const lastGuess = layers.treasure.lastGuess

        if (lastGuess !== null) {
          let hud

          if (lastGuess < distanceAway) {
            hud = hudFactory({
              type: 'status-cooler',
              position: {
                x: player.position.x,
                y: player.position.y
              }
            })
          } else if (lastGuess > distanceAway) {
            hud = hudFactory({
              type: 'status-warmer',
              position: {
                x: player.position.x,
                y: player.position.y
              }
            })
          } else if (distanceAway !== 0) {
            hud = hudFactory({
              type: 'status-same',
              position: {
                x: player.position.x,
                y: player.position.y
              }
            })
          }

          for (let i = 0, len = 20; i < len; i++) {
            if (layers.hud.elements[i] === null) {
              layers.hud.elements[i] = hud
              break
            }
          }
        }

        if (distanceAway === 0) {
          let hud = hudFactory({
            type: 'status-win',
            position: {
              x: player.position.x,
              y: player.position.y
            }
          })

          for (let i = 0, len = 20; i < len; i++) {
            if (layers.hud.elements[i] === null) {
              layers.hud.elements[i] = hud
              break
            }
          }

          endFunction(attempts)
        }

        layers.treasure.lastGuess = distanceAway
        let surfaceContext = layers.surface.canvas.getContext('2d')
        surfaceContext.clearRect(player.position.x, player.position.y, 32, 32)
        player.action = null
      }
    }

    // - Particles -------------------------------------------------------------#
    layers.particles.particles.forEach((particle, index) => {
      if (particle === null) {
        return
      }

      // calculate gravity
      // particle.speed = particle.gravity(particle.speed)
      particle.speed = {
        x: particle.speed.x * 0.8,
        y: particle.speed.y * 0.8,
        z: (particle.speed.z * 0.8) - 1
      }

      // calculate new position
      particle.position = particle.move({
        currentPosition: particle.position,
        speed: particle.speed
      })

      if (particle.position.z < 0) {
        layers.particles.particles[index] = null
      }
    })

    // - Hud -------------------------------------------------------------------#
    layers.hud.elements.forEach((element, index) => {
      if (element === null) {
        return
      }

      layers.hud.elements[index] = element.cycle(element)
    })

    // - Camera ----------------------------------------------------------------#
    camera.speed.x = (player.position.x - camera.position.x) * 1
    camera.speed.y = (player.position.y - camera.position.y) * 1

    const nextCameraPosition = camera.move(camera.position, camera.speed)

    if (nextCameraPosition.x > layers.surface.canvas.width - (screen.getWidth() * 0.5)) {
      camera.speed.x = 0
    } else if (nextCameraPosition.x < screen.getWidth() * 0.5) {
      camera.speed.x = 0
    }

    if (nextCameraPosition.y > layers.surface.canvas.height - (screen.getHeight() * 0.5)) {
      camera.speed.y = 0
    } else if (nextCameraPosition.y < screen.getHeight() * 0.5) {
      camera.speed.y = 0
    }

    camera.position = camera.move(camera.position, camera.speed)
  }
}
