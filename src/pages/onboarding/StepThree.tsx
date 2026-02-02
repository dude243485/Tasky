import { useNavigate } from "react-router";

const StepThree = () => {
    const navigate = useNavigate();
    return (
        <section className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Youkoso
            </h2>
            <p className = "text-slate-600 dark:text-slate-400 ">
                Some shit!
            </p>

            <button
            onClick = {() => navigate("/signup")}
            >
                Get Started
            </button>
        </section>
    );
}

export default StepThree

