export type IQType =
  | null
  | "message"
  | "bool"
  | "input"
  | "textArea"
  | "multiSelect"
  | "singleSelect"
  | "submit"
  | "date"

// Answers
export interface IAnswer {
  qtype: IQType
  name: string
  question: {
    title: string
    subtitle?: string
    text?: string
  }
}

export interface IBooleanAnswer extends IAnswer {
  qtype: "bool"
  selection: boolean | null
}

export interface IInputAnswer extends IAnswer {
  qtype: "input"
  inputType: string | undefined
  value: string
}

export interface IDateAnswer extends IAnswer {
  qtype: "date"
  date: Date | string | null
}

export interface ITextAreaAnswer extends IAnswer {
  qtype: "textArea"
  value: string
}

export interface IMultiSelectAnswer extends IAnswer {
  qtype: "multiSelect"
  options: Array<IMultiOrSelectSelectOption>
}

export interface ISingleSelectAnswer extends IAnswer {
  qtype: "singleSelect"
  option: IMultiOrSelectSelectOption | null
}

export type IAnswers = {
  [number: string]:
    | IBooleanAnswer
    | IInputAnswer
    | IDateAnswer
    | ITextAreaAnswer
    | IMultiSelectAnswer
    | ISingleSelectAnswer
}

// Questions
export interface INodeBase {
  qtype: IQType
  name: string
  postCheck?: (answers: IAnswers) => boolean
}

export interface IQuestionTypeBase extends INodeBase {
  question: {
    title: string
    subtitle?: string
    text?: string
  }
}

export interface IBooleanQuestion extends IQuestionTypeBase {
  qtype: "bool"
}

export interface IInputQuestion extends IQuestionTypeBase {
  qtype: "input"
  inputType: string | undefined
}

export interface IDateQuestion extends IQuestionTypeBase {
  qtype: "date"
}

export interface ITextAreaQuestion extends IQuestionTypeBase {
  qtype: "textArea"
}

export type IMultiOrSelectSelectOption = {
  id: number
  name: string
  label: string
}

export interface IMultiSelectQuestion extends IQuestionTypeBase {
  qtype: "multiSelect"
  options: Array<IMultiOrSelectSelectOption>
}

export interface ISingleSelectQuestion extends IQuestionTypeBase {
  qtype: "singleSelect"
  options: Array<IMultiOrSelectSelectOption>
}

export type IQuestionEdge = {
  True: string
  False: string
}

export type IQuestions = {
  questions: {
    [id: string]: INodeBase
  }
  connections: {
    [id: string]: IQuestionEdge | string | null
  }
  start: string
}
