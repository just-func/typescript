import type { AnyFunction, Equal } from 'type-plus'

export type JustMeta = { readonly [k: string | symbol]: any }

export type ErrorMeta = { readonly error?: Error }

/**
 * Used by code that support adjusting their stacktrace when error occurs.
 */
export type StackTraceMeta = {
  ssf?: AnyFunction
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
export type JustDuo<Value, Meta extends JustMeta = JustMeta> = readonly [Value, Meta]

/**
 * Infers a JustValue
 */
export type JustValue<
  Value = void,
  Meta extends JustMeta | undefined = undefined> =
  (Meta extends JustMeta
    ? JustDuo<Value, Meta>
    : Equal<Value, void, JustEmpty, JustUno<Value>>)

/**
 * Adjust the Value type to a proper JustValue.
 * @type Value the value already in the right type, e.g. `[number]`.
 * This type adjust it to `JustUno<number>`.
 */
export type ToJustValue<Value> = Value extends [infer V, infer M]
  ? readonly [V, M]
  : (Value extends [infer V] ? readonly [V] : Value)

/**
 * Describes what JustValues can be.
 * While `JustValue` infers the type of a single JustValue.
 */
export type JustValues = JustEmpty | JustUno<any> | JustDuo<any, JustMeta>

export function justValue(): JustEmpty
export function justValue<
  Value = void,
  Meta extends JustMeta | undefined = undefined
>(value: JustValue<Value, Meta>): JustValue<Value, Meta>
export function justValue(value?: unknown) { return value ?? [] }

export type JustResult<
  Value = void,
  Meta extends JustMeta | undefined = undefined> =
  (Meta extends JustMeta
    ? JustDuo<Value, Meta>
    : (Value extends Array<any> ? JustUno<Value> : Value))

export type JustFunction<
  Param extends JustValues = JustEmpty,
  R extends JustValues = JustEmpty
> = (...args: Param) => ToJustValue<R>

export function justFunction<
  Param extends JustValues,
  R extends JustEmpty
>(fn: JustFunction<Param, R>): JustFunction<Param, readonly []>
export function justFunction<
  Param extends JustValues,
  R extends JustUno<any>
>(fn: JustFunction<Param, R>): JustFunction<Param, R extends JustUno<infer V> ? JustUno<V> : never>
export function justFunction<
  Param extends JustValues,
  R extends JustDuo<any, JustMeta>
>(fn: JustFunction<Param, R>): JustFunction<Param, R extends JustDuo<infer V, infer M> ? JustDuo<V, M> : never>
export function justFunction(fn: unknown) {
  return fn
}
