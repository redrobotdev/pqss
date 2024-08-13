import { useState } from "react"
import SurveySection from "./surveySection"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto max-w-screen-md p-4">
      <h1 className="font-bold text-2xl">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <SurveySection />
    </div>
  )
}

export default App
