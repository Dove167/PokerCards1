# Lesson 41 — 2 of Diamonds
Card: 2 of Diamonds
Topic: Basic Synchronous
Concept: Spread and Rest
Lesson Path: deckofcards/41-two-diamonds.md

Summary
Spread (...) expands an iterable or object into places that expect multiple elements or properties. Rest (...) collects remaining elements/properties into an array or object. Together they simplify copying, merging, and flexible function parameters.

Annotated Snippet
```js
// Array spread (copy/merge)
const arr = [1, 2, 3];
const next = [...arr, 4];           // [1,2,3,4] — non-mutating append
const merged = [...arr, ...next];   // [1,2,3,1,2,3,4]

// Object spread (shallow clone/update)
const user = { id: 1, name: 'Ada' };
const updated = { ...user, name: 'Grace' }; // user unchanged

// Rest in functions (variadic)
function sum(...xs) {
  return xs.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6

// Rest in destructuring (collect the rest)
const [first, ...restNums] = [10, 20, 30]; // first=10, restNums=[20,30]
const { name, ...others } = { name: 'Ada', role: 'admin', plan: 'pro' };
// name='Ada', others={ role:'admin', plan:'pro' }
```

Why it works
- Spread at call/array/object sites expands elements/props inline for construction or calls.
- Rest in parameters/destructuring captures remaining elements/props into a single binding.
- These are shallow by design—top-level references are copied, not deep-cloned.

Pitfalls
- Shallow copies: nested objects/arrays remain shared references.
- Order matters in object spread: later properties overwrite earlier ones.
- Rest in objects only grabs own enumerable properties; symbols and non-enumerables are excluded.

Practice Tasks
1) Write appendImmutable(arr, x) using spread to return a new array with x appended.
2) Merge default settings with user overrides via object spread, ensuring user overrides win.
3) Create a function headTail(...xs) that returns { head, tail } using rest in array destructuring.

Links
- MDN: Spread syntax (...)
- MDN: Rest parameters
- Shallow vs deep copy considerations