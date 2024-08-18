export interface PromptBase {
  title: string
}
export interface ResponseAttributeBase {
  // if the response is not required then it can be skipped
  isRequired?: boolean
}

export interface ResponseBase {
  // the time when the response was applied
  timeStamp: Date
}

// The type of data that is displayed with a question
export interface Prompt extends PromptBase {
  description?: string
  imageUrl?: string
  videoUrl?: string
}

// -------
// Boolean Select

export interface EmptyAttributes extends ResponseAttributeBase {}
export interface EmptyResponse extends ResponseBase {}

// -------
// Multi Select

export type MultiSelectAttributeInput = {
  label: string
  value: string
}

export type MultiSelectAttributeOption = {
  id: string
} & MultiSelectAttributeInput

export interface MultiSelectAttribute extends ResponseAttributeBase {
  options: Array<MultiSelectAttributeOption>
}

export interface MultiSelectResponse extends ResponseBase {
  options: Array<MultiSelectAttributeOption>
}

// -------
// Boolean Select

export interface BooleanAttributes extends ResponseAttributeBase {
  shouldHaveUndecided?: boolean
}

export interface BooleanResponse extends ResponseBase {
  value: boolean
  undecided?: boolean
}

// -------
// Textbox

export interface TextInputAttributes extends ResponseAttributeBase {
  minWords?: number
  maxWords?: number
}

export interface TextInputResponse extends ResponseBase {
  text: string
}

// -------

export type ResponseAttributes =
  | MultiSelectAttribute
  | BooleanAttributes
  | TextInputAttributes
  | EmptyAttributes

export type ExchangeInput<T extends ResponseAttributes> = {
  label?: string
  prompt: Prompt
  responseAttributes?: T
}

// This doesn't work
// prettier-ignore
export type ResponseTypes<T extends ResponseAttributes> = 
  T extends MultiSelectAttribute ? MultiSelectResponse : 
  T extends BooleanAttributes ? BooleanResponse : 
  T extends TextInputAttributes ? TextInputResponse : 
  T extends EmptyAttributes ? EmptyResponse : never;

export type Exchange<T extends ResponseAttributes = ResponseAttributes> =
  ExchangeInput<T> & {
    id: string
    response?: ResponseTypes<T>
  }

export type ExchangeCondition<
  T extends ResponseAttributes = ResponseAttributes,
  U extends ResponseAttributes = ResponseAttributes
> = (
  inputExchange: Exchange<T>,
  allExchanges: Array<Exchange<ResponseAttributes>>
) => boolean
