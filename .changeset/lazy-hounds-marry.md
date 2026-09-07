---
'@just-func/types': minor
'just-func': minor
---

Move `type-plus` to `^8.0.0-beta.11`.

The last published `@just-func/types` (0.5.1) still declares `type-plus: ^5.0.0`, and the
move to `^7.6.0` has never reached the registry, so the jump consumers actually see with
this release is **5 -> 8**.

`type-plus` 8 depends on `tersify` ^4, which is the point of the change: consumers
reaching `@just-func/types` transitively (through `standard-log`, for example) were being
dragged onto `type-plus` 5.6.0 and therefore `tersify` 3.12.1, forcing two majors of
`tersify` into their tree. `pnpm why tersify -r` now resolves a single version, 4.0.6.

Two knock-on changes:

- `type-plus` 8 declares a `typescript` peer of `>= 5.4.0`, because it uses `NoInfer`.
  Consumers below TypeScript 5.4 will not be able to compile against these packages.
- `Equal` changed its branching signature from positional (`Equal<A, B, Then, Else>`) to
  an options object (`Equal<A, B, { $then, $else }>`). `JustValue` is updated to match;
  the type it resolves to is unchanged.

Bump level: `minor`. No exported type or runtime signature changed shape, but on 0.x
`minor` is the breaking slot, and this is breaking for consumers — `type-plus` is a
regular dependency whose types surface through `JustValue`, and the TypeScript floor
moves to 5.4.
