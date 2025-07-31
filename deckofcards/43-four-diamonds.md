# Lesson 43 — 4 of Diamonds
Card: 4 of Diamonds
Topic: Promise Chains
Concept: thenable vs Promise
Lesson Path: deckofcards/43-four-diamonds.md

Summary
A “thenable” is any object with a then method. Promise.resolve(thenable) treats it like a promise and assimilates it. Understanding assimilation helps when integrating third‑party libs or custom async abstractions.

Annotated Snippet
```js
// a simple thenable (not a real Promise)
const thenable = {
  then(resolve, reject) {
    // Call resolve asynchronously to mimic promise behavior
    setTimeout(() => resolve(42), 0);
  }
};

// Promise assimilation: resolves with 42
Promise.resolve(thenable).then(v => console.log(v)); // 42

// contrast: non-thenable plain object is wrapped as-is
Promise.resolve({ then: 123 }).then(v => console.log(v.then)); // 123
```

Why it works
- Per the Promises/A+ spec, if an object passed to Promise.resolve has a callable then, it is treated as a thenable and assimilated: its then is invoked with resolve/reject.
- This allows foreign promise implementations or custom async objects to interoperate.

Pitfalls
- A misbehaving thenable (e.g., calls resolve and reject, or throws) can create hard-to-debug issues; robust code guards handlers.
- Synchronous resolution inside then can still be queued as a microtask by Promises; timing differences can surprise—test interop carefully.
- Avoid creating thenables unless necessary; prefer real Promise instances for clarity.

Practice Tasks
1) Write a minimal thenable that rejects with an Error after 10ms; assimilate it via Promise.resolve and handle with catch.
2) Create a wrapper ensurePromise(x) that returns x if x is a Promise, otherwise Promise.resolve(x)—test with thenables and non-thenables.
3) Integrate a third-party thenable-like API into a Promise chain and verify timing/order with console logs.

Links
- Promises/A+ specification (thenable assimilation)
- MDN: Promise.resolve()
- Interoperability between promise libraries