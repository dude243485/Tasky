import { Outlet, useNavigate, useLocation } from "react-router";

export default function OnboardingLayout() {
    const location = useLocation();

    //calculate progress based on current path
    const step = location.pathname.split("/").pop();

    return(
        <div className = "min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div key = {i} className={`h-1 flex-1 rounded-full ${step === `step-${i}` ? "bg-brand-primary-600" : "bg-slate-200 dark:bg-slate-700" }`} />
                    ))}

                </div>
                <Outlet />
            </div>
        </div>
    )
}
