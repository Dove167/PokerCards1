# JavaScript Poker Cards — 52 Concepts and Snippets

Interleaved topics across full deck (Spades → Hearts → Clubs → Diamonds; Ace to King). Each entry links to its lesson and shows the snippet from [`code_snippets.json`](code_snippets.json:1).

---

## 01 · Ace of Spades — Basic Synchronous
Concept: Block-Scoped Variable (let)
Lesson: [lessons/01-ace-spades.md](lessons/01-ace-spades.md:1)
Snippet:
```js
let count = 0;
```

---

## 02 · 2 of Spades — Array Processing
Concept: Create and Access Arrays
Lesson: [lessons/02-two-spades.md](lessons/02-two-spades.md:1)
Snippet:
```js
const arr = [1,2,3];
console.log(arr[0]);
```

---

## 03 · 3 of Spades — Promise Chains
Concept: Basic Promise and then()
Lesson: [lessons/03-three-spades.md](lessons/03-three-spades.md:1)
Snippet:
```js
Promise.resolve(1).then(v => v + 1);
```

---

## 04 · 4 of Spades — File System
Concept: fs.readFileSync()
Lesson: [lessons/04-four-spades.md](lessons/04-four-spades.md:1)
Snippet:
```js
import fs from 'fs';
const txt = fs.readFileSync('file.txt','utf8');
```

---

## 05 · 5 of Spades — Functional Programming
Concept: Pure Functions
Lesson: [lessons/05-five-spades.md](lessons/05-five-spades.md:1)
Snippet:
```js
const add = (a,b) => a + b;
```

---

## 06 · 6 of Spades — Advanced Async
Concept: async/await Basics
Lesson: [lessons/06-six-spades.md](lessons/06-six-spades.md:1)
Snippet:
```js
async function f(){ return await Promise.resolve(42); }
```

---

## 07 · 7 of Spades — Callbacks
Concept: Callback Pattern
Lesson: [lessons/07-seven-spades.md](lessons/07-seven-spades.md:1)
Snippet:
```js
function doWork(cb){ setTimeout(()=>cb(null,'ok'),100); }
```

---

## 08 · 8 of Spades — Promise Utilities
Concept: Promise.all()
Lesson: [lessons/08-eight-spades.md](lessons/08-eight-spades.md:1)
Snippet:
```js
await Promise.all([p1,p2]);
```

---

## 09 · 9 of Spades — Basic Synchronous
Concept: const (Immutable Binding)
Lesson: [lessons/09-nine-spades.md](lessons/09-nine-spades.md:1)
Snippet:
```js
const API_URL = 'https://api.example.com';
```

---

## 10 · 10 of Spades — Array Processing
Concept: Array.map()
Lesson: [lessons/10-ten-spades.md](lessons/10-ten-spades.md:1)
Snippet:
```js
const doubled = [1,2,3].map(n=>n*2);
```

---

## 11 · Jack of Spades — Promise Chains
Concept: Chaining then() and catch()
Lesson: [lessons/11-jack-spades.md](lessons/11-jack-spades.md:1)
Snippet:
```js
fetch(url).then(r=>r.json()).catch(console.error);
```

---

## 12 · Queen of Spades — File System
Concept: fs.writeFileSync()
Lesson: [lessons/12-queen-spades.md](lessons/12-queen-spades.md:1)
Snippet:
```js
import fs from 'fs';
fs.writeFileSync('out.txt','hello');
```

---

## 13 · King of Spades — Functional Programming
Concept: Immutability (Shallow Clone)
Lesson: [lessons/13-king-spades.md](lessons/13-king-spades.md:1)
Snippet:
```js
const next = {...state, count: state.count+1};
```

---

## 14 · Ace of Hearts — Advanced Async
Concept: Try/Catch with async/await
Lesson: [lessons/14-ace-hearts.md](lessons/14-ace-hearts.md:1)
Snippet:
```js
try { await task(); } catch (e) { console.error(e); }
```

---

## 15 · 2 of Hearts — Callbacks
Concept: Node-style Error-first Callback
Lesson: [lessons/15-two-hearts.md](lessons/15-two-hearts.md:1)
Snippet:
```js
fs.readFile('a.txt','utf8',(err,data)=>{ if(err) return; console.log(data); });
```

---

## 16 · 3 of Hearts — Promise Utilities
Concept: Promise.race()
Lesson: [lessons/16-three-hearts.md](lessons/16-three-hearts.md:1)
Snippet:
```js
await Promise.race([p1,p2]);
```

---

## 17 · 4 of Hearts — Basic Synchronous
Concept: Template Literals
Lesson: [lessons/17-four-hearts.md](lessons/17-four-hearts.md:1)
Snippet:
```js
const msg = `Hello ${name}!`;
```

---

## 18 · 5 of Hearts — Array Processing
Concept: Array.filter()
Lesson: [lessons/18-five-hearts.md](lessons/18-five-hearts.md:1)
Snippet:
```js
const evens = [1,2,3,4].filter(n => n%2===0);
```

