# Lesson 48 — 9 of Diamonds
Card: 9 of Diamonds
Topic: Promise Utilities
Concept: Promise.withResolvers (polyfill idea)
Lesson Path: deckofcards/48-nine-diamonds.md

Summary
Promise.withResolvers is a proposed utility that returns a promise alongside its resolve and reject functions—useful when bridging callback/event code to a promise without constructing it externally. We can polyfill the pattern today.

Annotated Snippet
```js
// Polyfill-style helper for current runtimes
function withResolvers() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// Usage with an event-style API
import { EventEmitter } from 'events';
const bus = new EventEmitter();

function waitFor(eventName, ms = 5000) {
  const { promise, resolve, reject } = withResolvers();
  const timer = setTimeout(() => {
    bus.off(eventName, onHit);
    reject(new Error(`Timeout waiting for "${eventName}"`));
  }, ms);
  function onHit(payload) {
    clearTimeout(timer);
    resolve(payload);
  }
  bus.once(eventName, onHit);
  return promise;
}

// Somewhere else:
setTimeout(() => bus.emit('ready', { ok: true }), 100); // fire event
const data = await waitFor('ready'); // resolves with { ok: true }
```

Why it works
- The helper captures resolve/reject closures from a new Promise executor and exposes them.
- This allows external signaling (events, callbacks) to fulfill or reject the promise.
- It’s a clean bridge for code that can’t easily return a promise directly.

Pitfalls
- Resolve/reject escaping the constructor risks multiple invocations—ensure your external triggers are controlled (use once or guard).
- Avoid long-lived unresolved promises; add timeouts/cancellation to prevent leaks.
- If the platform eventually ships Promise.withResolvers natively, prefer the built-in for clarity and spec alignment.

Practice Tasks
1) Implement withResolvers and use it to wrap an XMLHttpRequest (or any callback API) into a promise with timeout.
2) Build a queue where producers get back { promise, resolve } and consumers resolve when done; handle cancellation.
3) Compare ergonomics of withResolvers vs new Promise with external variables; measure readability and error handling.

Links
- TC39 proposal discussions (Promise helpers)
- MDN: Promise constructor
- EventEmitter/DOM events bridging patterns