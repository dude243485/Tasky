import { useNavigate, useLocation } from "react-router";
import illustration from "/Illustrations/success Illustration new.svg"

const StepThree = () => {
    const navigate = useNavigate();

    const location = useLocation();

    //calculate progress based on current path
    const step = location.pathname.split("/").pop();


    return (
        <section className="space-y-6 text-center flex flex-col justify-end ">
            <div className="mb-8">
                <img
                    src = { illustration }
                    alt = "success illustration"
                    className = "h-92.5"
                 />
            </div>

            <div className="">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Plan for Success
                </h2>
                <p className = "text-slate-600 dark:text-slate-400 mb-6">
                    Your Journey Starts Here! Earn achievement badges as you conquer your tasks. Let's get started!
                </p>

                <div className="flex justify-center items-center gap-1 mb-9">
                    {[1, 2, 3].map((i) => (
                        <div key = {i} className={`h-1 w-5  rounded-full ${step === `step-${i}` ? "bg-brand-primary-600" : "bg-slate-200 dark:bg-slate-700" }`} />
                    ))}

                </div>

                <button
                className= { ` rounded-[10px] text-white bg-brand-primary-600 w-full py-4 duration-200 transition-all hover:bg-brand-primary-500 hover:scale-[1.02] 
                    hover:shadow-lg hover:shadow-brand-primary-500/30 active:scale-95 active:shadow-inner active:bg-brand-primary-700 focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-brand-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900`}
                onClick = {() => navigate("/signup")}
                >
                    Get Started
                </button>
            </div>
            
        </section>
    );
}

export default StepThree


