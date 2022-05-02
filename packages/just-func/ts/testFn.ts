import { JustMeta } from './Just'

/**
 * Function the takes nothing and returns nothing.
 * @see <https://softwareengineering.stackexchange.com/questions/276859/what-is-the-name-of-a-function-that-takes-no-argument-and-returns-nothing>
 */
export function procedure() { }

/**
 * Unit function takes one argument and returns void.
 *
 */
export function unit<V>(_v: V): void { }

export function duo<V, M extends JustMeta>(v: V, m: M) { return [v, m] }
