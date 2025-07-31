# Lesson 42 — 3 of Diamonds
Card: 3 of Diamonds
Topic: Array Processing
Concept: Array.flat / flatMap
Lesson Path: deckofcards/42-three-diamonds.md

Summary
flat flattens nested arrays up to a given depth into a new array. flatMap maps each item and flattens one level in a single pass—useful for expanding zero/one/many outputs per input.

Annotated Snippet
```js
// Flatten one level
const nested = [[1], [2, 3], [], [4]];
const flat1 = nested.flat();              // [1, 2, 3, 4]

// Flatten deeper
const deep = [1, [2, [3, [4]]]];
const flat2 = deep.flat(2);               // [1, 2, 3, [4]]
const flatAll = deep.flat(Infinity);      // [1, 2, 3, 4]

// flatMap: map, then flatten one level
const words = ['hi', 'js'];
const chars = words.flatMap(w => w.split('')); // ['h','i','j','s']

// flatMap can also filter by returning []
const nums = [1, 2, 3, 4];
const evensDoubled = nums.flatMap(n => n % 2 ? [] : [n * 2]); // [4, 8]
```

Why it works
- flat concatenates inner arrays into a new array up to the specified depth, preserving order.
- flatMap applies a mapping function and flattens one level—more efficient than map(...).flat(1).
- Returning empty arrays in flatMap conveniently removes elements.

Pitfalls
- flat is shallow to the provided depth; objects are still shared references.
- Overuse of Infinity depth on large nested structures may be costly; pick a minimal depth.
- flatMap only flattens one level; for deeper expansion, combine with flat or yield arrays-of-arrays appropriately.

Practice Tasks
1) Normalize API responses that sometimes return items or arrays of items: map to arrays and flat to a single list.
2) Use flatMap to tokenize an array of sentences into words, filtering out empty tokens.
3) Compare performance/readability of map(...).flat() vs flatMap on a moderate dataset.

Links
- MDN: Array.prototype.flat()
- MDN: Array.prototype.flatMap()