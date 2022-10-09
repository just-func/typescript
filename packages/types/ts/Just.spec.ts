import { CanAssign, isType } from 'type-plus'
import { JustDuo, JustUno, JustEmpty, JustValue } from '.'
import { justFunction, JustFunction, JustMeta, JustMetaParam, JustResult, justValue, StackTraceMeta } from './Just'
import { duo, procedure, unit } from './testFn'

describe('JustFunction', () => {
  it('defaults to (args?: any, meta?: JustMetaParam) => []', () => {
    const f: JustFunction = () => []

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [arg?: any, meta?: JustMetaParam], P>()
    isType.equal<true, JustEmpty, R>()
  })

  it('does not accept more than one parameter', () => {
    isType.equal<true, true, CanAssign<(a: number) => [], JustFunction>>()
    isType.equal<true, true, CanAssign<(a: number) => JustEmpty, JustFunction>>()
    isType.equal<true, false, CanAssign<(a: number, b: number) => JustEmpty, JustFunction>>()
    isType.equal<true, false, CanAssign<(a: number, b?: number) => JustEmpty, JustFunction>>()
    isType.equal<true, false, CanAssign<(a?: number, b?: number) => JustEmpty, JustFunction>>()

    // This is really just checking for the generic types default value.
    // Cannot enforce this with just `JustFunction` because generic types can always be `any`
    // Below is showing this false positive case.
    isType.equal<true, true, CanAssign<(a: number, b: number) => JustEmpty, JustFunction<any, any>>>()
  })

  it('accepts second param as `JustMetaParam', () => {
    isType.equal<true, true, CanAssign<(a: number, meta?: JustMetaParam) => JustEmpty, JustFunction>>()

    const f: JustFunction<[string, StackTraceMeta]> = (_: string, _meta?: StackTraceMeta) => []

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [string, StackTraceMeta], P>()
    isType.equal<true, JustEmpty, R>()
  })

  it('does not allow return void and other invalid types', () => {
    // All these are invalid, uncomment to check
    // can't find a way to test this
    // type ReturnNotVoid = JustFunction<any, void>
    // type ReturnNotScalar = JustFunction<any, number>
    // type ReturnNotArray = JustFunction<any, number[]>
    // type ReturnNotObject = JustFunction<any, { a: number }>
    // type ReturnNot3Tuple = JustFunction<any, [number, number, number]>
    // type ReturnNotMeta = JustFunction<any, [number, number]>

    // This is an example showing it is not possible to enforce these with just the type alone.
    // Need to enforce it with the helper function `justFunction()`.
    isType.equal<true, true, CanAssign<(a: number) => void, JustFunction<any, any>>>()
  })

  it('works with JustEmpty', () => {
    const f: JustFunction<[], JustEmpty> = () => []

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [], P>()
    isType.equal<true, readonly [], R>()
    isType.equal<true, JustEmpty, R>()
  })

  it('can return JustUno', () => {
    const f: JustFunction<[], JustUno<number>> = () => [1]

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [], P>()
    isType.equal<true, JustUno<number>, R>()
  })

  it('adjust [T] to readonly [T] (JustUno)', () => {
    const f: JustFunction<[], [number]> = () => [1]

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [], P>()
    isType.equal<true, JustUno<number>, R>()
  })

  it('can return number literal', () => {
    const f: JustFunction<[], JustUno<1 | 2 | 3>> = () => [1]

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [], P>()
    isType.equal<true, readonly [1 | 2 | 3], R>()
    isType.equal<true, JustUno<1 | 2 | 3>, R>()
  })

  it('can return JustDuo', () => {
    const f: JustFunction<[], JustDuo<number, { log: string }>> = () => [1, { log: 'hello' }]

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [], P>()
    isType.equal<true, readonly [number, { log: string }], R>()
    isType.equal<true, JustDuo<number, { log: string }>, R>()
  })

  it('adjust [V, M] to readonly [V, M] (JustDuo)', () => {
    const f: JustFunction<[], [number, { log: string }]> = () => [1, { log: 'hello' }]

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [], P>()
    isType.equal<true, readonly [number, { log: string }], R>()
    isType.equal<true, JustDuo<number, { log: string }>, R>()
  })
})

describe(`${justFunction.name}()`, () => {
  it('infers () => JustEmpty', () => {
    const f = justFunction(() => [])

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [], P>()
    isType.equal<true, JustEmpty, R>()
  })

  it('does not accept more than one param', () => {
    isType.equal<true, false, CanAssign<[(a: number, b: number) => JustEmpty], Parameters<typeof justFunction>>>()
  })

  it('infers (value) => JustUno', () => {
    const f = justFunction((_: number) => [1])

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [number], P>()
    isType.equal<true, JustUno<number>, R>()
  })

  it('infers (value, meta) => JustUno', () => {
    const f = justFunction((_: number, _m: StackTraceMeta) => [1])

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [number, StackTraceMeta], P>()
    isType.equal<true, JustUno<number>, R>()
  })

  it('infers () => JustDuo', () => {
    const f = justFunction(() => [1, { log: 'hello' }])
    expect(f()).toEqual([1, { log: 'hello' }])

    type P = Parameters<typeof f>
    type R = ReturnType<typeof f>
    isType.equal<true, [], P>()
    isType.equal<true, JustDuo<number, { log: string }>, R>()
  })
})

