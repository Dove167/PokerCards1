# Lesson 02 — 2 of Spades
Card: 2 of Spades
Topic: Array Processing
Concept: Create and Access Arrays
Lesson Path: lessons/02-two-spades.md

Summary
Arrays store ordered collections. Use [] to create, zero-based indices to access, and .length for size.

Annotated Snippet
```js
const arr = [1, 2, 3]; // literal array with three elements
console.log(arr[0]);   // access first element => 1
// common ops:
arr[3] = 4;            // extend by assignment
const n = arr.length;  // array size
```

Pitfalls
- Accessing out-of-range indices returns undefined (not an error).
- Sparse arrays (gaps in indices) can lead to unexpected iteration behavior.
- Mutating arrays directly (push/splice) can have side-effects; consider copies when needed.

Practice Tasks
1) Create an array of strings and log the first and last elements safely using length - 1.
2) Show the difference between reading an out-of-range index vs an in-range index.
3) Create a copy of an array using the spread operator and modify the copy only.

Links
- MDN: Array
- MDN: Array length