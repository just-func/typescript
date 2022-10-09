import { CanAssign, isType } from 'type-plus'
import { JustDuo, JustUno, JustEmpty, JustValue } from '.'
import { justFunction, JustFunction, JustMeta, JustResult, justValue, StackTraceMeta } from './Just'
import { duo, procedure, unit } from './testFn'

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
    expect(r).toBe(undefined)
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

describe('JustFunction', () => {
  it('defaults to (args?: any) => JustEmpty', () => {
    const f: JustFunction = () => []
    expect(f()).toEqual([])

    isType.equal<true, [arg?: any], Parameters<typeof f>>()
    isType.equal<true, JustEmpty, ReturnType<typeof f>>()
  })

  it('do not accept more than one parameter', () => {
    isType.equal<true, true, CanAssign<(a: number) => [], JustFunction>>()
    isType.equal<true, false, CanAssign<(a: number, b: number) => [], JustFunction>>()
  })
})

describe(`${justFunction.name}()`, () => {
  it('infers () => JustUno', () => {
    const f = justFunction(() => [1])
    expect(f()).toEqual([1])

    isType.equal<true, [], Parameters<typeof f>>()
    isType.equal<true, JustUno<number>, ReturnType<typeof f>>()
  })

  it('infers () => JustDuo', () => {
    const f = justFunction(() => [1, { log: 'hello' }])
    expect(f()).toEqual([1, { log: 'hello' }])

    isType.equal<true, [], Parameters<typeof f>>()
    isType.equal<true, JustDuo<number, { log: string }>, ReturnType<typeof f>>()
  })

  it('infers (value) => JustEmpty', () => {
    const f = justFunction((_v: number) => [])
    expect(f(1)).toEqual([])

    isType.equal<true, [number], Parameters<typeof f>>()
    isType.equal<true, JustEmpty, ReturnType<typeof f>>()
  })
})
