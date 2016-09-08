export default ({type, speed = 4, position, lifeRemaining = 100}) => {
  // TODO create animation to show hot / cold / found
  //
  // e.g.
  //         ---    |
  //    -   |   |   |
  //   | |  |   |   |
  //    -   |   |   |
  //         ---    |

  const cycle = (element) => {
    let newElement = null

    const {cycle, type, speed, position, lifeRemaining} = element

    if (lifeRemaining - speed > 0) {
      newElement = {
        cycle,
        type,
        speed,
        position,
        lifeRemaining: lifeRemaining - speed
      }
    }

    return newElement
  }

  return Object.create({
    cycle,
    type,
    speed,
    position,
    lifeRemaining: lifeRemaining
  })
}
