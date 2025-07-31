# Lesson 40 — Ace of Diamonds
Card: Ace of Diamonds
Topic: Promise Utilities
Concept: Settled vs Fulfilled (allSettled overview)
Lesson Path: deckofcards/40-ace-diamonds.md

Summary
A promise is fulfilled when it successfully produces a value; it is rejected when it fails with a reason. “Settled” means either fulfilled or rejected. Promise.allSettled reports the final state of each promise without short-circuiting on failures.

Annotated Snippet
```js
const tasks = [
  Promise.resolve(1),                 // fulfilled
  Promise.reject(new Error('boom')),  // rejected
  fetch('/data.json').then(r => r.json()) // eventually fulfilled or rejected
];

const results = await Promise.allSettled(tasks);

// Inspect outcomes
for (const r of results) {
  if (r.status === 'fulfilled') {
    console.log('value:', r.value);
  } else {
    console.warn('reason:', r.reason);
  }
}
```

Why it works
- Fulfilled promises produce a value; rejected promises produce a reason (usually Error).
- allSettled waits for every input to settle, returning a status/value|reason per item.
- This allows robust aggregation, reporting, and partial success handling.

Pitfalls
- Unlike Promise.all, allSettled never throws; you must explicitly check r.status to detect failures.
- If you actually need to fail fast, use Promise.all or add your own short-circuit logic.
- Results can be large arrays; filter/map results to what you need.

Practice Tasks
1) Convert a Promise.all-based batch to allSettled and produce a summary report {ok: number, fail: number}.
2) Filter allSettled results to only fulfilled values and continue processing them.
3) Wrap allSettled into a helper settle(promises) → { values, errors } for convenient downstream code.

Links
- MDN: Promise states (pending, fulfilled, rejected)
- MDN: Promise.allSettled()
- Error handling strategies in async workflows