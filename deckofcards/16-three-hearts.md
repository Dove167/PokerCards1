# Lesson 16 — 3 of Hearts
Card: 3 of Hearts
Topic: Promise Utilities
Concept: Promise.race()
Lesson Path: deckofcards/16-three-hearts.md

Summary
Promise.race settles as soon as the first input promise settles (fulfills or rejects). It’s useful for timeouts, fallbacks, or picking the fastest source.

Annotated Snippet
```js
// timeout helper
const timeout = ms => new Promise((_, rej) =>
  setTimeout(() => rej(new Error(`Timeout after ${ms}ms`)), ms)
);

// race a fetch against a timeout
const fast = Promise.race([
  fetch('https://example.com/data.json').then(r => r.json()),
  timeout(2000)
]);

fast
  .then(data => console.log('won:', data))
  .catch(err => console.error('race error:', err));
```

Why it works
- race returns a promise that mirrors the first settled input promise.
- Enables time-bound operations and fallback strategies.

Pitfalls
- The “losing” promises keep running; if they’re expensive, add abort/cancellation.
- If the first settled promise rejects, the race rejects even if others would succeed later.
- Be careful not to swallow real errors behind too-aggressive timeouts.

Practice Tasks
1) Implement a fetchWithTimeout(url, ms) using Promise.race plus AbortController to cancel on timeout.
2) Race two mirrors of the same request via different CDNs and pick the winner.
3) Build a fallback strategy: race primary API with backup API and use whichever returns first.

Links
- MDN: Promise.race()
- AbortController with fetch