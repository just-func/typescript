import type { AnyFunction, Equal } from 'type-plus'

export interface JustMeta { [k: string | symbol]: any }

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

/**
 * Used by code that support adjusting their stacktrace when error occurs.
 */
export interface StackTraceMeta {
  ssf?: AnyFunction
}
