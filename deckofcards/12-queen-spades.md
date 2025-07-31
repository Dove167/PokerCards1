# Lesson 12 — Queen of Spades
Card: Queen of Spades
Topic: File System
Concept: fs.writeFileSync()
Lesson Path: deckofcards/12-queen-spades.md

Summary
fs.writeFileSync writes data to a file synchronously, creating the file if it doesn’t exist and overwriting by default. It blocks the event loop until the write completes, which is fine for scripts and setup tasks but not ideal inside server request paths.

Annotated Snippet
```js
import fs from 'fs';

// Write text (overwrites if exists)
fs.writeFileSync('out.txt', 'hello', 'utf8');

// Append safely (combine with exists check if desired)
const prev = fs.existsSync('log.txt') ? fs.readFileSync('log.txt','utf8') : '';
fs.writeFileSync('log.txt', prev + '\nentry', 'utf8');
```

Why it works
- Synchronous write calls the OS to persist bytes before returning.
- Providing an encoding like 'utf8' writes textual data; otherwise Buffer is expected.

Pitfalls
- Blocking I/O can degrade throughput; prefer async fs.promises.writeFile in servers.
- Overwrites by default; pass options { flag: 'a' } to append instead of manual read+write.
- Can throw on permission errors or missing directories; handle with try/catch or ensure the path exists.

Practice Tasks
1) Write a small CLI that takes a filename and content from process.argv and writes it using writeFileSync; handle errors gracefully.
2) Create a log appender that uses { flag: 'a' } to append a timestamped line.
3) Compare synchronous vs asynchronous write performance in a loop of small writes.

Links
- Node.js: fs.writeFileSync
- Node.js: File system flags (e.g., 'w', 'a')