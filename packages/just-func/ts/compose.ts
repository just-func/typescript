import type { JustEmpty, JustFunction } from '@just-func/types'
import type { Head, Last } from 'type-plus'

export function compose<FS extends []>(justFunctions: FS): () => JustEmpty
export function compose<
	FS extends
		| [JustFunction<any, any>]
		| [JustFunction<any, any>, JustFunction<any, any>]
		| [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
		| [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ]
		| [
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
				JustFunction<any, any>,
		  ],
>(justFunctions: FS): (...args: Parameters<Head<FS>>) => ReturnType<Last<FS>>
export function compose(justFunctions: any[]) {
	// The accumulator is spread as call ARGUMENTS, not concatenated into a growing
	// array, so the O(n^2) copy the rule targets does not happen here.
	// biome-ignore lint/performance/noAccumulatingSpread: spread as arguments, not concatenation
	return () => justFunctions.reduce((p, f) => f(...p), [])
}
