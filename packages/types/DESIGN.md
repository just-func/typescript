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
- The return value is always a tuple. The tuple will have either 0, 1, or 2 elements.\
  The second element is reserved for returning metadata.
  - For function normally returns nothing (`() => void`), return and empty tuple (`() => readonly []`)
  - For function normally returns a value (`() => T`), returns a single-value tuple (`() => readonly [T]`), or a two-values tuple if it needs to return some metadata (`() => readonly [T, M]`)
- It will never throw an error/exception. The error is returned inside the metadata `() => readonly [undefined, { error: E }]`
- The return values should be immutable

When adding the above constraints, there are some ambiguities in two area: the first argument, and the return value.

## The Return type

The return value is simpler, so we will deal with that first.

The rule says:

> The return value is always a tuple. The tuple will have either 0, 1, or 2 elements.
> The second element is reserved for returning metadata.

This means it completely change how function returns.

| Normal               | Just Return            | Normalized               |
| -------------------- | ---------------------- | ------------------------ |
| no return (void)     | `[, M?]`               | `[[], M?]`               |
| some value (`R`)     | `[R, M?]`              | `[[R], M?]`              |
| throw error          | `[,{ error: E }]`      | `[,{ error: E }]`        |
| metadata (e.g. logs) | `[R, { logs: Log[] }]` | `[[R], { logs: Log[] }]` |

While this take some time to get used to, and seems a bit wasteful,
it is better than the alternative:

| Normal               | Just Return            |
| -------------------- | ---------------------- |
| no return (`void`)   | `void`                 |
| some value (`R`)     | `R`                    |
| array (`A[]`)        | `[A[]]`                |
| tuple (`[T]`)        | `[[T]]`                |
| throw error          | `[,{ error: E }]`      |
| metadata (e.g. logs) | `[R, { logs: Log[] }]` |

You can see that while this is more familiar,
you have to add a special rule for Array and Tuples to return a wrapped Array and Tuples.

## The Argument Types

Unlike the return value, where we are ADDING a new return value (metadata),
for arguments we are REMOVING the ability of having multiple arguments.

It is a SUBTRACTION meaning we are bounded to lose something,
and we will create some confusion no matter how do we subtract.

One way to do this is to do the same sweeping way as in the return value:

| Normal                           | Just Arguments                       | Corresponding Just Return   |
| -------------------------------- | ------------------------------------ | --------------------------- |
| No argument (`void`)             | `(param: [], meta?: M)`              | `[, M?]`                    |
| Single value (`P`)               | `(param: [P], meta?: M)`             | `[P, M?]`                   |
| Single array (`A[]`)             | `(param: [A[]], meta?: M)`           | `[A[], M?]`                 |
| Single tuple (`[T]`)             | `(param: [[T]], meta?: M)`           | `[[T], M?]`                 |
| Single optional (`A?`)           | `(param: [A?], meta?: M)`            | `[A?, M?]` or `[[A?], M?]`? |
| Two args (`A, B`)                | `(param: [A, B], meta?: M)`          | `[[A, B], M?]`              |
| Two args with optional (`A, B?`) | `(param: [A, B?], meta?: M)`         | `[[A, B?], M?]`             |
| Two args with array (`A[], B`)   | `(param: [A[], B], meta?: M)`        | `[[A[], B], M?]`            |
| Rest (`...A[]`)                  | `(param: [...A[]], meta?: M)`        | `[[....A[]], M?]`           |
| Rest of arrays (`...Array<A[]>`) | `(param: [...Array<A[]>], meta?: M)` | `[[...Array<A[]>], M?]`     |

While looks fine, this doesn't compose with the return value.
You can see the problem occurs when we transition from a single param to multiple params.
The single optional param as two ways to represent it.
And the two params (`[[A, B], M?]`) has the same type as two-tuple single param (`[[T1, T2], M?]`).

The design of `just-func` is functional (pun-intended).
The ability to compose function is the main reason of having these restrictions.
So the solution is to follow the type of the return values:

