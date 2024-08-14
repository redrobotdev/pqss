import {
  BooleanResponseFormat,
  createExchange,
  createMultiSelectPrompt,
  createPrompt,
  EmptyResponseFormat,
  Exchange,
  MultiSelectResponseFormat,
  SurveyExchange,
} from "@pqss/core"

function createSampleSurvey() {
  const x1: Exchange<MultiSelectResponseFormat> = {
    id: "service type",
    label: "Favorite Colors",
    prompt: {
      title: "Service Type",
      description: "What type of Service do you need?",
    },
    responseFormat: {
      options: [
        {
          id: "1",
          label: "We need a custom application",
          value: "custom-application",
        },
        {
          id: "2",
          label: "consultation on a project",
          value: "project-consultation",
        },
      ],
    },
    response: null,
  }

  const x2: Exchange<BooleanResponseFormat> = {
    id: "project type",
    label: "Favorite Colors",
    prompt: {
      title: "Platform Selection",
      description: "What platforms do you need this for?",
    },
    responseFormat: {
      shouldHaveUndecided: false,
    },
    response: null,
  }

  const x3: Exchange<MultiSelectResponseFormat> = {
    id: "project type",
    label: "Favorite Colors",
    prompt: {
      title: "Platform Selection",
      description: "What platforms do you need this for?",
    },
    responseFormat: {
      options: [
        {
          id: "1",
          label: "Desktop",
          value: "desktop",
        },
        {
          id: "2",
          label: "Web",
          value: "web",
        },
      ],
    },
    response: null,
  }

  const x4: Exchange<EmptyResponseFormat> = {
    id: "end",
    label: "end",
    prompt: {
      title: "Finished",
      description: "Thank you for your time",
    },
    responseFormat: {},
    response: null,
  }

  const survey = new SurveyExchange([x1, x2, x3, x4], x1)
  survey.addEdge(x1, x2, (i, c) => {
    if (i.response?.options[0].value === "custom-application") {
      return true
    }

    return false
  })

  survey.addEdge(x2, x3, (i, c) => {
    if (i.response?.value === true) {
      return true
    }

    return false
  })

  survey.addEdge(x3, x4, (i, c) => {
    if (i.response?.options.find((x) => x.value == "web")) {
      return true
    }

    return false
  })

  return survey
}

function test() {
  const survey = createSampleSurvey()

  while (true) {
    const x = survey.getNextExchange()
    if (!x) {
      break
    }

    console.log(JSON.stringify(x))
    // x.getInput()
  }
  console.log("finished survey")
}

test()
