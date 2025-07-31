# Lesson 19 — 6 of Hearts
Card: 6 of Hearts
Topic: Promise Chains
Concept: finally()
Lesson Path: deckofcards/19-six-hearts.md

Summary
finally() registers a handler that runs after a promise settles (either fulfilled or rejected). It’s ideal for cleanup (closing resources, stopping timers) without affecting the promise’s eventual value or reason.

Annotated Snippet
```js
function doThing() {
  return fetch('/api/task')
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .finally(() => {
      console.log('Cleanup / metrics / stop spinner');
    });
}

doThing()
  .then(data => console.log('ok:', data))
  .catch(err => console.error('fail:', err));
```

Why it works
- finally runs after the preceding promise settles, regardless of outcome.
- The return value of finally’s handler is ignored; the chain continues with the original state (value or error).

Pitfalls
- Don’t rely on finally to transform values; use then/catch for that. finally is for side effects only.
- Throwing inside finally will override the original outcome with a new rejection.
- As with then/catch, missing returns in earlier steps may lead to unintended behavior; keep chains explicit.

Practice Tasks
1) Add a spinner before an async operation and stop it in a finally() handler, whether the operation succeeded or failed.
2) Measure elapsed time by capturing performance.now() before the operation and logging the duration in finally().
3) Demonstrate how throwing inside finally overrides success: add a throw new Error('override') and observe the result.

Links
- MDN: Promise.prototype.finally()
- Cleanup patterns with promises