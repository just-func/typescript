import type { AnyFunction, Equal } from 'type-plus'

export type JustMeta = {
  readonly error?: Error,
  readonly [k: string | symbol]: any
}

/**
 * Just data with no value.
 */
export type JustEmpty = readonly []
/**
 * Just data with a single value.
 */
export type JustUno<Value> = readonly [Value]
/**
 * Just data with both value and metadata
 */
export type JustDuo<Value, Meta extends JustMeta> = readonly [Value, Meta]

export type JustValue<
  Value = undefined,
  Meta extends JustMeta | undefined = undefined> =
  (Meta extends JustMeta
    ? JustDuo<Value, Meta>
    : (Equal<Value, undefined> extends true
      ? JustEmpty
      : JustUno<Value>))

export type JustResult<
  Value = void,
  Meta extends JustMeta | undefined = undefined> =
  (Meta extends JustMeta
    ? JustDuo<Value, Meta>
    : (Value extends Array<any> ? JustUno<Value> : Value))

export function justValue<
  Value = undefined,
  Meta extends JustMeta | undefined = undefined>(value: JustValue<Value, Meta>) {
  return value
}

/**
 * Used by code that support adjusting their stacktrace when error occurs.
 */
export type StackTraceMeta = {
  ssf?: AnyFunction
}

export type JustMetaParam = {
  readonly [k: string | symbol]: any
}

export type JustParams = [arg?: any, meta?: JustMetaParam]

export type JustReturnTypes = JustEmpty | JustUno<any> | JustDuo<any, JustMeta>

export type JustFunction<
  Param extends JustParams = JustParams,
  R extends JustReturnTypes = JustEmpty
> = (...args: Param) => (R extends readonly [infer V, infer M] ? readonly [V, M] : R)

export function justFunction<
  Param extends JustParams,
  R extends JustEmpty
>(fn: JustFunction<Param, R>): JustFunction<Param, readonly []>
export function justFunction<
  Param extends JustParams,
  R extends JustUno<any>
>(fn: JustFunction<Param, R>): JustFunction<Param, R extends JustUno<infer V> ? JustUno<V> : never>
export function justFunction<
  Param extends JustParams,
  R extends JustDuo<any, JustMeta>
>(fn: JustFunction<Param, R>): JustFunction<Param, R extends JustDuo<infer V, infer M> ? JustDuo<V, M> : never>
export function justFunction(fn: unknown) {
  return fn
}
