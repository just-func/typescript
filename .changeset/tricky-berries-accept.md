---
"just-func": patch
---

Fix workspace version.
`workspace:^` should be the correct one which will `changeset` will update the version correctly.

Not sure do we need `version: cs version && pnpm install`. Going to see if this release works or not.
