import {
  Exchange,
  ExchangeCondition,
  ResponseTypes,
  ResponseAttributes,
} from "./types"
import { Stack } from "./stack"

export class SurveyExchange {
  // exchanges: { [key: string]: Exchange } = {}
  exchanges: { [key: string]: Exchange } = {}

  // first item is id, second is
  edges: Map<string, string[]> = new Map()

  // first item is the edge pair id ie ()
  conditions: Map<
    string,
    ExchangeCondition<ResponseAttributes, ResponseAttributes>
  > = new Map()

  // the starting exchange
  startExchange: Exchange
  traverseStack = new Stack<Exchange>()

  constructor(exchanges: Array<Exchange>, startExchange: Exchange) {
    if (exchanges) {
      this.exchanges = exchanges.reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {} as { [key: string]: Exchange })
    }

    this.startExchange = startExchange
    this.traverseStack.push(startExchange)
  }

  addExchange(exchange: Exchange): void {
    if (exchange.id in this.exchanges) {
      return
    }

    this.exchanges[exchange.id] = exchange
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
    cond?: ExchangeCondition<T, U>
  ): void {
    let edge1 = this.edges.get(x1.id)
    if (!edge1) {
      this.edges.set(x1.id, [])
      edge1 = this.edges.get(x1.id)
    }

    // add the edge
    edge1?.push(x2.id)

    // add the condition
    // this.conditions.set([x1.id, x2.id], cond)
    if (cond) {
      this.conditions.set(
        `${x1.id}-${x2.id}`,
        cond as ExchangeCondition<ResponseAttributes, ResponseAttributes>
      )
    }
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

    const rtnValue = exchangeList.map((a) => this.exchanges[a])
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
    let rtnValue = this.traverseStack.pop()

    while (true) {
      if (!rtnValue) {
        break
      }

      const originExchangeId = this.reverseLookup(rtnValue.id)
      const originExchange = this.getExchange(originExchangeId[0])

      if (!originExchange) {
        console.error("no origin exchange found")
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

      if (!cond(originExchange, [])) {
        rtnValue = this.traverseStack.pop()
      } else {
        break
      }
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
      this.traverseStack.push(n)
    }

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
