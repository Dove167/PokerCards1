# Lesson 29 — 3 of Clubs
Card: 3 of Clubs
Topic: Functional Programming
Concept: Currying
Lesson Path: deckofcards/29-three-clubs.md

Summary
Currying transforms a function with multiple parameters into a sequence of unary functions. It enables partial application and composition-friendly pipelines.

Annotated Snippet
```js
// curried add
const add = a => b => a + b;

const add10 = add(10);   // partial application
console.log(add10(5));   // 15

// generic curry utility (simple)
const curry = fn => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...rest) => curry(fn)(...args, ...rest);

// usage
const sum3 = (a,b,c) => a+b+c;
const curriedSum3 = curry(sum3);
console.log(curriedSum3(1)(2)(3)); // 6
```

Why it works
- Each call returns a function that closes over previous arguments until all required args are provided.
- Encourages reuse and point-free composition by pre-filling common parameters.

Pitfalls
- Over-currying can reduce readability; use where it clarifies intent.
- Functions with rest parameters or optional args complicate arity detection.
- Performance overhead for deeply curried hot paths; measure if necessary.

Practice Tasks
1) Write a curry2 for binary functions and demonstrate partial application on multiply(a,b).
2) Curry a string formatter: fmt(sep)(a)(b) → "a{sep}b".
3) Combine currying with map: const addN = add(n); arr.map(addN).

Links
- Functional programming: currying vs partial application
- Ramda/Lodash FP curry utilities