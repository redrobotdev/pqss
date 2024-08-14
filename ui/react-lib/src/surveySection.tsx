import { Button } from "@/components/ui/button"
import { questions } from "./questions"
import { useSurvey } from "./useSurvey"

// how to programically define questions

export default function SurveySection() {
  const {
    component,
    canMoveNext,
    showNext,
    showBack,
    moveNext,
    moveBack,
    resetSurvey,
  } = useSurvey({
    questions: questions,
    onSubmit: async (answers) => {
      console.log(JSON.stringify(answers))
      resetSurvey()
    },
  })

  return (
    <section className="space-y-8">
      {component}
      <div className="flex flex-row">
        {showBack && (
          <Button variant="secondary" onClick={moveBack}>
            Back
          </Button>
        )}
        <div className="grow"></div>
        {showNext && (
          <Button disabled={!canMoveNext} onClick={moveNext}>
            Next
          </Button>
        )}
      </div>
      {!showBack && !showNext && <Button variant="outline">Go To Home</Button>}
    </section>
  )
}
