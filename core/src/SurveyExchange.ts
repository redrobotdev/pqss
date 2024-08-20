import {
  Exchange,
  ExchangeCondition,
  ResponseTypes,
  ResponseAttributes,
  ExchangeInput,
  EmptyAttribute,
} from "./types"
import { Stack } from "./stack"
import { createExchange } from "./helpers"

export class SurveyExchange {
  exchanges: { [key: string]: Exchange } = {}

  // first item is id, second is
  edges: Map<string, string[]> = new Map()

  // first item is the edge pair id ie ()
  conditions: Map<
    string,
    ExchangeCondition<ResponseTypes<ResponseAttributes>>
  > = new Map()

  // the starting and ending exchanges
  startExchange: Exchange
  runStack = new Stack<Exchange>()
  traversedStack = new Stack<Exchange>()

  constructor(exchanges?: Array<Exchange>) {
    if (exchanges) {
      this.exchanges = exchanges.reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {} as { [key: string]: Exchange })
    }

    this.startExchange = createExchange<EmptyAttribute>({
      label: "start",
    })

    // by default push the start exchange
    // into the traverse stack
    this.runStack.push(this.startExchange)
  }

  addExchange<T extends ResponseAttributes>(
    exchangeInput: ExchangeInput<T>
  ): Exchange<T> {
    const exchange = createExchange(exchangeInput)

    if (exchange.id in this.exchanges) {
      throw new Error(`${exchange.id} already exists`)
    }

    this.exchanges[exchange.id] = exchange
    return exchange
  }

  addExchanges(exchanges: Array<Exchange>): void {
    this.exchanges = exchanges.reduce<Record<string, Exchange>>((acc, curr) => {
      acc[curr.id] = curr
      return acc
    }, this.exchanges)
  }

  addEdge<T extends ResponseAttributes, U extends ResponseAttributes>(
    x1: Exchange<T>,
    x2: Exchange<U>,
    cond?: ExchangeCondition<ResponseTypes<T>>
  ): SurveyExchange {
    if (this.isFirstEdge()) {
      this._addEdge(this.startExchange, x1)
    }

    this._addEdge(x1, x2, cond)

    return this
  }

  private _addEdge<T extends ResponseAttributes, U extends ResponseAttributes>(
    x1: Exchange<T>,
    x2: Exchange<U>,
    cond?: ExchangeCondition<ResponseTypes<T>>
  ): void {
    let edge1 = this.edges.get(x1.id)
    if (!edge1) {
      this.edges.set(x1.id, [])
      edge1 = this.edges.get(x1.id)
    }

    // add the edge
    edge1?.push(x2.id)

    // add the condition, if it's set
    if (cond) {
      this.conditions.set(
        `${x1.id}-${x2.id}`,
        cond as ExchangeCondition<ResponseTypes<ResponseAttributes>>
      )
    }
  }

  isFirstEdge() {
    return this.edges.size === 0
  }

  getExchange(id: string) {
    if (!(id in this.exchanges)) {
      return null
    }

    return this.exchanges[id]
  }

  getNeighbors(exchange: Exchange): Exchange[] {
    const exchangeList = this.edges.get(exchange.id)
    if (!exchangeList) {
      return []
    }

    const rtnValue = exchangeList
      .map((a) => this.exchanges[a])
      .filter((a) => a !== undefined)

    return rtnValue
  }

  reverseLookup(searchValue: string): string[] {
    const result: string[] = []

    for (const [key, values] of this.edges.entries()) {
      if (values.includes(searchValue)) {
        result.push(key)
      }
    }

    return result
  }

  getNextExchange() {
    // get the next item in stack
    let rtnValue = this.runStack.pop()

    // a while loop to
    while (true) {
      if (!rtnValue) {
        break
      }

      const originExchangeId = this.reverseLookup(rtnValue.id)
      if (originExchangeId.length < 1 || !(0 in originExchangeId)) {
        break
      }

      const originExchange = this.getExchange(originExchangeId[0])
      if (!originExchange) {
        // console.error("no origin exchange found")
        break
      }

      // if there is a condition run that
      const edgeId = `${originExchange.id}-${rtnValue.id}`
      const cond = this.conditions.get(edgeId)

      // if the condition prevents us from moving forward
      // move to the next item in the list
      if (!cond) {
        break
      }

      if (cond(originExchange.response, this.exchanges)) {
        break
      }

      rtnValue = this.runStack.pop()
    }

    // if next item has already been traversed then skip
    while (rtnValue) {
      if (!this.traversedStack.find(rtnValue)) {
        break
      }
      rtnValue = this.runStack.pop()
    }

    // if there are no more items in the stack,
    // there is nothing to move next
    if (!rtnValue) {
      return null
    }

    // get the neighboring exchanges and push them
    // inside the stack
    const neighbors = this.getNeighbors(rtnValue)
    for (const n of neighbors.reverse()) {
      this.runStack.push(n)
    }

    // push exchange into traversed list
    this.traversedStack.push(rtnValue)

    return rtnValue
  }

  addResponse<T extends ResponseAttributes>(
    x: Exchange<T>,
    response: ResponseTypes<T>
  ) {
    x.response = response
  }

  findExchange(label: string) {
    return Object.values(this.exchanges).find((x) => x.label === label)
  }
}
