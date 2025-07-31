# Lesson 03 — 3 of Spades
Card: 3 of Spades
Topic: Promise Chains
Concept: Basic Promise and then()
Lesson Path: lessons/03-three-spades.md

Summary
Promises represent eventual values. Use then() to transform or act on the fulfilled value. Each then() returns a new promise, enabling chains. Unhandled errors bubble down the chain to the nearest catch().

Annotated Snippet
```js
Promise.resolve(1)            // fulfilled promise with value 1
  .then(v => v + 1)           // transform: 1 -> 2 (returns a new promise)
  .then(v => console.log(v))  // logs 2
  .catch(err => console.error('Error:', err));
```

Why it works
- then(onFulfilled) schedules onFulfilled to run in a microtask when the promise is fulfilled.
- The return value of onFulfilled becomes the fulfillment value of the next promise in the chain.
- Throwing inside then() converts to a rejection, which is caught by a later catch().

Pitfalls
- Missing return in then(): If you start an async operation inside then() but forget to return its promise, the chain won't wait for it.
- Multiple chains from a single promise can cause repeated side-effects if each chain performs actions.
- Mixing sync throws and async rejections without a catch() leads to unhandledrejection warnings.

Practice Tasks
1) Build a chain: start with Promise.resolve(2), add 3 transforms that double the value, and log the final result (should be 16).
2) In the second then(), throw a new Error('boom') and ensure your catch() logs it without stopping the process.
3) Wrap setTimeout in a Promise and chain: resolve after 100ms with value 7, then add 5, then log 12.

Links
- MDN: Promise.then()
- MDN: Using Promises
- MDN: Microtask and macrotask queues