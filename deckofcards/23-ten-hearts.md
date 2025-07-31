# Lesson 23 — 10 of Hearts
Card: 10 of Hearts
Topic: Callbacks
Concept: setTimeout / setInterval
Lesson Path: deckofcards/23-ten-hearts.md

Summary
setTimeout schedules a one-off callback after a delay; setInterval schedules a repeating callback. They are foundational async timers in JS. Always clear timers you no longer need.

Annotated Snippet
```js
// one-off after 1s
const timeoutId = setTimeout(() => {
  console.log('one second passed');
}, 1000);

// repeating every 1s
const intervalId = setInterval(() => {
  console.log('tick');
}, 1000);

// cancel timers
clearTimeout(timeoutId);
clearInterval(intervalId);
```

Why it works
- Timers queue callbacks to run later on the event loop, after the specified delay.
- setTimeout queues once; setInterval re-queues repeatedly until cleared.
- Timers don’t guarantee exact timing—other work can delay callbacks.

Pitfalls
- Forgetting to clearInterval can leak work and CPU.
- Long-running callbacks can cause overlaps in intervals; prefer setTimeout loops for precise control.
- setTimeout(fn, 0) still runs “later” (after current call stack and microtasks).

Practice Tasks
1) Implement a countdown that prints 5..1 each second, then “Go!”, using setInterval and clearInterval.
2) Re-implement the countdown with a recursive setTimeout pattern (schedule next tick at the end).
3) Measure drift: schedule an interval at 100ms and log actual delta times; discuss why drift occurs.

Links
- MDN: setTimeout
- MDN: setInterval
- Event loop timing and drift