import { useRef, useState, type ChangeEvent } from "react";

interface ImageUploadProps {
    onImageSelect : (file : File | null) => void;
    error?: string;
}

const ImageUpload : React.FC<ImageUploadProps> = (
    {onImageSelect, error}
) => {

    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            //create preview
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);

            onImageSelect(file);
        }
    }

    const removeImage = (e : React.MouseEvent) => {
        e.stopPropagation(); //don't trigger the file input
        setPreview(null);
        onImageSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };


  return (
    <div className = "w-full space-y-2">
        <label className = "block text-sm font-medium text-slate-800 dark:text-slate-300">Upload Photo</label>

        <div
        onClick = {() => fileInputRef.current?.click()}
        className= {` relative group cursor-pointer overflow-hidden border-2 border-dashed rounded-xl transition-all
            ${preview ? "border-transparent" : "border-slate-300 hover:border-brand-primary-400 p-8"}
            ${error ? "border-brand-error-500" : "bg-slate-100"}`} 
        >
            <input 
            type = "file"
            ref = {fileInputRef}
            onChange = { handleFileChange}
            accept = "image/*"
            className="hidden"
            />
            { preview ? (
                <div className = "relative aspect-square w-full ">

                </div>
            ): ()}

        </div>
    </div>
  )
}

export default ImageUpload;