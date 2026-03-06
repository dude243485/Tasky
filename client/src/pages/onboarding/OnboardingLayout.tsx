import { Outlet } from "react-router";

export default function OnboardingLayout() {

    return(
        <div className = "min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-8 py-0">
            
            <div className="w-full max-w-md ">
                <Outlet />
            </div>
        </div>
    )
}
