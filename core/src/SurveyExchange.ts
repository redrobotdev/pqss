import {
  EdgeId,
  Exchange,
  ExchangeCondition,
  ResponseFormatBase,
  ResponseFormats,
} from "./types"

import { Stack } from "./stack"

export class SurveyExchange {
  // exchanges: { [key: string]: Exchange } = {}
  exchanges: { [key: string]: Exchange } = {}

  // first item is id, second is
  edges: Map<string, string[]> = new Map()

  // first item is the edge pair id ie ()
  conditions: Map<string, ExchangeCondition<ResponseFormats, ResponseFormats>> =
    new Map()

  // the starting exchange
  startExchange: Exchange
  currentExchange: Exchange
  traverseStack = new Stack<Exchange>()

  constructor(exchanges: Array<Exchange>, startExchange: Exchange) {
    if (exchanges) {
      this.exchanges = exchanges.reduce((acc, curr) => {
        acc[curr.id] = curr
        return acc
      }, {} as { [key: string]: Exchange })
    }

    this.startExchange = startExchange
    this.currentExchange = startExchange
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

  addEdge<T extends ResponseFormats, U extends ResponseFormats>(
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
        cond as ExchangeCondition<ResponseFormats, ResponseFormats>
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

  getNextExchange() {
    // get the next item in stack
    let rtnValue = this.traverseStack.pop()

    while (true) {
      if (!rtnValue) {
        break
      }

      // if there is a condition run that
      const edgeId = `${this.currentExchange.id}-${rtnValue.id}`
      const cond = this.conditions.get(edgeId)
      // if the condition prevents us from moving forward
      // move to the next item in the list
      if (!cond) {
        break
      }

      if (!cond(this.currentExchange, [])) {
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
    let neighbors = this.getNeighbors(rtnValue)
    for (let n of neighbors.reverse()) {
      this.traverseStack.push(n)
    }

    this.currentExchange = rtnValue
    return rtnValue
  }

  findExchange(label: string) {
    return Object.values(this.exchanges).find((x) => x.label === label)
  }
}
