# Lesson 50 — Jack of Diamonds
Card: Jack of Diamonds
Topic: Array Processing
Concept: for...of and entries()
Lesson Path: deckofcards/50-jack-diamonds.md

Summary
for...of iterates values of an iterable (arrays, strings, Maps, Sets). entries() provides [index, value] pairs for arrays (or [key, value] for Maps). Together they give readable iteration with access to indexes when needed.

Annotated Snippet
```js
const arr = ['a', 'b', 'c'];

// Values
for (const v of arr) {
  console.log('val:', v);
}

// Index + value via entries()
for (const [i, v] of arr.entries()) {
  console.log(`#${i}:`, v);
}

// Map iteration (key,value)
const m = new Map([['x', 1], ['y', 2]]);
for (const [k, v] of m) { // m.entries() is default
  console.log(k, v);
}

// String iteration (code points)
for (const ch of 'hi') {
  console.log(ch);
}
```

Why it works
- Arrays, strings, Maps, Sets implement the iterable protocol, so for...of pulls values from their iterators.
- Array.prototype.entries() returns an iterator of [index, value] pairs; perfect when you need both.
- Cleaner and less error-prone than manual index loops for common cases.

Pitfalls
- for...of iterates values, not keys; use Object.keys/entries for plain objects or a Map for key/value data.
- Mutating an array while iterating can produce surprising results—avoid structural changes mid-iteration.
- For hot performance paths, traditional for loops can be faster; measure if it matters.

Practice Tasks
1) Iterate an array with for...of to log values; then repeat using arr.entries() to log index and value.
2) Convert a plain object to an array via Object.entries(obj) and iterate its [key, value] pairs.
3) Iterate a Set to build an array of unique, transformed values (e.g., uppercased strings).

Links
- MDN: for...of
- MDN: Array.prototype.entries()
- MDN: Iteration protocols