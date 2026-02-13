import { ChevronRight, type LucideIcon } from "lucide-react"

export interface ProfileItemProps {
    icon : string | LucideIcon,
    title : string,
    onClick? : () => void
}
const ProfileItem = ({icon : Icon, title, onClick} : ProfileItemProps) => {
  return (
    <div className="gap-2 flex w-full justify-between items-center py-2">
        {typeof Icon === "string" ? (
            <img 
            src = { Icon }
            alt = {`${title} icon`}
            className="size-5 text-brand-primary-600"
            />
        ) : (
            <Icon className="size-5 text-brand-primary-600 dark:text-brand-primary-400"/>
        )}
        <p className = "text-[13px] w-full">{title}</p>
        <button 
        onClick = { onClick }
        className="cursor-pointer text-slate-400 ">
            <ChevronRight className="size-5"/>
        </button>

    </div>
  )
}

export default ProfileItem