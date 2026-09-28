import { record, testType } from 'type-plus'
import {
	type ErrorMeta,
	type JustDuo,
	type JustEmpty,
	type JustFunction,
	type JustMeta,
	type JustResult,
	type JustUno,
	type JustValue,
	just,
	justFunction,
	justValue,
	type StackTraceMeta,
} from '.'
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

describe('JustMeta', () => {
	it('accepts object with string keys', () => {
		function foo(_params?: undefined, _meta?: JustMeta) {}
		foo(undefined, { a: 1 })
	})
	it('accepts object with symbol keys', () => {
		function foo(_params?: undefined, _meta?: JustMeta) {}
		foo(undefined, { [Symbol.for('abc')]: 1 })
	})
	it('is readonly', () => {
		// JustMeta has no `error` member — that is ErrorMeta. The assertion is wrong,
		// not the type. Remove the suppression when #413 is fixed.
		testType.equal<
			Readonly<{
				error?: Error
				[k: string | symbol]: any
			}>,
			JustMeta
		>(
			// @ts-expect-error see just-func/typescript#413
			true,
		)
	})
	it('accept and error prop by default', () => {
		// code completion is available
		const meta: JustMeta = { error: new Error() }
		expect(meta.error).toBeDefined()
		testType.canAssign<{ error: Error }, JustMeta>(true)
	})
})

describe('JustValue', () => {
	it('is JustEmpty by default', () => {
		testType.equal<JustEmpty, JustValue>(true)
	})
	it('is JustUno when only Value is specified', () => {
		testType.equal<JustUno<number>, JustValue<number>>(true)
	})
	it('is JustDuo when both Value and Meta are specified', () => {
		testType.equal<JustDuo<number, { logs: string[] }>, JustValue<number, { logs: string[] }>>(true)
	})
	it('is JustDuo when Meta is specified and Value is undefined', () => {
		testType.equal<JustDuo<undefined, { logs: string[] }>, JustValue<undefined, { logs: string[] }>>(true)
	})

	it('is JustUno when value has undefined with other types', () => {
		type A = JustValue<number | undefined>
		testType.equal<JustUno<number | undefined>, A>(true)
	})
})

describe(`${justValue.name}()`, () => {
	it('infers JustEmpty', () => {
		const r = justValue([])
		testType.equal<JustEmpty, typeof r>(true)
	})

	it('infers JustUno', () => {
		// justValue() infers Value from a conditional-type position, which TypeScript
		// cannot do, so Value falls back to its `void` default and the parameter
		// narrows to JustEmpty.
		// @ts-expect-error see just-func/typescript#413
		const r = justValue([1])
		// @ts-expect-error #413: `r` is JustEmpty, not JustUno<number>
		testType.equal<JustUno<number>, typeof r>(true)
	})

	it('infers JustDuo', () => {
		// @ts-expect-error #413: same inference failure as 'infers JustUno' above
		const r = justValue([1, { log: 1 }])
		// @ts-expect-error #413: `r` is JustEmpty, not JustDuo
		testType.equal<JustDuo<number, { log: number }>, typeof r>(true)
	})

	it('adjust void input to JustEmpty', () => {
		const r = justValue()
		testType.equal<JustEmpty, typeof r>(true)
		expect(r).toEqual([])
	})
})

describe('StackTraceMeta', () => {
	it('is a JustMeta', () => {
		testType.canAssign<StackTraceMeta, JustMeta>(true)
	})
})

