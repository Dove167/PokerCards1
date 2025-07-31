# Lesson 25 — Queen of Hearts
Card: Queen of Hearts
Topic: Basic Synchronous
Concept: Object Literals
Lesson Path: deckofcards/25-queen-hearts.md

Summary
Object literals provide a concise way to create structured data with key–value pairs. Modern syntax supports shorthand properties, computed keys, and method definitions.

Annotated Snippet
```js
const id = 1;
const key = 'role';

const user = {
  id,                 // shorthand for id: id
  name: 'Ada',
  [key]: 'admin',     // computed property name -> role: 'admin'
  greet() {           // method shorthand
    return `Hello, ${this.name}`;
  }
};

console.log(user.greet()); // "Hello, Ada"
```

Why it works
- Object literal notation is declarative and compact.
- Shorthands reduce boilerplate when variable names match desired keys.
- Computed keys enable dynamic property names without a separate assignment.

Pitfalls
- this inside methods depends on call site; extracting methods can change this binding.
- Accidental mutation: objects are reference types; copying requires cloning ({ ...obj }).
- Keys are strings/symbols; numeric-like keys become strings.

Practice Tasks
1) Build a config object using shorthand properties and one computed property.
2) Add a method greet and test how this changes when you call it via const g = obj.greet; g().
3) Clone an object with spread, modify the clone, and show the original is unchanged (shallow clone caveat).

Links
- MDN: Object initializer
- MDN: Object spread and rest properties