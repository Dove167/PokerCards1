# Lesson 17 — 4 of Hearts
Card: 4 of Hearts
Topic: Basic Synchronous
Concept: Template Literals
Lesson Path: deckofcards/17-four-hearts.md

Summary
Template literals use backticks (`) to interpolate values and write multi-line strings. They support expressions via ${...}, making string construction clearer and safer than concatenation.

Annotated Snippet
```js
const name = 'Ada';
const score = 98;

// interpolation
const msg = `Hello ${name}! Your score is ${score}.`;

// multi-line
const block = `
Report:
 - Name: ${name}
 - Score: ${score}
`;
```

Why it works
- Backtick-delimited strings preserve newlines and whitespace.
- ${...} evaluates any JS expression at runtime and inserts its string representation.
- Avoids brittle concatenation and manual \n management.

Pitfalls
- Beware of unescaped backticks inside the template (use \` if needed).
- Expression side effects still run; keep expressions simple/pure for readability.
- Tagged templates behave differently (advanced usage—parsing/escaping).

Practice Tasks
1) Convert a + concatenated message to a template literal with two interpolated variables.
2) Create a multi-line CLI help text using a template literal.
3) Use an expression in ${...} to compute a value (e.g., formatting a date) without extra variables.

Links
- MDN: Template literals
- MDN: Tagged templates