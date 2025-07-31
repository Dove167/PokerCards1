# Lesson 15 — 2 of Hearts
Card: 2 of Hearts
Topic: Callbacks
Concept: Node-style Error-first Callback
Lesson Path: deckofcards/15-two-hearts.md

Summary
In Node.js, many legacy APIs use the (err, result) callback convention. On success, err is null and result holds the value; on failure, err is an Error and result is undefined. This pattern standardizes async error handling.

Annotated Snippet
```js
import fs from 'fs';

// Signature: (err, data)
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('read failed:', err); // err is an Error object
    return;
  }
  console.log('file contents:', data);
});
```

Why it works
- Asynchronous operations complete later; the callback runs when I/O is done.
- A single convention (err-first) keeps error handling consistent across APIs.

Pitfalls
- Forgetting the early return on error causes code to run with undefined data.
- Throwing inside callbacks won’t be caught by surrounding try/catch unless the try wraps the callback invocation context.
- Hard to compose/chain compared to Promises; promisify when possible.

Practice Tasks
1) Wrap fs.readFile in your own function readText(file, cb) using the (err, data) signature; test both success and error paths.
2) Convert a simple err-first callback API to a Promise-based version with new Promise((res, rej) => …).
3) Chain two callbacks (read A then read B) and then refactor to a Promise chain.

Links
- Node.js Callback conventions
- util.promisify in Node.js