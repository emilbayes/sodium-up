'use strict'
var sodium = require('sodium-universal')

// randombytes

// randombytes_buf(output)
exports.randombytes_buf = function (output) {
  // Implicit output is either a Buffer or a Number, or we let it fail in sodium
  if (Number.isSafeInteger(output)) {
    output = Buffer.allocUnsafe(output)
  }

  sodium.randombytes_buf(output)

  return output
}

// crypto_sign

exports.crypto_sign_SEEDBYTES = sodium.crypto_sign_SEEDBYTES
exports.crypto_sign_PUBLICKEYBYTES = sodium.crypto_sign_PUBLICKEYBYTES
exports.crypto_sign_SECRETKEYBYTES = sodium.crypto_sign_SECRETKEYBYTES
exports.crypto_sign_BYTES = sodium.crypto_sign_BYTES

// var {publicKey, secretKey} = crypto_sign_seed_keypair([publicKey, secretKey], seed)
exports.crypto_sign_seed_keypair = function (publicKey, secretKey, seed) {
  if (publicKey != null && secretKey == null && seed == null) {
    seed = publicKey
    publicKey = null
  }

  if (publicKey == null) publicKey = Buffer.allocUnsafe(sodium.crypto_sign_PUBLICKEYBYTES)
  else if (Number.isSafeInteger(publicKey)) publicKey = Buffer.alloc(publicKey)
  if (secretKey == null) secretKey = Buffer.allocUnsafe(sodium.crypto_sign_SECRETKEYBYTES)
  else if (Number.isSafeInteger(secretKey)) secretKey = Buffer.alloc(secretKey)


  sodium.crypto_sign_seed_keypair(publicKey, secretKey, seed)

  return {publicKey: publicKey, secretKey: secretKey}
}

// var {publicKey, secretKey} = crypto_sign_keypair([publicKey, secretKey])
exports.crypto_sign_keypair = function (publicKey, secretKey) {
  if (publicKey == null) publicKey = Buffer.allocUnsafe(sodium.crypto_sign_PUBLICKEYBYTES)
  else if (Number.isSafeInteger(publicKey)) publicKey = Buffer.alloc(publicKey)
  if (secretKey == null) secretKey = Buffer.allocUnsafe(sodium.crypto_sign_SECRETKEYBYTES)
  else if (Number.isSafeInteger(secretKey)) secretKey = Buffer.alloc(secretKey)


  sodium.crypto_sign_keypair(publicKey, secretKey)

  return {publicKey: publicKey, secretKey: secretKey}
}

// var signedMessage = crypto_sign([signedMessage], message, secretKey)
exports.crypto_sign = function (signedMessage, message, secretKey) {
  if (signedMessage != null && message != null && secretKey == null) {
    secretKey = message
    message = signedMessage
    signedMessage = null
  }

  if (signedMessage == null) signedMessage = Buffer.allocUnsafe(message.length + sodium.crypto_sign_BYTES)
  else if (Number.isSafeInteger(signedMessage)) signedMessage = Buffer.alloc(signedMessage)

  sodium.crypto_sign(signedMessage, message, secretKey)

  return signedMessage
}

// var boolOrBuf = crypto_sign_open([message], signedMessage, publicKey)
exports.crypto_sign_open = function (message, signedMessage, publicKey) {
  if (message != null && signedMessage != null && publicKey == null) {
    publicKey = signedMessage
    signedMessage = message
    message = null
  }

  if (message == null) message = Buffer.allocUnsafe(signedMessage.length - sodium.crypto_sign_BYTES)
  else if (Number.isSafeInteger(message)) message = Buffer.alloc(message)

  var res = sodium.crypto_sign_open(message, signedMessage, publicKey)

  if (res === false) return false
  return message
}

// var signature = crypto_sign_detached([signature], message, secretKey)
exports.crypto_sign_detached = function (signature, message, secretKey) {
  if (signature != null && message != null && secretKey == null) {
    secretKey = message
    message = signature
    signature = null
  }

  if (signature == null) signature = Buffer.allocUnsafe(sodium.crypto_sign_BYTES)
  else if (Number.isSafeInteger(signature)) signature = Buffer.alloc(signature)

  sodium.crypto_sign_detached(signature, message, secretKey)

  return signature
}

