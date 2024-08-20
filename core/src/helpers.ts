import { v4 as uuidv4 } from "uuid"

import {
  // BooleanResponse,
  // BooleanAttribute,
  // MultiSelectAttribute,
  Prompt,
  // ResponseAttributeBase,
  ExchangeInput,
  Exchange,
  ResponseAttributes,
} from "./types"

export function createPrompt(prompt: Prompt): Prompt {
  return prompt
}

// export function createMultiSelectPrompt<T>(
//   options: Array<MultiSelectAttribute>
// ): MultiSelectAttribute {
//   const newOptions = options.map((item, index) => {
//     return {
//       id: `${index}`,
//       ...item,
//     }
//   })

//   return {
//     options: newOptions,
//   }
// }

// export function isMultiSelectPrompt(
//   input: ResponseAttributeBase
// ): input is MultiSelectAttribute {
//   return (input as MultiSelectAttribute).options !== undefined
// }

// export function createMultiSelectResponse(
//   options: Array<MultiSelectAttributeInput>
// ): MultiSelectAttribute {
//   const newOptions = options.map((item, index) => {
//     return {
//       id: `${index}`,
//       ...item,
//     }
//   })

//   return {
//     options: newOptions,
//   }
// }

// export function isBooleanPrompt(
//   input: ResponseAttributeBase
// ): input is BooleanAttribute {
//   return (input as BooleanAttribute).shouldHaveUndecided !== undefined
// }

// export function createBooleanResponse(
//   value: boolean,
//   undecided?: boolean
// ): BooleanResponse {
//   return {
//     value,
//     undecided,
//   }
// }

// -------
export function createExchange<T extends ResponseAttributes>(
  input: ExchangeInput<T>
): Exchange<T> {
  return {
    id: uuidv4(),
    ...input,
    response: null,
  }
}
