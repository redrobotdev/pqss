"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@inquirer/prompts");
const ac = new AbortController();
const prompt = (0, prompts_1.input)({
    message: "Enter a value (timing out in 5 seconds)",
});
prompt
    .finally(() => {
    ac.abort();
})
    // Silencing the cancellation error.
    .catch(() => { });
// const defaultValue = setTimeout(5000, "timeout", { signal: ac.signal }).then(
//   () => {
//     prompt.cancel()
//     return "Timed out!"
//   }
// )
// const answer = await Promise.race([defaultValue, prompt])
