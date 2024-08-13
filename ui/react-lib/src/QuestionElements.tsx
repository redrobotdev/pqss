import { useEffect, useState } from "react"
import { DatePicker } from "@/components/ui/datepicker"
import { Input } from "@/components/ui/input"
import { SelectBox } from "@/components/ui/selectbox"
import { Textarea } from "@/components/ui/textarea"

import {
  IAnswers,
  IBooleanAnswer,
  IBooleanQuestion,
  IInputAnswer,
  IInputQuestion,
  IMultiSelectQuestion,
  IMultiSelectAnswer,
  IMultiOrSelectSelectOption,
  IQuestionTypeBase,
  ITextAreaAnswer,
  ITextAreaQuestion,
  ISingleSelectQuestion,
  ISingleSelectAnswer,
  IAnswer,
  IDateQuestion,
  IDateAnswer,
} from "@pqss/core"

import { cn } from "@/lib/utils"

const QuestionHeader = ({ name, question }: IQuestionTypeBase) => (
  <div className="flex flex-col space-y-2">
    <p className="text-sm text-robotGray-400 dark:text-robotGray-700">{name}</p>
    <p className="text-robotGray-800 dark:text-robotGray-200">
      {question?.title}
    </p>
    <p className="font-semibold text-robotGray-700 dark:text-robotGray-200">
      {question?.subtitle}
    </p>
    <p>{question?.text}</p>
  </div>
)

export function MultiSelectView({
  question,
  onChange,
  answers,
}: {
  question: IMultiSelectQuestion
  onChange: (value: IMultiSelectAnswer) => void
  answers: IAnswers
}) {
  // const [answer, setAnswer] = useState<IAnswer | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    IMultiOrSelectSelectOption[]
  >([])

  useEffect(() => {
    setSelectedOptions([])

    if (question.name in answers) {
      const answer = answers[question.name] as IMultiSelectAnswer
      setSelectedOptions(answer.options)
    }
    // eslint-disable-next-line
  }, [question.name])

  return (
    <div className="space-y-4">
      <QuestionHeader {...question} />
      <ul className="flex w-full sm:w-fit flex-col space-y-2">
        {question.options.map((option) => (
          <SelectBox
            key={option.name}
            selected={
              selectedOptions.findIndex((sel) => sel.name == option.name) >= 0
            }
            label={option.label}
            onClick={() => {
              let updatedList = [...selectedOptions]
              const selectedIndex = selectedOptions.findIndex(
                (sel) => sel.name == option.name
              )

              if (selectedIndex >= 0) {
                updatedList.splice(selectedIndex, 1)
              } else {
                updatedList.push(option)
              }
              setSelectedOptions(updatedList)
              onChange({
                ...question,
                options: updatedList,
              })
            }}
          />
        ))}
      </ul>
    </div>
  )
}

export function SingleSelectView({
  question,
  onChange,
  answers,
}: {
  question: ISingleSelectQuestion
  onChange: (value: ISingleSelectAnswer) => void
  answers: IAnswers
}) {
  const [selectedOption, setSelectedOption] =
    useState<IMultiOrSelectSelectOption | null>(null)

  useEffect(() => {
    setSelectedOption(null)

    if (question.name in answers) {
      const answer = answers[question.name] as ISingleSelectAnswer
      setSelectedOption(answer.option)
    }
    // eslint-disable-next-line
  }, [question.name])

  return (
    <div className="space-y-4">
      <QuestionHeader {...question} />
      <ul className="flex w-full sm:w-fit flex-col space-y-2">
        {question.options.map((option) => (
          <SelectBox
            key={option.name}
            selected={selectedOption?.name === option.name}
            label={option.label}
            onClick={() => {
              setSelectedOption(option)
              onChange({
                ...question,
                option,
              })
            }}
          />
        ))}
      </ul>
    </div>
  )
}

export function BooleanView({
  question,
  onChange,
  answers,
}: {
  question: IBooleanQuestion
  onChange: (value: IBooleanAnswer) => void
  answers: IAnswers
}) {
  const [isTrue, setIsTrue] = useState<boolean | null>(null)

  useEffect(() => {
    setIsTrue(null)

    if (question.name in answers) {
      const answer = answers[question.name] as IBooleanAnswer
      setIsTrue(answer.selection)
    }
    // eslint-disable-next-line
  }, [question.name])

  return (
    <div className="space-y-4">
      <QuestionHeader {...question} />

      <div className="flex w-full sm:w-fit flex-col space-y-2">
        <SelectBox
          className="w-full"
          selected={isTrue == true}
          label={"Yes"}
          onClick={() => {
            setIsTrue(true)
            onChange({
              ...question,
              selection: true,
            })
          }}
        />
        <SelectBox
          className="w-full"
          selected={isTrue == false}
          label={"No"}
          onClick={() => {
            setIsTrue(false)
            onChange({
              ...question,
              selection: false,
            })
          }}
        />
      </div>
    </div>
  )
}

