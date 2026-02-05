import type { LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    Icon? : LucideIcon;
}

export interface SignInFormData { 
    email: string;
    password: string;
}
export interface SignUpFormData {
    email: string;
    fullName : string;
    password : string;
}
export interface FormErrors {
    email? : string;
    password? : string;
    fullName? : string;
    submit?: string;
}

export interface SignUpFormErrors {
    fullname?: string;
    email?: string;
    password? : string;
    submit? : string;
}

