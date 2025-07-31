# Lesson 32 — 6 of Clubs
Card: 6 of Clubs
Topic: Promise Utilities
Concept: Promise.any()
Lesson Path: deckofcards/32-six-clubs.md

Summary
Promise.any resolves with the first fulfilled promise among the inputs. If all promises reject, it rejects with an AggregateError containing all reasons. Use it to pick the first successful result from multiple sources.

Annotated Snippet
```js
const mirrors = [
  fetch('https://cdn1.example.com/data.json').then(r => r.json()),
  fetch('https://cdn2.example.com/data.json').then(r => r.json()),
  fetch('https://cdn3.example.com/data.json').then(r => r.json())
];

try {
  const fastestOk = await Promise.any(mirrors);
  console.log('won:', fastestOk);
} catch (err) {
  if (err instanceof AggregateError) {
    console.error('All failed:', err.errors); // array of reasons
  } else {
    console.error('Unexpected error:', err);
  }
}
```

Why it works
- any ignores rejections until a fulfillment appears; then it resolves immediately with that value.
- When every input rejects, it fails once with AggregateError for comprehensive diagnostics.

Pitfalls
- Not supported in very old runtimes; ensure Node/browser support or provide a polyfill.
- If all inputs reject quickly, the single rejection is AggregateError—handle accordingly.
- Beware side effects of losing/promises; they continue running even after a winner resolves.

Practice Tasks
1) Race three mirrors of a resource with Promise.any; log the winner’s URL and response size.
2) Force all failures and print out each reason from AggregateError.errors.
3) Combine with AbortController: when one fulfills, abort the remaining fetches to save bandwidth.

Links
- MDN: Promise.any()
- AggregateError details
- Cancellation patterns with AbortController