// var bool = crypto_sign_verify_detached(signature, message, publicKey)
exports.crypto_sign_verify_detached = sodium.crypto_sign_verify_detached

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
  if (output != null && input == null && key == null) {
    input = output
    output = null
  }

  if (output == null) output = Buffer.allocUnsafe(sodium.crypto_generichash_BYTES)
  else if (Number.isSafeInteger(output)) output = Buffer.alloc(output)

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
      if (output == null && outputLength == sodium.crypto_generichash_BYTES) output = Buffer.allocUnsafe(outputLength)
      else if (output == null && outputLength != sodium.crypto_generichash_BYTES) output = Buffer.alloc(outputLength)
      else if (Number.isSafeInteger(output)) output = Buffer.alloc(output)

      instance.final(output)

      return output
    }
  }
}

// pwhash

exports.crypto_pwhash_ALG_ARGON2I13 = sodium.crypto_pwhash_ALG_ARGON2I13 // Deprecated

exports.crypto_pwhash_ALG_DEFAULT = sodium.crypto_pwhash_ALG_DEFAULT
exports.crypto_pwhash_BYTES_MIN = sodium.crypto_pwhash_BYTES_MIN
exports.crypto_pwhash_BYTES_MAX = sodium.crypto_pwhash_BYTES_MAX
exports.crypto_pwhash_PASSWD_MIN = sodium.crypto_pwhash_PASSWD_MIN
exports.crypto_pwhash_PASSWD_MAX = sodium.crypto_pwhash_PASSWD_MAX
exports.crypto_pwhash_SALTBYTES = sodium.crypto_pwhash_SALTBYTES
exports.crypto_pwhash_STRBYTES = sodium.crypto_pwhash_STRBYTES
exports.crypto_pwhash_STRPREFIX = sodium.crypto_pwhash_STRPREFIX
exports.crypto_pwhash_OPSLIMIT_MIN = sodium.crypto_pwhash_OPSLIMIT_MIN
exports.crypto_pwhash_OPSLIMIT_MAX = sodium.crypto_pwhash_OPSLIMIT_MAX
exports.crypto_pwhash_MEMLIMIT_MIN = sodium.crypto_pwhash_MEMLIMIT_MIN
exports.crypto_pwhash_MEMLIMIT_MAX = sodium.crypto_pwhash_MEMLIMIT_MAX
exports.crypto_pwhash_OPSLIMIT_INTERACTIVE = sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE
exports.crypto_pwhash_MEMLIMIT_INTERACTIVE = sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
exports.crypto_pwhash_OPSLIMIT_MODERATE = sodium.crypto_pwhash_OPSLIMIT_MODERATE
exports.crypto_pwhash_MEMLIMIT_MODERATE = sodium.crypto_pwhash_MEMLIMIT_MODERATE
exports.crypto_pwhash_OPSLIMIT_SENSITIVE = sodium.crypto_pwhash_OPSLIMIT_SENSITIVE
exports.crypto_pwhash_MEMLIMIT_SENSITIVE = sodium.crypto_pwhash_MEMLIMIT_SENSITIVE
exports.crypto_pwhash_PRIMITIVE = sodium.crypto_pwhash_PRIMITIVE

// var output = crypto_pwhash([output], password, salt, opslimit, memlimit, algorithm)
exports.crypto_pwhash = function (output, password, salt, opslimit, memlimit, algorithm) {
  // Only optional argument is output, so all other arguments must be set
  if (algorithm == null) {
    return exports.crypto_pwhash(null, output, password, salt, opslimit, memlimit)
  }

  if (output == null) output = Buffer.allocUnsafe(32) // 32 is the number used by crypto_pwhash_str internally
  else if (Number.isSafeInteger(output)) output = Buffer.alloc(output)

  sodium.crypto_pwhash(output, password, salt, opslimit, memlimit, algorithm)

  return output
}

// var output = crypto_pwhash_str([output], password, opslimit, memlimit)
exports.crypto_pwhash_str = function (output, password, opslimit, memlimit) {
  if (memlimit == null) {
    return exports.crypto_pwhash_str(null, output, password, opslimit)
  }

  if (output == null) output = Buffer.allocUnsafe(sodium.crypto_pwhash_STRBYTES)
  else if (Number.isSafeInteger(output)) output = Buffer.alloc(output)

  sodium.crypto_pwhash_str(output, password, opslimit, memlimit)

  return output
}

// var bool = crypto_pwhash_str_verify(str, password)
exports.crypto_pwhash_str_verify = sodium.crypto_pwhash_str_verify
