# @just-func/types

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Codecov][codecov-image]][codecov-url]

Type System of [just-func][just-func-typescript].

- [`JustEmpty`]: A empty value.
- [`JustUno`]: A single value.
- [`JustDuo`]: A value with meta.
- [`JustValue`]: Infer type of [`JustEmpty`], [`JustUno`], and [`JustDuo`].
- [`justValue()`]: helper to define [`JustValue`].
- [`JustResult`]: Return value of a function compliant with [just-func].
- [`JustFunction`]: Functions that compliant with [just-func]
- [`justFunction()`]: helper to define [`JustFunction`].

## Type guards

- `isJustEmpty()`
- `isJustUno()`
- `isJustDuo()`
- `isJustValue()`

## Metadata

Metadata is a first-class concept in [just-func].
A compliant [just-func] function can accept a [`JustMeta`] value as its second parameter.

The parameter is read only and can never be modified by the calling function.

- [`JustMeta`]: The basic form of metadata.
- [`StackTraceMeta`]: Metadata for function that can adjust its stack trace when error occurs.

[codecov-image]: https://codecov.io/gh/just-func/typescript/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/just-func/typescript
[downloads-image]: https://img.shields.io/npm/dm/@just-func/types.svg?style=flat
[downloads-url]: https://npmjs.org/package/@just-func/types
[just-func-typescript]: https://github.com/just-func/typescript/tree/main/packages/just-func
[just-func]: https://github.com/justland/just-func
[npm-image]: https://img.shields.io/npm/v/@just-func/types.svg?style=flat
[npm-url]: https://npmjs.org/package/@just-func/types
[`JustMeta`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#L3
[`JustEmpty`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#L11
[`JustUno`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#L15
[`JustDuo`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#L19
[`JustValue`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#L21
[`JustResult`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#30
[`justValue()`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#L37
[`StackTraceMeta`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#L45
[`JustFunction`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#L50
[`justFunction()`]: https://github.com/just-func/typescript/blob/main/packages/types/ts/Just.ts#L56
