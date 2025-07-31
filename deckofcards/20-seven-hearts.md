# Lesson 20 — 7 of Hearts
Card: 7 of Hearts
Topic: File System
Concept: fs.promises.readFile()
Lesson Path: deckofcards/20-seven-hearts.md

Summary
fs.promises.readFile provides a Promise-based, non-blocking way to read files. It integrates naturally with async/await and scales better than synchronous I/O in concurrent applications.

Annotated Snippet
```js
import { promises as fs } from 'fs';

async function readText(path) {
  const text = await fs.readFile(path, 'utf8'); // resolves to string
  return text;
}

readText('a.txt')
  .then(console.log)
  .catch(err => console.error('read failed:', err));
```

Why it works
- The Promise-based API defers work to the libuv thread pool and resolves when the OS completes the read.
- Using 'utf8' decodes bytes to a JS string; omit for Buffer.

Pitfalls
- Uncaught rejections if you forget try/catch in async functions or .catch on the promise.
- Large reads can consume memory; for huge files, prefer streams.
- Paths relative to process.cwd(); ensure your working directory is correct or use absolute paths.

Practice Tasks
1) Write an async function readJson(file) that reads and parses JSON with proper try/catch and helpful error messages.
2) Compare throughput of reading several small files with Promise.all vs a for-await-of sequential loop.
3) Build a small CLI: node read.mjs path/to/file — it prints size, first 80 characters, and handles ENOENT gracefully.

Links
- Node.js: fs.promises API
- Streams vs buffered I/O in Node.js