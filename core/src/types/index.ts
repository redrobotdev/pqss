export interface PromptBase {
  title: string
}
export interface ResponseFormatBase {
  // if the response is not required then it can be skipped
  isRequired?: boolean
}

export interface ResponseBase {}
export interface EdgePrompt extends PromptBase {}
export type EdgeId = [string, string]

export interface Prompt extends PromptBase {
  description?: string
  imageUrl?: string
  videoUrl?: string
}

// -------
// Boolean Select

export interface EmptyResponseFormat extends ResponseFormatBase {}
export interface EmptyResponse extends ResponseBase {}

// -------
// Multi Select

export type MultiSelectResponseOptionInput = {
  label: string
  value: string
}

export type MultiSelectResponseOption = {
  id: string
} & MultiSelectResponseOptionInput

export interface MultiSelectResponseFormat extends ResponseFormatBase {
  options: Array<MultiSelectResponseOption>
}

export interface MultiSelectResponse extends ResponseBase {
  options: Array<MultiSelectResponseOption>
}

// -------
// Boolean Select

export interface BooleanResponseFormat extends ResponseFormatBase {
  shouldHaveUndecided?: boolean
}

export interface BooleanResponse extends ResponseBase {
  value: boolean
  undecided?: boolean
}

// -------
// Textbox

export interface TextboxResponseFormat extends ResponseFormatBase {
  minWords?: number
  maxWords?: number
}

export interface TextboxResponse extends ResponseBase {
  text: string
}

// -------
// Textbox

export type ResponseFormats =
  | MultiSelectResponseFormat
  | BooleanResponseFormat
  | EmptyResponseFormat
  | TextboxResponseFormat

export type ExchangeInput<T extends ResponseFormats> = {
  label?: string
  prompt: Prompt
  responseAttributes?: T
}

// prettier-ignore
type ResponseType<T extends ResponseFormatBase> =
  T extends MultiSelectResponseFormat ? MultiSelectResponse: 
  T extends BooleanResponseFormat ? BooleanResponse: 
  T

export type Exchange<T extends ResponseFormats = ResponseFormats> =
  ExchangeInput<T> & {
    id: string
    response?: ResponseType<T>
  }

export type ExchangeCondition<
  T extends ResponseFormats = ResponseFormats,
  U extends ResponseFormats = ResponseFormats
> = (
  inputExchange: Exchange<T>,
  allExchanges: Array<Exchange<ResponseFormats>>
) => boolean
