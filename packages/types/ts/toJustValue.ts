import { JustDuo, JustEmpty, JustMeta, JustUno } from './Just'

export function toJustValue<V extends void | undefined | JustEmpty>(value?: V, meta?: JustMeta): JustEmpty
export function toJustValue<V extends JustUno<any>>(value?: V, meta?: JustMeta): Readonly<V>
export function toJustValue<V extends JustDuo<any, any>>(value?: V, meta?: JustMeta): Readonly<V>
export function toJustValue<V>(value?: V, meta?: JustMeta): JustUno<V>
export function toJustValue(value?: unknown) {
  if (value === undefined) return []
  if (!Array.isArray(value)) return [value]
  return value as unknown
}
