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

export type JustFunction<
  P extends [arg?: any] = [arg?: any],
  V = undefined,
  M extends JustMeta | undefined = undefined
> = (...args: P) => JustValue<V, M>

export function justFunction<
  P extends [arg?: any] = [arg?: any],
  V = undefined,
  M extends JustMeta | undefined = undefined
>(fn: JustFunction<P, V, M>) {
  return fn
}
