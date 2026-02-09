
import { useNavigate, useLocation } from "react-router";
import welcome_illustration from "/Illustrations/welcome illustration 2.svg"
import BrandButton from "../../components/BrandButton";

const StepOne = () => {

    const navigate = useNavigate();

    const location = useLocation();

    //calculate progress based on current path
    const step = location.pathname.split("/").pop();

    return (
        <section className="space-y-6 text-center flex flex-col justify-end ">
            <div className="mb-8">
                <img
                    src = { welcome_illustration}
                    alt = "welcome illustration"
                    className = "h-92.5"
                 />
            </div>

            <div className="">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Welcome to Tasky!
                </h2>
                <p className = "text-slate-600 dark:text-slate-400 mb-6">
                    Make Smart Decisions! Set clear timelines for projects and celebrate your achievements!
                </p>

                <div className="flex justify-center items-center gap-1 mb-9">
                    {[1, 2, 3].map((i) => (
                        <div key = {i} className={`h-1 w-5  rounded-full ${step === `step-${i}` ? "bg-brand-primary-600" : "bg-slate-200 dark:bg-slate-700" }`} />
                    ))}

                </div>

                <BrandButton
                onClick = {() => navigate("/onboarding/step-2")}
                variant="primary"
                size = "full"
                >
                    Next
                </BrandButton>
            </div>
            
        </section>
    );
}

export default StepOne;