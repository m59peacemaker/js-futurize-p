# futurize-p

Turns a function that returns a promise into a function that returns a future.

## install

```sh
npm install futurize-p
```

## example

```js
const {Future} = require('ramda-fantasy')
const futurize = require('futurize-p')(Future) // pass in an implementation of Future

const incrementLater = (ms, n) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(n + 1)
  }, ms)
})

const futureIncrement = futurize(incrementLater)
futureIncrement(500, 7).fork(
  console.error,
  console.log //=> 8
)
```
