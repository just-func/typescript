---
'@just-func/types': patch
'just-func': patch
---

Update `type-plus` to 8.0.0-beta.12, still pinned exactly.

beta.12 renames `Equal` to `IsEqual`. `JustValue` now uses `IsEqual`, and the type it resolves to is unchanged. The `typescript` peer of `type-plus` widens from `>= 5.6.0` back to `>= 5.4.0`.
