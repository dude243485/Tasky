import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import StepOne from "./pages/onboarding/StepOne"
import StepTwo from "./pages/onboarding/StepTwo"
import StepThree from "./pages/onboarding/StepThree"
import OnboardingLayout from "./pages/onboarding/OnboardingLayout"
import SignIn from "./pages/signIn/SignIn"
import SignUp from "./pages/signUp/SignUp"

function App() {

  return (
    <Routes>
        <Route path = "/onboarding" element = {<OnboardingLayout />}>
          <Route index element = {<Navigate to="step1" />} />
          <Route path="step-1" element =  {<StepOne />} />
          <Route path="step-2" element = {<StepTwo />} />
          <Route path = "step-3" element = {<StepThree />} />
        </Route>
        <Route path = "/signin" element = {<SignIn />} />
        <Route path = "/signup" element = { <SignUp />} />
        {/* <Route path = "/dashboard" element= {} /> */}
    </Routes>
    
  )
}

export default App
