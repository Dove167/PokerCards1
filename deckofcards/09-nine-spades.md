# Lesson 09 — 9 of Spades
Card: 9 of Spades
Topic: Basic Synchronous
Concept: const (Immutable Binding)
Lesson Path: deckofcards/09-nine-spades.md

Summary
const creates a block-scoped binding that cannot be re-assigned. The binding is immutable, but if it refers to an object/array, the object itself can still be mutated.

Annotated Snippet
```js
const API_URL = 'https://api.example.com';
// API_URL = 'https://other'; // TypeError: Assignment to constant variable.

const config = { retries: 3 };
config.retries = 5; // allowed: object mutation
// config = { retries: 1 }; // not allowed: re-assignment of the binding
```

Why it works
- const prevents re-binding the identifier, strengthening invariants and avoiding accidental changes.
- Object mutability is separate from binding mutability; use Object.freeze for shallow immutability.

Pitfalls
- Confusing binding immutability with deep data immutability.
- Re-declaring the same const in the same scope is a SyntaxError.
- For arrays/objects, prefer structural cloning for changes (e.g., spread) to avoid side effects.

Practice Tasks
1) Replace let with const wherever variables are not re-assigned in a small module.
2) Demonstrate that mutating an array referenced by const is allowed, then refactor to a non-mutating approach.
3) Use Object.freeze on a config object and show the effects (and limits) of shallow freezing.

Links
- MDN: const
- MDN: Object.freeze