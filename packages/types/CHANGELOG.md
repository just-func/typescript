# @just-func/types

## 0.6.0

### Minor Changes

- 2f3a544: Pin `type-plus` to `8.0.0-beta.10`, exactly.
  
  The last published `@just-func/types` (0.5.1) still declares `type-plus: ^5.0.0`, and the
  move to `^7.6.0` has never reached the registry, so the jump consumers actually see with
  this release is **5 -> 8**.
  
  `type-plus` 8 depends on `tersify` ^4, which is the point of the change: consumers
  reaching `@just-func/types` transitively (through `standard-log`, for example) were being
  dragged onto `type-plus` 5.6.0 and therefore `tersify` 3.12.1, forcing two majors of
  `tersify` into their tree. `pnpm why tersify -r` now resolves a single version, 4.0.6.
  
  The version is pinned rather than caret-ranged. `^8.0.0-beta.10` resolves to
  `>=8.0.0-beta.10 <9.0.0-0`, which admits every later 8.0.0 prerelease, `8.0.0` itself and
  `8.1.0` — and `type-plus` 8 is a prerelease line where breaking changes land between
  betas, as the two below show. An exact version makes each bump a reviewable change
  instead of something a lockfile refresh can do silently. Move back to a caret when 8.0.0
  is stable.
  
  Two knock-on changes:
  
  - `type-plus` 8.0.0-beta.10 declares a `typescript` peer of `>= 5.6.0`. Consumers below
    TypeScript 5.6 will not be able to compile against these packages. (beta.11 widened
    that to `>= 5.4.0`; beta.10 is the narrower one.)
  - `type-plus` 8 depends on `unpartial` ^1.0.7, which declares `engines: node >= 20`, so
    the effective Node floor for these packages' runtime dependencies is Node 20.
  - `Equal` changed its branching signature from positional (`Equal<A, B, Then, Else>`) to
    an options object (`Equal<A, B, { $then, $else }>`). `JustValue` is updated to match;
    the type it resolves to is unchanged.
  
  Bump level: `minor`. No exported type or runtime signature changed shape, but on 0.x
  `minor` is the breaking slot, and this is breaking for consumers — `type-plus` is a
  regular dependency whose types surface through `JustValue`, and the TypeScript floor
  moves to 5.6.

### Patch Changes

- da5b0cf: Build with tsdown instead of `tsc`. Every runtime and type path in the tarball is
  unchanged; the only difference is that `lib/index.js.map` and `lib/index.d.ts.map` are no
  longer emitted, because `index.ts` is a pure re-export barrel that produces no mappable
  output. Nothing references them and the emitted files carry no `sourceMappingURL` for
  them, so this is not a broken artifact — but it does change what ships, hence a patch.

## 0.5.2

### Patch Changes

- c2c3ae0: Point `repository`, `homepage`, and `bugs` at `just-func/typescript`. They still named
  `justland/just-func-typescript`, which the repo left some time ago — `repository` is read
  when generating provenance, so the published metadata was wrong.

## 0.5.1

### Patch Changes

- Update type-plus

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
