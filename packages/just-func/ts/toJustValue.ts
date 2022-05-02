import { JustDuo, JustEmpty, JustUno } from './Just'

export function toJustValue<V extends void | undefined | JustEmpty>(value: V): JustEmpty
export function toJustValue<V extends JustUno<any>>(value: V): Readonly<V>
export function toJustValue<V extends JustDuo<any, any>>(value: V): Readonly<V>
export function toJustValue<V>(value: V): JustUno<V>
export function toJustValue(value: unknown) {
  if (value === undefined) return []
  if (!Array.isArray(value)) return [value]
  return value as unknown
}
