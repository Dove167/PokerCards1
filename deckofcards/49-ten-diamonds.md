# Lesson 49 — 10 of Diamonds
Card: 10 of Diamonds
Topic: Basic Synchronous
Concept: Modules (import/export)
Lesson Path: deckofcards/49-ten-diamonds.md

Summary
ES modules organize code into files with explicit exports and imports. Use export (named or default) to expose values, and import to consume them. In Node, prefer .mjs or "type": "module" in package.json for ESM.

Annotated Snippet
```js
// math.mjs — named exports
export const add = (a, b) => a + b;
export function mul(a, b) { return a * b; }

// utils.mjs — default export
const greet = (name) => `Hello, ${name}!`;
export default greet;

// main.mjs — importing
import greet from './utils.mjs';
import { add, mul } from './math.mjs';

console.log(greet('Ada')); // Hello, Ada!
console.log(add(2, 3));    // 5
console.log(mul(2, 3));    // 6
```

Why it works
- Named exports allow multiple exports per module and selective imports.
- Default export provides a single primary export consumed without braces.
- Module scope is isolated; top-level declarations don’t leak to global scope.

Pitfalls
- Mixed CommonJS (require/module.exports) and ESM (import/export) can cause interop issues; stick to one per project or use bridges carefully.
- File extensions matter in ESM; include .mjs/.js as needed and correct relative paths.
- Circular dependencies can yield undefined exports during initialization—break cycles or restructure.

Practice Tasks
1) Split a small utility library into two modules with named exports and import them in a main script.
2) Convert a CommonJS module (module.exports) to ESM (export/export default) and update imports.
3) Create an index module that re-exports from submodules (export * from './a.mjs') for cleaner import paths.

Links
- MDN: import
- MDN: export
- Node.js ESM documentation