import { isType } from 'type-plus'
import { isJustDuo, isJustEmpty, isJustUno, isJustValue, JustDuo, JustEmpty, JustMeta, JustUno } from './index'

const notJustValue = [
  undefined,
  null,
  1,
  true,
  '',
  'a',
  {},
  Symbol(),
  function () { },
  () => { }
]

describe(`${isJustEmpty.name}()`, () => {
  it('returns false for not JustValue', () => {
    notJustValue.forEach(value => expect(isJustEmpty(value)).toBe(false))
  })

  it('returns false for JustUno and JustDuo', () => {
    expect(isJustEmpty([undefined])).toBe(false)
    expect(isJustEmpty([1])).toBe(false)
    expect(isJustEmpty([1, {}])).toBe(false)
  })

  it('returns true for JustEmpty', () => {
    expect(isJustEmpty([])).toBe(true)
  })

  it('can be used as type guard', () => {
    const value: unknown = []
    if (isJustEmpty(value)) {
      isType.equal<true, JustEmpty, typeof value>()
    }
  })
})

describe(`${isJustUno.name}()`, () => {
  it('returns false for not JustValue', () => {
    notJustValue.forEach(value => expect(isJustUno(value)).toBe(false))
  })

  it(`returns false for JustEmpty and JustDuo`, () => {
    expect(isJustUno([])).toBe(false)
    expect(isJustUno([1, {}])).toBe(false)
  })

  it('returns true for JustUno', () => {
    notJustValue.forEach(value => expect(isJustUno([value])).toBe(true))
  })

  it('can be used as type guard', () => {
    const value: unknown = [1]
    if (isJustUno<number>(value)) {
      isType.equal<true, JustUno<number>, typeof value>()
    }
  })

  it('can be used as type guard with validator', () => {
    const value: unknown = [1]
    if (isJustUno<number>(value, v => typeof v[0] === 'number')) {
      isType.equal<true, JustUno<number>, typeof value>()
    }
  })
})

describe(`${isJustDuo.name}()`, () => {
  it('returns false for not JustValue', () => {
    notJustValue.forEach(value => expect(isJustDuo(value)).toBe(false))
  })

  it(`returns false for JustEmpty and JustUno`, () => {
    expect(isJustDuo([])).toBe(false)
    expect(isJustDuo([1])).toBe(false)
  })

  it('returns true for JustDuo', () => {
    notJustValue.forEach(value => expect(isJustDuo([value, {}])).toBe(true))
  })

  it('returns false for second value not JustMeta', () => {
    expect(isJustDuo([1, undefined])).toBe(false)
    expect(isJustDuo([1, null])).toBe(false)
    expect(isJustDuo([1, 1])).toBe(false)
    expect(isJustDuo([1, ''])).toBe(false)
    expect(isJustDuo([1, []])).toBe(false)
    expect(isJustDuo([1, Symbol()])).toBe(false)
    expect(isJustDuo([1, function () { }])).toBe(false)
    expect(isJustDuo([1, () => { }])).toBe(false)
  })

  it('can be used as type guard', () => {
    const value: unknown = [1, { foo: 2 }]
    if (isJustDuo<number, { foo: number }>(value)) {
      isType.equal<true, JustDuo<number, { foo: number }>, typeof value>()
    }
  })

  it('can be used as type guard with validator', () => {
    const value: unknown = [1, { foo: 2 }]
    if (isJustDuo<number, { foo: number }>(
      value,
      v => typeof v[0] === 'number' && typeof v[1].foo === 'number'
    )) {
      isType.equal<true, JustDuo<number, { foo: number }>, typeof value>()
    }
  })

  it('can skep the meta type, which defaults to JustMeta', () => {
    const value: unknown = [1, { foo: 2 }]
    if (isJustDuo<number>(value)) {
      isType.equal<true, JustDuo<number, JustMeta>, typeof value>()
    }
  })
})

describe(`${isJustValue.name}()`, () => {
  it('returns false for not JustValue', () => {
    notJustValue.forEach(value => expect(isJustValue(value)).toBe(false))
  })

  it(`returns true for JustValue`, () => {
    expect(isJustValue([])).toBe(true)
    expect(isJustValue([1])).toBe(true)
    expect(isJustValue([1, {}])).toBe(true)
  })

  it('can be used as type guard', () => {
    const empty: unknown = []
    // JustEmpty case doesn't really need a validator.
    // Adding it here for completeness
    if (isJustValue(empty, v => isJustEmpty(v))) {
      isType.equal<true, JustEmpty, typeof empty>()
    }

    const uno: unknown = [1]
    if (isJustValue<number>(uno, v => {
      isType.equal<true, JustUno<number>, typeof v>()
      return typeof v[0] === 'number'
    })) {
      isType.equal<true, JustUno<number>, typeof uno>()
    }

    const duo: unknown = [1, { foo: 2 }]
    if (isJustValue<number, { foo: number }>(
      duo,
      v => {
        isType.equal<true, JustDuo<number, { foo: number }>, typeof v>()
        return typeof v[0] === 'number' && typeof v[1].foo === 'number'
      })) {
      isType.equal<true, JustDuo<number, { foo: number }>, typeof duo>()
    }
  })

  it('can be used as type guard without validator', () => {
    // in this case we just check if the value is `JustValues`,
    // and trust the type you specified in the generics.
    const empty: unknown = []
    if (isJustValue(empty)) {
      isType.equal<true, JustEmpty, typeof empty>()
    }

    const uno: unknown = [1]
    if (isJustValue<number>(uno)) {
      isType.equal<true, JustUno<number>, typeof uno>()
    }

    const duo: unknown = [1, { foo: 2 }]
    if (isJustValue<number, { foo: number }>(duo)) {
      isType.equal<true, JustDuo<number, { foo: number }>, typeof duo>()
    }
  })
})
