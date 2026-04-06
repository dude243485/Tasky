import { forwardRef, useState } from "react";
import type { InputProps } from "../../types/forms";
import { Eye, EyeOff } from "lucide-react";
import InputField from "./InputField";

interface PasswordInputProps extends Omit<InputProps, "type">{
    //additional props
}

const PasswordInputField = forwardRef<HTMLInputElement, PasswordInputProps> ((props, ref) => {
    
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <div className = "relative">
            <InputField 
                ref = {ref}
                type = {showPassword ? "text" : "password"}
                {...props}
            />
            <button
            type = "button"
            onClick = { togglePasswordVisibility}
            className = " absolute right-3 top-9.5 text-slate-400 hover:text-slate-500 focus:text-slate-600 cursor-pointer"
            tabIndex={-1}
            >
                {showPassword ? (
                    <Eye className = "size-5" />
                ): (
                <EyeOff className = "size-5" />
                )}
            </button>
        </div>
    );
})

PasswordInputField.displayName = "PasswordInput"

export default PasswordInputField ;