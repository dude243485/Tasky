import ProfileHeader from "../../components/profile/ProfileHeader"
import ProfilEditForm from "./ProfilEditForm"
import { useNavigate } from "react-router"


function EditProfile() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/dashboard")
    }
    return (
        <div className="min-h-screen bg-white dark: pt-25 px-4 pb-8 dark:bg-slate-950 text-slate-500 dark:text-slate-400 md:flex md:items-center md:justify-center ">
            <ProfileHeader variant="fill" onClick={handleBack} />

            <div className=" max-w-md md:w-full md:max-w-lg md:px-10 md:py-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 mx">
                <div className="mb-4">
                    <h4 className="text-slate-800 font-semibold text-[14px] dark:text-slate-50">Personal Data Information</h4>
                    <p className="text-slate-700 text-[12px] dark:text-slate-400">Enter your personal data</p>
                </div>
                <ProfilEditForm />
            </div>

        </div>
    )
}

export default EditProfile