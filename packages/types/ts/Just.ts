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
export type ToJustValue<Value> = Value extends readonly [infer V, infer M]
  ? readonly [V, M]
  : (Value extends readonly [infer V] ? readonly [V] : readonly [])

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

/**
 * Type of functions in `just-func`.
 * This type describe one function,
 * does not support function overloads.
 *
 * This can be used for type guard.
 */
export type JustFunction<
  Param extends JustValues = JustEmpty,
  R extends JustValues = JustEmpty
> = (...args: Param) => ToJustValue<R>

/**
 * Define a `just-func` function
 * @deparecated `just()` is probably better.
 */
export function justFunction<
  F extends JustFunction<any, any>
>(fn: F): Parameters<F> extends readonly []
  ? () => ToJustValue<ReturnType<F>>
  : (Parameters<F> extends readonly [infer V]
    ? (v: V) => ToJustValue<ReturnType<F>>
    : (Parameters<F> extends readonly [infer V, infer M]
      ? (v: V, m: M) => ToJustValue<ReturnType<F>>
      : never
    )) {
  return fn as any
}

/**
 * Write code compliant with `just-func`.
 */
export function just<F extends (v: any, meta: JustMeta) => JustValues>(fn: F): F
export function just<V, M extends JustMeta>(value: JustDuo<V, M>): JustDuo<V, M>
export function just<V>(value: JustUno<V>): JustUno<V>
export function just(value: JustEmpty): JustEmpty
export function just(value: unknown) {
  return value
}
