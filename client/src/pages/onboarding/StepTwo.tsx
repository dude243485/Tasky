
import { useNavigate, useLocation } from "react-router";
import illustration from "/Illustrations/High stress levels 1.svg"
import BrandButton from "../../components/buttons/BrandButton";

const StepTwo = () => {

    const navigate = useNavigate();

    const location = useLocation();

    //calculate progress based on current path
    const step = location.pathname.split("/").pop();

    return (
        <section className="space-y-6 text-center flex flex-col justify-end ">
            <div className="mb-8">
                <img
                    src = { illustration }
                    alt = "stress illustration"
                    className = "h-92.5"
                 />
            </div>

            <div className="">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Manage Stress Effectively!
                </h2>
                <p className = "text-slate-600 dark:text-slate-400 mb-6">
                    Stay Balanced! Track your workload and maintain a healthy stress level with ease.
                </p>

                <div className="flex justify-center items-center gap-1 mb-9">
                    {[1, 2, 3].map((i) => (
                        <div key = {i} className={`h-1 w-5  rounded-full ${step === `step-${i}` ? "bg-brand-primary-600" : "bg-slate-200 dark:bg-slate-700" }`} />
                    ))}

                </div>
                <BrandButton
                onClick = {() => navigate("/onboarding/step-3")}
                variant="primary"
                size = "full"
                >
                    Next
                </BrandButton>
            </div>
            
        </section>
    );
}

export default StepTwo;
