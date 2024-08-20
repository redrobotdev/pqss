// import { setTimeout } from "node:timers/promises"
import {
  SurveyExchange,
  BooleanAttribute,
  MultiSelectAttribute,
  TextInputAttribute,
  MultiSelectAttributeOption,
} from "@pqss/core"

import {
  input,
  select,
  checkbox,
  confirm,
  search,
  password,
  expand,
  editor,
  number,
  rawlist,
  Separator,
} from "@inquirer/prompts"

function createSimpleSurvey() {
  const survey = new SurveyExchange()

  const a = survey.addExchange<MultiSelectAttribute>({
    label: "A",
    prompt: {
      title: "Exchange A",
      description:
        "Multiselect, select B to go to B, Selecting C doesn't do anything",
    },
    responseAttributes: {
      type: "multiselect",
      options: {
        b: {
          id: "1",
          label: "Include B",
          value: "b",
          description: "Include the exchange B in the questioners",
        },
        c: {
          id: "2",
          label: "Include C",
          value: "c",
          description: "Include the exchange C in the questioners",
        },
      },
    },
  })

  const b = survey.addExchange<BooleanAttribute>({
    label: "B",
    prompt: {
      title: "Exchange B",
      description: "Boolean, select yes to move to C",
    },
    responseAttributes: {
      type: "boolean",
    },
  })

  const c = survey.addExchange<BooleanAttribute>({
    label: "C",
    prompt: {
      title: "Exchange C",
      description: "Boolean, select no to move to D",
    },
    responseAttributes: {
      type: "boolean",
    },
  })

  const d = survey.addExchange<TextInputAttribute>({
    label: "D",
    prompt: {
      title: "Exchange D",
      description: "Textinput, has no effect",
    },
    responseAttributes: {
      type: "textinput",
      minWords: 20,
      maxWords: 50,
      isRequired: false,
    },
  })

  // edge conditions, are only determined based on the
  survey.addEdge(a, b, (response) => {
    if (!response) {
      return false
    }

    if (!("b" in response.options)) {
      return false
    }

    return true
  })

  survey.addEdge(b, c, (response) => {
    if (!response) {
      return false
    }

    return response.value == true
  })

  survey.addEdge(c, d, (response) => {
    if (!response) {
      return false
    }

    if (response.value == false) {
      return true
    }

    return false
  })

  // survey.addEdge(a, d)
  return survey
}

async function RunPrompts() {
  const survey = createSimpleSurvey()
  while (true) {
    const x = survey.getNextExchange()
    if (!x) {
      break
    }

    switch (x.responseAttributes?.type) {
      case "multiselect": {
        if (!x.prompt || !x.responseAttributes) {
          return null
        }

        const options = Object.values(x.responseAttributes.options).map(
          (opt) => ({
            name: opt.label,
            value: opt.value,
            description: opt.description,
          })
        )

        let answer = await checkbox({
          message: `${x.prompt.title} | ${x.prompt?.description}`,
          choices: options,
        })

        let responses = Object.values(x.responseAttributes.options).filter(
          (opt) => {
            return answer.findIndex((a) => a === opt.value) >= 0
          }
        )

        let responseOptions = responses.reduce((accumulator, currentValue) => {
          accumulator[currentValue.value] = currentValue
          return accumulator
        }, {} as Record<string, MultiSelectAttributeOption>)

        x.response = {
          type: "multiselect",
          timestamp: new Date(),
          options: responseOptions,
        }
        break
      }
      case "boolean": {
        if (!x.prompt || !x.responseAttributes) {
          return null
        }

        let answer = await confirm({
          message: `${x.prompt.title} | ${x.prompt?.description}`,
        })

        x.response = {
          type: "boolean",
          timestamp: new Date(),
          value: answer,
        }
        break
      }
      case "textinput": {
        if (!x.prompt || !x.responseAttributes) {
          return null
        }

        let answer = await input({
          message: `${x.prompt.title} | ${x.prompt?.description}`,
        })

        x.response = {
          type: "textinput",
          timestamp: new Date(),
          text: answer,
        }
        break
      }
      case "empty": {
        if (!x.prompt || !x.responseAttributes) {
          return null
        }
        await confirm({
          message: `${x.prompt.title} | ${x.prompt?.description}`,
        })
        break
      }
    }
  }

  const responses = Object.values(survey.exchanges).map((x) => x.response)
  console.log(JSON.stringify(responses, null, 2))
  // console.log(JSON.stringify(survey.exchanges, null, 2))
}

RunPrompts()
