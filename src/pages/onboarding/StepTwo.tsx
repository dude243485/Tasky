
import { useNavigate } from "react-router";

const StepTwo = () => {

    const navigate = useNavigate();

    return (
        <section className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Aloha
            </h2>
            <p className = "text-slate-600 dark:text-slate-400 ">
                Say some false shii            
            </p>

            <button
            onClick = {() => navigate("/onboarding/step-3")}
            >
                Next
            </button>
        </section>
    );
}

export default StepTwo;