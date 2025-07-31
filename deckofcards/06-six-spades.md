# Lesson 06 — 6 of Spades
Card: 6 of Spades
Topic: Advanced Async
Concept: async/await Basics
Lesson Path: deckofcards/06-six-spades.md

Summary
async/await makes promise-based code read like synchronous code. async functions return promises; await pauses within the function until the awaited promise settles (without blocking the event loop).

Annotated Snippet
```js
// returns a Promise that fulfills with 42
async function f() {
  // await unwraps the fulfillment value of the promise
  const v = await Promise.resolve(42);
  return v; // implicitly wrapped: Promise.resolve(42)
}

f().then(console.log).catch(console.error); // 42
```

Why it works
- async marks a function so its return value is wrapped in a Promise.
- await schedules continuation in a microtask when the awaited promise settles.
- throw inside async becomes a rejected Promise, caught via try/catch or .catch().

Pitfalls
- await only inside async functions (top-level await in modules is allowed but context-dependent).
- Serial awaits can be slow; use Promise.all for parallel work when tasks are independent.
- Missing try/catch around awaited code can cause unhandled rejections.

Practice Tasks
1) Write an async function that fetches JSON from two URLs in parallel with Promise.all and returns a combined object.
2) Convert a .then() chain to async/await with proper try/catch and a finally for cleanup.
3) Demonstrate the difference between serial awaits vs Promise.all with timing logs.

Links
- MDN: async function
- MDN: await
- MDN: Promise.all