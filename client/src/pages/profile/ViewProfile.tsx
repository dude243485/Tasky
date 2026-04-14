import { useNavigate } from "react-router"
import { useState } from "react"
import ProfileContainer from "../../components/profile/ProfileContainer"
import ProfileHeader from "../../components/profile/ProfileHeader"
import ProfileItems from "../../components/profile/ProfileItems"
import { ProfileData } from "../../tempData/ProfileData"
import PopupModal from "../../modals/PopupModal"
import BrandButton from "../../components/buttons/BrandButton"
import { LogOut, Palette } from "lucide-react"
import { useTheme } from "../../services/ThemeContext"
import LogoutModal from "../../modals/LogoutModal"


const ViewProfile = () => {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [themeModalOpen, setThemeModalOpen] = useState<boolean>(false);

  const handleMyProfile = () => {
    navigate("/profile/edit-profile")

  }

  const handlePassword = () => {
    alert("This feature is not available yet")
  }

  const handleTheme = () => {
    setThemeModalOpen(true);
  }

  const handleLogout = () => {
    setLogoutModalOpen(true);
  }

  const ProfileActions = {
    "Edit Profile": handleMyProfile,
    "Change Password": handlePassword,
    "Theme": handleTheme,
    "Logout": handleLogout
  }

  const newProfileData = ProfileData.map((item) => {
    return {
      ...item,
      ["onClick"]: ProfileActions[item.title as keyof typeof ProfileActions]
    }
  })
  const accountData = newProfileData.slice(0, 1);
  const settingsData = newProfileData.slice(1);

  const handleBack = () => {
    navigate("/dashboard")

  }

  return (
    <div className="min-h-screen bg-brand-primary-600 flex flex-col pt-40 ">
      <ProfileHeader variant="transparent" onClick={handleBack} />
      <div className="w-full relative flex-1 h-full max-w-md md:max-w-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-t-4xl px-6 pt-27">
        <ProfileContainer />
        <div className="flex flex-col gap-3 z-100 md:flex-row  md:px-30 md:pt-12 md:gap-4">
          <ProfileItems label={"Account"} items={accountData} />
          <ProfileItems label={"Settings"} items={settingsData} />
        </div>
      </div>

      {/*logout modal*/}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        icon={LogOut}
      />


      <PopupModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        icon={Palette}
      >
        <div className="flex flex-col gap-4 mb-6 mt-8 items-center">
          <h3 className="font-bold text-[20px] text-center">App Theme</h3>
          <p className="text-[12px] text-center mb-2">
            Switch between light mode and dark mode to suit your preferences.
          </p>

          <div className="flex items-center gap-4 py-4">
            <span className={`text-[14px] font-semibold ${!isDark ? 'text-brand-primary-600' : 'text-slate-400'}`}>Light</span>
            <button
              onClick={() => toggle()}
              className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out flex items-center cursor-pointer ${isDark ? 'bg-brand-primary-600' : 'bg-slate-300'}`}
              aria-pressed={isDark}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${isDark ? 'translate-x-8' : 'translate-x-0'}`} />
            </button>
            <span className={`text-[14px] font-semibold ${isDark ? 'text-brand-primary-600' : 'text-slate-400'}`}>Dark</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <BrandButton
            onClick={() => setThemeModalOpen(false)}
            variant="primary"
          >
            <p className="text-[14px]">Done</p>
          </BrandButton>
        </div>
      </PopupModal>
    </div>
  )
}

export default ViewProfile