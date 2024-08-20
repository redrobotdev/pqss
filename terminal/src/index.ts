// import { setTimeout } from "node:timers/promises"
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

async function RunPrompts() {
  const inputValues = await input({ message: "Enter Input" })
  const selectionValues = await select({
    message: "Select item",
    choices: [
      {
        name: "npm",
        value: "npm",
        description: "npm is the most popular package manager",
      },
      {
        name: "yarn",
        value: "yarn",
        description: "yarn is an awesome package manager",
        short: "yayalala",
      },
      {
        type: "separator",
        separator: "~~~~~~~~~~",
      },
      new Separator(),
      {
        name: "jspm",
        value: "jspm",
        disabled: true,
      },
      {
        name: "pnpm",
        value: "pnpm",
        disabled: "(pnpm is not available)",
      },
    ],
  })

  const checkboxValues = await checkbox({
    message: "Select a package manager",
    choices: [
      { name: "react", value: "react", short: "the react package" },
      { name: "vue", value: "vue" },
      new Separator(),
      { name: "svelt", value: "svelt", disabled: true },
      {
        name: "htmx",
        value: "htmx",
        disabled: "(htmx is not available)",
      },
    ],
  })
  const confirmValue = await confirm({ message: "Continue?" })

  const searchValue = await search({
    message: "Select an npm package",
    source: async (input, { signal }) => {
      if (!input) {
        return []
      }

      const response = await fetch(
        `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(
          input
        )}&size=20`,
        { signal }
      )
      const data = await response.json()

      return data.objects.map(
        (pkg: { package: { name: string; description: string } }) => ({
          name: pkg.package.name,
          value: pkg.package.name,
          description: pkg.package.description,
        })
      )
    },
  })

  const passwordValue = await password({ message: "Enter your name" })

  const expandValue = await expand({
    message: "Conflict on file.js",
    default: "y",
    choices: [
      {
        key: "y",
        name: "Overwrite",
        value: "overwrite",
      },
      {
        key: "a",
        name: "Overwrite this one and all next",
        value: "overwrite_all",
      },
      {
        key: "d",
        name: "Show diff",
        value: "diff",
      },
      {
        key: "x",
        name: "Abort",
        value: "abort",
      },
    ],
  })

  const editorValue = await editor({
    message: "Enter a description",
  })

  const numberValue = await number({ message: "Enter your age" })

  const rawValue = await rawlist({
    message: "Select a package manager",
    choices: [
      { name: "npm", value: "npm" },
      { name: "yarn", value: "yarn" },
      { name: "pnpm", value: "pnpm" },
    ],
  })

  console.log("inputValues:", inputValues)
  console.log("selectionValues:", selectionValues)
  console.log("checkboxValues:", checkboxValues)
  console.log("confirmValue:", confirmValue)
  console.log("searchValue:", searchValue)
  console.log("passwordValue:", passwordValue)
  console.log("expandValue:", expandValue)
  console.log("editorValue:", editorValue)
  console.log("numberValue:", numberValue)
  console.log("rawValue:", rawValue)
}

RunPrompts()
