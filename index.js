function FuturizeP (Future) {
  return function futurizeP (fn) {
    return function futurized () {
      var args = arguments
      return new Future(function (reject, resolve) {
        fn.apply(undefined, args).then(resolve, reject)
      })
    }
  }
}

module.exports = FuturizeP
