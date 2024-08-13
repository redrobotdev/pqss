import {
  IBooleanAnswer,
  IBooleanQuestion,
  IInputQuestion,
  IMultiSelectQuestion,
  IMultiSelectAnswer,
  INodeBase,
  IQuestionTypeBase,
  IQuestions,
  ITextAreaQuestion,
  ISingleSelectQuestion,
  IDateQuestion,
  ISingleSelectAnswer,
} from "@pqss/core"

export const questions: IQuestions = {
  questions: {
    START: {
      qtype: "message",
      name: "START",
      question: {
        title: "Lets get started!",
        text: `In order to better understand your needs, we will be asking a series of guided questions. '
        Don't worry your answers and choices are saved so if you refresh the page you won't loose your data`,
      },
    } as IQuestionTypeBase,
    BASE1: {
      name: "BASE1",
      qtype: "multiSelect",
      question: {
        title: "What type of services do you need?",
        subtitle: "Check all that applies",
      },
      options: [
        {
          id: 1,
          name: "project",
          label:
            "We need you to create a custom application (phone/web/desktop) for us",
        },
        {
          id: 2,
          name: "consultation",
          label:
            "Consultation on a project we are planning to work on, or are currently working on",
        },
        {
          id: 3,
          name: "training",
          label: "Train our team or individual for a project",
        },
        {
          id: 4,
          name: "other",
          label: "Something else",
        },
      ],
    } as IMultiSelectQuestion,
    BASE2: {
      name: "BASE2",
      qtype: "multiSelect",
      question: {
        title: "What type of project is this?",
        subtitle: "Check all that applies",
        text: `If you are not sure, check 'Not sure' or you can read more about different application types in our services page.`,
      },
      options: [
        {
          id: 1,
          name: "desktop",
          label: "Desktop",
        },
        {
          id: 2,
          name: "web",
          label: "Web",
        },
        {
          id: 3,
          name: "phone",
          label: "Mobile / Phone / Tablet",
        },
        {
          id: 4,
          name: "notSure",
          label: "Not sure",
        },
        {
          id: 5,
          name: "else",
          label: "Something else",
        },
      ],
    } as IMultiSelectQuestion,
    BASE3: {
      name: "BASE3",
      qtype: "textArea",
      question: {
        title: "What is your project?",
        text: `Please provide a description of your project. For example, it could be a simple application designed to track inventory shipments to customer sites, or perhaps a mobile app intended for a dog tag device. Additionally, if you need consultation for your project, please specify.`,
      },
    } as ITextAreaQuestion,
    CONSULT1: {
      name: "CONSULT1",
      qtype: null,
      postCheck: (answers) => {
        if (!("BASE1" in answers)) {
          return false
        }

        const rtnValue = (
          answers["BASE1"] as IMultiSelectAnswer
        ).options.findIndex((item: any) => item.name === "consultation")
        return rtnValue >= 0
      },
    } as INodeBase,
    CONSULT2: {
      name: "CONSULT2",
      qtype: "multiSelect",
      question: {
        title: "What would you like us to consult with you on?",
        subtitle: "Check all that applies",
        text: "Please describe the areas where you need consultation.",
      },
      options: [
        {
          id: 1,
          name: "arch",
          label: "Architecture / Design Patterns",
        },
        {
          id: 2,
          name: "refactor",
          label: "Code Quality / Refactoring",
        },
        {
          id: 3,
          name: "tech",
          label: "Technology Stack / Programming Languages",
        },
        {
          id: 4,
          name: "team",
          label: "Project Management",
        },
        {
          id: 5,
          name: "notSure",
          label: "Not sure",
        },
      ],
    } as IMultiSelectQuestion,
    CONSULT3: {
      qtype: "textArea",
      name: "CONSULT3",
      question: {
        title: "Any Other consultation item you need help with?",
        text: "Go into as much detail as you like.",
      },
    } as ITextAreaQuestion,
    TRAIN1: {
      qtype: null,
      name: "TRAIN1",
      postCheck: (answers) => {
        if (!("BASE1" in answers)) {
          return false
        }

        const rtnValue = (
          answers["BASE1"] as IMultiSelectAnswer
        ).options.findIndex((item: any) => item.name === "training")
        return rtnValue >= 0
      },
    } as INodeBase,
    TRAIN2: {
      qtype: "input",
      inputType: "number",
      name: "TRAIN2",
      question: {
        title: "How Large is your team?",
        text: `This is team that you like to be trained, if it's only you enter 1`,
      },
    } as IInputQuestion,
    TRAIN3: {
      qtype: "singleSelect",
      name: "TRAIN3",
      question: {
        title: "What format of training do you need?",
        text: `If you need the training to be done in your office, room, studio, etc., select On-Site. If you prefer the training to be done remotely, select Remote.`,
      },
      options: [
        {
          id: 1,
          name: "onside",
          label: "On-Site",
        },
        {
          id: 2,
          name: "online",
          label: "Online",
        },
        {
          id: 3,
          name: "onside-and-online",
          label: "On-Site & Online",
        },
      ],
    } as ISingleSelectQuestion,
    TRAIN4: {
      qtype: "singleSelect",
      name: "TRAIN4",
      question: {
        title: "What kind of online training do you need?",
        text: `A live session is similar to a class room, where student will learn live and ask questions`,
      },
      options: [
        {
          id: 1,
          name: "liveClass",
          label: "Live Class",
        },
        {
          id: 2,
          name: "offlineClass",
          label: "Offline Class",
        },
      ],
    } as ISingleSelectQuestion,
    PROJ1: {
      qtype: null,
      name: "PROJ1",
      postCheck: (answers) => {
        if (!("BASE1" in answers)) {
          return false
        }

        const rtnValue = (
          answers["BASE1"] as IMultiSelectAnswer
        ).options.findIndex((item: any) => item.name === "project")
        return rtnValue >= 0
      },
    } as INodeBase,
    PROJ2: {
      qtype: "singleSelect",
      name: "PROJ2",
      question: {
        title: "How familiar are you with application development process?",
        text: `Think about purchasing a home: if you are a first-time buyer, there are many important aspects to look out for, and if you are new, you might miss them. Similarly, if you are not familiar with the development process, we will make sure to go over all the details and decision making logic at each step `,
      },
      options: [
        {
          id: 1,
          name: "beginner",
          label:
            "This is completely new to me, and I need all the help I can get",
        },
        {
          id: 2,
          name: "medium",
          label: "I technical person, but I am not familiar with the process",
        },
        {
          id: 3,
          name: "pro",
          label: "I am familiar with this process",
        },
      ],
    } as ISingleSelectQuestion,
    PROJ3: {
      qtype: "bool",
      name: "PROJ3",
      question: {
        title: "Do you have a deadline for this project?",
      },
      postCheck: (answers) => {
        if (!("PROJ3" in answers)) {
          return false
        }

        const answer = answers["PROJ3"] as IBooleanAnswer
        return answer.selection
      },
    } as IBooleanQuestion,
    PROJ4: {
      qtype: "date",
      name: "PROJ4",
      question: {
        title: "When do you need this project to be ready?",
      },
    } as IDateQuestion,
    PROJ5: {
      qtype: "input",
      inputType: "number",
      name: "PROJ5",
      question: {
        title: "What is your budget?",
        text: "This is maximum amount (in dollars) you have set aside for this project. We use this information to provide you a better solution that fits within your time and budget.",
      },
    } as IInputQuestion,
    PROJ6: {
      qtype: "bool",
      name: "PROJ6",
      question: {
        title: "Do you already have code developed for this project?",
        text: "If there an existing codebase, or have you hired someone in the past to work on your project?",
      },
    } as IBooleanQuestion,
    PROJ7: {
      qtype: "bool",
      name: "PROJ7",
      question: {
        title: " Do you plan on having us support your software after release?",
        text: "After your application is released, you may choose to have us remain as support in case something goes wrong. It's normal for applications to have bugs here and there, and if you would like us to make changes, it's part of the agile process.",
      },
    } as IBooleanQuestion,
    OTHER1: {
      qtype: null,
      name: "OTHER1",
      postCheck: (answers) => {
        if (!("BASE1" in answers)) {
          return false
        }
        const rtnValue = (
          answers["BASE1"] as IMultiSelectAnswer
        ).options.findIndex((item: any) => item.name === "other")
        return rtnValue >= 0
      },
    } as INodeBase,
    OTHER2: {
      qtype: "textArea",
      name: "OTHER2",
      question: {
        title: "What other service do you need?",
        text: "You selected something else from the services list, let us know what you need",
      },
    } as ITextAreaQuestion,
    CONTACT1: {
      qtype: "singleSelect",
      name: "CONTACT1",
      question: {
        title: "What is the best way to get in contact you?",
      },
      options: [
        {
          id: 1,
          name: "email",
          label: "E-mail",
        },
        {
          id: 2,
          name: "phone",
          label: "Phone",
        },
      ],
      postCheck: (answers) => {
        if (!("CONTACT1" in answers)) {
          return false
        }
        const rtnValue = (answers["CONTACT1"] as ISingleSelectAnswer).option
        if (rtnValue?.name === "phone") {
          return true
        }
        return false
      },
    } as ISingleSelectQuestion,
    CONTACT2: {
      qtype: "input",
      inputType: "email",
      name: "CONTACT2",
      question: {
        title: "Please enter your e-mail address",
      },
    } as IInputQuestion,
    CONTACT3: {
      qtype: "input",
      inputType: "number",
      name: "CONTACT3",
      question: {
        title: "Please enter your phone number",
      },
    } as IInputQuestion,
    SUBMIT: {
      qtype: "submit",
      name: "SUBMIT",
      question: {
        title: "Review Selections",
      },
    } as IQuestionTypeBase,
    END: {
      qtype: "message",
      name: "END",
      question: {
        title: "Thank you!",
        subtitle: "We will contact you very soon.",
      },
    } as IQuestionTypeBase,
  },
  connections: {
    START: "BASE1",

    BASE1: "BASE2",
    BASE2: "BASE3",
    BASE3: "CONSULT1",

    CONSULT1: {
      True: "CONSULT2",
      False: "TRAIN1",
    },
    CONSULT2: "CONSULT3",
    CONSULT3: "TRAIN1",

    TRAIN1: {
      True: "TRAIN2",
      False: "PROJ1",
    },
    TRAIN2: "TRAIN3",
    TRAIN3: "TRAIN4",
    TRAIN4: "PROJ1",

    PROJ1: {
      True: "PROJ2",
      False: "OTHER1",
    },
    PROJ2: "PROJ3",
    PROJ3: {
      True: "PROJ4",
      False: "PROJ5",
    },
    PROJ4: "PROJ5",
    PROJ5: "PROJ6",
    PROJ6: "PROJ7",
    PROJ7: "OTHER1",

    OTHER1: {
      True: "OTHER2",
      False: "CONTACT1",
    },
    OTHER2: "CONTACT1",

    CONTACT1: {
      True: "CONTACT3",
      False: "CONTACT2",
    },
    CONTACT2: "SUBMIT",
    CONTACT3: "SUBMIT",

    SUBMIT: "END",
    END: null,
  },
  start: "START",
}
