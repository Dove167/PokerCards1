# Lesson 01 — Ace of Spades
Card: Ace of Spades
Topic: Basic Synchronous
Concept: Block-Scoped Variable (let)
Lesson Path: lessons/01-ace-spades.md

Summary
let declares a block-scoped binding. It prevents accidental re-declarations and respects {} block boundaries, unlike var.

Annotated Snippet
```js
let count = 0;        // block-scoped variable
// ...
if (true) {
  let count = 5;      // different binding in this block
  // use inner count
}
// back to outer count
```

Pitfalls
- Using var instead of let can leak variables outside intended blocks.
- Re-declaring let in the same scope is a SyntaxError.
- Hoisting still happens conceptually, but let is in the temporal dead zone until initialized.

Practice Tasks
1) Convert a var-based counter to let and demonstrate block scoping with an if block.
2) Write a loop with let i and show that i is not accessible outside the loop block.
3) Refactor a function to avoid reusing the same let variable name across nested blocks.

Links
- MDN: let
- 2-min check: Write a small snippet that demonstrates temporal dead zone by accessing let before declaration (expect ReferenceError).