const fs = require('fs')
const stats = fs.statSync('archive.zip')
const sizeInBytes = stats.size
const sizeInKiloBytes = sizeInBytes / 1024
const maxSize = 1024 * 13
const isValidSize = () => sizeInBytes <= maxSize
const sizeToText = `(${sizeInKiloBytes.toFixed(2)} kb)`
const validMessage = `Archive is valid ${sizeToText}`
const invalidMessage = `Archive is over the limit ${sizeToText}`
const colorGreen = '\u001b[42m\u001b[90m'
const colorRed = '\u001b[41m\u001b[90m'
const colorStop = '\u001b[0m'
const message = (isValidSize ? colorGreen + validMessage : colorRed + invalidMessage) + colorStop
console.log(message)
