# Lesson 21 — 8 of Hearts
Card: 8 of Hearts
Topic: Functional Programming
Concept: Higher-Order Functions
Lesson Path: deckofcards/21-eight-hearts.md

Summary
A higher-order function (HOF) is any function that takes a function as an argument or returns a function. HOFs enable reuse, customization, and composition of behavior.

Annotated Snippet
```js
// takes a function (fn) and returns a new function
const withLog = fn => (...args) => {
  console.log('calling with', args);
  const result = fn(...args);
  console.log('result', result);
  return result;
};

const add = (a, b) => a + b;
const loggedAdd = withLog(add);

loggedAdd(2, 3); // logs args and result
```

Why it works
- Functions are first-class values in JS; they can be passed around like data.
- Wrapping a function lets you add cross-cutting concerns (logging, timing, caching) without changing the original.

Pitfalls
- Wrappers can hide function names/length; preserve metadata if needed (e.g., Object.defineProperty).
- Beware of this binding; arrow functions don’t bind their own this.
- Multiple wrappers can add overhead; measure if on hot paths.

Practice Tasks
1) Implement a withTiming(fn) HOF that logs duration of the call.
2) Implement a once(fn) HOF that ensures a function runs only once, returning the cached result thereafter.
3) Implement a memoize(fn) HOF for pure functions and test speedups on expensive computations.

Links
- MDN: First-class functions
- HOF patterns: once, throttle, debounce, memoize