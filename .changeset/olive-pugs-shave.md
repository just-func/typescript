---
'@just-func/types': patch
'just-func': patch
---

Build with tsdown instead of `tsc`. Every runtime and type path in the tarball is
unchanged; the only difference is that `lib/index.js.map` and `lib/index.d.ts.map` are no
longer emitted, because `index.ts` is a pure re-export barrel that produces no mappable
output. Nothing references them and the emitted files carry no `sourceMappingURL` for
them, so this is not a broken artifact — but it does change what ships, hence a patch.