---

## 19 · 6 of Hearts — Promise Chains
Concept: finally()
Lesson: [lessons/19-six-hearts.md](lessons/19-six-hearts.md:1)
Snippet:
```js
doThing().finally(()=>console.log('done'));
```

---

## 20 · 7 of Hearts — File System
Concept: fs.promises.readFile()
Lesson: [lessons/20-seven-hearts.md](lessons/20-seven-hearts.md:1)
Snippet:
```js
import {promises as fs} from 'fs';
const txt = await fs.readFile('a.txt','utf8');
```

---

## 21 · 8 of Hearts — Functional Programming
Concept: Higher-Order Functions
Lesson: [lessons/21-eight-hearts.md](lessons/21-eight-hearts.md:1)
Snippet:
```js
const withLog = fn => (...a)=>{ console.log('call'); return fn(...a); };
```

---

## 22 · 9 of Hearts — Advanced Async
Concept: Parallel vs Sequential await
Lesson: [lessons/22-nine-hearts.md](lessons/22-nine-hearts.md:1)
Snippet:
```js
const [a,b]=await Promise.all([fa(), fb()]);
```

---

## 23 · 10 of Hearts — Callbacks
Concept: setTimeout / setInterval
Lesson: [lessons/23-ten-hearts.md](lessons/23-ten-hearts.md:1)
Snippet:
```js
const id=setInterval(()=>console.log('tick'),1000);
```

---

## 24 · Jack of Hearts — Promise Utilities
Concept: Promise.allSettled()
Lesson: [lessons/24-jack-hearts.md](lessons/24-jack-hearts.md:1)
Snippet:
```js
const r=await Promise.allSettled([p1,p2]);
```

---

## 25 · Queen of Hearts — Basic Synchronous
Concept: Object Literals
Lesson: [lessons/25-queen-hearts.md](lessons/25-queen-hearts.md:1)
Snippet:
```js
const user = { id: 1, name: 'Ada' };
```

---

## 26 · King of Hearts — Array Processing
Concept: Array.reduce()
Lesson: [lessons/26-king-hearts.md](lessons/26-king-hearts.md:1)
Snippet:
```js
const sum = [1,2,3].reduce((a,b)=>a+b,0);
```

---

## 27 · Ace of Clubs — Promise Chains
Concept: Error Propagation in Chains
Lesson: [lessons/27-ace-clubs.md](lessons/27-ace-clubs.md:1)
Snippet:
```js
return step1().then(step2).catch(handleErr);
```

---

## 28 · 2 of Clubs — File System
Concept: fs.existsSync / statSync
Lesson: [lessons/28-two-clubs.md](lessons/28-two-clubs.md:1)
Snippet:
```js
import fs from 'fs';
if(fs.existsSync('a.txt')){ const s=fs.statSync('a.txt'); }
```

---

## 29 · 3 of Clubs — Functional Programming
Concept: Currying
Lesson: [lessons/29-three-clubs.md](lessons/29-three-clubs.md:1)
Snippet:
```js
const add = a => b => a + b;
```

---

## 30 · 4 of Clubs — Advanced Async
Concept: AbortController with fetch
Lesson: [lessons/30-four-clubs.md](lessons/30-four-clubs.md:1)
Snippet:
```js
const c=new AbortController();
fetch(url,{signal:c.signal});
c.abort();
```

---

## 31 · 5 of Clubs — Callbacks
Concept: Callback to Promise (Promisify)
Lesson: [lessons/31-five-clubs.md](lessons/31-five-clubs.md:1)
Snippet:
```js
const p = new Promise((res,rej)=> fs.readFile('a.txt','utf8',(e,d)=> e?rej(e):res(d)));
```

---

## 32 · 6 of Clubs — Promise Utilities
Concept: Promise.any()
Lesson: [lessons/32-six-clubs.md](lessons/32-six-clubs.md:1)
Snippet:
```js
const first = await Promise.any([p1,p2,p3]);
```

---

## 33 · 7 of Clubs — Basic Synchronous
Concept: Destructuring
Lesson: [lessons/33-seven-clubs.md](lessons/33-seven-clubs.md:1)
Snippet:
```js
const {a,b} = obj; const [x,y] = arr;
```

---

## 34 · 8 of Clubs — Array Processing
Concept: Array.find / some / every
Lesson: [lessons/34-eight-clubs.md](lessons/34-eight-clubs.md:1)
Snippet:
```js
const hit = arr.find(x=>x.id===7);
```

---

## 35 · 9 of Clubs — Promise Chains
Concept: Return vs Missing Return
Lesson: [lessons/35-nine-clubs.md](lessons/35-nine-clubs.md:1)
Snippet:
```js
return doWork().then(v=>v*2);
```

---

