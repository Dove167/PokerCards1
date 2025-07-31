# Lesson 31 — 5 of Clubs
Card: 5 of Clubs
Topic: Callbacks
Concept: Callback to Promise (Promisify)
Lesson Path: deckofcards/31-five-clubs.md

Summary
Promisifying converts Node-style error-first callbacks into Promises, enabling .then/.catch and async/await. This modernizes legacy APIs and simplifies composition.

Annotated Snippet
```js
// Manual promisify
function readFileP(fs, path, enc = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, enc, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Usage
import fs from 'fs';
readFileP(fs, 'a.txt')
  .then(console.log)
  .catch(console.error);
```

Why it works
- Promises represent eventual results; resolving/rejecting mirrors callback success/failure.
- Once promisified, APIs compose with Promise utilities and async/await naturally.

Pitfalls
- Ensure callbacks are called at most once; multiple calls can break Promise semantics.
- Preserve this binding when promisifying methods (e.g., fs.readFile is fine; some libs require .bind).
- Avoid promisifying hot paths if a native Promise-based API exists (e.g., fs.promises).

Practice Tasks
1) Promisify fs.writeFile to create writeFileP and write a small text file.
2) Implement a generic promisify(fn) for Node-style (err, ...results) callbacks.
3) Compare your manual promisify with util.promisify and note differences with multi-arg results.

Links
- Node.js: util.promisify
- MDN: Promises