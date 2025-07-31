# Lesson 33 — 7 of Clubs
Card: 7 of Clubs
Topic: Basic Synchronous
Concept: Destructuring
Lesson Path: deckofcards/33-seven-clubs.md

Summary
Destructuring extracts values from arrays/objects into variables with concise syntax. It improves readability, supports defaults, renaming, and nested patterns.

Annotated Snippet
```js
// object destructuring with renaming + defaults
const user = { id: 7, name: 'Ada', role: 'admin' };
const { id, name: fullName, plan = 'free' } = user;
// id = 7, fullName = 'Ada', plan = 'free'

// array destructuring + skipping + rest
const arr = [10, 20, 30, 40];
const [first, , third, ...rest] = arr;
// first=10, third=30, rest=[40]

// nested destructuring
const payload = { meta: { page: 2 }, data: [ { id: 1 }, { id: 2 } ] };
const { meta: { page }, data: [firstRow] } = payload;
// page=2, firstRow={ id: 1 }
```

Why it works
- Patterns on the left-hand side match object keys or array positions.
- Defaults apply when a property/index is missing or undefined.
- Renaming with name: alias clarifies meaning without extra assignments.

Pitfalls
- Accessing missing nested paths without defaults throws; guard or provide defaults (e.g., const { x: { y } = { y: 0 } } = obj).
- Shadowing variables with the same names can confuse scopes—rename when needed.
- For function params, destructuring at the boundary can hide required/optional contract; document carefully.

Practice Tasks
1) Destructure an API response to pull out status, data.items as items, and set a default for errorMessage.
2) Write a function that accepts an options object and destructures { retries = 3, timeout = 1000 } in parameters.
3) Convert a series of property accesses into one destructuring statement with renames and defaults.

Links
- MDN: Destructuring assignment
- Function parameter destructuring patterns