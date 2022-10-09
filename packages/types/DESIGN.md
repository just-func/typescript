# Design

Most of this should go into `just-func` itself.
Just parking here for now.

## `JustFunction`

[`JustFunction`] is the specification on how the functions in [`just-func`] can be defined.

Robert C. Martin said that programming paradigms are constraints.
They didn't add something new.
Instead, they take something away from us:

- Structured: Discipline imposed over direct transfer of control.
- Object-Oriented: Discipline imposed upon indirect transfer of control.
- Functional: Discipline imposed upon assignments.

[`just-func`] is introducing a new paradigm in the sense that it also impose some constraints.

One of those constraints are manifest within [`JustFunction`].

> [`JustFunction`] imposes discipline on function signatures.

Here are the constraints imposed by [`JustFunction`]:

- It can accept 0, 1, or 2 arguments. The second argument is reserved for metadata processing.
- It always returns a tuple. The tuple will have either 0, 1, or 2 elements.\
  The second element is reserved for returning metadata.
  - For function normally returns nothing (`() => void`), return and empty tuple (`() => readonly []`)
  - For function normally returns a value (`() => T`), returns a single-value tuple (`() => readonly [T]`), or a two-values tuple if it needs to return some metadata (`() => readonly [T, M]`)
- It will never throw an error/exception. The error is returned inside the metadata `() => readonly [undefined, { error: E }]`
- The return values should be immutable

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
[`just-func`]: https://github.com/justland/just-func
[`JustFunction`]: https://github.com/justland/just-func-typescript/blob/main/packages/types/ts/Just.ts#L50
