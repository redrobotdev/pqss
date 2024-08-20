import { v4 as uuidv4 } from "uuid"

import { Prompt, ExchangeInput, Exchange, ResponseAttributes } from "./types"

export function createPrompt(prompt: Prompt): Prompt {
  return prompt
}

export function createExchange<T extends ResponseAttributes>(
  input: ExchangeInput<T>
): Exchange<T> {
  return {
    id: uuidv4(),
    ...input,
    response: null,
  }
}
