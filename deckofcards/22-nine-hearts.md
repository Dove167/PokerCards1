# Lesson 22 — 9 of Hearts
Card: 9 of Hearts
Topic: Advanced Async
Concept: Parallel vs Sequential await
Lesson Path: deckofcards/22-nine-hearts.md

Summary
Independent async tasks should run in parallel (e.g., with Promise.all) to reduce total time. Sequential awaits are simpler but slower when tasks don’t depend on each other.

Annotated Snippet
```js
// Sequential (slower when tasks are independent)
async function seq(a, b) {
  const va = await a();           // waits for a
  const vb = await b();           // waits for b after a
  return [va, vb];
}

// Parallel (faster: start both, then await together)
async function par(a, b) {
  const pa = a();                 // start a (promise)
  const pb = b();                 // start b (promise)
  const [va, vb] = await Promise.all([pa, pb]);
  return [va, vb];
}

// Demo with timers
const wait = ms => new Promise(res => setTimeout(res, ms, ms));
(async () => {
  console.time('seq');
  await seq(() => wait(300), () => wait(400)); // ≈700ms
  console.timeEnd('seq');

  console.time('par');
  await par(() => wait(300), () => wait(400)); // ≈400ms
  console.timeEnd('par');
})();
```

Why it works
- Starting tasks first (without awaiting) lets them progress concurrently.
- Promise.all awaits all inputs and resolves when all have fulfilled.
- For dependent tasks, sequential awaits are necessary to preserve order and use previous results.

Pitfalls
- Parallelizing tasks that compete for scarce resources can degrade performance; add concurrency limits.
- If any promise rejects, Promise.all rejects; use allSettled to collect all outcomes.
- Don’t parallelize when later steps depend on earlier results.

Practice Tasks
1) Refactor two independent fetches to run in parallel with Promise.all and measure time saved.
2) Add a third independent task and compare total durations for seq vs par.
3) Introduce one rejection and replace Promise.all with Promise.allSettled to gather all results and errors.

Links
- MDN: Promise.all
- Concurrency patterns and limits
- MDN: Promise.allSettled