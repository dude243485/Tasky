import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import StepOne from "./pages/onboarding/StepOne"
import OnboardingLayout from "./pages/onboarding/OnboardingLayout"

function App() {

  return (
    <Routes>
        <Route path = "/onboarding" element = {<OnboardingLayout />}>
          <Route index element = {<Navigate to="step1" />} />
          <Route path="step-1" element =  {<StepOne />} />
          {/* <Route path="step-2" element = {} />
          <Route path = "step-3" element = {} /> */}
        </Route>
        {/* <Route path = "/login" element = {} />
        <Route path = "/signup" element = {} />
        <Route path = "/dashboard" element= {} /> */}
    </Routes>
    
  )
}

export default App
