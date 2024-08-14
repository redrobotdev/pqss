import {
  BooleanResponseFormat,
  EmptyResponseFormat,
  Exchange,
  MultiSelectResponseFormat,
  TextboxResponseFormat,
} from "../types"

import { SurveyExchange } from "../SurveyExchange"

// function createSampleSurvey() {
//   const x0: Exchange<EmptyResponseFormat> = {
//     id: "x0",
//     label: "start",
//     prompt: {
//       title: "Lets get started!",
//       description:
//         "In order to better understand your needs, \
//         we will be asking a series of guided questions. \
//         Don't worry your answers and choices are saved so \
//         if you refresh the page you won't loose your data",
//     },
//   }

//   const x1: Exchange<MultiSelectResponseFormat> = {
//     id: "x1",
//     label: "service type",
//     prompt: {
//       title: "Service Type",
//       description: "What type of Service do you need?",
//     },
//     responseAttributes: {
//       options: [
//         {
//           id: "1",
//           label: "We need a custom application",
//           value: "custom-application",
//         },
//         {
//           id: "2",
//           label: "consultation on a project",
//           value: "project-consultation",
//         },
//         {
//           id: "3",
//           label: "train team",
//           value: "team-training",
//         },
//         {
//           id: "4",
//           label: "something else",
//           value: "other",
//         },
//       ],
//     },
//   }

//   const x2: Exchange<MultiSelectResponseFormat> = {
//     id: "x2",
//     label: "platform selection",
//     prompt: {
//       title: "Platform Selection",
//       description: "What platforms do you need this for?",
//     },
//     responseAttributes: {
//       options: [
//         {
//           id: "1",
//           label: "Desktop",
//           value: "desktop",
//         },
//         {
//           id: "2",
//           label: "Web",
//           value: "web",
//         },
//         {
//           id: "3",
//           label: "Phone",
//           value: "phone",
//         },
//         {
//           id: "4",
//           label: "not sure",
//           value: "other",
//         },
//       ],
//     },
//   }

//   const x3: Exchange<BooleanResponseFormat> = {
//     id: "x2",
//     label: "is deadline",
//     prompt: {
//       title: "Do you have a deadline",
//     },
//     responseAttributes: {
//       shouldHaveUndecided: true,
//     },
//   }

//   const x4: Exchange<TextboxResponseFormat> = {
//     id: "x4",
//     label: "project-description",
//     prompt: {
//       title: "Describe your project",
//       description:
//         "Please provide a description of your project or request. \
//         Be as detailed as possible, give examples or other similar \
//         tools that might exist",
//     },
//   }

//   const x5: Exchange<MultiSelectResponseFormat> = {
//     id: "x5",
//     label: "consultation-areas",
//     prompt: {
//       title: "Consultation areas",
//       description: "Please describe the areas where you need consultation.",
//     },
//     responseAttributes: {
//       options: [
//         {
//           id: "1",
//           label: "Architecture / Design Patterns",
//           value: "architecture-design-patterns",
//         },
//         {
//           id: "2",
//           label: "Code Quality / Refactoring",
//           value: "code-quality-refactor",
//         },
//         {
//           id: "3",
//           label: "Technology Stack / Programming Languages",
//           value: "tech-lang",
//         },
//         {
//           id: "4",
//           label: "Project Management",
//           value: "management",
//         },
//         {
//           id: "5",
//           label: "Other",
//           value: "other",
//         },
//       ],
//     },
//     response: null,
//   }

//   const x6: Exchange<TextboxResponseFormat> = {
//     id: "x6",
//     label: "consultation-details",
//     prompt: {
//       title: "Consultation details",
//       description: "Please describe the other consultation details?",
//     },
//   }

//   const end: Exchange<EmptyResponseFormat> = {
//     id: "end",
//     label: "end",
//     prompt: {
//       title: "Finished",
//       description: "Thank you for your time",
//     },
//     responseAttributes: {},
//   }

//   const survey = new SurveyExchange([x0, x1, x2, x3, x4, end], x1)

//   survey.addEdge(x1, x2, (i, c) => {
//     if (i.response?.options[0].value === "custom-application") {
//       return true
//     }

//     return false
//   })

//   survey.addEdge(x1, x2, (i, c) => {
//     if (i.response?.options[0].value === "custom-application") {
//       return true
//     }

//     return false
//   })

//   survey.addEdge(x2, x3, (i, c) => {
//     if (i.response?.value === true) {
//       return true
//     }

//     return false
//   })

//   survey.addEdge(x3, x4, (i, c) => {
//     if (i.response?.options.find((x) => x.value == "web")) {
//       return true
//     }

//     return false
//   })

//   return survey
// }

