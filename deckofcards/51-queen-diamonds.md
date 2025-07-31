# Lesson 51 — Queen of Diamonds
Card: Queen of Diamonds
Topic: Promise Chains
Concept: Microtask Timing
Lesson Path: deckofcards/51-queen-diamonds.md

Summary
Promise.then handlers run in the microtask queue, which runs after the current call stack and before the next macrotask (like setTimeout). Understanding this ordering helps explain why promise callbacks run “sooner” than timers.

Annotated Snippet
```js
console.log('A');

setTimeout(() => console.log('B: timeout 0'), 0);

Promise.resolve()
  .then(() => console.log('C: microtask 1'))
  .then(() => console.log('D: microtask 2'));

console.log('E');

// Typical ordering:
// A
// E
// C: microtask 1
// D: microtask 2
// B: timeout 0
```

Why it works
- JS runs the current call stack (synchronous code) first.
- After the stack empties, the engine flushes the microtask queue (promise reactions, queueMicrotask).
- Only then does it process the next macrotask (timers, I/O callbacks).

Pitfalls
- Promise-heavy code can starve timers if microtasks enqueue more microtasks in a loop.
- Don’t assume setTimeout(fn, 0) fires before .then; microtasks win.
- Cross-environment nuance exists, but microtask-before-macrotask holds across modern JS runtimes.

Practice Tasks
1) Add queueMicrotask(() => console.log('Q')) and observe its position relative to .then and setTimeout.
2) Build a small demo that chains 3 thens and schedules a setTimeout in the middle; explain the final ordering.
3) Use microtasks to batch updates: collect events into an array and flush them once per tick via queueMicrotask.

Links
- MDN: Microtask and macrotask queues
- MDN: queueMicrotask
- HTML/WHATWG event loop model overview