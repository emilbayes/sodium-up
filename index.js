'use strict'
var sodium = require('sodium-native')

// randombytes

// randombytes_buf(output)
exports.randombytes_buf = function (output) {
  if (Number.isSafeInteger(output)) {
    output = Buffer.allocUnsafe(output)
  }

  sodium.randombytes_buf(output)

  return output
}
