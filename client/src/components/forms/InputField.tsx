import { forwardRef } from "react";
import { type InputProps } from "../../types/forms";

const InputField = forwardRef<HTMLInputElement, InputProps>(({
    label,
    type = "text",
    name,
    placeholder,
    error,
    value,
    onChange,
    required = false,
    className = "",
    Icon,
    ...props
}, ref) => {
    return (
        <div className="mb-4 text-[14px] ">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-[12px] font-medium text-slate-400 dark:text-slate-300 mb-1 md:text-[11px]"
                >
                    {label}
                    {required && <span className="text-brand-error-600 text-[12px] ml-1">*</span>}
                </label>
            )}
            <div className="relative ">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    ref={ref}
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={
                        `w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-4 border rounded-md shadow-sm focus:outline-none focus:ring-1 grow
                        focus:ring-brand-primary-500 focus:not-first-of-type:border-brand-primary-500 transition-colors duration-200 md:text-[12px]
                        ${error ? "border-brand-error-600 focus:border-brand-error-600 focus:ring-brand-error-600" : "border-slate-400"}`
                    }
                    required={required}
                    {...props}
                />

            </div>
            {error && (
                <p
                    id={`${name}-error`}
                    className="mt-1 text-[11px] text-brand-error-600"
                    role="alert"
                >
                    {error}
                </p>
            )}


        </div>
    );
})
InputField.displayName = "Input"


export default InputField;