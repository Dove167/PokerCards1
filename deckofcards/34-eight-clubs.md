# Lesson 34 — 8 of Clubs
Card: 8 of Clubs
Topic: Array Processing
Concept: Array.find / some / every
Lesson Path: deckofcards/34-eight-clubs.md

Summary
find returns the first matching element. some checks if any element matches. every checks if all elements match. These predicates improve clarity over manual loops.

Annotated Snippet
```js
const users = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true }
];

// first active user (or undefined)
const firstActive = users.find(u => u.active);

// any inactive?
const hasInactive = users.some(u => !u.active);

// all active?
const allActive = users.every(u => u.active);
```

Why it works
- find returns the element itself (not index) and stops at first match.
- some returns true on first truthy predicate; every returns false on first falsy predicate.
- Short-circuiting avoids unnecessary checks after the outcome is known.

Pitfalls
- find returns undefined when not found—guard before property access.
- some/every on empty arrays: some → false (no element makes predicate true), every → true (vacuously true); know this edge case.
- Predicates with side effects reduce predictability; keep them pure.

Practice Tasks
1) Given products with inStock and price, find the first affordable in-stock item.
2) Use some to check if any usernames collide (case-insensitive) with a proposed username.
3) Validate input objects with every: ensure required keys exist and types match basic expectations.

Links
- MDN: Array.prototype.find()
- MDN: Array.prototype.some()
- MDN: Array.prototype.every()