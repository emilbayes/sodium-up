var tape = require('tape')
var sodium = require('../')
var alloc = require('buffer-alloc')

tape('randombytes_buf', function (t) {
  var buf = null

  buf = alloc(10)
  t.ok(sodium.randombytes_buf(buf).equals(buf))
  t.notEqual(buf, alloc(10), 'not blank')

  buf = alloc(1024)
  t.ok(sodium.randombytes_buf(buf).equals(buf))
  t.notEqual(buf, alloc(1024), 'large not blank')

  t.equal(sodium.randombytes_buf(1337).length, 1337, 'can do integer')

  t.end()
})