| Normal                           | Just Arguments                       | Corresponding Just Return |
| -------------------------------- | ------------------------------------ | ------------------------- |
| No argument (`void`)             | `(param: void, meta?: M)`            | `[, M?]`                  |
| Single value (`P`)               | `(param: P, meta?: M)`               | `[P, M?]`                 |
| Single array (`A[]`)             | `(param: A[], meta?: M)`             | `[A[], M?]`               |
| Single tuple (`[T]`)             | `(param: [T], meta?: M)`             | `[[T], M?]`               |
| Single optional (`A?`)           | `(param?: A, meta?: M)`              | `[A?, M?]`                |
| Two args (`A, B`)                | `(param: [A, B], meta?: M)`          | `[[A, B], M?]`            |
| Two args with optional (`A, B?`) | `(param: [A, B?], meta?: M)`         | `[[A, B?], M?]`           |
| Two args with array (`A[], B`)   | `(param: [A[], B], meta?: M)`        | `[[A[], B], M?]`          |
| Rest (`...A[]`)                  | `(param: [...A[]], meta?: M)`        | `[[....A[]], M?]`         |
| Rest of arrays (`...Array<A[]>`) | `(param: [...Array<A[]>], meta?: M)` | `[[...Array<A[]>], M?]`   |

Another complication is function overloads.

| type        | param         | return           | Just param     | Just Return   |
| ----------- | ------------- | ---------------- | -------------- | ------------- |
| `void`      | `()`          | `void`           | `()`           | `[]`          |
| `undefined` | `(undefined)` | `undefined`      | `(undefined)`  | `[undefined]` |
| `1`         | `(1)`         | `1`              | `(1)`          | `[1]`         |
| `true`      | `(true)`      | `true`           | `(true)`       | `[true]`      |
| `'abc'`     | `('abc')`     | `'abc'`          | `('abc')`      | `['abc']`     |
| `{a}`       | `({a})`       | `{a}`            | `({a})`        | `[{a}]`       |
| `T[]`       | `(T[])`       | `T[]`            | `(T[])`        | `[T[]]`       |
| `[a, b]`    | `([a, b])`    | `[a, b]`         | `([a, b])`     | `[[a, b]]`    | * |
| `a?`        | `(a?)`        | `a or undefined` | `(a?)`         | `[a?]`        |
| `a,b`       | `(a, b)`      | `[a, b]`         | `([a, b])`     | `[[a, b]]`    | * |
| `a,b?`      | `(a, b?)`     | `[a, b?]`        | `([a, b?])`    | `[[a, b?]]`   |
| `[a,b],c`   | `([a,b], c)`  | `[[a,b], c]`     | `([[a,b], c])` | `[[a,b], c]`  |
| `...T`      | `(...T)`      | `T[]`            | `(T[])`        | `[T[]]`       | * |

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

## Function overload vs conditional type

TypeScript is unable to handle function overload mixed with conditional type.

This means we can either support function overloads,
or support type adjustment through conditional types,
but not both.

```ts
// supporting function overload
just<{
  () => JustUno<number>,
  (v: string) => JustUno<string>
}>(fn)

// type adjustment
just(() => []) // adjust return type to `() => JustEmpty`
```

If we force using conditional type to simulate function overload, e.g.:

```ts
const j = just<{
  <P extends Array<string>>(...args: P): P extends []
    ? JustUno<number>
    : (P extends [string] ? JustUno<string>: never)
}>(fn)

j() // () => JustUno<number>
j('a') // (arg_0: string) => JustUno<string>
j('a', 'b') // (arg_0: string, arg_1: string) => never
```

We cannot guard the type correctly, and the user can't tell what are the overloads until they type it out.

- <https://github.com/microsoft/TypeScript/issues/29732>

[unit]: https://en.wikipedia.org/wiki/Unit_type
[`just-func`]: https://github.com/justland/just-func
[`JustFunction`]: https://github.com/justland/just-func-typescript/blob/main/packages/types/ts/Just.ts#L50
