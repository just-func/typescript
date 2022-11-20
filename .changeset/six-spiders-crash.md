---
"@just-func/types": minor
---

Fix `ToJustValue<V>` to return `JustEmpty` correctly.

Also added `readonly` to others. Seems like newer TypeScript needs that.


`justFunction()` generic type is changed to keep the same behavior.
Again TypeScript seems to changed the behavior causing the original type to fail.

Add `just()` for writing `just-func` compliant code.
It supports function overloads, which is not supported by `justFunction()`.
