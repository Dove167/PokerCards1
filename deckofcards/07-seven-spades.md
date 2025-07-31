# Lesson 07 — 7 of Spades
Card: 7 of Spades
Topic: Callbacks
Concept: Callback Pattern
Lesson Path: deckofcards/07-seven-spades.md

Summary
A callback is a function passed as an argument to be invoked later. In Node-style APIs, callbacks usually receive (error, result). Callbacks enable async flows but can become hard to manage at scale, which promises and async/await address.

Annotated Snippet
```js
function doWork(cb) {
  setTimeout(() => cb(null, 'ok'), 100); // Node style: (err, value)
}

doWork((err, value) => {
  if (err) return console.error('Error:', err);
  console.log('Result:', value);
});
```

Why it works
- setTimeout defers execution; the callback runs later on the timer queue.
- Passing a function decouples producer (doWork) from consumer (the handler).

Pitfalls
- Callback hell: deep nesting when chaining multiple async steps.
- Error handling inconsistencies if not using the (err, result) convention.
- Multiple invocations or missing invocation can cause subtle bugs.

Practice Tasks
1) Wrap two setTimeout calls that depend on each other using callbacks; then refactor to avoid pyramid nesting by naming functions.
2) Implement a Node-style callback API that returns (err, data) and test error paths.
3) Convert a small callback-based function into a Promise-based version to compare ergonomics.

Links
- Node.js: Asynchronous programming
- MDN: setTimeout