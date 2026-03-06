import ProfileHeader from "../../components/profile/ProfileHeader"
import ProfilEditForm from "./ProfilEditForm"


function EditProfile() {

    const handleBack = () => {
        console.log("you clicked back!")
    }
    return (
    <div className="min-h-screen bg-white dark: pt-25 px-4 pb-8 dark:bg-slate-950 text-slate-500 dark:text-slate-400 ">
        <ProfileHeader variant = "fill" onClick={ handleBack } />
        <div className=" max-w-md p-4 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
            <div className = "mb-4">
                <h4 className="text-slate-800 font-semibold text-[14px] dark:text-slate-50">Personal Data Information</h4>
                <p className="text-slate-700 text-[12px] dark:text-slate-400">Enter your personal data</p>
            </div>
            <ProfilEditForm />
        </div>

    </div>
  )
}

export default EditProfile