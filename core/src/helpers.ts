import {
  BooleanResponse,
  BooleanResponseFormat,
  Exchange,
  ExchangeInput,
  MultiSelectResponseFormat,
  MultiSelectResponseOptionInput,
  Prompt,
  ResponseBase,
  ResponseFormatBase,
} from "./types"

let counter = 0

export function createPrompt(prompt: Prompt): Prompt {
  return prompt
}

export function createMultiSelectPrompt<T>(
  options: Array<MultiSelectResponseOptionInput>
): MultiSelectResponseFormat {
  const newOptions = options.map((item, index) => {
    return {
      id: `${index}`,
      ...item,
    }
  })

  return {
    options: newOptions,
  }
}

export function isMultiSelectPrompt(
  input: ResponseFormatBase
): input is MultiSelectResponseFormat {
  return (input as MultiSelectResponseFormat).options !== undefined
}

export function createMultiSelectResponse(
  options: Array<MultiSelectResponseOptionInput>
): MultiSelectResponseFormat {
  const newOptions = options.map((item, index) => {
    return {
      id: `${index}`,
      ...item,
    }
  })

  return {
    options: newOptions,
  }
}

export function isBooleanPrompt(
  input: ResponseFormatBase
): input is BooleanResponseFormat {
  return (input as BooleanResponseFormat).shouldHaveUndecided !== undefined
}

export function createBooleanResponse(
  value: boolean,
  undecided?: boolean
): BooleanResponse {
  return {
    value,
    undecided,
  }
}

// export function createExchange<T extends ExchangeInput>({
//   label,
//   prompt,
//   responseFormat,
// }: T): Exchange<T> {
//   counter += 1
//   let response: ResponseBase = {}

//   if (isMultiSelectPrompt(responseFormat)) {
//     response = createMultiSelectResponse([])
//   } else if (isBooleanPrompt(responseFormat)) {
//     response = createBooleanResponse(true, false)
//   }

//   let rtnValue: Exchange<T> = {
//     id: `${counter}`,
//     label,
//     prompt,
//     responseFormat,
//     response,
//   }

//   return rtnValue
// }
