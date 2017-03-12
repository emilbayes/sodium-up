# `sodium-up`

[![Build Status](https://travis-ci.org/emilbayes/sodium-up.svg?branch=master)](https://travis-ci.org/emilbayes/sodium-up)

> Convenience wrapper around `sodium-native`

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

### `sodium.crypto_pwhash_*`

**Constants**:

- `sodium.crypto_pwhash_ALG_ARGON2I13`
- `sodium.crypto_pwhash_SALTBYTES`
- `sodium.crypto_pwhash_STRBYTES`
- `sodium.crypto_pwhash_STRPREFIX`
- `sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE`
- `sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE`
- `sodium.crypto_pwhash_OPSLIMIT_MODERATE`
- `sodium.crypto_pwhash_MEMLIMIT_MODERATE`
- `sodium.crypto_pwhash_OPSLIMIT_SENSITIVE`
- `sodium.crypto_pwhash_MEMLIMIT_SENSITIVE`
- `sodium.crypto_pwhash_PRIMITIVE`


#### `var output = sodium.crypto_pwhash(output, password, salt, opslimit, memlimit, algorithm)`
`output` can either be a Buffer or integer length. Will return `output`

#### `var output = sodium.crypto_pwhash_str([output,] password, opslimit, memlimit)`
`output` is optional, but can be Buffer or integer length. Defaults to Buffer of `sodium.crypto_pwhash_STRBYTES` length. Will return `output`

#### `var bool = sodium.crypto_pwhash_str_verify(str, password)`
Alias to [`sodium-native#crypto_pwhash_str_verify`](https://github.com/mafintosh/sodium-native#var-bool--crypto_pwhash_str_verifystr-password)

## Install

```sh
npm install sodium-up
```

## License

[ISC](LICENSE.md)
