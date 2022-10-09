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
  Value = void,
  Meta extends JustMeta | undefined = undefined> =
  (Meta extends JustMeta
    ? JustDuo<Value, Meta>
    : Equal<Value, void, JustEmpty, JustUno<Value>>)

export type JustResult<
  Value = void,
  Meta extends JustMeta | undefined = undefined> =
  (Meta extends JustMeta
    ? JustDuo<Value, Meta>
    : (Value extends Array<any> ? JustUno<Value> : Value))

export function justValue<
  Value = void,
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

/**
 * Describes what JustValues can be.
 * While `JustValue` infers the type of a single JustValue.
 */
export type JustValues = JustEmpty | JustUno<any> | JustDuo<any, JustMeta>

export type JustFunction<
  Param extends JustParams = JustParams,
  R extends JustValues = JustEmpty
> = (...args: Param) => (R extends [infer V, infer M]
  ? readonly [V, M]
  : (R extends [infer V] ? readonly [V] : R)
)

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
