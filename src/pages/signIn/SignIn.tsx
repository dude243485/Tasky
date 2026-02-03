import SignInForm from "../../components/SignInForm";

const SignIn =  () => {
    return (
        <div className="min-h-screen bg-brand-primary-600 flex flex-col justify-end ">
            
            <div className="w-full max-w-md bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-t-4xl px-8">
                <div className="mt-10 text-center gap-2 mb-6">
                    <h2 className="font-bold text-[24px] ">Sign In</h2>
                    <p className="font-medium text-[14px]">Sign in to your account</p>
                </div>
                <div>
                    <SignInForm />
                </div>
                
            </div>
        </div>
    );
}

export default SignIn;