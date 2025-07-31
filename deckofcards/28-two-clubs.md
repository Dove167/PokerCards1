# Lesson 28 — 2 of Clubs
Card: 2 of Clubs
Topic: File System
Concept: fs.existsSync / statSync
Lesson Path: deckofcards/28-two-clubs.md

Summary
Use fs.existsSync to check path existence and fs.statSync to inspect metadata (file vs directory, size, timestamps). Synchronous variants are fine for scripts and small CLIs.

Annotated Snippet
```js
import fs from 'fs';
import path from 'path';

const p = path.join('data', 'input.txt');

if (fs.existsSync(p)) {
  const s = fs.statSync(p);
  console.log('exists:', p);
  console.log('isFile:', s.isFile());
  console.log('isDirectory:', s.isDirectory());
  console.log('size(bytes):', s.size);
  console.log('modified:', s.mtime);
} else {
  console.log('missing:', p);
}
```

Why it works
- existsSync returns true/false without throwing for missing paths.
- statSync returns an fs.Stats object with methods to characterize the path.
- Synchronous I/O blocks the event loop; acceptable in scripts or setup code.

Pitfalls
- TOCTOU (time-of-check to time-of-use): path can change between existsSync and later operations; prefer trying the operation and handling errors in robust apps.
- For servers or hot paths, use async fs.promises.stat to avoid blocking.
- Symbolic links: use lstatSync to get info about the link itself rather than its target.

Practice Tasks
1) Write a CLI that takes a path and prints whether it is a file or directory, along with size and modified time.
2) Handle missing path gracefully with a friendly message and exit code 1.
3) Extend the CLI to accept multiple paths and tabulate their stats.

Links
- Node.js: fs.existsSync (caveats)
- Node.js: fs.statSync and fs.lstatSync