import { Outlet } from "react-router";

const Profile = () => {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center py-0">
            <div className="w-full max-w-md" >
                <Outlet />
            </div>
            
        </div>
    );
}

export default Profile;