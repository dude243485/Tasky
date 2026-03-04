import TaskModal from "./TaskModal";
import BrandButton from "../components/buttons/BrandButton";
import { useState, type ChangeEvent } from "react";

interface DescriptionModalProps {
    isOpen : boolean;
    onClose : () => void;
    value : string;
    setter : (str : string) => void
}

const DescriptionModal : React.FC <DescriptionModalProps> = ({
    isOpen, onClose, setter, value
}) => {
    const [areaValue, setAreaValue] = useState<string>(value)

    const handleClose = () => {
        onClose();
    }

    const handleConfirm = () => {
        setter(areaValue);
        onClose();
    }

    const handleChange = (e : ChangeEvent<HTMLTextAreaElement>) => {
        setAreaValue(e.target.value)
    }   

    return(
        <TaskModal isOpen = { isOpen } onClose = { onClose }>

            <h4 className=" w-full text-center font-semibold text-[14px] pb-4 border-b border-b-slate-200 mb-4">Enter a description</h4>
            <label 
            className = "w-full text-[12px] text-brand-primary-600 mb-3"
            htmlFor="description">
            Description
            </label>

            <textarea
            name = "description"
            className= { `w-full text-[12px]  border-slate-400 px-4 py-4 border rounded-md shadow-sm focus:outline-none focus:ring-1
                        focus:ring-brand-primary-500 focus:not-first-of-type:border-brand-primary-500 transition-colors duration-200
                        borderl-slate-400`}
            value = { areaValue }
            onChange = { handleChange }>

            </textarea>
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

export default DescriptionModal;