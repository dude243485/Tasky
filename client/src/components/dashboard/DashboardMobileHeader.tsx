import { Menu, X, Bell } from "lucide-react";
import { useState } from "react";
import daniel from "/images/daniel.png";
import { useNavigate } from "react-router";
import DashboardModal from "../../modals/DashboardModal";
import { useAppSelector } from "../../store/hooks";


const DashboardMobileHeader = () => {

    const user = useAppSelector((state) => state.auth.user)
   
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const handleMenuClick = () => {
        setModalOpen((prev) => !prev)
    }

    const handleNotifications = () => {
        alert("The notification feature is not available yet")

    }

    const handleProfile = () => {
        navigate("/profile/view-profile")
    }

    const hasNotifications = (): boolean => {
        //...
        //does some logic to check for notification

        return true;
    }


    return (
        <header className={` sticky top-0 left-0 right-0 w-full flex justify-between items-center px-5 py-5 z-100
        bg-white text-slate-950 dark:bg-slate-900 dark:text-slate-50
        shadow-[0_8px_30px_rgb(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]`}>
            <button
                onClick={handleMenuClick}
                className="cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-200 hover:opacity-80 rounded-full p-3 border border-slate-300 duration-300 transition-all text-slate-700 dark:text-slate-100">
                {modalOpen ? (<X className="size-6" />) : (<Menu className="size-6" />)}
            </button>
            <div className="flex gap-4 justify-between items-center">
                <button
                    onClick={handleNotifications}
                    className={`cursor-pointer relative hover:bg-slate-200 hover:opacity-80 rounded-full  border border-slate-300 duration-300 x
                     transition-all text-slate-700 dark:text-slate-100 dark:hover:bg-slate-700 flex items-center justify-center size-11`}
                >
                    {hasNotifications() && <div className="size-2 bg-brand-error-600 rounded-full absolute top-2.5 right-3 " />}
                    <Bell className="" />
                </button>
                <button
                    onClick={handleProfile}
                    className={`overflow-hidden h-11 w-11 cursor-pointer rounded-full`}
                >
                    {/*Notice special spells to use backend image*/}
                    <img
                        src={user?.avatar ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${user.avatar.startsWith('/') ? '' : '/'}${user.avatar}` : daniel}
                        alt={"profile image"}
                        className="object-cover h-full w-full transition-all hover:scale-[1.05]"
                    />
                </button>
            </div>
            {modalOpen && <DashboardModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
        </header>
    )
}

export default DashboardMobileHeader;