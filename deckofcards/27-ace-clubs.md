# Lesson 27 — Ace of Clubs
Card: Ace of Clubs
Topic: Promise Chains
Concept: Error Propagation in Chains
Lesson Path: deckofcards/27-ace-clubs.md

Summary
Errors in promise chains propagate down to the nearest catch(). A throw inside then() or a returned rejected promise both skip subsequent thens until a catch handles the error.

Annotated Snippet
```js
function step1() { return Promise.resolve(2); }
function step2(x) { return x * 3; }                 // sync transform
function step3(x) { throw new Error('boom at step3'); }

step1()
  .then(step2)                 // 2 -> 6
  .then(step3)                 // throws -> rejection
  .then(v => console.log('NEVER runs with', v)) // skipped
  .catch(err => {
    console.error('Caught:', err.message); // "boom at step3"
    return 0;                               // recover with a default
  })
  .then(v => console.log('Recovered value:', v)); // 0
```

Why it works
- then-handlers run in microtasks; a thrown error is converted into a rejected promise.
- The chain skips to the nearest catch where the error can be handled.
- Returning a value from catch transforms the chain back into fulfilled state.

Pitfalls
- Missing return in then: subsequent steps may receive undefined or not wait on async work.
- Catch at the wrong level can mask errors; place catch near the boundary where you can act.
- Throwing in catch without a subsequent catch leads to unhandled rejections.

Practice Tasks
1) Build a 3-step chain; make the second step return Promise.reject(...) and verify catch handles it.
2) In catch, rethrow a wrapped error and add a second catch to handle/report it separately.
3) Compare throwing vs returning Promise.reject in then; show identical propagation.

Links
- MDN: Using Promises — error handling
- MDN: Promise.prototype.catch