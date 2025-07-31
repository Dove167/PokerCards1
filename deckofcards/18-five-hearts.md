# Lesson 18 — 5 of Hearts
Card: 5 of Hearts
Topic: Array Processing
Concept: Array.filter()
Lesson Path: deckofcards/18-five-hearts.md

Summary
Array.filter creates a new array containing only the elements for which the predicate returns true. It is non-mutating and ideal for selecting subsets of data.

Annotated Snippet
```js
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0); // [2, 4, 6]

// with index and array args
const bigIdx = nums.filter((n, i, arr) => i > arr.length / 2); // [4, 5, 6]
```

Why it works
- filter iterates left-to-right and applies your predicate to each element.
- When predicate returns a truthy value, the element is copied into a new array.
- Original array is unchanged (immutability-friendly), enabling safe pipelines with map/reduce.

Pitfalls
- Predicate must be pure and boolean-like; avoid side effects.
- Sparse arrays: holes are skipped but preserved as holes in the result if encountered.
- Beware performance when chaining heavy predicates on very large arrays; consider early-exit loops if required.

Practice Tasks
1) From an array of users, filter those with isActive === true and age ≥ 18.
2) Compose filter + map to first select even numbers, then square them.
3) Implement a reusable where(obj) predicate builder: filter(users, where({ role: 'admin' })).

Links
- MDN: Array.prototype.filter()
- Functional pipelines with map/filter/reduce