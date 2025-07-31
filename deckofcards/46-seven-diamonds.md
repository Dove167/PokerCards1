# Lesson 46 — 7 of Diamonds
Card: 7 of Diamonds
Topic: Advanced Async
Concept: Concurrency Limits
Lesson Path: deckofcards/46-seven-diamonds.md

Summary
Running too many async tasks at once can saturate resources (CPU, network, DB). Apply a concurrency limit so only N tasks run simultaneously. This shapes load, improves stability, and maintains throughput.

Annotated Snippet
```js
// Minimal concurrency limiter
function limitConcurrency(limit) {
  let active = 0;
  const queue = [];
  const next = () => {
    if (active >= limit || queue.length === 0) return;
    active++;
    const { task, resolve, reject } = queue.shift();
    Promise.resolve()
      .then(task)
      .then((v) => resolve(v), (e) => reject(e))
      .finally(() => {
        active--;
        next();
      });
  };
  return function run(task) {
    return new Promise((resolve, reject) => {
      queue.push({ task, resolve, reject });
      next();
    });
  };
}

// Example: limit to 3 concurrent fetches
const run = limitConcurrency(3);
const urls = Array.from({ length: 10 }, (_, i) => `https://example.com/${i}`);

const jobs = urls.map((url) =>
  run(async () => {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.url;
  })
);

const results = await Promise.allSettled(jobs);
console.log(results.map(r => r.status));
```

Why it works
- The limiter only starts a new task when active < limit, pushing others into a queue.
- Each task’s completion triggers next() to start the next queued task—simple backpressure.
- Works with any promise-returning task; caller collects results externally.

Pitfalls
- If a task never settles, the queue stalls; add timeouts/abort signals.
- Starvation: FIFO queues can be unfair if long tasks dominate; consider priority queues.
- Global limiter vs per-domain limiter: choose the right scope for your resource constraints.

Practice Tasks
1) Add a timeout wrapper so tasks exceeding ms reject and free a slot; test behavior.
2) Extend the limiter to accept an AbortSignal and skip starting new tasks after abort.
3) Implement a poolSize() and queueSize() getter for monitoring, and log metrics periodically.

Links
- Backpressure and concurrency in async systems
- AbortController for cancellation
- Promise.allSettled for collecting outcomes