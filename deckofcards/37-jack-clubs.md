# Lesson 37 — Jack of Clubs
Card: Jack of Clubs
Topic: Functional Programming
Concept: Composition
Lesson Path: deckofcards/37-jack-clubs.md

Summary
Function composition combines small functions into a pipeline where the output of one becomes the input of the next. compose applies right-to-left; pipe applies left-to-right. Composition favors small, pure, reusable units.

Annotated Snippet
```js
// Right-to-left composition
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// Left-to-right pipeline
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Small pure helpers
const trim = s => s.trim();
const toUpper = s => s.toUpperCase();
const exclaim = s => s + '!';

// Build flows
const shout = compose(exclaim, toUpper, trim); // trim -> upper -> exclaim
const shoutL = pipe(trim, toUpper, exclaim);   // same, left-to-right

console.log(shout('  hello '));  // "HELLO!"
console.log(shoutL('  hello ')); // "HELLO!"
```

Why it works
- compose/pipe collapse multiple unary functions into one by folding (reduce/right).
- Keeping helpers pure and single-purpose makes flows predictable and testable.
- Direction choice is stylistic; pipe often reads like natural left-to-right data flow.

Pitfalls
- Non-unary functions need adaptation (e.g., fix arity with currying/partial application).
- Mixing side effects in the middle of the pipeline makes behavior brittle.
- Deep pipelines can be hard to debug; test parts and add trace/log HOFs when needed.

Practice Tasks
1) Implement mapArray = f => arr => arr.map(f) and build a pipeline that trims, uppercases, and exclaims each string in an array.
2) Compose a sanitize pipeline for user input: trim → remove multiple spaces → toLowerCase.
3) Add a withTrace(label) HOF that logs intermediate values in a pipe/compose without mutating data.

Links
- Functional composition patterns
- Ramda: compose/pipe
- Point-free style trade-offs