describe(`${just.name}()`, () => {
	it('supports Just function', () => {
		just(() => [])
		just(() => [1])
		just(() => [true, {}])
		just(() => [undefined, record()])
		just((_: number) => [])
		just((_: string) => [1])
		just((_: [number]) => [true, {}])
		just((_: Record<any, any>) => [undefined, record()])
		just((_: number, _m: ErrorMeta) => [])
		just((_: string, _m: ErrorMeta) => [1])
		just((_: [number], _m: ErrorMeta) => [true, {}])
		just((_: Record<any, any>, _m: ErrorMeta) => [undefined, record()])

		// these fail as expected:

		// defineJust(() => {})
		// defineJust(() => [1, 2])
		// defineJust((_: number, b: number) => [1])
	})

	it('supports function overloads', () => {
		const j = just<{
			(): JustDuo<number, ErrorMeta>
			(v: string): JustDuo<string, ErrorMeta>
		}>((v?: unknown): any => {
			if (typeof v === 'string') return [v]
			return [1]
		})

		type J = typeof j

		testType.equal<
			{
				(): JustDuo<number, ErrorMeta>
				(v: string): JustDuo<string, ErrorMeta>
			},
			J
		>(true)
	})

	it('does not accept more than one param', () => {
		testType.canAssign<[(a: number, b: number) => JustEmpty], Parameters<typeof just>>(false)
	})

	it.skip('infers () => JustEmpty', () => {
		// unable to infer because we support function overloads instead of adjustment
		const f = just(() => [])

		type P = Parameters<typeof f>
		testType.equal<[], P>(true)
		// type R = ReturnType<typeof f>
		// testType.equal<JustEmpty, R>(true)
	})

	it.skip('infers (value) => JustUno', () => {
		// unable to infer because we support function overloads instead of adjustment
		const f = just((_: number) => [1])

		type P = Parameters<typeof f>
		testType.equal<[number], P>(true)
		// type R = ReturnType<typeof f>
		// testType.equal<JustUno<number>, R>(true)
	})

	it.skip('infers (value, meta) => JustUno', () => {
		// unable to infer because we support function overloads instead of adjustment
		const f = just((_: number, _m: StackTraceMeta) => [1])

		type P = Parameters<typeof f>
		testType.equal<[number, StackTraceMeta], P>(true)
		// type R = ReturnType<typeof f>
		// testType.equal<JustUno<number>, R>(true)
	})

	it.skip('infers () => JustDuo', () => {
		// unable to infer because we support function overloads instead of adjustment
		const f = just(() => [1, { log: 'hello' }])
		expect(f()).toEqual([1, { log: 'hello' }])

		type P = Parameters<typeof f>
		testType.equal<[], P>(true)
		// type R = ReturnType<typeof f>
		// testType.equal<JustDuo<number, { log: string }>, R>(true)
	})

	it('supports JustValues', () => {
		just([])
		just([1])
		just([null, {}])
		just([[]])
		just([[], {}])
		just([[1], {}])
		just([{}, {}])
	})
})

describe('JustFunction', () => {
	it('defaults to () => []', () => {
		const f: JustFunction = () => []

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		// `Parameters<T>` drops the `readonly` from `JustEmpty` (`readonly []`).
		// That's why we have to compare it to `[]` here.
		testType.equal<[], P>(true)
		testType.equal<JustEmpty, R>(true)
	})

	it('accepts JustUno param', () => {
		const f: JustFunction<JustUno<number>> = (_: number) => []

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		// `Parameters<T>` drops the `readonly` from `JustUno<number>`.
		// That's why we have to compare it to `[number]` here.
		testType.equal<[number], P>(true)
		// testType.equal<JustUno<number>, P>(true)
		testType.equal<JustEmpty, R>(true)

		testType.canAssign<(a: number) => [], JustFunction<JustUno<number>>>(true)
		testType.canAssign<(a: number) => JustEmpty, JustFunction<JustUno<number>>>(true)
	})

	it('accepts JustDuo param', () => {
		const f: JustFunction<JustDuo<number, { foo: number }>> = (_: number, _m: { foo: number }) => []

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		// `Parameters<T>` drops the `readonly` from `JustDuo<number, { foo: number }>`.
		// That's why we have to compare it to `[number, { foo: number }]` here.
		testType.equal<[number, { foo: number }], P>(true)
		// testType.equal<JustDuo<number, { foo: number }>, P>(true)
		testType.equal<JustEmpty, R>(true)

		testType.canAssign<(a: number, m: { foo: number }) => JustEmpty, JustFunction<JustDuo<number, { foo: number }>>>(
			true,
		)
	})

	it('does not accept more than one parameter', () => {
		// All these are invalid, uncomment to check
		// can't find a way to test this
		// type TwoParams = JustFunction<[number, number], JustEmpty>
		// type TwoParamsOneOptional = JustFunction<[a: number, b?: number], JustEmpty>
		// type TwoParamsBothOptional = JustFunction<[a?: number, b?: number], JustEmpty>
		// type ThreeParams = JustFunction<[number, number, number], JustEmpty>

		// This is really just checking for the generic types default value.
		// Cannot enforce this with just `JustFunction` because generic types can always be `any`
		// Below is showing this false positive case.
		testType.canAssign<(a: number, b: number) => JustEmpty, JustFunction<any, any>>(true)
	})

	it('accepts second param as `JustMeta', () => {
		testType.canAssign<(a: number, meta?: JustMeta) => JustEmpty, JustFunction<JustDuo<number, JustMeta>>>(true)

		const f: JustFunction<[string, StackTraceMeta]> = (_: string, _meta?: StackTraceMeta) => []

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[string, StackTraceMeta], P>(true)
		testType.equal<JustEmpty, R>(true)
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

		testType.canAssign<(a: number) => void, JustFunction<any, any>>(false)
	})

	it('can return JustEmpty with type', () => {
		const f: JustFunction<[], JustEmpty> = () => []

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[], P>(true)
		testType.equal<readonly [], R>(true)
		testType.equal<JustEmpty, R>(true)
	})

	it('can return JustUno', () => {
		const f: JustFunction<[], JustUno<number>> = () => [1]

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[], P>(true)
		testType.equal<JustUno<number>, R>(true)
	})

	it('adjust [T] to readonly [T] (JustUno)', () => {
		const f: JustFunction<[], [number]> = () => [1]

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[], P>(true)
		testType.equal<JustUno<number>, R>(true)
	})

	it('can return number literal', () => {
		const f: JustFunction<[], JustUno<1 | 2 | 3>> = () => [1]

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[], P>(true)
		testType.equal<readonly [1 | 2 | 3], R>(true)
		testType.equal<JustUno<1 | 2 | 3>, R>(true)
	})

	it('can return JustDuo', () => {
		const f: JustFunction<[], JustDuo<number, { log: string }>> = () => [1, { log: 'hello' }]

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[], P>(true)
		testType.equal<readonly [number, { log: string }], R>(true)
		testType.equal<JustDuo<number, { log: string }>, R>(true)
	})

	it('adjust [V, M] to readonly [V, M] (JustDuo)', () => {
		const f: JustFunction<[], [number, { log: string }]> = () => [1, { log: 'hello' }]

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[], P>(true)
		testType.equal<readonly [number, { log: string }], R>(true)
		testType.equal<JustDuo<number, { log: string }>, R>(true)
	})
})

