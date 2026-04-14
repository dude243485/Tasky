import SignInForm from "../../components/forms/SignInForm";
import SignInOptionButton from "../../components/forms/SignInOptionButton";
import google from "/icons/google.svg"
import { useNavigate } from "react-router";
import { getGoogleAuthUrl } from "../../services/authService";

const SignIn = () => {

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


    //handle sign up
    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate("/signup")

    }

    return (
        <div className="min-h-screen bg-brand-primary-600 flex flex-col justify-end md:justify-center md:items-center ">

            <div className="w-full max-w-md bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 md:rounded-4xl rounded-t-4xl px-8">
                <div className="mt-10 text-center gap-2 mb-6">
                    <h2 className="font-bold text-[24px] ">Sign In</h2>
                    <p className="font-medium text-[14px] dark:text-slate-300 text-slate-700">Sign in to your account</p>
                </div>
                <div>
                    <SignInForm />
                </div>
                <div className="flex justify-center items-center gap-4 my-6 md:my-4 md:px-8">
                    <div className="h-px bg-slate-400 w-full" />
                    <p className="text-center text-[12px] text-brand-grey ">Or</p>
                    <div className="h-px bg-slate-400 w-full" />
                </div>
                <div className="flex flex-col gap-2 mb-3">
                    <SignInOptionButton icon={google} label="Google" onClick={handleGoogleClick} />
                </div>
                <footer>
                    <p className="text-[12px] text-slate-400 text-center font-medium py-3 mb-4">
                        Don't have an account?
                        <span
                            className="text-brand-primary-600 cursor-pointer ml-2 font-semibold"
                            onClick={handleSignUp}
                        >
                            Sign Up Here
                        </span>
                    </p>
                </footer>

            </div>
        </div>
    );
}

export default SignIn;