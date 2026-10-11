---
"@just-func/types": minor
---

Publish ESM only. The CommonJS build is gone, following `type-plus` 8.0.0, which is ESM only.

The package now sets `"type": "module"` and declares `exports` with a single `types`/`default` condition and no `require` condition.
`engines.node` is `^20.19.0 || >=22.12.0`.
This is a breaking change. The package is still 0.x, so it ships as a minor bump.

Migration:

- ESM code needs no change.
- CommonJS code can still `require('@just-func/types')` on Node 20.19+ or 22.12+, which load ES modules through `require()` without a flag. Older Node versions must use `import()`.
- A CommonJS TypeScript project must compile with `module: node20` or `nodenext` (or `moduleResolution: bundler`). Under `module: node16`, importing the package from CommonJS fails with TS1479.
- Deep imports into `lib/` are no longer allowed. Import from the package root.
