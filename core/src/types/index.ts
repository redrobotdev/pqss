export type PromptBase = {
  title: string
}
export type ResponseAttributeBase = {
  type: string

  // if the response is not required then it can be skipped
  isRequired?: boolean
}

export type ResponseBase = {
  type: string
  timestamp: Date // the time when the response was applied
}

// The type of data that is displayed with a question
export type Prompt = PromptBase & {
  description?: string
  imageUrl?: string
  videoUrl?: string
}

// -------
// Empty Attribute and response

export type EmptyAttribute = ResponseAttributeBase & {
  type: "empty"
}

export type EmptyResponse = ResponseBase & {
  type: "empty"
}

// -------
// MultiSelect
export type MultiSelectAttributeOption = {
  id: string
  label: string
  value: string
  disabled?: boolean
  description?: string
}

export type MultiSelectAttribute = ResponseAttributeBase & {
  type: "multiselect"
  options: Record<string, MultiSelectAttributeOption>
}

export type MultiSelectResponse = ResponseBase & {
  type: "multiselect"
  options: Record<string, MultiSelectAttributeOption>
}

// -------
// Boolean

export type BooleanAttribute = ResponseAttributeBase & {
  type: "boolean"
  shouldHaveUndecided?: boolean
}

export type BooleanResponse = ResponseBase & {
  type: "boolean"
  value: boolean
  undecided?: boolean
}

// -------
// Textbox

export type TextInputAttribute = ResponseAttributeBase & {
  type: "textinput"
  minWords?: number
  maxWords?: number
}

export type TextInputResponse = ResponseBase & {
  type: "textinput"
  text: string
}

// -------
// General

export type Responses =
  | MultiSelectResponse
  | BooleanResponse
  | TextInputResponse
  | EmptyResponse

export type ResponseAttributes =
  | MultiSelectAttribute
  | BooleanAttribute
  | TextInputAttribute
  | EmptyAttribute

export type ExchangeInput<T extends ResponseAttributes> = {
  label?: string
  prompt?: Prompt
  responseAttributes?: T
}

export type ExchangeMultiselectInput = ExchangeInput<MultiSelectAttribute>
export type ExchangeEmptyInput = ExchangeInput<EmptyAttribute>
export type ExchangeBooleanInput = ExchangeInput<BooleanAttribute>
export type ExchangeTextareaInput = ExchangeInput<TextInputAttribute>

// This doesn't work
// prettier-ignore
export type ResponseTypes<T extends ResponseAttributes> = 
  T extends MultiSelectAttribute ? MultiSelectResponse : 
  T extends BooleanAttribute ? BooleanResponse : 
  T extends TextInputAttribute ? TextInputResponse : 
  T extends EmptyAttribute ? EmptyResponse : never;

export type Exchange<T extends ResponseAttributes = ResponseAttributes> =
  ExchangeInput<T> & {
    id: string
    response: ResponseTypes<T> | null
  }

// the condition type for the exchange
export type ExchangeCondition<T extends ResponseTypes<ResponseAttributes>> = (
  response: T | null,
  context: { [key: string]: Exchange }
) => boolean
