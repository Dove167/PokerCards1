# Lesson 36 — 10 of Clubs
Card: 10 of Clubs
Topic: File System
Concept: Streams (createReadStream)
Lesson Path: deckofcards/36-ten-clubs.md

Summary
Readable streams process data incrementally without loading entire files into memory. fs.createReadStream emits 'data' chunks as they arrive, enabling efficient handling of large files and backpressure-aware piping.

Annotated Snippet
```js
import fs from 'fs';

// Read a large file in chunks
const stream = fs.createReadStream('big.txt', { encoding: 'utf8' });

stream.on('data', chunk => {
  // chunk is a string (because encoding) or Buffer (without encoding)
  console.log('chunk size:', chunk.length);
});

stream.on('end', () => {
  console.log('done');
});

stream.on('error', err => {
  console.error('read error:', err);
});

// Backpressure-aware piping to stdout (or another writable)
fs.createReadStream('big.txt').pipe(process.stdout);
```

Why it works
- Streams split I/O into chunks; Node reads from disk and pushes to your code as data is ready.
- Backpressure: pipe() signals the readable to pause/resume based on the writable’s capacity.
- Lower memory footprint and improved responsiveness for large data.

Pitfalls
- Forgetting error handlers can crash the process on I/O errors.
- Transforming text across chunk boundaries requires buffering (e.g., split lines correctly).
- Default highWaterMark controls buffering; overly large or tiny sizes can affect performance.

Practice Tasks
1) Build a line counter: stream a file and count newline characters, printing the total at 'end'.
2) Create a Transform stream that uppercases text and pipe read -> transform -> write.
3) Copy a file with streams and measure memory usage vs readFile/writeFile for a large file.

Links
- Node.js: fs.createReadStream
- Node.js Streams: Readable/Writable/Transform
- Backpressure and pipe mechanics