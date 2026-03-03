
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant? : "primary" | "secondary" | "danger";
    size?: "full" | "fixed" ;
}

const BrandButton = (
    {
        variant = "primary",
        size = "full",
        children,
        className,
        ...props
    }: ButtonProps
) => {

    const baseStyles = "inline-flex items-center justify-center rounded-[10px] duration-200 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2";
    const variantStyles = {
        primary : `text-white bg-brand-primary-600 hover:bg-brand-primary-500 focus-visible:ring-brand-primary-400 dark:focus-visible:ring-offset-slate-900
            focus-visible:ring-offset-2  hover:shadow-brand-primary-500/30 active:bg-brand-primary-700 hover:shadow-lg  active:scale-95 active:shadow-inner `,
        secondary : `text-brand-primary-600 dark:text-slate-50 border border-brand-primary-600 hover:shadow-lg hover:shadow-brand-primary-500/30 active:scale-95 active:shadow-inner 
            active:bg-brand-primary-100 active:text-brand-primary-700 focus-visible:ring-brand-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900  `,
        danger : `bg-brand-error-600 text-white hover:bg-brand-error-500`

    }

    const sizeStyles = {
        full : "w-full  py-3",
        fixed : "w-[216px] py-3"
    }

    return (
        
        <button
        className = {`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
        >
            {children}            
        </button>
    );
}

export default BrandButton;