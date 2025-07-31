# Lesson 52 — King of Diamonds
Card: King of Diamonds
Topic: File System
Concept: path + fs (join, resolve)
Lesson Path: deckofcards/52-king-diamonds.md

Summary
Use path utilities to build safe, cross-platform file paths. Combine with fs operations to read/write reliably relative to known roots. Prefer absolute paths (via path.resolve) for clarity in multi-step scripts.

Annotated Snippet
```js
import fs from 'fs';
import path from 'path';

// Build a path to data/input.txt from current working directory
const p = path.join('data', 'input.txt');

// Ensure absolute for robust I/O
const abs = path.resolve(p);

// Read using absolute path
const text = fs.readFileSync(abs, 'utf8');
console.log('bytes:', Buffer.byteLength(text, 'utf8'));

// Build sibling output file
const out = path.join(path.dirname(abs), 'output.txt');
fs.writeFileSync(out, text.toUpperCase(), 'utf8');
```

Why it works
- join concatenates segments with the correct separators for the OS.
- resolve normalizes and returns an absolute path—good for logging and avoiding cwd surprises.
- dirname, basename, extname help navigate path components.

Pitfalls
- Relying on process.cwd() can be brittle; when invoked from different directories, resolve relative to __dirname (CommonJS) or new URL(import.meta.url) in ESM.
- Using string concatenation for paths breaks on Windows vs POSIX separators—always use path.
- Permissions/locks can cause EACCES/EBUSY; handle errors and close file handles before deletion.

Practice Tasks
1) Build a function projectPath(...parts) that resolves paths relative to your project root and use it to read a file robustly.
2) Given a file path, log dirname, basename, extname, and size using fs.statSync.
3) Convert relative CLI inputs to absolute paths and verify existence with fs.existsSync before proceeding.

Links
- Node.js: path
- Node.js: fs
- ESM: file URL to path (new URL(import.meta.url))