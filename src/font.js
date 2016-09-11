export default ({fontImage, width = 5, height = 7}) => {
  const drawLetter = (letter) => {
    switch (letter) {
      case 'a': return 0
      case 'b': return 5
      case 'c': return 10
      case 'd': return 15
      case 'e': return 20
      case 'f': return 25
      case 'g': return 30
      case 'h': return 35
      case 'i': return 40
      case 'j': return 45
      case 'k': return 50
      case 'l': return 55
      case 'm': return 60
      case 'n': return 65
      case 'o': return 70
      case 'p': return 75
      case 'q': return 80
      case 'r': return 85
      case 's': return 90
      case 't': return 95
      case 'u': return 100
      case 'v': return 105
      case 'w': return 110
      case 'x': return 115
      case 'y': return 120
      case 'z': return 125
      case '0': return 130
      case '1': return 135
      case '2': return 140
      case '3': return 145
      case '4': return 150
      case '5': return 155
      case '6': return 160
      case '7': return 165
      case '8': return 170
      case '9': return 175
      default: return null
    }
  }

  const draw = ({ctx, position, text}) => {
    let offset = 0

    text
      .toLowerCase()
      .split('')
      .forEach(letter => {
        const letterPosition = drawLetter(letter)
        if (letterPosition !== null) {
          ctx.drawImage(
            fontImage,
            letterPosition, 0, width, height,
            position.x + offset, position.y, width * 2, height * 2
          )
        }

        offset += 12
      })
  }

  return {
    draw
  }
}
