
import { useNavigate } from "react-router";

const StepOne = () => {

    const navigate = useNavigate();

    return (
        <section className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome to Tasky!
            </h2>
            <p className = "text-slate-600 dark:text-slate-400 ">
                Make Smart Decisions! Set clear timelines for projects and celebrate your achievements!
            </p>

            <button
            onClick = {() => navigate("/onboarding/step-2")}
            >
            </button>
        </section>
    );
}

export default StepOne;