## 36 · 10 of Clubs — File System
Concept: Streams (createReadStream)
Lesson: [lessons/36-ten-clubs.md](lessons/36-ten-clubs.md:1)
Snippet:
```js
const s=fs.createReadStream('big.txt');
s.on('data',chunk=>{});
```

---

## 37 · Jack of Clubs — Functional Programming
Concept: Composition
Lesson: [lessons/37-jack-clubs.md](lessons/37-jack-clubs.md:1)
Snippet:
```js
const compose=(f,g)=>x=>f(g(x));
```

---

## 38 · Queen of Clubs — Advanced Async
Concept: Queueing and Backpressure (conceptual)
Lesson: [lessons/38-queen-clubs.md](lessons/38-queen-clubs.md:1)
Snippet:
```js
const queue=[]; async function enqueue(t){ queue.push(t); }
```

---

## 39 · King of Clubs — Callbacks
Concept: EventEmitter Style Callbacks
Lesson: [lessons/39-king-clubs.md](lessons/39-king-clubs.md:1)
Snippet:
```js
import {EventEmitter} from 'events';
const bus=new EventEmitter();
bus.on('msg',d=>console.log(d));
```

---

## 40 · Ace of Diamonds — Promise Utilities
Concept: Settled vs Fulfilled
Lesson: [lessons/40-ace-diamonds.md](lessons/40-ace-diamonds.md:1)
Snippet:
```js
const r = await Promise.allSettled([p1,p2]);
```

---

## 41 · 2 of Diamonds — Basic Synchronous
Concept: Spread and Rest
Lesson: [lessons/41-two-diamonds.md](lessons/41-two-diamonds.md:1)
Snippet:
```js
const next=[...arr, 4];
function sum(...xs){ return xs.reduce((a,b)=>a+b,0); }
```

---

## 42 · 3 of Diamonds — Array Processing
Concept: Array.flat / flatMap
Lesson: [lessons/42-three-diamonds.md](lessons/42-three-diamonds.md:1)
Snippet:
```js
const out = [[1],[2,3]].flat();
```

---

## 43 · 4 of Diamonds — Promise Chains
Concept: thenable vs Promise
Lesson: [lessons/43-four-diamonds.md](lessons/43-four-diamonds.md:1)
Snippet:
```js
const thenable={ then(r){ r(1); } };
Promise.resolve(thenable);
```

---

## 44 · 5 of Diamonds — File System
Concept: fs.mkdir / rm (recursive)
Lesson: [lessons/44-five-diamonds.md](lessons/44-five-diamonds.md:1)
Snippet:
```js
fs.mkdirSync('tmp',{recursive:true});
fs.rmSync('tmp',{recursive:true,force:true});
```

---

## 45 · 6 of Diamonds — Functional Programming
Concept: Point-free Style
Lesson: [lessons/45-six-diamonds.md](lessons/45-six-diamonds.md:1)
Snippet:
```js
const incAll = arr => arr.map(x=>x+1);
```

---

## 46 · 7 of Diamonds — Advanced Async
Concept: Concurrency Limits
Lesson: [lessons/46-seven-diamonds.md](lessons/46-seven-diamonds.md:1)
Snippet:
```js
const pool = (tasks, n)=>{/* limit parallelism concept */};
```

---

## 47 · 8 of Diamonds — Callbacks
Concept: Callback Hell and Refactor
Lesson: [lessons/47-eight-diamonds.md](lessons/47-eight-diamonds.md:1)
Snippet:
```js
a(x=> b(y=> c(z=> done())))
```

---

## 48 · 9 of Diamonds — Promise Utilities
Concept: Promise.withResolvers (polyfill idea)
Lesson: [lessons/48-nine-diamonds.md](lessons/48-nine-diamonds.md:1)
Snippet:
```js
function withResolvers(){
  let r,j; 
  const p=new Promise((res,rej)=>{ r=res; j=rej; });
  return {p, resolve:r, reject:j};
}
```

---

## 49 · 10 of Diamonds — Basic Synchronous
Concept: Modules (import/export)
Lesson: [lessons/49-ten-diamonds.md](lessons/49-ten-diamonds.md:1)
Snippet:
```js
export const X=1; // in a.js
// import {X} from './a.js'
```

---

## 50 · Jack of Diamonds — Array Processing
Concept: for...of and entries()
Lesson: [lessons/50-jack-diamonds.md](lessons/50-jack-diamonds.md:1)
Snippet:
```js
for (const [i,v] of arr.entries()) { /* ... */ }
```

---

## 51 · Queen of Diamonds — Promise Chains
Concept: Microtask Timing
Lesson: [lessons/51-queen-diamonds.md](lessons/51-queen-diamonds.md:1)
Snippet:
```js
Promise.resolve().then(()=>console.log('microtask'));
```

---

## 52 · King of Diamonds — File System
Concept: path + fs (join, resolve)
Lesson: [lessons/52-king-diamonds.md](lessons/52-king-diamonds.md:1)
Snippet:
```js
import path from 'path';
const p=path.join('a','b','c.txt');