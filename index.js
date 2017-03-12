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

// crypto_generichash

exports.crypto_generichash_PRIMITIVE = sodium.crypto_generichash_PRIMITIVE
exports.crypto_generichash_BYTES_MIN = sodium.crypto_generichash_BYTES_MIN
exports.crypto_generichash_BYTES_MAX = sodium.crypto_generichash_BYTES_MAX
exports.crypto_generichash_BYTES = sodium.crypto_generichash_BYTES
exports.crypto_generichash_KEYBYTES_MIN = sodium.crypto_generichash_KEYBYTES_MIN
exports.crypto_generichash_KEYBYTES_MAX = sodium.crypto_generichash_KEYBYTES_MAX
exports.crypto_generichash_KEYBYTES = sodium.crypto_generichash_KEYBYTES

// var output = crypto_generichash([output], input, [key])
exports.crypto_generichash = function (output, input, key) {
  if (key == null && input == null) {
    input = output
    output = null
  }

  if (Number.isSafeInteger(output)) {
    output = Buffer.allocUnsafe(output)
  }
  if (output == null) {
    output = Buffer.allocUnsafe(sodium.crypto_generichash_BYTES)
  }

  sodium.crypto_generichash(output, input, key)

  return output
}

// var instance = crypto_generichash_instance([key], [outputLength])
// var instance = instance.update(input)
// var output = instance.final([output])
exports.crypto_generichash_instance = function (key, outputLength) {
  if (outputLength == null) { // needed for final to work correctly
    outputLength = sodium.crypto_generichash_BYTES
  }

  var instance = sodium.crypto_generichash_instance(key, outputLength)

  return {
    update: function (input) {
      instance.update(input)

      return this
    },
    final: function (output) {
      if (output == null) {
        output = Buffer.allocUnsafe(outputLength)
      }

      instance.final(output)

      return output
    }
  }
}

// pwhash

exports.crypto_pwhash_ALG_ARGON2I13 = sodium.crypto_pwhash_ALG_ARGON2I13
exports.crypto_pwhash_SALTBYTES = sodium.crypto_pwhash_SALTBYTES
exports.crypto_pwhash_STRBYTES = sodium.crypto_pwhash_STRBYTES
exports.crypto_pwhash_STRPREFIX = sodium.crypto_pwhash_STRPREFIX
exports.crypto_pwhash_OPSLIMIT_INTERACTIVE = sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE
exports.crypto_pwhash_MEMLIMIT_INTERACTIVE = sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
exports.crypto_pwhash_OPSLIMIT_MODERATE = sodium.crypto_pwhash_OPSLIMIT_MODERATE
exports.crypto_pwhash_MEMLIMIT_MODERATE = sodium.crypto_pwhash_MEMLIMIT_MODERATE
exports.crypto_pwhash_OPSLIMIT_SENSITIVE = sodium.crypto_pwhash_OPSLIMIT_SENSITIVE
exports.crypto_pwhash_MEMLIMIT_SENSITIVE = sodium.crypto_pwhash_MEMLIMIT_SENSITIVE
exports.crypto_pwhash_PRIMITIVE = sodium.crypto_pwhash_PRIMITIVE

// var output = crypto_pwhash(output, password, salt, opslimit, memlimit, algorithm)
exports.crypto_pwhash = function (output, password, salt, opslimit, memlimit, algorithm) {
  if (Number.isSafeInteger(output)) {
    output = Buffer.allocUnsafe(output)
  }

  sodium.crypto_pwhash(output, password, salt, opslimit, memlimit, algorithm)

  return output
}

// var output = crypto_pwhash_str([output,] password, opslimit, memlimit)
exports.crypto_pwhash_str = function (output, password, opslimit, memlimit) {
  if (memlimit == null) {
    return exports.crypto_pwhash_str(null, output, password, opslimit)
  }

  if (output == null) {
    output = exports.crypto_pwhash_STRBYTES
  }

  if (Number.isSafeInteger(output)) {
    output = Buffer.allocUnsafe(output)
  }

  sodium.crypto_pwhash_str(output, password, opslimit, memlimit)

  return output
}

// var bool = crypto_pwhash_str_verify(str, password)
exports.crypto_pwhash_str_verify = sodium.crypto_pwhash_str_verify
