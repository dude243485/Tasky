import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import StepOne from "./pages/onboarding/StepOne"
import StepTwo from "./pages/onboarding/StepTwo"
import StepThree from "./pages/onboarding/StepThree"
import OnboardingLayout from "./pages/onboarding/OnboardingLayout"
import SignIn from "./pages/signIn/SignIn"
import SignUp from "./pages/signUp/SignUp"
import EditProfile from "./pages/profile/EditProfile"
import ViewProfile from "./pages/profile/ViewProfile"

function App() {

  return (
    <Routes >
        <Route path = "/" element = {<Navigate to = "onboarding" />}></Route>
        <Route path = "/onboarding" element = {<OnboardingLayout />}>
          <Route index element = {<Navigate to="step-1" />} />
          <Route  path="step-1" element =  {<StepOne />} />
          <Route path="step-2" element = {<StepTwo />} />
          <Route path = "step-3" element = {<StepThree />} />
        </Route>
        <Route path = "/signin" element = {<SignIn />} />
        <Route path = "/signup" element = { <SignUp />} />
        <Route path = "/profile" >
          <Route path = "view-profile" element = { <ViewProfile />}></Route>
          <Route path = "edit-profile" element = { <EditProfile />}></Route>
        </Route>
        {/* <Route path = "/dashboard" element= {} /> */}
    </Routes>
    
  )
}

export default App
