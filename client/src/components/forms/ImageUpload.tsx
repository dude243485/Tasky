import { Camera, UploadCloud } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

interface ImageUploadProps {
    onImageSelect: (file: File | null) => void;
    error?: string;
    initialPreviewUrl?: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = (
    { onImageSelect, error, initialPreviewUrl }
) => {

    const [preview, setPreview] = useState<string | null>(initialPreviewUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            //create preview
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);

            onImageSelect(file);
        }
    }

    // const removeImage = (e : React.MouseEvent) => {
    //     e.stopPropagation(); //don't trigger the file input
    //     setPreview(null);
    //     onImageSelect(null);
    //     if (fileInputRef.current) fileInputRef.current.value = "";
    // };

    const handleReplaceClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        fileInputRef.current?.click(); //open file picker
    }

    return (
        <div className="w-full space-y-1.5 flex flex-col items-center justify-center p-3">

            <div className="relative w-25 h-25">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={` w-25 h-25 group cursor-pointer overflow-hidden border-2 border-dashed rounded-xl transition-all
            ${preview ? "border-transparent" : "border-slate-300 hover:border-brand-primary-400 dark:border-slate-400 dark:hover:border-brand-primary-400 p-8"}
            ${error ? "border-brand-error-500" : "bg-slate-100 dark:bg-slate-700"}`}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    {preview ? (
                        <div className="aspect-square w-full max-w-50 mx-auto ">
                            <img
                                src={preview}
                                alt="preview"
                                className="w-full h-full object-cover rounded-xl "
                            />
                            <button
                                onClick={handleReplaceClick}
                                className={`absolute z-50 -top-3 -right-3 bg-brand-primary-600 text-slate-50 p-2 rounded-full shadow-lg hover:bg-brand-primary-500 
                            transition-colors border-2 border-slate-50  dark:border-slate-800 cursor-pointer`}
                            >
                                <Camera size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <UploadCloud size={42} className="text-brand-primary-500 dark:text-brand-primary-300" />
                        </div>
                    )}


                </div>
            </div>

            <label className="block text-[12px] font-semibold text-slate-800 dark:text-slate-300">Upload Photo</label>
            <div className="flex items-center justify-center">
                <p className="text-center text-[10px] inline-block max-w-47.5 "> Format should be in .jpeg .png or .webp, at least 800x800px and less than 2MB</p>
            </div>
            {error && <p className="text-xs text-brand-error-500 mt-1">{error}</p>}
        </div>
    )
}

export default ImageUpload;