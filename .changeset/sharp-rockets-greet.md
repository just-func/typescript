---
"@just-func/types": minor
---

Extract `ErrorMeta` From `JustMeta`: this keeps the `JustMeta` about just the basic structure.
Remove `JustMetaPara`: Now `JustMeta` is identical to it.
Add `ToJustValue<V>`: Adjust common types to `JustValue`. e.g. `[X]` to `JustUno<X>`
Remove `JustParams`: Fix `JustFunction` to use `JustValues` instead.
Improve `justValue()`: to allow calling without params.

Note that `JustResult` is not used right now.
It's not deprecated, but possibly will be,
if we do not find any use cases for it.
