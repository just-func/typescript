import type { JustEmpty, JustFunction } from '@just-func/types'
import type { Head, Last } from 'type-plus'

export function compose<FS extends []>(justFunctions: FS): () => JustEmpty
export function compose<
  FS extends [JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
  | [JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>, JustFunction<any, any>]
>(justFunctions: FS)
  : (...args: Parameters<Head<FS>>) => ReturnType<Last<FS>>
export function compose(justFunctions: any[]) {
  return () => justFunctions.reduce((p, f) => f(...p), [])
}
