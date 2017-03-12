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
