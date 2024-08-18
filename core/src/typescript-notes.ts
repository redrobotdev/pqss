// object type
type Person = {
  name: string
  age: number
}

const adam: Person = {
  name: "Adam",
  age: 53,
}

// this is passing by reference, so it's a pointer and the value can change
function changeValue(person: Person) {
  person.name = "not adam"
}

// value has changed since it's passed by value
changeValue(adam)
console.log(adam)

// readonly you cannot change the value, ts will issue an error
function getInfo(person: Readonly<Person>) {
  //   person.name = "not adam" // cannot do this
  return `${person.name} is ${person.age} years old`
}
// value has changed since it's passed by value
console.log(getInfo(adam))

// Union types
function printId(id: number | string) {
  console.log("Your ID is: " + id)

  // this won't work, since id can be a number, we need to narrow the type
  // console.log(id.toUpperCase())

  // with narrowing, it can work
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase())
  } else {
    // Here, id is of type 'number'
    console.log(id)
  }
}

// same with arrays
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "))
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x)
  }
}

// another example of narrowing
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input
  }
  return padding + input
}

// there is a non-null assertion operator (!)
// which essentially you are telling ts that
// you know this value cannot be null
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed())
}

// do not use enums, use const objects instead
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const

console.log(EDirection.Up) // 0
console.log(ODirection.Up) // 0

function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0]
}

function secondElement<T>(arr: T[]): T | undefined {
  return arr[0]
}

const n = firstElement([1, 2, 3])
console.log(n)

const m = secondElement(["a", "b", "c"])
console.log(m)

function older<T extends Person>(a: T, b: T) {
  if (a.age >= b.age) {
    return a
  } else {
    return b
  }
}

const adams: Person = {
  name: "Adam",
  age: 53,
}

const amir: Person = {
  name: "Amir",
  age: 12,
}

console.log(older(amir, adams))
console.log(older({ name: "tim", age: 4 }, { name: "jon", age: 6 }))

function younger<T extends Person>(a: T, b: T): T {
  if (a.age >= b.age) {
    return a
  } else {
    return b
  }
}
console.log(younger(amir, adams))

interface SomeTypeReadonly {
  readonly prop: string
  readonly per: { name: string; age: number }
}

interface SomeType {
  prop: string
  per: { name: string; age: number }
}

function doSomething(obj: SomeTypeReadonly) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`)

  // But we can't re-assign it.
  // obj.prop = "hello"

  // we can't assign readonly objects either
  // obj.per = { name: "a", age: 1 }

  // we can mutate the readonly object values
  obj.per.name = "timmy"
}

// let obj: SomeType = {
//   prop: "person",
//   per: { name: "adam", age: 4 },
// }

// let readonlyObj: SomeTypeReadonly = obj
// let anotherObj: SomeType = readonlyObj

// obj.prop = "animal"
// readonlyObj.prop = "animal"
// anotherObj.prop = "alien"

// ##

function isInArray<Element extends T, T>(
  array: readonly Element[],
  element: T
): element is Element {
  const arrayT: readonly T[] = array
  return arrayT.includes(element)
}

const nums: Array<Person> = [
  { age: 1, name: "Abby" },
  { age: 2, name: "Johnny" },
  { age: 3, name: "Ross" },
]

const numsArray = isInArray(nums, { age: 1, name: "Abby" })
console.log(numsArray)

let res = nums.includes({ age: 1, name: "Abby" })
console.log(res)

res = nums.includes(nums[2])
console.log(res)

type Waveform = {
  freq: number
  band: number
  amplitude: number
  power: number
}

type Point = { x: number; y: number }
type P = keyof Point
const t: P = "x"

type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish
const l: A = 2

type Mapish = { [k: string]: boolean }
type M = keyof Mapish
const mn: M = "d"

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never

type Num = GetReturnType<() => number> // Num is number
type Void = GetReturnType<{ a: string }> // Void is never
const numEx: Num = 1

type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void
}

type Watched<T> = T & PropEventSource<T>

function makeWatchedObject<T extends object>(obj: T): Watched<T> {
  //
  const eventCallbacks: Record<
    string,
    (<K extends string & keyof T>(newValue: T[K]) => void)[]
  > = {}

  // K has to be string, and it's one of the keys of T
  const on = function <K extends string & keyof T>(
    eventName: `${K}Changed`,
    callback: <K extends string & keyof T>(newValue: T[K]) => void
  ): void {
    if (!eventCallbacks[eventName]) {
      eventCallbacks[eventName] = []
    }
    eventCallbacks[eventName].push(callback)
  }

  const handler: ProxyHandler<T> = {
    set(target: T, property: string & keyof T , value: T[string & keyof T]): boolean {
      const oldValue = target[property as keyof T]
      target[property as keyof T] = value 

      if (oldValue !== value) {
        const eventName = `${property}Changed`
        eventCallbacks[eventName]?.forEach((callback) => callback(value))
      }

      return true
    },
    get(target: T, property: string & keyof T) {
      if (property === "on") {
        return on
      }
      return target[property]
    },
  }

  // Create a proxy to intercept property assignments
  return new Proxy(obj, handler) as Watched<T>
}

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
})

person.on("firstNameChanged", (a) => {
  console.log("firstNameChanged:")
  console.log(typeof a)
})

person.on("ageChanged", (a) => {
  console.log("ageChanged first callback:")
  console.log(typeof a)
})

person.on("ageChanged", (a) => {
  console.log("ageChanged second callback:")
  console.log(typeof a)
})

person.age = 5
person.firstName = "Hooman"


export type Letters = "a" | "b" | "c"
type RemoveA<T> = Exclude<T, "c">;
type RemoveB<T> = T extends "c" ? never : T;

type WithoutC1 = RemoveA<Letters>
type WithoutC2 = RemoveB<Letters>
const withoutC1: WithoutC1 = "a"
const withoutC2: WithoutC2 = "a"
console.log(withoutC1, typeof withoutC1)
console.log(withoutC2, typeof withoutC2)

// both types are the same

type TestOmit1 = Omit<Letters, "c" | "a">;
const testOmit1: TestOmit1 = ""
console.log(testOmit1, typeof testOmit1)

function testOmitFunc(a: TestOmit1) {
  console.log(a)
}

testOmitFunc("")


const testObj: Record<string, string[]> = {};
testObj.foo.push("a")