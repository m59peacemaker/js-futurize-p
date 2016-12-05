const test = require('tape')
const {Future} = require('ramda-fantasy')
const futurize = require('../')(Future)

const wait = (fail) => new Promise((resolve, reject) => {
  setTimeout(fail ? reject : resolve, 50)
})

test('returns a future', t => {
  t.plan(1)
  t.equal(futurize(wait)().constructor.name, 'Future')
})

test('fork works on resolve', t => {
  t.plan(1)
  futurize(wait)().fork(t.fail, t.pass)
})

test('fork works on reject', t => {
  t.plan(1)
  futurize(wait)(true).fork(t.pass, t.fail)
})

test('fn is not executed until fork()', t => {
  t.plan(2)
  let called = false
  const fn = () => new Promise(resolve => {
    called = true
    resolve()
  })
  const future = futurize(fn)()
  t.false(called)
  future.fork(t.fail, () => t.true(called))
})

test('promise reject err is passed to fork reject', t => {
  t.plan(1)
  const fn = () => new Promise((resolve, reject) => {
    reject('nope')
  })
  futurize(fn)().fork(err => t.equal(err, 'nope'), t.fail)
})

test('promise resolve value is passed to fork resolve', t => {
  t.plan(1)
  const fn = () => new Promise((resolve, reject) => {
    resolve('yep')
  })
  futurize(fn)().fork(t.fail, v => t.equal(v, 'yep'))
})

test('args are passed through', t => {
  t.plan(1)
  const fn = (...args) => new Promise((resolve, reject) => {
    t.deepEqual(args, ['d', 'e', 'f'])
    resolve()
  })
  futurize(fn)('d', 'e', 'f').fork(t.fail, () => {})
})
