import {
  BooleanResponse,
  BooleanAttributes,
  MultiSelectAttribute,
  MultiSelectAttributeInput,
  Prompt,
  ResponseAttributeBase,
} from "./types"

export function createPrompt(prompt: Prompt): Prompt {
  return prompt
}

export function createMultiSelectPrompt<T>(
  options: Array<MultiSelectAttributeInput>
): MultiSelectAttribute {
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
  input: ResponseAttributeBase
): input is MultiSelectAttribute {
  return (input as MultiSelectAttribute).options !== undefined
}

export function createMultiSelectResponse(
  options: Array<MultiSelectAttributeInput>
): MultiSelectAttribute {
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
  input: ResponseAttributeBase
): input is BooleanAttributes {
  return (input as BooleanAttributes).shouldHaveUndecided !== undefined
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
