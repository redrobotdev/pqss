"use client"

import { useEffect, useState } from "react"
import {
  IAnswers,
  IBooleanAnswer,
  IBooleanQuestion,
  IDateAnswer,
  IDateQuestion,
  IInputAnswer,
  IInputQuestion,
  IMultiSelectAnswer,
  IMultiSelectQuestion,
  IQuestionEdge,
  IQuestionTypeBase,
  IQuestions,
  ISingleSelectAnswer,
  ISingleSelectQuestion,
  ITextAreaAnswer,
  ITextAreaQuestion,
} from "@pqss/core"

import {
  MessageView,
  BooleanView,
  MultiSelectView,
  TextAreaView,
  TextInputView,
  SubmitView,
  SingleSelectView,
  DateInputView,
} from "./QuestionElements"

export const useSurvey = ({
  questions,
  onSubmit,
}: {
  questions: IQuestions
  onSubmit: (answers: IAnswers) => void
}) => {
  const [step, setStep] = useState<string>(questions.start)
  const [answers, setAnswers] = useState<IAnswers>({})
  const [component, setComponent] = useState<React.ReactNode>(null)
  const [prevSteps, setPrevSteps] = useState<Array<string>>([])
  const [canMoveNext, setCanMoveNext] = useState<boolean>(false)
  const [showBack, setShowBack] = useState<boolean>(false)
  const [showNext, setShowNext] = useState<boolean>(false)

  useEffect(() => {
    const answersStr = localStorage.getItem("answers")
    if (answersStr) {
      const value = JSON.parse(answersStr)
      setAnswers(value)
    }
  }, [])

  // on answers change, save to localStorgae
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    let rtnView = null
    let currQuestion = questions.questions[step]

    if (currQuestion.qtype === "multiSelect") {
      if (
        (answers[currQuestion.name] as IMultiSelectAnswer)?.options.length > 0
      ) {
        setCanMoveNext(true)
      } else {
        setCanMoveNext(false)
      }

      rtnView = (
        <MultiSelectView
          answers={answers}
          question={currQuestion as IMultiSelectQuestion}
          onChange={(answer) => {
            setAnswers({
              ...answers,
              [answer.name]: answer,
            })

            if (answer.options.length > 0) {
              setCanMoveNext(true)
            } else {
              setCanMoveNext(false)
            }
          }}
        />
      )
    } else if (currQuestion.qtype === "singleSelect") {
      if ((answers[currQuestion.name] as ISingleSelectAnswer)?.option) {
        setCanMoveNext(true)
      } else {
        setCanMoveNext(false)
      }

      rtnView = (
        <SingleSelectView
          answers={answers}
          question={currQuestion as ISingleSelectQuestion}
          onChange={(answer) => {
            setAnswers({
              ...answers,
              [answer.name]: answer,
            })

            if (answer.option) {
              setCanMoveNext(true)
            } else {
              setCanMoveNext(false)
            }
          }}
        />
      )
    } else if (currQuestion.qtype === "bool") {
      if (
        (answers[currQuestion.name] as IBooleanAnswer)?.selection !== undefined
      ) {
        setCanMoveNext(true)
      } else {
        setCanMoveNext(false)
      }

      rtnView = (
        <BooleanView
          answers={answers}
          question={currQuestion as IBooleanQuestion}
          onChange={(answer) => {
            setAnswers({
              ...answers,
              [answer.name]: answer,
            })

            if (answer.selection !== null) {
              setCanMoveNext(true)
            } else {
              setCanMoveNext(false)
            }
          }}
        />
      )
    } else if (currQuestion.qtype === "input") {
      if ((answers[currQuestion.name] as IInputAnswer)?.value.length > 0) {
        setCanMoveNext(true)
      } else {
        setCanMoveNext(false)
      }

      rtnView = (
        <TextInputView
          answers={answers}
          question={currQuestion as IInputQuestion}
          onChange={(answer) => {
            setAnswers({
              ...answers,
              [answer.name]: answer,
            })

            if (answer.value.length > 0) {
              setCanMoveNext(true)
            } else {
              setCanMoveNext(false)
            }
          }}
        />
      )
    } else if (currQuestion.qtype === "date") {
      if ((answers[currQuestion.name] as IDateAnswer)?.date !== null) {
        setCanMoveNext(true)
      } else {
        setCanMoveNext(false)
      }

      rtnView = (
        <DateInputView
          answers={answers}
          question={currQuestion as IDateQuestion}
          onChange={(answer) => {
            setAnswers({
              ...answers,
              [answer.name]: answer,
            })

            if (answer.date !== null) {
              setCanMoveNext(true)
            } else {
              setCanMoveNext(false)
            }
          }}
        />
      )
    } else if (currQuestion.qtype === "textArea") {
      if ((answers[currQuestion.name] as ITextAreaAnswer)?.value.length > 0) {
        setCanMoveNext(true)
      } else {
        setCanMoveNext(false)
      }

      rtnView = (
        <TextAreaView
          answers={answers}
          question={currQuestion as ITextAreaQuestion}
          onChange={(answer) => {
            setAnswers({
              ...answers,
              [answer.name]: answer,
            })

            if (answer.value.length > 50) {
              setCanMoveNext(true)
            } else {
              setCanMoveNext(false)
            }
          }}
        />
      )
    } else if (currQuestion.qtype === "message") {
      setCanMoveNext(true)
      rtnView = <MessageView question={currQuestion as IQuestionTypeBase} />
    } else if (currQuestion.qtype === "submit") {
      setCanMoveNext(true)
      rtnView = (
        <SubmitView
          question={currQuestion as IQuestionTypeBase}
          answers={answers}
        />
      )
    } else {
      rtnView = <p>missing display</p>
    }

    // determine if next and back should be shown
    let nextStep = questions.connections[step] as string // PROJ3
    if (!nextStep) {
      setShowNext(false)
    } else {
      setShowNext(true)
    }

    // show back
    if (step === questions.start || !nextStep) {
      setShowBack(false)
    } else {
      setShowBack(true)
    }

    setComponent(rtnView)
    // eslint-disable-next-line
  }, [step])

  const moveNext = () => {
    let currStep = step
    setPrevSteps([...prevSteps, currStep])
    setCanMoveNext(false)

    let nextStep = questions.connections[currStep] as string // PROJ3

    while (true) {
      let currQuestion = questions.questions[currStep] // A2 Question

      // if it's the last question, then call submit and move to
      if (currQuestion.qtype === "submit") {
        onSubmit(answers)
      }

      // if the question has a true false decision
      if (typeof nextStep !== "string") {
        if (!currQuestion.postCheck) {
          throw new Error("currQuestion must have a postCheck")
        }

        // run the postCheck
        const postCheckRtnValue = currQuestion.postCheck(answers)
        if (typeof nextStep === "string") {
          throw new Error("nextStep cannot be a string")
        }

        if (!nextStep) {
          throw new Error("nextStep is null")
        }

        if (postCheckRtnValue) {
          nextStep = (nextStep as IQuestionEdge).True
        } else {
          nextStep = (nextStep as IQuestionEdge).False
        }
      }

      let nextQuestion = questions.questions[nextStep] // A2 Question
      let nextStepFuture = questions.connections[nextStep] // {T, F}

      if (!nextQuestion) {
        throw new Error(`No question defined for tag: ${nextStep}`)
      }

      // if the question type is null, there is nothing to show run the postCheck
      if (nextQuestion.qtype === null) {
        if (!nextQuestion.postCheck) {
          throw new Error("qtype null, must have a postCheck")
        }

        if (typeof nextStepFuture === "string") {
          throw new Error("nextStepFuture cannot be a string")
        }

        if (!nextStepFuture) {
          throw new Error("nextStepFuture is null")
        }

        // run the postCheck
        const postCheckRtnValue = nextQuestion?.postCheck(answers)
        if (postCheckRtnValue) {
          nextStep = nextStepFuture.True
        } else {
          nextStep = nextStepFuture.False
        }
      }

      if (nextQuestion.qtype !== null) {
        setStep(nextStep)
        break
      }
    }
  }

  const moveBack = () => {
    const clonedPrevSteps = [...prevSteps]
    const lastStep = clonedPrevSteps.pop()
    if (lastStep) {
      setStep(lastStep)
      setPrevSteps(clonedPrevSteps)
    }
  }

  const resetSurvey = () => {
    localStorage.setItem("answers", "")
  }

  return {
    step,
    answers,
    component,
    canMoveNext,
    showBack,
    showNext,
    moveNext,
    moveBack,
    resetSurvey,
  }
}
