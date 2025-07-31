# Lesson 11 — Jack of Spades
Card: Jack of Spades
Topic: Promise Chains
Concept: Chaining then() and catch()
Lesson Path: deckofcards/11-jack-spades.md

Summary
Chain then() to transform values step-by-step and attach a single catch() to handle any error from previous steps. finally() runs regardless of success or failure.

Annotated Snippet
```js
fetch(url)
  .then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  })
  .then(data => data.items)
  .then(items => console.log('Items:', items))
  .catch(err => {
    // Handles any error thrown above
    console.error('Request failed:', err);
  })
  .finally(() => console.log('Cleanup / done'));
```

Why it works
- Each then returns a new promise whose value is the return of the handler.
- A throw (or rejected promise) skips remaining thens until the nearest catch.
- finally runs after settle and passes through the prior state (value or error).

Pitfalls
- Forgetting return inside then leads to undefined in the next step.
- Mixing nested thens instead of returning can cause callback pyramid.
- Multiple catches can shadow errors; prefer one terminal catch unless needed.

Practice Tasks
1) Build a 3-step chain that parses JSON, picks a field, and logs it. Introduce an error at step 2 and confirm catch runs.
2) Refactor nested then calls into a flat chain by returning promises from each step.
3) Add a finally that logs elapsed time of the chain, success or fail.

Links
- MDN: Promise.prototype.then()
- MDN: Promise.prototype.catch()
- MDN: Promise.prototype.finally()