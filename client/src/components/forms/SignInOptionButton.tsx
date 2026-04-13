interface ButtonProps {
    icon: string,
    label: string,
    onClick: () => void
}

const SignInOptionButton = ({ icon, label, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex justify-center items-center gap-1.5 border 
              py-3.5 rounded-md text-[14px] font-semibold hover:bg-slate-100 transition-colors 
            duration-500 delay-100 active:ring-brand-grey active:ring border-slate-400 hover:border-slate-200
            cursor-pointer  dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-600 dark:hover:border-slate-400`}
        >
            <img
                src={icon}
                alt={`${label} icon`}
                className="size-4.5"
            />

            <p>
                {`Sign in with ${label}`}
            </p>

        </button>
    );
}

export default SignInOptionButton;