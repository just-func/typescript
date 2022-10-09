import { isJustEmpty, JustEmpty, JustFunction, JustUno, justValue } from '@just-func/types'
import { isType } from 'type-plus'
import { compose } from './index'

describe(`${compose.name}()`, () => {
  it('returns JustEmpty if the input array is empty', () => {
    const result = compose([])

    expect(isJustEmpty(result())).toBe(true)
  })

  it(`results result from first function`, () => {
    const result = compose([() => justValue([1])])

    expect(result()).toEqual([1])
    isType.equal<true, JustFunction<JustEmpty, JustUno<number>>, typeof result>()
  })

  it('compose calls', () => {
    const result = compose([
      () => justValue([]),
      () => justValue([1]),
      (v: number) => justValue([String(v + 1)])
    ])

    expect(result()).toEqual(['2'])
    isType.equal<true, JustFunction<JustEmpty, JustUno<string>>, typeof result>()
  })
})