function createSimpleSurvey() {
  const start: Exchange<EmptyResponseFormat> = {
    id: "start",
    label: "start",
    prompt: {
      title: "Start",
      description: "Started Desc",
    },
  }

  const a: Exchange<MultiSelectResponseFormat> = {
    id: "a",
    label: "A",
    prompt: {
      title: "A",
      description: "Description for A",
    },
    responseAttributes: {
      options: [
        {
          id: "1",
          label: "Include B",
          value: "b",
        },
        {
          id: "2",
          label: "Include C",
          value: "c",
        },
      ],
    },
  }

  const b: Exchange<MultiSelectResponseFormat> = {
    id: "b",
    label: "B",
    prompt: {
      title: "B",
      description: "Desc for B",
    },
    responseAttributes: {
      options: [
        {
          id: "1",
          label: "Include L",
          value: "l",
        },
        {
          id: "2",
          label: "Include E",
          value: "e",
        },
      ],
    },
  }

  const c: Exchange<BooleanResponseFormat> = {
    id: "c",
    label: "C",
    prompt: {
      title: "C",
    },
  }

  const d: Exchange<TextboxResponseFormat> = {
    id: "d",
    label: "D",
    prompt: {
      title: "D",
    },
    responseAttributes: {
      minWords: 20,
      maxWords: 50,
      isRequired: false,
    },
  }

  const e: Exchange<BooleanResponseFormat> = {
    id: "e",
    label: "E",
    prompt: {
      title: "E",
    },
    responseAttributes: {
      shouldHaveUndecided: true,
    },
  }

  const f: Exchange<TextboxResponseFormat> = {
    id: "f",
    label: "F",
    prompt: {
      title: "F",
    },
  }

  const g: Exchange<TextboxResponseFormat> = {
    id: "g",
    label: "G",
    prompt: {
      title: "G",
      description: "G description",
    },
  }

  const h: Exchange<MultiSelectResponseFormat> = {
    id: "h",
    label: "H",
    prompt: {
      title: "H",
      description:
        "H is multiselect, but it doesn't have any conditions for applying them to route.",
    },
    responseAttributes: {
      options: [
        {
          id: "1",
          label: "Architecture / Design Patterns",
          value: "architecture-design-patterns",
        },
        {
          id: "2",
          label: "Code Quality / Refactoring",
          value: "code-quality-refactor",
        },
        {
          id: "3",
          label: "Technology Stack / Programming Languages",
          value: "tech-lang",
        },
        {
          id: "4",
          label: "Project Management",
          value: "management",
        },
        {
          id: "5",
          label: "Other",
          value: "other",
        },
      ],
    },
  }

  const i: Exchange<TextboxResponseFormat> = {
    id: "i",
    label: "I",
    prompt: {
      title: "I",
    },
  }

  const j: Exchange<EmptyResponseFormat> = {
    id: "j",
    label: "J",
    prompt: {
      title: "J",
    },
  }

  const k: Exchange<BooleanResponseFormat> = {
    id: "k",
    label: "K",
    prompt: {
      title: "K",
    },
    responseAttributes: {
      isRequired: false,
    },
  }

  const l: Exchange<EmptyResponseFormat> = {
    id: "l",
    label: "L",
    prompt: {
      title: "L",
      description: "L Desc",
    },
  }

  const end: Exchange<EmptyResponseFormat> = {
    id: "end",
    label: "end",
    prompt: {
      title: "Finished",
      description: "Thank you for your time",
    },
    responseAttributes: {},
  }

  const survey = new SurveyExchange(
    [start, a, b, c, d, e, f, g, h, i, j, k, l, end],
    start
  )

  survey.addEdge(start, a)
  survey.addEdge(a, b, (i, c) => {
    if (!i.response) {
      return false
    }

    const foundItem = i.response.options.findIndex((opt) => opt.value === "b")
    if (foundItem < 0) {
      return false
    }

    return true
  })

  survey.addEdge(a, c, (i, c) => {
    return true
  })

  survey.addEdge(a, d, (i, c) => {
    return false
  })

  survey.addEdge(b, l)
  survey.addEdge(b, e)
  survey.addEdge(e, f)
  survey.addEdge(c, g)
  survey.addEdge(c, h)
  survey.addEdge(h, i)
  survey.addEdge(d, j)
  survey.addEdge(j, k)
  survey.addEdge(k, end)

  return survey
}

function test() {
  const survey = createSimpleSurvey()

  while (true) {
    const x = survey.getNextExchange()
    if (!x) {
      break
    }

    console.log(x.prompt.title)
    // console.log(JSON.stringify(x, null, 2))
    // x.getInput()
  }
  console.log("finished survey")
}

test()
