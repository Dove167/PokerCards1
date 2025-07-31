# Lesson 44 — 5 of Diamonds
Card: 5 of Diamonds
Topic: File System
Concept: fs.mkdir / rm (recursive)
Lesson Path: deckofcards/44-five-diamonds.md

Summary
Create and remove directories programmatically. fs.mkdirSync/async with { recursive: true } creates nested directories if needed. fs.rmSync/async with { recursive: true, force: true } removes directories and contents. Prefer async variants in servers; sync variants are fine for scripts.

Annotated Snippet
```js
import fs from 'fs';
import path from 'path';

const dir = path.join('tmp', 'nested', 'demo');

// Create nested directories (idempotent)
fs.mkdirSync(dir, { recursive: true });

// Write a file inside
fs.writeFileSync(path.join(dir, 'hello.txt'), 'hi', 'utf8');

// Remove the directory tree
fs.rmSync('tmp', { recursive: true, force: true });
```

Why it works
- recursive: true in mkdir creates intermediate segments if they don’t exist.
- rm with recursive removes directories and files within; force: true ignores missing targets and some permission errors.
- Using path.join builds cross-platform paths.

Pitfalls
- rm with recursive is destructive; double-check the target path to avoid data loss.
- On Windows, files in use can cause EBUSY/EPERM errors—retry or ensure handles are closed.
- For large trees, consider streaming deletion or tools like rimraf for legacy Node support.

Practice Tasks
1) Write ensureDir(dir) that creates a directory tree if missing (async and sync versions).
2) Build a cleanTmp() function that removes ./tmp safely and logs what it removes.
3) Create a small script that scaffolds a project directory with subfolders and starter files, then a cleanup script that removes it.

Links
- Node.js: fs.mkdir / fs.rm
- path utilities (join, resolve)
- Safety patterns for destructive file operations