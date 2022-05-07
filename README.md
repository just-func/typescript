# just-func for TypeScript

[![GitHub Action][github-release]][github-action-url]
[![VS Code][vscode-image]][vscode-url]

[just-func] is a functional programming language that can be represented in JSON.

This repository contains the implementation, tooling, and core libraries for JavaScript/TypeScript.

## Contributing

This repository uses [yarn PnP].

You should use [corepack] to manage your package managers.

When using [VS Code][vscode-url],
please first install the recommended extensions before running `yarn`.

We follow [conventional commits] to manage our changes,
and we use [changesets] to manage versioning.

If you are creating an PR,
please run `yarn changeset` (or `yarn cs` for short) to describe your changes.

[changesets]: https://github.com/changesets/changesets
[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/
[corepack]: https://nodejs.org/api/corepack.html
[just-func]: https://github.com/justland/just-func
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[yarn PnP]: https://yarnpkg.com/features/pnp
[github-release]: https://github.com/justland/just-func-typescript/workflows/release/badge.svg
[github-action-url]: https://github.com/justland/just-func-typescript/actions
