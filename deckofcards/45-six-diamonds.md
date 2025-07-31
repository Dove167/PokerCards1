# Lesson 45 — 6 of Diamonds
Card: 6 of Diamonds
Topic: Functional Programming
Concept: Point-free Style
Lesson Path: deckofcards/45-six-diamonds.md

Summary
Point-free (tacit) style defines functions without naming the data (“points”). Instead of (xs) => xs.map(f), you compose smaller functions and pass them to combinators. This emphasizes transformations over plumbing.

Annotated Snippet
```js
// Helpers
const map = f => xs => xs.map(f);
const filter = p => xs => xs.filter(p);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Verbose (points mentioned)
const doubleEvens1 = xs => xs.filter(n => n % 2 === 0).map(n => n * 2);

// Point-free (no xs “point” in the definition)
const isEven = n => n % 2 === 0;
const double = n => n * 2;
const doubleEvens = pipe(
  filter(isEven),
  map(double)
);

console.log(doubleEvens([1,2,3,4])); // [4, 8]
```

Why it works
- You build reusable small functions (isEven, double) and wire them with combinators (map, filter, pipe).
- Composition captures the “what” (transformations) rather than the “how” (parameter plumbing).

Pitfalls
- Can reduce readability if overused or when helpers are too abstract.
- Non-unary functions often need currying/partial application to fit pipelines.
- Debugging deeply composed pipelines benefits from trace helpers.

Practice Tasks
1) Implement map, filter, and reduce combinators and use pipe to build a sanitizeNumbers pipeline (filter finite, map Math.abs).
2) Convert a points-heavy function to point-free using map/filter/pipe and small reusable helpers.
3) Add a withTrace(label) combinator that logs intermediate values in a pipeline without mutating them.

Links
- Functional programming: point-free style
- Composition and combinators in JS