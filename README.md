# `sodium-up`

> Convenicence wrapper around `sodium-native`

## Usage

```js
var sodium = require('sodium-up')

var random = sodium.randombytes_buf(Buffer.allocUnsafe(16))
```

## API

**WIP**

See [`sodium-native`](https://github.com/mafintosh/sodium-native) for complete documentation.

### `var output = sodium.randombytes_buf(output)`
`output` can either be a Buffer or integer length. Will return `output`

## Install

```sh
npm install sodium-up
```

## License

[ISC](LICENSE.md)