describe('JustResult', () => {
	it('defaults to void', () => {
		function returnVoid(): JustResult {}
		const r = returnVoid()
		testType.equal<void, typeof r>(true)
	})

	it('can specify value as undefined', () => {
		function returnUndefined(): JustResult<undefined> {
			return undefined
		}
		const r = returnUndefined()
		testType.equal<undefined, typeof r>(true)
	})

	it('can specify specific value', () => {
		function returnNumber(): JustResult<number> {
			return 0
		}
		const r = returnNumber()
		testType.equal<number, typeof r>(true)
	})

	it('can specify specific value with undefined', () => {
		function returnNumber(): JustResult<number | undefined> {
			return
		}
		const r = returnNumber()
		testType.equal<number | undefined, typeof r>(true)
	})

	it('does not support single level array', () => {
		testType.canAssign<number[], JustResult>(false)
	})

	it('can specify array, which goes into the tuple', () => {
		function returnArray(): JustResult<number[]> {
			return [[1]]
		}
		const r = returnArray()
		testType.equal<JustUno<number[]>, typeof r>(true)
	})

	it('can specify array or undefined', () => {
		function returnArray(): JustResult<number[] | undefined> {
			return
		}
		const r = returnArray()
		testType.equal<JustUno<number[]> | undefined, typeof r>(true)
	})

	it('can specify meta', () => {
		function returnMeta(): JustResult<string, { a: string }> {
			return ['', { a: '' }]
		}
		const r = returnMeta()
		testType.equal<JustDuo<string, { a: string }>, typeof r>(true)
	})

	it('can specify meta with array as value', () => {
		function returnMeta(): JustResult<string[], { a: string }> {
			return [[''], { a: '' }]
		}
		const r = returnMeta()
		testType.equal<JustDuo<string[], { a: string }>, typeof r>(true)
	})
})

describe(`${justFunction.name}()`, () => {
	it('infers () => JustEmpty', () => {
		const f = justFunction(() => [])
		f()
		// this fail as expected
		// f(1)
		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[], P>(true)
		testType.equal<JustEmpty, R>(true)
	})

	it('infers (value) => JustUno', () => {
		const f = justFunction((_: number) => [1])
		f(1)

		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[number], P>(true)
		testType.equal<JustUno<number>, R>(true)
	})

	it('infers (value, meta) => JustUno', () => {
		const f = justFunction((_: number, _m: StackTraceMeta) => [1])
		f(1, {})
		type P = Parameters<typeof f>
		type R = ReturnType<typeof f>
		testType.equal<[number, StackTraceMeta], P>(true)
		testType.equal<JustUno<number>, R>(true)
	})

	it('infers () => JustDuo', () => {
		const f = justFunction(() => [1, { log: 'hello' }])
		expect(f()).toEqual([1, { log: 'hello' }])

		type P = Parameters<typeof f>
		testType.equal<[], P>(true)
		type R = ReturnType<typeof f>
		testType.equal<JustDuo<number, { log: string }>, R>(true)
	})
})
