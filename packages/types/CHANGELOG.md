# @just-func/types

## 0.5.0

### Minor Changes

- 4d0bf46: Fix `ToJustValue<V>` to return `JustEmpty` correctly.

  Also added `readonly` to others. Seems like newer TypeScript needs that.

  `justFunction()` generic type is changed to keep the same behavior.
  Again TypeScript seems to changed the behavior causing the original type to fail.

  Add `just()` for writing `just-func` compliant code.
  It supports function overloads, which is not supported by `justFunction()`.

### Patch Changes

- 3bea285: Make some import with `type`.

## 0.4.0

### Minor Changes

- 6e9db07: Fix `JustValue` to default `Value` type to `void`.
  That's what `JustEmpty` should have.

  Rename `JustReturnTypes` to `JustValues`.

- 2827b04: Extract `ErrorMeta` From `JustMeta`: this keeps the `JustMeta` about just the basic structure.
  Remove `JustMetaPara`: Now `JustMeta` is identical to it.
  Add `ToJustValue<V>`: Adjust common types to `JustValue`. e.g. `[X]` to `JustUno<X>`
  Remove `JustParams`: Fix `JustFunction` to use `JustValues` instead.
  Improve `justValue()`: to allow calling without params.

  Note that `JustResult` is not used right now.
  It's not deprecated, but possibly will be,
  if we do not find any use cases for it.

### Patch Changes

- a90c6bd: Allows `toJustValue()` to be invoked with no param.
  So that it can be used when returning nothing (`void`).
- 6e75faf: Add validators/type guards:

  - `isJustEmpty()`
  - `isJustUno()`
  - `isJustDuo()`
  - `isJustValue()`

## 0.3.3

### Patch Changes

- 0366fb8: Adjust return types to `readonly`.
  Matching `JustUno<V>` and `JustDuo<V, M>`.

## 0.3.2

### Patch Changes

- 35fd14a: Add alias `JustParams` and `JustReturnTypes`

## 0.3.1

### Patch Changes

- 5b2b23f: Fix the implementation of `justFunction()` and `JustFunction`.
  The original implementation does not cover all the cases correctly.

## 0.3.0

### Minor Changes

- c7f76f6: Add `justValue()`, `JustFunction`, and `justFunction()`

## 0.2.1

### Patch Changes

- a304d87: Remove `engines.node` requirement. Not using anything specific to NodeJS 14.19

## 0.2.0

### Minor Changes

- 1fef21d: Add `StackTraceMeta`.

### Patch Changes

- 282e887: `JustMeta` should accept a `error` prop by default.
- f77abab: `JustMeta` should be read only.

## 0.1.0

### Minor Changes

- Move types related code to `@just-func/types`.

  `just-func` export what's in `@just-func/types`
