import InputField from "./InputField";
import PasswordInputField from "./PasswordInputField";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FingerprintPattern, Mail, Square, SquareCheckBig, TriangleAlert } from "lucide-react";
import { type FormErrors } from "../../types/forms";
import BrandButton from "../buttons/BrandButton";



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

    //remember me state
    const [remember, setRemember] = useState<boolean>(false);

    //to handle click on forgot password
    const handleForgotPassword  = () => {
        console.log("You clicked Forgot Password")
    }

    //to handle remember me
    const toggleRemember = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();            
        setRemember(prev => !prev)
    }

    const validateForm = () : FormErrors => {
        const newErrors : FormErrors = {}

        //email validation
        if (!formData.email.trim()){
            newErrors.email = "Email is required" ;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        //password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(formData.password)) {
            newErrors.email = "must contain a number, uppercase and a special character";
        }

        return newErrors;
    }


    const handleSubmit = (e : FormEvent<HTMLFormElement>) : Promise<void> | void => {
        e.preventDefault()
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            alert("Form was submitted");
            setFormData({email : "", password: ""});
        } catch (error) {
            console.error("Sign in error : ", error);
            setErrors({ submit : "Sign in failed. please try again"});
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    }

    const hasErrors = () : boolean => {
        return Object.values(errors).some(error => !!error);
    }

    return (
        <div className="max-w-md mx-auto mt-2 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400">
            <form 
                aria-label = "Sign in form"
                onSubmit = { handleSubmit }
                noValidate

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

                <PasswordInputField 
                    label = "Password"
                    name = "password"
                    placeholder = "Enter your password"
                    value = { formData.password }
                    onChange = { handleChange }
                    error = { errors.password }
                    required = { true }
                    autoComplete = "current-password"
                    disabled = { isSubmitting }
                    Icon = { FingerprintPattern }
                 />

                {errors.submit && (
                    <div 
                    role = "alert"
                    className = "mb-6 p-3 bg-brand-error-100 border-brand-error-400">
                        <div className="flex text-[9px]">
                            <TriangleAlert  className="size-5 text-brand-error-400" />
                            <p className = "text-brand-error-600 ml-3 "> {errors.submit} </p>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center text-[12px] mb-4">
                    <div className = "flex gap-2 items-center">
                        <button 
                        role = "checkbox"
                        onClick = { toggleRemember }
                        className="cursor-pointer">
                            {remember ? (
                                <SquareCheckBig className = "size-5 text-brand-primary-500" />
                            ) : (<Square className = "size-5 text-slate-500" />)}
                        </button>
                    
                    <p className="font-semibold"> Remember Me</p>
                    </div>
                     <a
                     onClick = {handleForgotPassword}
                     className = {`cursor-pointer text-brand-primary-500 font-semibold hover:text-brand-primary-400 duration-300 transition-all`}
                     >Forgot Password</a>
                </div>
                <div className = "flex space-x-4 text-[14px] mt-6">
                    
                    <BrandButton
                    variant="primary"
                    size = "full"
                    type = "submit"
                    disabled = { isSubmitting || hasErrors() }
                    >
                    Sign in
                    </BrandButton>
                </div>
            </form>
            

        </div>
    );
}

export default SignInForm;