import { testType } from 'type-plus'
import { isJustEmpty, type JustDuo, type JustEmpty, type JustUno, toJustValue } from '.'
import { procedure } from './testFn'

it('returns JustEmpty when the function returns nothing', () => {
	const r = toJustValue(procedure())
	testType.equal<JustEmpty, typeof r>(true)
	expect(r).toEqual([])
})

it('returns JustEmpty when the value is undefined', () => {
	const r = toJustValue(undefined)
	testType.equal<JustEmpty, typeof r>(true)
	expect(r).toEqual([])
})

it('returns JustEmpty when the value is [] (JustEmpty)', () => {
	const r = toJustValue([])
	testType.equal<JustEmpty, typeof r>(true)
})

it('wrap values not undefined or array into JustUno', () => {
	assertWrapValue(null) satisfies JustUno<null>
	assertWrapValue(true) satisfies JustUno<true>
	assertWrapValue(false) satisfies JustUno<false>
	assertWrapValue('a') satisfies JustUno<string>
	assertWrapValue(1) satisfies JustUno<number>
	assertWrapValue({}) satisfies JustUno<object>
})
function assertWrapValue<V>(value: V) {
	const r = toJustValue(value)
	expect(r).toEqual([value])
	return r
}

it('returns JustUno inferring Value type', () => {
	const r = toJustValue([1])
	testType.equal<JustUno<number>, typeof r>(true)
})

it('returns JustUno inferring literal Value type', () => {
	const r = toJustValue([1 as const])
	testType.equal<JustUno<1>, typeof r>(true)
})

it('returns JustDuo inferring Value and Meta', () => {
	const r = toJustValue(['a', { logs: ['abc'] }])

	testType.equal<JustDuo<string, { logs: string[] }>, typeof r>(true)
})

it('can accept a JustMeta (but not used)', () => {
	expect(toJustValue(1, {})).toEqual([1])
})

it('allow to be called without arugments', () => {
	expect(isJustEmpty(toJustValue())).toBe(true)
})
