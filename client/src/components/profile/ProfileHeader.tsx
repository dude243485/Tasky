import { ChevronLeft } from "lucide-react";

interface ProfileHeaderProps {
    variant? : "fill" | "transparent";
    onClick : () => void;
}

function ProfileHeader({variant, onClick} : ProfileHeaderProps) {
    

  return (
    <header className = {` fixed top-0 left-0 right-0 w-full flex justify-between items-center px-6 py-5 z-100
     ${variant === "fill" ? "bg-slate-50 text-slate-950 dark:bg-slate-900 dark:text-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]": "text-slate-50"}
     `} >
        <button 
        onClick = {() => {
            onClick();
        }}
        className =  {`flex p-2 justify-center items-center shrink-0 rounded-full cursor-pointer hover:opacity-60 duration-300 transition-all
         ${variant === "fill" ? "bg-slate-100 dark:bg-slate-700" : "bg-slate-50 "} `}>
            <ChevronLeft className = { ` size-4.5 ${variant === "fill" ? " text-brand-primary-800 dark:text-slate-50" : "text-brand-primary-600"}`} />
        </button>
        <h3 className="text-center w-full text-[18px] font-semibold">My Profile</h3>
    </header>
  )
}

export default ProfileHeader;