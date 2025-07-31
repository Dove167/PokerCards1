# Lesson 10 — 10 of Spades
Card: 10 of Spades
Topic: Array Processing
Concept: Array.map()
Lesson Path: deckofcards/10-ten-spades.md

Summary
Array.map creates a new array by applying a transformation function to each element of the input. It is non-mutating and ideal for pure, element-wise transformations.

Annotated Snippet
```js
const input = [1, 2, 3];
const doubled = input.map(n => n * 2); // [2, 4, 6]

// with index and array args
const labeled = input.map((n, i, arr) => `#${i}/${arr.length}: ${n}`);
```

Why it works
- map iterates left-to-right and calls your mapper once per element.
- It returns a new array, keeping the original array unchanged (immutability-friendly).
- Pairs well with functional programming patterns and method chaining.

Pitfalls
- Do not use map for side effects; use forEach instead. Keep mapper pure.
- Sparse arrays: map skips holes but preserves them in the result.
- Heavy synchronous work in mapper blocks the event loop; consider chunking for large arrays.

Practice Tasks
1) Convert an array of user objects into an array of full names using map.
2) Chain map and filter to transform then prune elements (e.g., square numbers then keep evens).
3) Refactor a for loop that builds a new array into a map call.

Links
- MDN: Array.prototype.map()
- Functional patterns with map/filter/reduce