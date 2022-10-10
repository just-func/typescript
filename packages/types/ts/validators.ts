import type { JustDuo, JustEmpty, JustMeta, JustUno, JustValue } from './Just'

/**
 * Check if the value is `JustEmpty`
 */
export function isJustEmpty(value: unknown): value is JustEmpty {
  return Array.isArray(value) && value.length === 0
}

/**
 * Check if the vlaue is `JustUno<V>`
 */
export function isJustUno<V>(
  value: unknown,
  validator?: (v: JustValue<V>) => unknown
): value is JustUno<V> {
  if (!Array.isArray(value) || value.length !== 1) return false

  return validator ? !!validator(value as any) : true
}

export function isJustDuo<V, M extends JustMeta = JustMeta>(
  value: unknown,
  validator?: (v: JustDuo<V, M>) => unknown
): value is JustDuo<V, M> {
  if (!Array.isArray(value) || value.length !== 2) return false

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const meta = value[1]
  if (typeof meta !== 'object' || meta === null || Array.isArray(meta)) return false

  return validator ? !!validator(value as any) : true
}

export function isJustValue<
  V = void,
  M extends JustMeta | undefined = undefined
>(value: unknown, validator?: (value: JustValue<V, M>) => unknown): value is JustValue<V, M> {
  if (!isJustEmpty(value) && !isJustUno(value) && !isJustDuo(value)) return false

  return validator ? !!validator(value as any) : true
}
