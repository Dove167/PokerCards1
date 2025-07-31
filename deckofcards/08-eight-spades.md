# Lesson 08 — 8 of Spades
Card: 8 of Spades
Topic: Promise Utilities
Concept: Promise.all()
Lesson Path: deckofcards/08-eight-spades.md

Summary
Promise.all waits for all input promises to fulfill and resolves to an array of their values. If any promise rejects, the whole Promise.all rejects immediately with that reason.

Annotated Snippet
```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = fetch('https://example.com/data.json').then(r => r.json());

const all = Promise.all([p1, p2, p3]);
//              resolves to [1, 2, {/*parsed json*/}] or rejects if any fail
all.then(values => console.log(values))
   .catch(err => console.error('At least one failed:', err));
```

Why it works
- Promise.all aggregates multiple promises into a single coordination point.
- Fulfillment value preserves order by input index, not completion timing.
- Short-circuits on the first rejection to avoid unnecessary work downstream.

Pitfalls
- One failure rejects the entire aggregation; consider allSettled if you need per-result status.
- If any promise never settles, Promise.all never settles.
- Large arrays of concurrent tasks can overload resources; add concurrency control.

Practice Tasks
1) Fetch three URLs concurrently with Promise.all and log their JSON responses as an array.
2) Make one promise reject; observe Promise.all rejection behavior and handle it with catch().
3) Implement a simple concurrency limiter that batches tasks and uses Promise.all per batch.

Links
- MDN: Promise.all()
- Concurrency patterns with Promise.all