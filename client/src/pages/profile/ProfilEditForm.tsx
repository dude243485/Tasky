import type { ProfileEditData, ProfileEditErrors } from "../../types/forms";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import InputField from "../../components/forms/InputField";
import { Mail, TriangleAlert, UserRound } from "lucide-react";
import ImageUpload from "../../components/forms/ImageUpload";
import dayjs, { Dayjs } from "dayjs";
import BrandButton from "../../components/buttons/BrandButton";
import DatePickerValue from "../../components/materials-ui/DatePickerValue";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateUserProfile } from "../../store/authSlice";
import { resolveAvatarUrl } from "../../utils/avatar";



function ProfilEditForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState<ProfileEditData>({});
  const [errors, setErrors] = useState<ProfileEditErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [dobValue, setDobValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (user) {
      const firstName = user.name.split(" ")[0]
      const lastName = user.name.split(" ")[1]
      setFormData({
        firstname: user.firstName || firstName || "",
        lastname: user.lastName || lastName || "",
        email: user.email || "",
      });
      if (user.dob) {
        setDobValue(dayjs(user.dob));
      }
    }
  }, [user]);


  const validateForm = (): ProfileEditErrors => {
    const newErrors: ProfileEditErrors = {};
    const nameRegex =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    if (!formData.firstname?.trim()) {
      newErrors.firstname = "First name cannot be empty";
    } else if (!nameRegex.test(formData.firstname)) {
      newErrors.firstname = "Name contains invalid characters";
    }

    if (!formData.lastname?.trim()) {
      newErrors.lastname = "Last name cannot be empty";
    } else if (!nameRegex.test(formData.lastname)) {
      newErrors.lastname = "Name contains invalid characters";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Avatar is optional — only validate if the user selected one
    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB (matches server limit)
    const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const file = formData.profilePicture;
    if (file) {
      if (!IMAGE_TYPES.includes(file.type)) {
        newErrors.profilePicture = "Please upload a PNG or JPEG";
      } else if (file.size > MAX_FILE_SIZE) {
        newErrors.profilePicture = "Image is too large. Max size is 4 MB";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      if (formData.firstname) payload.append("firstName", formData.firstname);
      if (formData.lastname) payload.append("lastName", formData.lastname);
      if (formData.email) payload.append("email", formData.email);
      if (formData.dob) payload.append("dob", formData.dob);
      if (formData.profilePicture) payload.append("avatar", formData.profilePicture);

      await dispatch(updateUserProfile(payload)).unwrap();
      setSuccessMsg("Profile updated successfully!");
      // Briefly show success before navigating
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error: any) {
      console.error("Profile update error:", error);
      setErrors({ submit: typeof error === "string" ? error : "Failed to update profile, please try again" });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ProfileEditData) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProfileEditErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleUploadPhoto = (file: File | null) => {
    setFormData((prev: ProfileEditData) => ({ ...prev, profilePicture: file }));
    if (errors["profilePicture" as keyof ProfileEditErrors]) {
      setErrors((prev) => ({ ...prev, profilePicture: undefined }));
    }
  };



  const handleDobUpdate = (dateString: Dayjs | null) => {
    const ds = dateString?.format("YYYY-MM-DD");
    setDobValue(dateString);
    setFormData((prev: ProfileEditData) => ({ ...prev, dob: ds }));
    if (errors["dob" as keyof ProfileEditErrors]) {
      setErrors((prev) => ({ ...prev, dob: undefined }));
    }
  };

  const hasErrors = (): boolean =>
    Object.values(errors).some((error) => !!error);

  return (
    <form aria-label="Edit profile form" onSubmit={handleSubmit} noValidate>
      <ImageUpload
        onImageSelect={handleUploadPhoto}
        error={errors.profilePicture}
        initialPreviewUrl={resolveAvatarUrl(user?.avatar)}
      />

      <InputField
        label="Firstname"
        name="firstname"
        type="text"
        placeholder="Enter first name"
        value={formData.firstname}
        onChange={handleChange}
        error={errors.firstname}
        required={true}
        autoComplete="given-name"
        disabled={isSubmitting}
        Icon={UserRound}
      />

      <InputField
        label="Lastname"
        name="lastname"
        type="text"
        placeholder="Enter last name"
        value={formData.lastname}
        onChange={handleChange}
        error={errors.lastname}
        required={true}
        autoComplete="family-name"
        disabled={isSubmitting}
        Icon={UserRound}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email..."
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required={true}
        autoComplete="email"
        disabled={isSubmitting}
        Icon={Mail}
      />

      <DatePickerValue
        onDateChange={handleDobUpdate}
        error={errors.dob}
        value={dobValue}
        label="Date of Birth"
        required={true}
      />

      {errors.submit && (
        <div
          role="alert"
          className="mb-6 p-3 bg-brand-error-100 border-brand-error-400"
        >
          <div className="flex text-[9px]">
            <TriangleAlert className="size-5 text-brand-error-400" />
            <p className="text-brand-error-600 ml-3">{errors.submit}</p>
          </div>
        </div>
      )}

      {successMsg && (
        <div
          role="alert"
          className="mb-6 p-3 bg-brand-success-100 border-brand-success-400 border rounded-md"
        >
          <div className="flex text-[14px]">
            <p className="text-brand-success-600 ml-3 font-semibold">{successMsg}</p>
          </div>
        </div>
      )}

      <div className="flex space-x-4 text-[14px] mt-6 mb-3">
        <BrandButton
          variant="primary"
          size="full"
          type="submit"
          disabled={isSubmitting || hasErrors()}
        >
          {isSubmitting ? "Updating…" : "Update Profile"}
        </BrandButton>
      </div>
    </form>
  );
}

export default ProfilEditForm;