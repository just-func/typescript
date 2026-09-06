---
'@just-func/types': minor
'just-func': minor
---

Move `type-plus` to `^8.0.0-beta.10`.

The last published `@just-func/types` (0.5.1) still declares `type-plus: ^5.0.0`. An
unreleased move to `^7.6.0` was already sitting on `main`, so the jump consumers
actually see with this release is **5 -> 8**.

`type-plus` 8 requires `tersify` ^4, which is the point of the change: consumers that
reach `@just-func/types` transitively (for example through `standard-log`) were being
dragged onto `type-plus` 5.6.0 and therefore `tersify` 3.12.1, forcing two majors of
`tersify` into their tree. With this change the whole chain resolves on `tersify` 4.

Two knock-on changes:

- `type-plus` 8 declares a `typescript` peer of `>= 5.4.0` (it uses `NoInfer`), so the
  packages' `typescript` devDependency moved from `^5.0.0` to `^5.4.0`. Consumers on
  TypeScript below 5.4 will not be able to compile against these packages.
- `Equal` changed its branching signature from positional (`Equal<A, B, Then, Else>`) to
  an options object (`Equal<A, B, { $then, $else }>`). `JustValue` was updated
  accordingly; the resulting public type is unchanged.

Bump level: `minor`. No exported type or runtime signature changed shape, but on 0.x
`minor` is the breaking slot, and this is breaking for consumers — `type-plus` is a
regular dependency whose types surface through `JustValue`, and the TypeScript floor
moves to 5.4.
