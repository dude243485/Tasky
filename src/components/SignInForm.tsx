import InputField from "./InputField";
import { useState, type ChangeEvent } from "react";
import { Mail } from "lucide-react";
import { type SignInFormData, type FormErrors } from "../types/forms";

const SignInForm: React.FC = () => {
    //form data state
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    //handle change in the input fields
    const handleChange = (e : ChangeEvent<HTMLInputElement>) : void => {
        const { name , value } = e.target;

        setFormData((prev : { email : string; password: string;}) => ({
            ...prev,
            [name] : value
        }))

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name] : undefined
            }))
        }
    }

    //errors state
    const [errors, setErrors] = useState<FormErrors>({
       
    })

    //submitting state
    const [isSubmitting , setIsSubmitting] = useState<boolean>(false)


    return (
        <div className="max-w-md mx-auto mt-2 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400">
            <form 
                aria-label = "Login form"
            >
                {/*Email Field*/}
                <InputField 
                    label = "Email"
                    name = "email"
                    type = "email"
                    placeholder="Enter your email..."
                    value = { formData.email }
                    onChange = {handleChange}
                    error = { errors.email }
                    required = { true }
                    autoComplete="email"
                    disabled = { isSubmitting }
                    Icon = { Mail }
                 />

            </form>

        </div>
    );
}

export default SignInForm;