describe('JustEmpty', () => {
  it('can pass to function with no arguments', () => {
    const value: JustEmpty = []
    procedure(...value)
  })
})

describe('JustUno', () => {
  it('can pass to unit function', () => {
    const x: JustUno<number> = [1]
    unit(...x)
  })
})

describe('JustDuo', () => {
  it('can pass to function expecting meta', () => {
    const x: JustDuo<number, { logs: string[] }> = [1, { logs: [] }]
    duo(...x)
  })
})

describe('JustValue', () => {
  it('is JustEmpty by default', () => {
    isType.equal<true, JustEmpty, JustValue>()
  })
  it('is JustUno when only Value is specified', () => {
    isType.equal<true, JustUno<number>, JustValue<number>>()
  })
  it('is JustDuo when both Value and Meta are specified', () => {
    isType.equal<true, JustDuo<number, { logs: string[] }>, JustValue<number, { logs: string[] }>>()
  })
  it('is JustDuo when Meta is specified and Value is undefined', () => {
    isType.equal<true, JustDuo<undefined, { logs: string[] }>, JustValue<undefined, { logs: string[] }>>()
  })

  it('is JustUno when value has undefined with other types', () => {
    type A = JustValue<number | undefined>
    isType.equal<true, JustUno<number | undefined>, A>()
  })
})

describe(`${justValue.name}()`, () => {
  it('infers JustEmpty', () => {
    const r = justValue([])
    isType.equal<true, JustEmpty, typeof r>()
  })

  it('infers JustUno', () => {
    const r = justValue([1])
    isType.equal<true, JustUno<number>, typeof r>()
  })

  it('infers JustDuo', () => {
    const r = justValue([1, { log: 1 }])
    isType.equal<true, JustDuo<number, { log: number }>, typeof r>()
  })
})

describe('JustResult', () => {
  it('defaults to void', () => {
    function returnVoid(): JustResult { }
    const r = returnVoid()
    isType.equal<true, void, typeof r>()
  })

  it('can specify value as undefined', () => {
    function returnUndefined(): JustResult<undefined> { return undefined }
    const r = returnUndefined()
    isType.equal<true, undefined, typeof r>()
  })

  it('can specify specific value', () => {
    function returnNumber(): JustResult<number> { return 0 }
    const r = returnNumber()
    isType.equal<true, number, typeof r>()
  })

  it('can specify specific value with undefined', () => {
    function returnNumber(): JustResult<number | undefined> { return }
    const r = returnNumber()
    isType.equal<true, number | undefined, typeof r>()
  })

  it('does not support single level array', () => {
    isType.equal<true, false, CanAssign<number[], JustResult>>()
  })

  it('can specify array, which goes into the tuple', () => {
    function returnArray(): JustResult<number[]> { return [[1]] }
    const r = returnArray()
    isType.equal<true, JustUno<number[]>, typeof r>()
  })

  it('can specify array or undefined', () => {
    function returnArray(): JustResult<number[] | undefined> { return }
    const r = returnArray()
    isType.equal<true, JustUno<number[]> | undefined, typeof r>()
  })

  it('can specify meta', () => {
    function returnMeta(): JustResult<string, { a: string }> {
      return ['', { a: '' }]
    }
    const r = returnMeta()
    isType.equal<true, JustDuo<string, { a: string }>, typeof r>()
  })

  it('can specify meta with array as value', () => {
    function returnMeta(): JustResult<string[], { a: string }> {
      return [[''], { a: '' }]
    }
    const r = returnMeta()
    isType.equal<true, JustDuo<string[], { a: string }>, typeof r>()
  })
})

describe('JustMeta', () => {
  it('accepts object with string keys', () => {
    function foo(_params?: undefined, _meta?: JustMeta) { }
    foo(undefined, { a: 1 })
  })
  it('accepts object with symbol keys', () => {
    function foo(_params?: undefined, _meta?: JustMeta) { }
    foo(undefined, { [Symbol.for('abc')]: 1 })
  })
  it('is readonly', () => {
    isType.equal<true, Readonly<{
      error?: Error,
      [k: string | symbol]: any
    }>, JustMeta>()
  })
  it('accept and error prop by default', () => {
    // code completion is available
    const meta: JustMeta = { error: new Error() }
    expect(meta.error).toBeDefined()
    isType.equal<true, true, CanAssign<{ error: Error }, JustMeta>>()
  })
})

describe('StackTraceMeta', () => {
  it('is a JustMeta', () => {
    isType.equal<true, true, CanAssign<StackTraceMeta, JustMeta>>()
  })
})
