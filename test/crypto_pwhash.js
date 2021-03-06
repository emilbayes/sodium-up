var tape = require('tape')
var alloc = require('buffer-alloc')
var fill = require('buffer-fill')
var sodium = require('../')

tape('crypto_pwhash', function (t) {
  var output = alloc(32) // can be any size
  var passwd = new Buffer('Hej, Verden!')
  var salt = alloc(sodium.crypto_pwhash_SALTBYTES)
  var opslimit = sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE
  var memlimit = sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
  var algo = sodium.crypto_pwhash_ALG_ARGON2I13

  fill(salt, 'lo')

  sodium.crypto_pwhash(output, passwd, salt, opslimit, memlimit, algo)
  var output2 = sodium.crypto_pwhash(32, passwd, salt, opslimit, memlimit, algo)

  t.same(output.toString('hex'), '9dc3499e37e8177f5e5abdf0fa18bfb7b768970a5fd870e3c28af7a79d75c3c2', 'hashes password')
  t.ok(output.equals(output2), 'same result')

  salt[0] = 0
  sodium.crypto_pwhash(output, passwd, salt, opslimit, memlimit, algo)
  output2 = sodium.crypto_pwhash(alloc(32), passwd, salt, opslimit, memlimit, algo)

  t.same(output.toString('hex'), '0170a897e8952582fa29f7cdd58e791ddabf3f32ce0268fe9bd244bccee812a8', 'diff salt -> diff hash')
  t.ok(output.equals(output2), 'same result')

  t.end()
})

tape('crypto_pwhash_str', function (t) {
  var output = alloc(sodium.crypto_pwhash_STRBYTES)
  var passwd = new Buffer('Hej, Verden!')
  var opslimit = sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE
  var memlimit = sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE

  sodium.crypto_pwhash_str(output, passwd, opslimit, memlimit)
  var output2 = sodium.crypto_pwhash_str(passwd, opslimit, memlimit)
  var output2 = sodium.crypto_pwhash_str(sodium.crypto_pwhash_STRBYTES, passwd, opslimit, memlimit)
  var output3 = sodium.crypto_pwhash_str(alloc(sodium.crypto_pwhash_STRBYTES), passwd, opslimit, memlimit)


  t.notEqual(output, alloc(output.length), 'not blank')
  t.notOk(sodium.crypto_pwhash_str_verify(alloc(output.length), passwd), 'does not verify')
  t.ok(sodium.crypto_pwhash_str_verify(output, passwd), 'verifies')

  t.notEqual(output2, alloc(output2.length), 'not blank')
  t.notOk(sodium.crypto_pwhash_str_verify(alloc(output2.length), passwd), 'does not verify')
  t.ok(sodium.crypto_pwhash_str_verify(output2, passwd), 'verifies')

  t.notEqual(output3, alloc(output3.length), 'not blank')
  t.notOk(sodium.crypto_pwhash_str_verify(alloc(output3.length), passwd), 'does not verify')
  t.ok(sodium.crypto_pwhash_str_verify(output3, passwd), 'verifies')

  t.end()
})
