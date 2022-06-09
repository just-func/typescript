import { CanAssign, isType } from 'type-plus'
import { JustDuo, JustUno, JustEmpty, JustValue } from '.'
import { JustMeta, JustResult, StackTraceMeta } from './Just'
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
    function foo(params?: undefined, meta?: JustMeta) { }
    foo(undefined, { a: 1 })
  })
  it('accepts object with symbol keys', () => {
    function foo(params?: undefined, meta?: JustMeta) { }
    foo(undefined, { [Symbol.for('abc')]: 1 })
  })
  it('is readonly', () => {
    isType.equal<true, Readonly<{
      error?: Error
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
