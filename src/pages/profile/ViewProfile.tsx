import ProfileContainer from "../../components/profile/Profilecontainer"
import ProfileHeader from "../../components/profile/ProfileHeader"
import ProfileItems from "../../components/profile/ProfileItems"
import { ProfileData } from "../../tempData/ProfileData"


const ViewProfile = () => {
  
  const handleMyProfile = () => {
    console.log("You clicked my profile")
  }

  const handlePassword= () => {
    console.log("you clicked change password")
  }

  const handleTheme = () => {
    console.log("you clicked theme")
  }

  const hanldeTimeFormat = () => {
    console.log("you clicked time format")
  }

  const handleLogout = () => {
    console.log(" you clicked log out")
  }

  const ProfileActions = {
    "My Profile" : handleMyProfile,
    "Change Password" : handlePassword,
    "Theme" : handleTheme,
    "Time Format" : hanldeTimeFormat,
    "Logout" : handleLogout
  }

  const newProfileData = ProfileData.map((item) => {
    return {
      ...item,
      ["onClick"] : ProfileActions[item.title as keyof typeof ProfileActions]
    }
  })
  const accountData = newProfileData.slice(0, 1);
  const settingsData = newProfileData.slice(1);

  const handleBack = () => {
    //...
  }

  return (
    <div className = "min-h-screen bg-brand-primary-600 flex flex-col pt-40 ">
      <ProfileHeader variant = "transparent" onClick={ handleBack } />
      <div className="w-full relative flex-1 h-full max-w-md bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-t-4xl px-6 pt-27">
        <ProfileContainer />
        <div className = "flex flex-col gap-3 z-100">
          <ProfileItems label = {"Account"} items={accountData} />
          <ProfileItems label = {"Settings"} items = {settingsData} />
        </div>
      </div>
    </div>
  )
}

export default ViewProfile