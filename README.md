# `sodium-up`

[![Build Status](https://travis-ci.org/emilbayes/sodium-up.svg?branch=master)](https://travis-ci.org/emilbayes/sodium-up)

> Convenience wrapper around `sodium-universal`

## Usage

```js
var sodium = require('sodium-up')

var random = sodium.randombytes_buf(Buffer.allocUnsafe(16))
```

## API

**WIP**

See [`sodium-native`](https://github.com/mafintosh/sodium-native) for complete documentation.

### `sodium.randombytes_*`

#### `var output = sodium.randombytes_buf(output)`
`output` can either be a Buffer or integer length. Will return `output`

### `sodium.crypto_sign_*`

**Constants**:

- `sodium.crypto_sign_SEEDBYTES`
- `sodium.crypto_sign_PUBLICKEYBYTES`
- `sodium.crypto_sign_SECRETKEYBYTES`
- `sodium.crypto_sign_BYTES`

#### `var {publicKey, secretKey} = crypto_sign_seed_keypair([publicKey, secretKey], seed)`
`publicKey` and `secretKey` are optional, but can be Buffer or integer length.
Defaults to Buffer of `sodium.crypto_sign_PUBLICKEYBYTES` and `sodium.crypto_sign_SECRETKEYBYTES` length.
Will return and object with `{publicKey, secretKey}`

#### `var {publicKey, secretKey} = crypto_sign_keypair([publicKey, secretKey])`
`publicKey` and `secretKey` are optional, but can be Buffer or integer length.
Defaults to Buffer of `sodium.crypto_sign_PUBLICKEYBYTES` and `sodium.crypto_sign_SECRETKEYBYTES` length.
Will return and object with `{publicKey, secretKey}`

#### `var signedMessage = crypto_sign([signedMessage], message, secretKey)`
`signedMessage` is optional, but can be Buffer or integer length. Defaults to Buffer of `sodium.crypto_sign_BYTES` length.
Will return `signedMessage`

#### `var boolOrBuf = crypto_sign_open([message], signedMessage, publicKey)`
`message` is optional, but can be Buffer or integer length. Defaults to Buffer of `signedMessage.length - sodium.crypto_sign_BYTES` length.
Will return `false` if the signature is invalid or `message` otherwise

#### `var signature = crypto_sign_detached([signature], message, secretKey)`
`signature` is optional, but can be Buffer or integer length. Defaults to Buffer of `sodium.crypto_sign_BYTES` length.
Will return `signature`

#### `var bool = crypto_sign_verify_detached(signature, message, publicKey)`
Alias to [`sodium-native#crypto_sign_verify_detached`](https://github.com/sodium-friends/sodium-native#var-bool--crypto_sign_verify_detachedsignature-message-publickey)


### `sodium.crypto_generichash_*`

**Constants**:

- `sodium.crypto_generichash_PRIMITIVE`
- `sodium.crypto_generichash_BYTES_MIN`
- `sodium.crypto_generichash_BYTES_MAX`
- `sodium.crypto_generichash_BYTES`
- `sodium.crypto_generichash_KEYBYTES_MIN`
- `sodium.crypto_generichash_KEYBYTES_MAX`
- `sodium.crypto_generichash_KEYBYTES`

#### `var output = crypto_generichash([output], input, [key])`
`output` is optional, but can be Buffer or integer length. Defaults to Buffer of `sodium.crypto_generichash_BYTES` length. Will return `output`

Examples of input permutations:

```js
sodium.crypto_generichash(input)
sodium.crypto_generichash(input, key)
sodium.crypto_generichash(output, input, null)
sodium.crypto_generichash(null, input, key)
sodium.crypto_generichash(null, input, null)
```

#### `var instance = crypto_generichash_instance([key], [outputLength])`
[`sodium-native#crypto_generichash_instance`](https://github.com/mafintosh/sodium-native#var-instance--crypto_generichash_instancekey-outputlength) wrapped in an object so `.update()` and `.final()` can be overridden.

#### `var instance = instance.update(input)`
Will return `instance` for easy chaining

#### `var output = instance.final([output])`
`output` is optional, but can be Buffer of `outputLength` or longer. Defaults to Buffer of `outputLength` length. Will return `output`

### `sodium.crypto_pwhash_*`

**Constants**:

- `sodium.crypto_pwhash_ALG_DEFAULT`
- `sodium.crypto_pwhash_BYTES_MIN`
- `sodium.crypto_pwhash_BYTES_MAX`
- `sodium.crypto_pwhash_PASSWD_MIN`
- `sodium.crypto_pwhash_PASSWD_MAX`
- `sodium.crypto_pwhash_SALTBYTES`
- `sodium.crypto_pwhash_STRBYTES`
- `sodium.crypto_pwhash_STRPREFIX`
- `sodium.crypto_pwhash_OPSLIMIT_MIN`
- `sodium.crypto_pwhash_OPSLIMIT_MAX`
- `sodium.crypto_pwhash_MEMLIMIT_MIN`
- `sodium.crypto_pwhash_MEMLIMIT_MAX`
- `sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE`
- `sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE`
- `sodium.crypto_pwhash_OPSLIMIT_MODERATE`
- `sodium.crypto_pwhash_MEMLIMIT_MODERATE`
- `sodium.crypto_pwhash_OPSLIMIT_SENSITIVE`
- `sodium.crypto_pwhash_MEMLIMIT_SENSITIVE`
- `sodium.crypto_pwhash_PRIMITIVE`


#### `var output = sodium.crypto_pwhash([output], password, salt, opslimit, memlimit, algorithm)`
`output` can either be a Buffer or integer length. Will return `output`

#### `var output = sodium.crypto_pwhash_str([output], password, opslimit, memlimit)`
`output` is optional, but can be Buffer or integer length. Defaults to Buffer of `sodium.crypto_pwhash_STRBYTES` length. Will return `output`

#### `var bool = sodium.crypto_pwhash_str_verify(str, password)`
Alias to [`sodium-native#crypto_pwhash_str_verify`](https://github.com/mafintosh/sodium-native#var-bool--crypto_pwhash_str_verifystr-password)

## Install

```sh
npm install sodium-up
```

## License

[ISC](LICENSE.md)
