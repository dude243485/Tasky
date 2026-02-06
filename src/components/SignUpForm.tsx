import InputField from "./InputField";
import {  type FormErrors, type SignUpFormData } from "../types/forms";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FingerprintPattern, Mail, User, TriangleAlert, SquareCheckBig, Square } from "lucide-react";
import PasswordInputField from "./PasswordInputField";
import TermsModal from "../modals/TermsModal";
import TermsModalData from "../modals/TermsModalData";


const SignUpForm : React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        email: "",
        fullName : "",
        password : "",
    })

    const [errors, setErrors] = useState<FormErrors>({});

    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
    const [termsOpen, setTermsOpen] = useState<boolean>(false)

    const toggleAcceptTerms = () => {
        setAcceptTerms(prev => !prev);
    }

    const handleClickTerms = () => {
        setTermsOpen(true)
    }

    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    const validateForm = () : FormErrors => {
        const newErrors : FormErrors = {}
        const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

        //email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required" ;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        //full name validation
        if (!formData.fullName.trim()){
            newErrors.fullName = "Name is required";
        }else if (formData.fullName.trim().split(/\s+/).length < 2){
            newErrors.fullName = "Please enter both your first and last name.";
        }else if (!nameRegex.test(formData.fullName)) {
            newErrors.fullName = "Name contains invalid characters";
        }

        //password validation
        if (!formData.password.trim()){
            newErrors.password = "Password is required";
        } else if (formData.password.trim()  && !confirmPassword.trim()){
            newErrors.password = "Please confirm password below";
        } else if (formData.password.trim() !== confirmPassword.trim()){
            newErrors.password = "Passwords must match"
        }else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(formData.password)) {
            newErrors.email = "must contain a number, uppercase and a special character";
        }
        

        return newErrors;
    }

    const handleSubmit =  (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            alert("Form was submitted");
            setFormData({
                email : "",
                password : "",
                fullName : ""
            });
            setConfirmPassword("");
        } catch (error) {
            console.error("Sign up error : ", error);
            setErrors({submit : "Sign up failed. please try again"});
            setIsSubmitting(false);

        }finally {
            setIsSubmitting(false);
        }
    }


    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev : SignUpFormData) => ({
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

    const hasErrors = () : boolean => {
        return Object.values(errors).some(error => !!error)
    }

    const handleAcceptTerms = (choice : "accept" | "decline") => {
        if (choice == "accept") {
            setTermsOpen(false);
            setAcceptTerms(true);
        } else if (choice == "decline") {
            setTermsOpen(false);
            setAcceptTerms(false);
        }
    } 

    return(
        <div className = "max-w-md mx-auto mt-2 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400">
            <form 
            aria-label = "Sign up form"
            onSubmit = { handleSubmit }
            noValidate
            >
                <InputField 
                label = "Email"
                name = "email"
                type = "email"
                placeholder="Enter your email..."
                value = { formData.email }
                onChange = { handleChange }
                error = { errors.email }
                required = { true }
                autoComplete = "email"
                disabled = { isSubmitting }
                Icon = { Mail }
                />

                <InputField 
                label = "Full name"
                name = "fullName"
                type = "text"
                placeholder="Enter your full name"
                value = { formData.fullName }
                onChange = { handleChange }
                error = { errors.fullName }
                required = { true }
                autoComplete= "name"
                disabled = { isSubmitting }
                Icon = { User }
                />

                <PasswordInputField
                label = "Password"
                name = "password"
                placeholder="Enter your password"
                value = { formData.password }
                onChange = { handleChange }
                error = { errors.password }
                required = { true }
                disabled = { isSubmitting }
                Icon = { FingerprintPattern }
                 />

                 <PasswordInputField
                label = "Confirm password"
                name = "confirmPassword"
                placeholder="Enter your password"
                value = { confirmPassword }
                onChange = { handleConfirmPassword }
                error = { errors.password }
                required = { true }
                disabled = { isSubmitting }
                Icon = { FingerprintPattern }
                 />

                <div className="flex justify-between items-start gap-2 text-[12px] mb-4">
                    <button 
                        onClick = { toggleAcceptTerms }
                        className="cursor-pointer">
                            {acceptTerms ? (
                                <SquareCheckBig className = "size-5 text-brand-primary-500" />
                            ) : (<Square className = "size-5 text-slate-500" />)}
                    </button>
                    <p>
                        I agree to the 
                        <span 
                        onClick = { handleClickTerms }
                        className="cursor-pointer text-brand-primary-500 font-semibold hover:text-brand-primary-400 duration-300 transition-all">
                            Terms & Conditions
                        </span>
                        {` `} and {` `}
                        <span 
                        onClick = { handleClickTerms }
                        className="cursor-pointer text-brand-primary-500 font-semibold hover:text-brand-primary-400 duration-300 transition-all">
                            Privacy Policy
                        </span>
                    </p>
                </div>

                {/*Terms and Conditions Modal*/}
                <TermsModal
                isOpen = { termsOpen }
                onClose = { handleAcceptTerms}
                title = "Terms & Conditions and Privacy Policy"
                > 
                    <div className="overflow-y-scroll max-h-[55vh] text-[11px] bg-slate-100 p-2 dark:bg-slate-800">
                        <TermsModalData />
                    </div>
                </TermsModal>

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

                <div className = "flex space-x-4 text-[14px] mt-6">
                    <button
                    type = "submit"
                    disabled = { isSubmitting || hasErrors() }
                    className = {`rounded-[10px] text-white bg-brand-primary-600 w-full py-4 duration-200 transition-all hover:bg-brand-primary-500  
                    hover:shadow-lg hover:shadow-brand-primary-500/30 active:scale-95 active:shadow-inner active:bg-brand-primary-700 focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-brand-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900`}
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
        
    );
}

export default SignUpForm ;