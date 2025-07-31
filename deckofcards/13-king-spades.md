# Lesson 13 — King of Spades
Card: King of Spades
Topic: Functional Programming
Concept: Immutability (Shallow Clone)
Lesson Path: deckofcards/13-king-spades.md

Summary
Immutability avoids changing existing data; instead, create new structures with desired updates. In JS, use shallow copies (object spread, array spread, Array.prototype.slice, etc.) to prevent side effects and enable predictable state transitions.

Annotated Snippet
```js
// object shallow clone
const state = { count: 1, user: { id: 7, name: 'Ada' } };
const next = { ...state, count: state.count + 1 }; // state unchanged

// array shallow clone
const arr = [1, 2, 3];
const arr2 = [...arr, 4]; // arr unchanged

// note: shallow clone copies top-level only
next.user.name = 'Grace'; // mutates nested object shared by both!
```

Why it works
- Spread syntax copies enumerable own properties into a new container.
- Pure updates are easier to reason about, test, and time-travel (e.g., in UIs).
- Many libraries and state managers assume immutable update patterns.

Pitfalls
- Shallow, not deep: nested references are shared; deep updates need structured cloning or careful rebuilds (e.g., next = { ...state, user: { ...state.user, name: 'Grace' } }).
- Copying very large data repeatedly can be expensive—consider structural sharing or persistent data structures if needed.
- Mutating inputs after cloning can still affect nested references unless those were also cloned.

Practice Tasks
1) Given a nested state object, perform a non-mutating update of a nested field (two levels deep) using spread.
2) Convert a function that pushes into an array to instead return a new array with the element appended via spread.
3) Implement a small helper updateIn(obj, path, updater) that returns a shallowly-immutable update along a path (two levels is fine).

Links
- MDN: Spread syntax (...)
- MDN: Object.assign
- Structural sharing concepts (persistent data structures)