# Lesson 05 — 5 of Spades
Card: 5 of Spades
Topic: Functional Programming
Concept: Pure Functions
Lesson Path: deckofcards/05-five-spades.md

Summary
A pure function’s output depends only on its inputs and it causes no side effects. This makes behavior predictable, testable, and easy to compose.

Annotated Snippet
```js
// pure
const add = (a, b) => a + b;

// impure (side effects)
let total = 0;
function addToTotal(x) { total += x; } // mutates external state
```

Pitfalls
- Mutating arguments or external state makes a function impure.
- Date.now(), Math.random(), I/O calls introduce non-determinism.
- Deep mutations may be subtle (nested objects/arrays).

Practice Tasks
1) Refactor a function that modifies a global variable into a pure function returning a value.
2) Given an object-based transformation, return a new object without mutating the original.
3) Write tests asserting the same inputs always yield the same outputs.

Links
- FP Basics: Purity and Referential Transparency