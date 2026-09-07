import { isJustEmpty, type JustEmpty, type JustFunction, type JustUno, justValue } from '@just-func/types'
import { isType } from 'type-plus'
import { compose } from './index'

describe(`${compose.name}()`, () => {
	it('returns JustEmpty if the input array is empty', () => {
		const result = compose([])

		expect(isJustEmpty(result())).toBe(true)
	})

	it('results result from first function', () => {
		// @ts-expect-error just-func/typescript#413: justValue() cannot infer Value from a conditional-type position, so it narrows to JustEmpty.
		const result = compose([() => justValue([1])])

		expect(result()).toEqual([1])
		// @ts-expect-error just-func/typescript#413: justValue() cannot infer Value from a conditional-type position, so it narrows to JustEmpty.
		isType.equal<true, JustFunction<JustEmpty, JustUno<number>>, typeof result>()
	})

	it('compose calls', () => {
		const result = compose([
			() => justValue([]),
			// @ts-expect-error just-func/typescript#413: justValue() cannot infer Value from a conditional-type position, so it narrows to JustEmpty.
			() => justValue([1]),
			// @ts-expect-error just-func/typescript#413: justValue() cannot infer Value from a conditional-type position, so it narrows to JustEmpty.
			(v: number) => justValue([String(v + 1)]),
		])

		expect(result()).toEqual(['2'])
		// @ts-expect-error just-func/typescript#413: justValue() cannot infer Value from a conditional-type position, so it narrows to JustEmpty.
		isType.equal<true, JustFunction<JustEmpty, JustUno<string>>, typeof result>()
	})

	it('optional param', () => {
		// when the function accepts a single optional param,
		// it is natually to do `(arg?: T) => any`.
		// when the function accepts more than one params with some optionals,
		// it is also natually to accept and array `([a,b?,c]) => any`
		//
		// there are two more cases to consider:
		// `([a?]) => any`: accepting a tuple of 0 or 1 element.
		// In first glance, this seems to be 1-1 map/alternative of `(a?) => any`.
		// However, if that is accepted, it compromise the meaning of `(T[]) => any`.
		// meaning we will need the double-array form for arrays as in the return value.
		// and `([]) => any` means passing in nothing (`void`).
		//
		// `([...args: T[]]) => any`: this is really just `(T[]) => any`
		const result = compose([
			() => justValue([]),
			// @ts-expect-error just-func/typescript#413: justValue() cannot infer Value from a conditional-type position, so it narrows to JustEmpty.
			(arg?: number) => justValue([[[arg ?? 1]]]),
			// @ts-expect-error just-func/typescript#413: justValue() cannot infer Value from a conditional-type position, so it narrows to JustEmpty.
			([arg, opt]: [arg: number[], opt?: number]) => justValue([String(arg.join(',') + (opt ?? 2))]),
		])

		expect(result()).toEqual(['12'])
	})
	it.todo('passing array')

	it.todo('handle error')
})
