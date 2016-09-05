export default ({type, speed, lifetime = 100}) => {
  // TODO create animation to show hot / cold / found
  //
  // e.g.
  //         ---    |
  //    -   |   |   |
  //   | |  |   |   |
  //    -   |   |   |
  //         ---    |
  //
  return Object.create({
    type,
    speed,
    lifeRemaining: lifetime
  })
}
