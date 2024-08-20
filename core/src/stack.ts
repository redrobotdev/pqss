export class Stack<T> {
  private items: T[] = []

  push(element: T): void {
    this.items.push(element)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  find(item: T): T | undefined {
    return this.items.find((a) => a === item)
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  clear(): void {
    this.items = []
  }

  print(): void {
    console.log(this.items.toString())
  }
}
