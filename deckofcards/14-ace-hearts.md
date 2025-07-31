# Lesson 14 — Ace of Hearts
Card: Ace of Hearts
Topic: Advanced Async
Concept: Try/Catch with async/await
Lesson Path: deckofcards/14-ace-hearts.md

Summary
Handle asynchronous failures with try/catch inside async functions. Awaited calls that reject throw exceptions you can catch. Use finally for cleanup that must always run.

Annotated Snippet
```js
async function loadUser(id) {
  try {
    const r = await fetch(`/api/users/${id}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const user = await r.json();
    return user;
  } catch (err) {
    // handles network errors and thrown errors above
    console.error('loadUser failed:', err);
    // decide: rethrow or return fallback
    throw err; // or: return { id, name: 'Unknown' };
  } finally {
    console.log('loadUser finished (success or fail)');
  }
}

loadUser(7).then(console.log).catch(() => {});
```

Why it works
- await unwraps the fulfillment value or throws on rejection.
- try/catch in async functions behaves like sync try/catch but for awaited promises too.
- finally always runs, regardless of success or failure, ideal for releasing resources.

Pitfalls
- Swallowing errors: catching without rethrowing can hide failures—return a typed result or rethrow when appropriate.
- Overusing try/catch around large blocks reduces clarity—wrap only where failures must be handled.
- Mixing then/catch and try/catch in the same flow can be confusing; prefer one style.

Practice Tasks
1) Wrap two awaited fetches in a single try/catch; in finally, log elapsed time.
2) Implement a fetchJson(url) helper with retries and error wrapping.
3) Refactor a .then/.catch chain into async/await with focused try/catch blocks.

Links
- MDN: async/await
- MDN: try...catch
- Error handling strategies in async code