export default () => {
  const canvas = window.document.querySelectorAll('canvas')[0]
  const ctx = canvas.getContext('2d')

  return Object.create({
    setSize: ({width, height}) => {
      canvas.width = width
      canvas.height = height
    },
    getWidth: () => canvas.width,
    getHeight: () => canvas.height,
    getContext: () => ctx
  })
}
