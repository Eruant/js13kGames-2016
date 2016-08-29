export default ({screen, camera, layers, io}) => {
  return () => {
    // - Player ----------------------------------------------------------------
    // const [player, ...mobs] = layers.mobs.mobs
    const [player] = layers.mobs.mobs

    const input = io.getInput()
    const speed = 2

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
        player.action.stepsToComplete--
      } else {
        // TODO complete a better dig action (possibly clear rect with layer below?)
        let backgroundContext = layers.background.canvas.getContext('2d')
        backgroundContext.fillStyle = '#000'
        backgroundContext.fillRect(player.position.x, player.position.y, 32, 32)
        player.action = null
      }
    }

    // - Camera ----------------------------------------------------------------#
    camera.speed.x = (player.position.x - camera.position.x) * 1
    camera.speed.y = (player.position.y - camera.position.y) * 1

    const nextCameraPosition = camera.move(camera.position, camera.speed)

    if (nextCameraPosition.x > layers.background.canvas.width - (screen.getWidth() * 0.5)) {
      camera.speed.x = 0
    } else if (nextCameraPosition.x < screen.getWidth() * 0.5) {
      camera.speed.x = 0
    }

    if (nextCameraPosition.y > layers.background.canvas.height - (screen.getHeight() * 0.5)) {
      camera.speed.y = 0
    } else if (nextCameraPosition.y < screen.getHeight() * 0.5) {
      camera.speed.y = 0
    }

    camera.position = camera.move(camera.position, camera.speed)
  }
}
