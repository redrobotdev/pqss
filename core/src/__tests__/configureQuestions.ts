import { SurveyExchange } from "../SurveyExchange"
import {
  BooleanAttribute,
  MultiSelectAttribute,
  TextInputAttribute,
} from "../types"

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

// function createSimpleSurvey() {
//   const start: Exchange<EmptyAttributes> = {
//     id: "start",
//     label: "start",
//     prompt: {
//       title: "Start",
//       description: "Started Desc",
//     },
//   }

//   const a: Exchange<MultiSelectAttribute> = {
//     id: "a",
//     label: "A",
//     prompt: {
//       title: "A",
//       description: "Description for A",
//     },
//     responseAttributes: {
//       options: [
//         {
//           id: "1",
//           label: "Include B",
//           value: "b",
//         },
//         {
//           id: "2",
//           label: "Include C",
//           value: "c",
//         },
//       ],
//     },
//   }

//   const b: Exchange<MultiSelectAttribute> = {
//     id: "b",
//     label: "B",
//     prompt: {
//       title: "B",
//       description: "Desc for B",
//     },
//     responseAttributes: {
//       options: [
//         {
//           id: "1",
//           label: "Include L",
//           value: "l",
//         },
//         {
//           id: "2",
//           label: "Include E",
//           value: "e",
//         },
//       ],
//     },
//   }

//   const c: Exchange<BooleanAttributes> = {
//     id: "c",
//     label: "C",
//     prompt: {
//       title: "C",
//     },
//   }

//   const d: Exchange<TextInputAttributes> = {
//     id: "d",
//     label: "D",
//     prompt: {
//       title: "D",
//     },
//     responseAttributes: {
//       minWords: 20,
//       maxWords: 50,
//       isRequired: false,
//     },
//   }

//   const e: Exchange<BooleanAttributes> = {
//     id: "e",
//     label: "E",
//     prompt: {
//       title: "E",
//     },
//     responseAttributes: {
//       shouldHaveUndecided: true,
//     },
//   }

//   const f: Exchange<TextInputAttributes> = {
//     id: "f",
//     label: "F",
//     prompt: {
//       title: "F",
//     },
//   }

//   const g: Exchange<TextInputAttributes> = {
//     id: "g",
//     label: "G",
//     prompt: {
//       title: "G",
//       description: "G description",
//     },
//   }

//   const h: Exchange<MultiSelectAttribute> = {
//     id: "h",
//     label: "H",
//     prompt: {
//       title: "H",
//       description:
//         "H is multiselect, but it doesn't have any conditions for applying them to route.",
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
//   }

//   const i: Exchange<TextInputAttributes> = {
//     id: "i",
//     label: "I",
//     prompt: {
//       title: "I",
//     },
//   }

//   const j: Exchange<EmptyAttributes> = {
//     id: "j",
//     label: "J",
//     prompt: {
//       title: "J",
//     },
//   }

//   const k: Exchange<BooleanAttributes> = {
//     id: "k",
//     label: "K",
//     prompt: {
//       title: "K",
//     },
//     responseAttributes: {
//       isRequired: false,
//     },
//   }

//   const l: Exchange<EmptyAttributes> = {
//     id: "l",
//     label: "L",
//     prompt: {
//       title: "L",
//       description: "L Desc",
//     },
//   }

//   const end: Exchange<EmptyAttributes> = {
//     id: "end",
//     label: "end",
//     prompt: {
//       title: "Finished",
//       description: "Thank you for your time",
//     },
//     responseAttributes: {},
//   }

//   const survey = new SurveyExchange(
//     [start, a, b, c, d, e, f, g, h, i, j, k, l, end],
//     start
//   )

//   survey.addEdge(start, a)
//   survey.addEdge(a, b, (i) => {
//     if (!i.response) {
//       return false
//     }

//     const foundItem = i.response.options.findIndex((opt) => opt.value === "b")
//     if (foundItem < 0) {
//       return false
//     }

//     return true
//   })

//   survey.addEdge(a, c, () => {
//     return true
//   })

//   survey.addEdge(a, d, () => {
//     return false
//   })

//   survey.addEdge(b, l)
//   survey.addEdge(b, e)
//   survey.addEdge(e, f)
//   survey.addEdge(c, g)
//   survey.addEdge(c, h)
//   survey.addEdge(h, i)
//   survey.addEdge(d, j)
//   survey.addEdge(j, k)
//   survey.addEdge(k, end)

//   if (a.responseAttributes) {
//     survey.addResponse(a, {
//       options: [a.responseAttributes.options[1]],
//     })
//   }

//   if (b.responseAttributes) {
//     survey.addResponse(b, {
//       options: [
//         b.responseAttributes.options[0],
//         b.responseAttributes.options[1],
//       ],
//     })
//   }

//   if (c.responseAttributes) {
//     survey.addResponse(c, { value: true, undecided: false })
//   }

//   return survey
// }

function createSimpleSurvey() {
  const survey = new SurveyExchange()

  const a = survey.addExchange<MultiSelectAttribute>({
    label: "A",
    prompt: {
      title: "A",
      description: "Description for A",
    },
    responseAttributes: {
      type: "multiselect",
      options: {
        "include-b": {
          id: "1",
          label: "Include B",
          value: "b",
        },
        "include-c": {
          id: "2",
          label: "Include C",
          value: "c",
        },
      },
    },
  })

  const b = survey.addExchange<BooleanAttribute>({
    label: "B",
    prompt: {
      title: "B",
      description: "Description for B",
    },
    responseAttributes: {
      type: "boolean",
    },
  })

  const c = survey.addExchange<BooleanAttribute>({
    label: "C",
    prompt: {
      title: "C",
    },
    responseAttributes: {
      type: "boolean",
    },
  })

  const d = survey.addExchange<TextInputAttribute>({
    label: "D",
    prompt: {
      title: "D",
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

    if (!("include-b" in response.options)) {
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

  survey.addEdge(a, d)

  if (a.responseAttributes) {
    survey.addResponse(a, {
      timestamp: new Date(),
      type: "multiselect",
      options: {
        ["include-a"]: a.responseAttributes.options["include-a"],
        ["include-b"]: a.responseAttributes.options["include-b"],
      },
    })
  }

  if (b.responseAttributes) {
    survey.addResponse(b, {
      timestamp: new Date(),
      type: "boolean",
      value: true,
    })
  }

  if (c.responseAttributes) {
    survey.addResponse(c, {
      timestamp: new Date(),
      type: "boolean",
      value: false,
    })
  }

  return survey
}

function test() {
  const survey = createSimpleSurvey()

  while (true) {
    const x = survey.getNextExchange()
    if (!x) {
      break
    }

    console.log(JSON.stringify(x, null, 2))
  }
  console.log("finished survey")
}

test()
