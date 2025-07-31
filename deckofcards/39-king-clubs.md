# Lesson 39 — King of Clubs
Card: King of Clubs
Topic: Callbacks
Concept: EventEmitter Style Callbacks
Lesson Path: deckofcards/39-king-clubs.md

Summary
EventEmitter enables pub/sub style async communication. Producers emit named events; consumers subscribe with on/once to receive data. This decouples producers from multiple listeners and supports many-to-many signaling.

Annotated Snippet
```js
import { EventEmitter } from 'events';

const bus = new EventEmitter();

// subscribe
bus.on('msg', (data) => {
  console.log('listener A:', data);
});

bus.once('msg', (data) => {
  console.log('listener B (once):', data);
});

// emit
bus.emit('msg', { id: 1, text: 'hello' });
bus.emit('msg', { id: 2, text: 'world' });

// remove
function handler(data) { console.log('C:', data); }
bus.on('msg', handler);
bus.off('msg', handler); // or removeListener
```

Why it works
- Listeners are callback functions stored per event name; emit synchronously invokes them in order of subscription.
- once auto-unsubscribes after the first invocation—useful for one-shot signals.
- Decoupled architecture: producers need not know how many consumers exist.

Pitfalls
- Memory leaks if listeners are never removed on long-lived emitters (watch for MaxListenersWarning).
- Synchronous emit means heavy listeners block the event loop; offload or keep handlers light.
- Error handling: consider an 'error' event; unhandled 'error' emits will throw.

Practice Tasks
1) Build a simple logger bus with events 'info', 'warn', and 'error'; attach and remove listeners dynamically.
2) Convert a callback-based API to emit 'start', 'progress', and 'done' events; write a consumer that aggregates progress.
3) Demonstrate once by waiting for a single 'connected' event and then auto-unsubscribing.

Links
- Node.js: events.EventEmitter
- Patterns: Pub/Sub, Observer