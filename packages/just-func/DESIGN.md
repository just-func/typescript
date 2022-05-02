# Design

Most of this should go into `just-func` itself.
Just parking here for now.

## JustEmpty vs JustUnit

I was tempted to name the empty tuple `[]` as `JustUnit`.
This name matches the name used in Haskell.
However, it is not accurate, especially in TypeScript.

A [unit] type is a type that allows only one value.
In most languages, that means `()`, `NULL`, `undefined`, or something similar.

However, TypeScript supports `literal` types,
such as `true`, `false`, or individual constant numbers and strings.

That means all these literal types satisfy the definition of [unit] type.

Since I'm trying to define `[]` specifically,
naming it as `JustUnit` could be confusing.

[unit]: https://en.wikipedia.org/wiki/Unit_type
