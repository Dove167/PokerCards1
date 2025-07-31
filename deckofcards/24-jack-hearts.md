# Lesson 24 — Jack of Hearts
Card: Jack of Hearts
Topic: Promise Utilities
Concept: Promise.allSettled()
Lesson Path: deckofcards/24-jack-hearts.md

Summary
Promise.allSettled waits for all input promises to settle and returns an array of result objects with status ("fulfilled" or "rejected") and corresponding value or reason. Use it when you need a full report regardless of failures.

Annotated Snippet
```js
const tasks = [
  fetch('/a').then(r => r.json()),
  fetch('/b').then(r => r.json()),
  Promise.reject(new Error('synthetic failure'))
];

const results = await Promise.allSettled(tasks);
/*
results looks like:
[
  { status: 'fulfilled', value: {...} },
  { status: 'fulfilled', value: {...} },
  { status: 'rejected', reason: Error('synthetic failure') }
]
*/

// handle per-result
for (const r of results) {
  if (r.status === 'fulfilled') {
    console.log('OK:', r.value);
  } else {
    console.warn('FAIL:', r.reason);
  }
}
```

Why it works
- Unlike Promise.all, allSettled never rejects; it aggregates outcomes.
- Enables reporting and partial success handling without try/catch around each task.

Pitfalls
- It won’t throw on failures; you must inspect statuses or you might miss errors.
- Still runs all tasks to completion; avoid for unbounded or very expensive failing operations.
- If you actually need the first failure to abort, use Promise.all instead.

Practice Tasks
1) Run three fetches with allSettled; count successes vs failures and log a summary line.
2) Transform allSettled results into { ok: [...values], errors: [...reasons] }.
3) Mix fast successes with an intentionally slow failure; verify allSettled waits for all.

Links
- MDN: Promise.allSettled()
- Error aggregation patterns