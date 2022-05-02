import { isType } from 'type-plus'
import { JustDuo, JustUno, JustEmpty, JustValue } from '.'
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
})
