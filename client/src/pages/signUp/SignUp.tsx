import SignUpForm from "../../components/forms/SignUpForm";
import logo from "/icons/Logo.svg" ;
import { useNavigate } from "react-router";

const SignUp = () => {
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate("/signin")
    }

    return (
        <div className="min-h-screen w-full max-w-md bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-8">
            <div className="flex gap-3 items-center justify-center flex-col py-9">
                <img 

                className = "size-14"
                alt = "Logo image"
                src = {logo}
                />
                <div className="text-center">
                    <h2 className = "text-2xl font-bold mb-1">
                        Tasky
                    </h2>
                    <p className = "text-slate-800 dark:text-slate-300 text-[11px]">
                        Register Using Your Credentials
                    </p>

                </div>

            </div>
            <div>
                <SignUpForm />
            </div>
            <footer>
                <p className = "text-[12px] text-slate-400 text-center font-medium py-3 mb-4">
                    Already have an account?
                    <span
                    className = "text-brand-primary-600 cursor-pointer ml-2 font-semibold hover:text-brand-primary-400 duration-300 transition-all"
                    onClick = { handleSignIn }
                    >
                        Sign In Here
                    </span>
                </p>
            </footer>

        </div>
    );
}

export default SignUp;