export function TextAreaView({
  question,
  onChange,
  answers,
}: {
  question: ITextAreaQuestion
  onChange: (value: ITextAreaAnswer) => void
  answers: IAnswers
}) {
  const [value, setValue] = useState<string>("")

  useEffect(() => {
    setValue("")
    if (question.name in answers) {
      const answer = answers[question.name] as ITextAreaAnswer
      setValue(answer.value)
    }
    // eslint-disable-next-line
  }, [question.name])

  return (
    <div className="space-y-4">
      <QuestionHeader {...question} />
      <Textarea
        rows={10}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          onChange({
            ...question,
            value: event.target.value,
          })
        }}
      ></Textarea>
    </div>
  )
}

export function TextInputView({
  question,
  onChange,
  answers,
}: {
  question: IInputQuestion
  onChange: (value: IInputAnswer) => void
  answers: IAnswers
}) {
  const [value, setValue] = useState<string>("")

  useEffect(() => {
    setValue("")
    if (question.name in answers) {
      const answer = answers[question.name] as IInputAnswer
      setValue(answer.value)
    }
    // eslint-disable-next-line
  }, [question.name])

  return (
    <div className="space-y-4">
      <QuestionHeader {...question} />
      <Input
        className="w-full sm:w-96"
        type={question.inputType}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          onChange({
            ...question,
            value: event.target.value,
          })
        }}
      ></Input>
    </div>
  )
}

export function DateInputView({
  question,
  onChange,
  answers,
}: {
  question: IDateQuestion
  onChange: (value: IDateAnswer) => void
  answers: IAnswers
}) {
  const [value, setValue] = useState<Date | null>(null)

  useEffect(() => {
    setValue(null)
    if (question.name in answers) {
      const answer = answers[question.name] as IDateAnswer
      if (answer.date) {
        if (typeof answer.date === "string") {
          setValue(new Date(answer.date))
        } else {
          setValue(answer.date)
        }
      }
    }
    // eslint-disable-next-line
  }, [question.name])

  return (
    <div className="space-y-4">
      <QuestionHeader {...question} />
      <DatePicker
        date={value ? value : new Date()}
        onDateChange={(date) => {
          if (date !== null) {
            setValue(date)
          }
          onChange({
            ...question,
            date,
          })
        }}
      />
    </div>
  )
}

export function MessageView({ question }: { question: IQuestionTypeBase }) {
  return (
    <div className="space-y-4">
      <QuestionHeader {...question} />
    </div>
  )
}

function MultiSelectAnswer({ answer }: { answer: IMultiSelectAnswer }) {
  return (
    <div>
      <p className="font-semibold">{answer.question.title}</p>
      <ul className={cn("ml-4 list-disc italic")}>
        {answer.options.map((option) => (
          <li key={option.id}>{option.label}</li>
        ))}
      </ul>
    </div>
  )
}

function SingleSelectAnswer({ answer }: { answer: ISingleSelectAnswer }) {
  return (
    <div>
      <p className="font-semibold">{answer.question.title}</p>
      <p className={cn("list-disc italic")}>{answer.option?.label}</p>
    </div>
  )
}

function TextAreaOrInputAnswer({
  answer,
}: {
  answer: ITextAreaAnswer | IInputAnswer
}) {
  return (
    <div>
      <p className="font-semibold">{answer.question.title}</p>
      <p className={cn("list-disc italic")}>{answer.value}</p>
    </div>
  )
}

function BooleanAnswer({ answer }: { answer: IBooleanAnswer }) {
  return (
    <div>
      <p className="font-semibold">{answer.question.title}</p>
      <p className={cn("list-disc italic")}>
        {answer.selection ? "Yes" : "No"}
      </p>
    </div>
  )
}

function DateAnswer({ answer }: { answer: IDateAnswer }) {
  return (
    <div>
      <p className="font-semibold">{answer.question.title}</p>
      <p className={cn("list-disc italic")}>
        {answer.date &&
          (typeof answer.date === "string"
            ? answer.date
            : answer.date.toLocaleDateString())}
      </p>
    </div>
  )
}

export function SubmitView({
  question,
  answers,
}: {
  question: IQuestionTypeBase
  answers: IAnswers
}) {
  return (
    <div className="flex flex-col space-y-4">
      <QuestionHeader {...question} />
      {Object.values(answers).map((answer) => (
        <div key={answer.name}>
          {answer.qtype === "multiSelect" && (
            <MultiSelectAnswer answer={answer as IMultiSelectAnswer} />
          )}
          {answer.qtype === "singleSelect" && (
            <SingleSelectAnswer answer={answer as ISingleSelectAnswer} />
          )}
          {answer.qtype === "textArea" && (
            <TextAreaOrInputAnswer answer={answer as ITextAreaAnswer} />
          )}
          {answer.qtype === "input" && (
            <TextAreaOrInputAnswer answer={answer as IInputAnswer} />
          )}
          {answer.qtype === "bool" && (
            <BooleanAnswer answer={answer as IBooleanAnswer} />
          )}
          {answer.qtype === "date" && (
            <DateAnswer answer={answer as IDateAnswer} />
          )}
        </div>
      ))}
    </div>
  )
}
