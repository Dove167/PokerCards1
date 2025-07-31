# Lesson 47 — 8 of Diamonds
Card: 8 of Diamonds
Topic: Callbacks
Concept: Callback Hell and Refactor
Lesson Path: deckofcards/47-eight-diamonds.md

Summary
“Callback hell” is deeply nested callbacks that hurt readability, error handling, and control flow. Refactor by naming functions, flattening with promises, or rewriting with async/await.

Annotated Snippet
```js
// Callback hell (hard to read, error handling scattered)
doA((err, a) => {
  if (err) return handle(err);
  doB(a, (err, b) => {
    if (err) return handle(err);
    doC(b, (err, c) => {
      if (err) return handle(err);
      doD(c, (err, d) => {
        if (err) return handle(err);
        console.log('done:', d);
      });
    });
  });
});

// 1) Named callbacks (still callbacks, but flatter)
function onA(err, a) {
  if (err) return handle(err);
  doB(a, onB);
}
function onB(err, b) {
  if (err) return handle(err);
  doC(b, onC);
}
function onC(err, c) {
  if (err) return handle(err);
  doD(c, onD);
}
function onD(err, d) {
  if (err) return handle(err);
  console.log('done:', d);
}
doA(onA);

// 2) Promises (linear flow, centralized catch)
promA()
  .then(a => promB(a))
  .then(b => promC(b))
  .then(c => promD(c))
  .then(d => console.log('done:', d))
  .catch(handle);

// 3) async/await (most readable for sequential deps)
try {
  const a = await promA();
  const b = await promB(a);
  const c = await promC(b);
  const d = await promD(c);
  console.log('done:', d);
} catch (err) {
  handle(err);
}
```

Why it works
- Naming handlers reduces nesting and improves reuse.
- Promises/async-await convert nested continuation-passing into linear flow with centralized error handling.
- Each step clearly returns or awaits the next computation, preserving sequence.

Pitfalls
- Mixing callbacks and promises can confuse flow; convert boundaries cleanly (promisify).
- Forgetting to return a promise in then chains breaks sequencing.
- In async/await, missing try/catch leads to unhandled rejections; scope your error handling properly.

Practice Tasks
1) Take a 4-step callback sequence and refactor to named callbacks; then to a Promise chain; then to async/await.
2) Build a small promisify helper and apply it to a Node-style callback API to enable async/await refactor.
3) Add retry logic to the second step and ensure errors still propagate correctly in all three styles.

Links
- MDN: Promises
- MDN: async/await
- Node.js: util.promisify