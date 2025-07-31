# Lesson 30 — 4 of Clubs
Card: 4 of Clubs
Topic: Advanced Async
Concept: AbortController with fetch
Lesson Path: deckofcards/30-four-clubs.md

Summary
AbortController lets you cancel in-flight fetch requests (and other abortable APIs). Pass controller.signal to fetch, and call controller.abort() to reject the request with an AbortError.

Annotated Snippet
```js
// Create controller + signal
const controller = new AbortController();
const { signal } = controller;

// Start a fetch with the signal
const p = fetch('https://example.com/slow', { signal })
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.text();
  });

// Cancel after 200ms
setTimeout(() => controller.abort(), 200);

p.then(console.log)
 .catch(err => {
   if (err.name === 'AbortError') {
     console.warn('Request aborted');
   } else {
     console.error('Fetch failed:', err);
   }
 });
```

Why it works
- fetch listens to the AbortSignal; when aborted, it rejects with AbortError.
- AbortController is composable: you can pass the same signal to multiple consumers to cancel a group of tasks.
- Timeouts and user navigation are common cancellation triggers.

Pitfalls
- Aborting does not roll back server-side work already started; it only stops client-side waiting/processing.
- Always handle AbortError distinctly to avoid treating it like a real failure.
- For Node.js versions before native fetch, use undici or node-fetch that also support AbortController.

Practice Tasks
1) Implement fetchWithTimeout(url, ms) that races fetch against a timer and aborts on timeout.
2) Create a grouped abort: fire three fetches with the same signal and abort all together.
3) Wire cancellation to user input: start a fetch, and if the user presses a key, abort it cleanly.

Links
- MDN: AbortController
- MDN: fetch with AbortSignal
- undici (Node fetch) documentation