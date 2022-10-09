# @just-func/types

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
