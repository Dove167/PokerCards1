# Lesson 35 — 9 of Clubs
Card: 9 of Clubs
Topic: Promise Chains
Concept: Return vs Missing Return
Lesson Path: deckofcards/35-nine-clubs.md

Summary
In promise chains, returning a value or promise from a then() handler passes it to the next step. Forgetting return breaks sequencing: the next then receives undefined and won’t wait for your async work.

Annotated Snippet
```js
// BAD: missing return — next then runs with undefined and too early
fetch('/api/user')
  .then(r => r.json())             // returns a promise (OK)
  .then(user => {
    doSideEffect(user);            // starts async work but does NOT return it
    asyncThing(user);              // starts async work but no return
  })
  .then(result => {
    console.log('result:', result); // result is undefined and may run early
  });

// GOOD: return to chain values or promises
fetch('/api/user')
  .then(r => r.json())
  .then(user => {
    return asyncThing(user);       // return promise so chain waits
  })
  .then(result => {
    console.log('result:', result); // gets asyncThing result at the right time
  })
  .catch(err => console.error('fail:', err));
```

Why it works
- then(onFulfilled) creates a new promise whose value is whatever onFulfilled returns.
- If you return a promise, the chain waits for it to settle; if you return a value, it’s wrapped in a resolved promise.
- Omitting return makes the next handler see undefined and proceed immediately.

Pitfalls
- Mixing side effects and returns: always return when sequencing depends on the async result.
- Early catch can swallow errors; ensure error handling is placed at the chain boundary.
- Nested thens without returning reintroduce callback-pyramid behavior.

Practice Tasks
1) Fix a chain that logs before data is ready by returning the inner fetch/promisified call.
2) Demonstrate the difference by timing: missing return vs correct return with console.time.
3) Refactor nested thens into flat returns so each step cleanly passes its result down the chain.

Links
- MDN: Promise.prototype.then()
- Sequencing promises correctly