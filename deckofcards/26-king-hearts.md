# Lesson 26 — King of Hearts
Card: King of Hearts
Topic: Array Processing
Concept: Array.reduce()
Lesson Path: deckofcards/26-king-hearts.md

Summary
reduce accumulates array values into a single result using a reducer function and an initial accumulator. It generalizes many patterns: sums, grouping, mapping to objects, and more.

Annotated Snippet
```js
// sum numbers
const nums = [1, 2, 3];
const sum = nums.reduce((acc, n) => acc + n, 0); // 6

// index by id (array -> object)
const users = [{id: 1, name: 'Ada'}, {id: 2, name: 'Linus'}];
const byId = users.reduce((acc, u) => {
  acc[u.id] = u;
  return acc;
}, {});

// group by role
const people = [
  {name: 'A', role: 'admin'},
  {name: 'B', role: 'user'},
  {name: 'C', role: 'admin'},
];
const grouped = people.reduce((acc, p) => {
  (acc[p.role] ??= []).push(p);
  return acc;
}, {});
```

Why it works
- reduce iterates left-to-right, passing the accumulator and current item to your reducer.
- The returned accumulator becomes the input to the next iteration, enabling custom aggregation.
- With an explicit initial value, reduce works on empty arrays without throwing.

Pitfalls
- Omitting the initial value causes reduce to use the first element as the initial accumulator; this throws on empty arrays and can complicate types.
- Reducers that mutate shared objects/arrays can introduce hidden side effects—prefer immutable updates unless performance requires mutation.
- Complex reducers can hurt readability; consider composing map/filter first, then reduce.

Practice Tasks
1) Compute min, max, and average of an array using a single reduce pass.
2) Transform an array of records into a Map keyed by a field; compare to object indexing.
3) Implement a compose(...fns) using reduceRight that composes functions right-to-left.

Links
- MDN: Array.prototype.reduce()
- reduce vs map/filter pipelines
- Functional reduce patterns