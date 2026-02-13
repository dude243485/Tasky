import { type ProfileItemProps } from "../components/profile/ProfileItem"
import { ClockArrowUp, Eclipse, LogOut, Settings, UserRound } from "lucide-react"
export const ProfileData : ProfileItemProps[] = [
    {
        icon : UserRound,
        title : "My Profile"
    },
    {
        icon : Settings,
        title : "Change Password"
    }, 
    {
        icon : Eclipse,
        title : "Theme"
    }, 
    {
        icon : ClockArrowUp,
        title : "Time Format"
    },
    {
        icon : LogOut,
        title : "Logout"
    }

]