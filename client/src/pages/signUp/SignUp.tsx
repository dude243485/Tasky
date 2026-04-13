import SignUpForm from "../../components/forms/SignUpForm";
import logo from "/icons/Logo.svg";
import { useNavigate } from "react-router";
import google from "/icons/google.svg"
import SignInOptionButton from "../../components/forms/SignInOptionButton";
import { getGoogleAuthUrl } from "../../services/authService";

const SignUp = () => {
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate("/signin")
    }

    const handleGoogleClick = async () => {
        try {
            const res = await getGoogleAuthUrl();
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.error("Failed to fetch google auth URL", error);
        }
    }

    return (
        <div className="min-h-screen w-full max-w-md md:max-w-dvw bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-8 md:bg-brand-primary-500 md:flex md:items-center md:justify-center ">
            <div className="md:flex md:items-center md:justify-center md:flex-col md:bg-slate-50 md:px-6 md:pb-6">
                <div className="flex gap-3 items-center justify-center flex-col py-9 md:bg-slate-50">
                    <img

                        className="size-14"
                        alt="Logo image"
                        src={logo}
                    />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-1">
                            Tasky
                        </h2>
                        <p className="text-slate-800 dark:text-slate-300 text-[11px]">
                            Register Using Your Credentials
                        </p>

                    </div>

                </div>
                <div>
                    <SignUpForm />
                </div>
                <div className="flex justify-center items-center gap-4 my-6 md:w-full md:my-3 ">
                    <div className="h-px bg-slate-400 w-full" />
                    <p className="text-center text-[12px] text-slate-400 md:w-full w-full ">Or sign up with</p>
                    <div className="h-px bg-slate-400 w-full" />
                </div>
                <div className="flex flex-col gap-2 w-full mb-3">
                    <SignInOptionButton icon={google} label="Google" onClick={handleGoogleClick} />
                </div>
                <footer>
                    <p className="text-[12px] text-slate-400 text-center font-medium py-3 mb-4">
                        Already have an account?
                        <span
                            className="text-brand-primary-600 cursor-pointer ml-2 font-semibold hover:text-brand-primary-400 duration-300 transition-all"
                            onClick={handleSignIn}
                        >
                            Sign In Here
                        </span>
                    </p>
                </footer>

            </div>

        </div>
    );
}

export default SignUp;