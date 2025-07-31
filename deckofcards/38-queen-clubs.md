# Lesson 38 — Queen of Clubs
Card: Queen of Clubs
Topic: Advanced Async
Concept: Queueing and Backpressure (conceptual)
Lesson Path: deckofcards/38-queen-clubs.md

Summary
When many async tasks compete for limited resources, run them with a concurrency limit (a queue). Backpressure means slowing producers when consumers can’t keep up. Implementing a simple queue prevents spikes, timeouts, and memory bloat.

Annotated Snippet
```js
// Simple concurrency-limited queue
function createQueue(limit = 5) {
  const pending = [];
  let active = 0;

  async function run(task) {
    active++;
    try {
      return await task();
    } finally {
      active--;
      if (pending.length) {
        const next = pending.shift();
        next();
      }
    }
  }

  return function enqueue(task) {
    return new Promise((resolve, reject) => {
      const exec = () => run(task).then(resolve, reject);
      if (active < limit) exec();
      else pending.push(exec);
    });
  };
}

// Example: limit fetches to 3 concurrent
const limit3 = createQueue(3);
const urls = Array.from({ length: 10 }, (_, i) => `https://example.com/${i}`);

const tasks = urls.map(url => limit3(async () => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.url;
}));

const results = await Promise.allSettled(tasks);
console.log(results.map(r => r.status));
```

Why it works
- The queue tracks how many tasks are active and defers new tasks via pending.
- Each task signals completion (finally) to start the next queued one.
- This shapes load and avoids resource saturation (bandwidth, CPU, DB connections).

Pitfalls
- Starvation can happen if long tasks dominate; consider fair ordering or priority queues.
- If tasks never resolve/reject, the queue stalls; add timeouts/abort signals.
- Results need collection outside the queue (e.g., Promise.allSettled over enqueued tasks).

Practice Tasks
1) Implement createQueue with a configurable highWaterMark and expose queue size metrics.
2) Add cancellation: accept an AbortSignal and stop queued tasks from starting after abort.
3) Build a downloader that limits concurrent downloads to 4 and retries each task once on failure.

Links
- Backpressure concepts (streams and queues)
- Task concurrency patterns in JS
- AbortController for cancellation