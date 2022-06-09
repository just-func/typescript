import { assertType, isType } from 'type-plus'
import { JustDuo, JustUno, JustEmpty, toJustValue } from '.'
import { procedure } from './testFn'

it('returns JustEmpty when the function returns nothing', () => {
  const r = toJustValue(procedure())
  isType.equal<true, JustEmpty, typeof r>()
  expect(r).toEqual([])
})

it('returns JustEmpty when the value is undefined', () => {
  const r = toJustValue(undefined)
  isType.equal<true, JustEmpty, typeof r>()
  expect(r).toEqual([])
})

it('returns JustEmpty when the value is [] (JustEmpty)', () => {
  const r = toJustValue([])
  isType.equal<true, JustEmpty, typeof r>()
})

it('wrap values not undefined or array into JustUno', () => {
  assertType<JustUno<null>>(assertWrapValue(null))
  assertType<JustUno<true>>(assertWrapValue(true))
  assertType<JustUno<false>>(assertWrapValue(false))
  assertType<JustUno<string>>(assertWrapValue('a'))
  assertType<JustUno<number>>(assertWrapValue(1))
  assertType<JustUno<object>>(assertWrapValue({}))
})
function assertWrapValue<V>(value: V) {
  const r = toJustValue(value)
  expect(r).toEqual([value])
  return r
}

it('returns JustUno inferring Value type', () => {
  const r = toJustValue([1])
  isType.equal<true, JustUno<number>, typeof r>()
})

it('returns JustUno inferring literal Value type', () => {
  const r = toJustValue([1 as const])
  isType.equal<true, JustUno<1>, typeof r>()
})


it('returns JustDuo inferring Value and Meta', () => {
  const r = toJustValue(['a', { logs: ['abc'] }])

  isType.equal<true, JustDuo<string, { logs: string[] }>, typeof r>()
})

it('can accept a JustMeta (but not used)', () => {
  expect(toJustValue(1, {})).toEqual([1])
})
