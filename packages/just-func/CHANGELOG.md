# just-func

## 0.3.0

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
- Updated dependencies [2f3a544]
- Updated dependencies [da5b0cf]
  - @just-func/types@0.6.0

## 0.2.6

### Patch Changes

- c2c3ae0: Point `repository`, `homepage`, and `bugs` at `just-func/typescript`. They still named
  `justland/just-func-typescript`, which the repo left some time ago — `repository` is read
  when generating provenance, so the published metadata was wrong.
- Updated dependencies [c2c3ae0]
  - @just-func/types@0.5.2

## 0.2.5

### Patch Changes

- Update type-plus
- Updated dependencies
  - @just-func/types@0.5.1

## 0.2.4

### Patch Changes

- Updated dependencies [3bea285]
- Updated dependencies [4d0bf46]
  - @just-func/types@0.5.0

## 0.2.3

### Patch Changes

- c090861: Fix workspace version.
  `workspace:^` should be the correct one which will `changeset` will update the version correctly.

  Not sure do we need `version: cs version && pnpm install`. Going to see if this release works or not.

## 0.2.2

### Patch Changes

- Test release

## 0.2.1

### Patch Changes

- a08a5fb: Re-release: the workspace version is somehow not updated.

## 0.2.0

### Minor Changes

- ffd66d1: Add `compose()`

### Patch Changes

- Updated dependencies [6e9db07]
- Updated dependencies [a90c6bd]
- Updated dependencies [2827b04]
- Updated dependencies [6e75faf]
  - @just-func/types@0.4.0

## 0.1.7

### Patch Changes

- Updated dependencies [0366fb8]
  - @just-func/types@0.3.3

## 0.1.6

### Patch Changes

- Updated dependencies [35fd14a]
  - @just-func/types@0.3.2

## 0.1.5

### Patch Changes

- Updated dependencies [5b2b23f]
  - @just-func/types@0.3.1

## 0.1.4

### Patch Changes

- Updated dependencies [c7f76f6]
  - @just-func/types@0.3.0

## 0.1.3

### Patch Changes

- a304d87: Remove `engines.node` requirement. Not using anything specific to NodeJS 14.19
- Updated dependencies [a304d87]
  - @just-func/types@0.2.1

## 0.1.2

### Patch Changes

- Updated dependencies [282e887]
- Updated dependencies [1fef21d]
- Updated dependencies [f77abab]
  - @just-func/types@0.2.0

## 0.1.1

### Patch Changes

- Move types related code to `@just-func/types`.

  `just-func` export what's in `@just-func/types`

- Updated dependencies
  - @just-func/types@0.1.0

## 0.1.0

### Minor Changes

- Add Just value types
