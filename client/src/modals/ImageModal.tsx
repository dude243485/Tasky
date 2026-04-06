import TaskModal from "./TaskModal";
import BrandButton from "../components/buttons/BrandButton";
import { X, UploadCloud} from "lucide-react";
import { useState, useRef } from "react";
import { type ChangeEvent } from "react";


interface ImageModalProps  {
    isOpen : boolean;
    onClose : () => void;
    setter : ( imageFile : File) => void;
}

const ImageModal : React.FC<ImageModalProps> = ({
    isOpen, onClose, setter
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleConfirm = () => {
        if (selectedFile) {
            setter(selectedFile);
            onClose();
        }
        
  
    }

    const handleClose = () => {
        onClose() ;
        //...
    }

    const handleFileChange = (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }


    return (
        <TaskModal isOpen = { isOpen } onClose = { onClose }>
            <div className = "text-center py-4 border-b border-b-slate-200 mb-4 w-4/5">
                <h4 className=" w-full text-center font-semibold text-[14px] ">Upload Image</h4>
                <p className="text-[12px] text-slate-600 dark:text-slate-400"> an image that best describes this task</p>
            </div>

            {/*Content*/}
            <div className = "p-2 text-center">
                { !preview ? (
                    <div
                    onClick = { () => fileInputRef.current?.click() }
                    className = "group cursor-pointer border-2 border-dashed rounded-3xl border-slate-200 p-10 hover:border-brand-primary-400 hover:bg-brand-primary-100/30 transition-all"
                    >
                        <div className = "bg-brand-primary-100 mb-2 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                            <UploadCloud className = "text-brand-primary-500" size = { 32 } />
                        </div>
                        <p className = "font-bold text-slate-700">Click to upload</p>
                        <p className = "text-[12px] text-slate-400 mt-1">or take a photo with your phone</p>
                    </div>
                ) : (
                    <div className = "relative group">
                        <img 
                        src = { preview }
                        className = "w-full h-64 object-cover rounded-2xl shadow-inner"
                        alt = "preview"
                        />
                        <button
                        onClick = { () => setPreview(null)}
                        className = "absolute top-3 right-3 cursor-pointer bg-brand-error-500 text-white p-2 rounded-full shadow-lg opacity-0  group-hover:opacity-100 transition-opacity">
                            < X size = { 16 } />
                        </button>
                    </div>
                ) }

                <input
                type = "file"
                ref = { fileInputRef }
                className = "hidden"
                accept = "image/*"
                onChange = { handleFileChange }
                />
            </div>

            <div className = " pt-6 pb-2 w-full flex items-center gap-4">                
                <BrandButton 
                onClick = { handleClose }
                variant="secondary">
                Close
                </BrandButton>
                <BrandButton
                onClick = { handleConfirm }>
                    Confirm
                </BrandButton>
            </div>
        </TaskModal>
    );
}

export default ImageModal;