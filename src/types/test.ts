

type Extends<T, U> = T extends U ? T : never

type ExtendsMono<T, U> = [T] extends [U] ? T : never

type Narrow0 = Extends<number | '', number | string> // number | ''

type NarrowMono = ExtendsMono<number, number | string> // number

type NarrowMono0 = ExtendsMono<number | '', number | string> // number | ''

type WideMono = ExtendsMono<number | string, number> // never

type Undefinable<T> = Extends<T, T | undefined>

type UndefinableDate = Undefinable<Date | undefined> // never

type DefinableDate = Undefinable<Date>

type UndefinableMono<T> = ExtendsMono<T, T | undefined>

type UndefinableDateMono = UndefinableMono<Date | undefined> // never

interface First {
  first: string
  common: string
}

interface Second {
  first: number
  second: string
  common: string
}

type UnionMono = ExtendsMono<{
  common: string
}, First | Second> // never

type UnionMono0 = ExtendsMono<{
  first: number
  common: string
}, First | Second> // never

type UnionMono01 = ExtendsMono<{
  first: string
  common: string
}, First | Second> // { common: string, first: string }

type Union = Extends<{
  common: string
}, First | Second> // never

type Union0 = Extends<{
  first: number
  common: string
}, First | Second> // never

type Union01 = Extends<{
  first: string
  common: string
}, First | Second> // { common: string, first: string }

type WideUnion = Extends<First | Second, First>

type WideUnionMono = ExtendsMono<First | Second, First>

type Intersection = Extends<First, First & Second>

type IntersectionMono = ExtendsMono<First, First & Second>
