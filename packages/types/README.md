# @just-func/types

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Codecov][codecov-image]][codecov-url]
[![Codacy Grade][codacy-grade]][codacy-url]

Type System of [just-func][just-func-typescript].

- [`JustEmpty`]: A empty value.
- [`JustUno`]: A single value.
- [`JustDuo`]: A value with meta.
- [`JustResult`]: Return value of a function compliant with [just-func].

## Metadata

Metadata is a first-class concept in [just-func].
Every compliant [just-func] function accepts an optional [`JustMeta`] value as its second parameter.

The parameter is read only and can never be modified by the calling function.

- [`JustMeta`]: The basic form of metadata.
- [`StackTraceMeta`]: Metadata for function that can adjust its stack trace when error occurs.

[codacy-grade]: https://app.codacy.com/project/badge/Grade/cb8acd44f2874dbf85b1755a85690097
[codacy-url]: https://www.codacy.com/gh/justland/just-func-typescript/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=justland/just-func-typescript&amp;utm_campaign=Badge_Grade
[codecov-image]: https://codecov.io/gh/justland/just-func-typescript/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/justland/just-func-typescript
[downloads-image]: https://img.shields.io/npm/dm/@just-func/types.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-func/types
[just-func]: https://github.com/justland/just-func
[just-func-typescript]: https://github.com/justland/just-func-typescript/tree/main/packages/just-func
[npm-image]: https://img.shields.io/npm/v/@just-func/types.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-func/types
