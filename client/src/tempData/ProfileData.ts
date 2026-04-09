import { type ProfileItemProps } from "../components/profile/ProfileItem"
import { Eclipse, LogOut, Settings, UserRound } from "lucide-react"
export const ProfileData: ProfileItemProps[] = [
    {
        icon: UserRound,
        title: "Edit Profile"
    },
    {
        icon: Settings,
        title: "Change Password"
    },
    {
        icon: Eclipse,
        title: "Theme"
    },
    {
        icon: LogOut,
        title: "Logout"
    }

]