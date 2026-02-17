import type { ProfileEditData, ProfileEditErrors } from "../../types/forms";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router"
import InputField from "../../components/InputField";
import { Mail, TriangleAlert, UserRound } from "lucide-react";
import ImageUpload from "../../components/ImageUpload";
import DOBInput from "../../components/DOBInput";
import BrandButton from "../../components/BrandButton";

function ProfilEditForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProfileEditData> ({
        
    })
    const [errors, setErrors] = useState<ProfileEditErrors> ({})
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const validateForm = () : ProfileEditErrors => {
        const newErrors : ProfileEditErrors = {}
        const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
 
        //firstname validation
        if (!formData.firstname?.trim()) {
            newErrors.firstname = "First name cannot be empty";
        } else if (!nameRegex.test(formData.firstname)) {
            newErrors.firstname = "Name contains invalid characters";
        }

        //lastname validation
        if (!formData.lastname?.trim()) {
            newErrors.lastname = "First name cannot be empty";
        } else if (!nameRegex.test(formData.lastname)) {
            newErrors.lastname = "Name contains invalid characters";
        }

        //email validation
        if (!formData.email?.trim()) {
            newErrors.email = "Email is required" ;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        } 

        //image validation
        const MAX_FILE_SIZE = 2 * 1024 * 1024;
        const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        const file = formData.profilePicture

        if (!file){
            newErrors.profilePicture = "please upload your profile picture"
        } else if(!IMAGE_TYPES.includes(file?.type)){
            newErrors.profilePicture = "please upload a PNG or JPEG";
        } else if (file?.size > MAX_FILE_SIZE) {
            newErrors.profilePicture = "image is too large. Max size is 2MB"
        }
        return newErrors;
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return
        }

        setErrors({});
        setIsSubmitting(true);

        try{
            alert("Form was submitted");
            setFormData({
                email: "",
                firstname : "",
                lastname : "",

            });
            navigate("/dashboard")

        } catch(error) {
            console.error("Sign up error : ", error);
            setErrors({submit : "Failed to set up profile, please try again"})
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name , value } = e.target ;

        setFormData((prev : ProfileEditData) => ({
            ...prev, 
            [name] : value
        }))

        if (errors[name as keyof ProfileEditErrors]) {
            setErrors(prev => ({
                ...prev,
                [name] : undefined
            }))
        }
    }
    const handleUploadPhoto = (file: File | null) => {
        setFormData((prev : ProfileEditData) => ({
            ...prev,
            profilePicture : file
        }))
        
        if (errors["profilePicture" as keyof ProfileEditErrors]) {
            setErrors(prev => ({
                ...prev,
                ["profilePicture"] : undefined
            }))
        }
    }

    const handleDobUpdate = (dateString: string) => {
        setFormData((prev : ProfileEditData) => ({
            ...prev,
            dob : dateString
        }))

        if (errors["dob" as keyof ProfileEditErrors]){
            setErrors(prev => ({
                ...prev,
                ["dob"] : undefined
            }))
        }
    }

    const hasErrors =() : boolean => {
        return Object.values(errors).some(error => !!error)
    }


  return (
    <form
    aria-label = "Edit profile form"
    onSubmit = { handleSubmit }
    noValidate
    >
        <ImageUpload 
        onImageSelect={ handleUploadPhoto }
        error = {errors.profilePicture}
        />
        <InputField
        label = "Firstname"
        name = "firstname"
        type = "text"
        placeholder = "Enter first name"
        value = { formData.firstname }
        onChange = { handleChange }
        error = { errors.firstname }
        required = { true }
        autoComplete = "name"
        disabled = { isSubmitting }
        Icon = { UserRound }
        />
        <InputField
        label = "Lastname"
        name = "lastname"
        type = "text"
        placeholder = "Enter last name"
        value = { formData.lastname }
        onChange = { handleChange }
        error = { errors.lastname }
        required = { true }
        autoComplete = "name"
        disabled = { isSubmitting }
        Icon = { UserRound }
        />
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
        <DOBInput
        onDateChange={ handleDobUpdate }
        error= { errors.dob }
        />
        {errors.submit && (
            <div
            role = "alert"
            className = "mb-6 p-3 bg-brand-error-100 border-brand-error-400"
            >
                <div className = "flex text-[9px]">
                    <TriangleAlert className="size-5 text-brand-error-400" />
                    <p className = "text-brand-error-600 ml-3"> {errors.submit}</p>
                </div>
            </div>
        )}

        <div className = "flex space-x-4 text-[14px] mt-6 mb-3">
            <BrandButton
            variant = "primary" 
            size = "full"
            type = "submit"
            disabled = { isSubmitting || hasErrors()}
            >
                Update Profile
            </BrandButton>

        </div>


    </form>
  );
}
 
export default ProfilEditForm