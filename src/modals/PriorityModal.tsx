import TaskModal from "./TaskModal";
import BrandButton from "../components/buttons/BrandButton";

interface PriorityModalProps {
    isOpen : boolean ;
    onClose : () => void ;
    setter : (str : string) => void;
}

const PriorityModal : React.FC<PriorityModalProps> = ({
    isOpen, onClose, setter
}) => {
    const handleClick = (str : string) => {
        setter(str);
        onClose();
    }
   
    return(
        <TaskModal isOpen = { isOpen } onClose = { onClose }>
            <div className="w-full text-center">
                <h4 className = "text-2xl font-bold">Set Priority</h4>
                <p className="text-[14px] text-slate-600 dark:text-slate-400">How urgent is this task</p>
            </div>
            <div className="space-y-3 w-full mt-6">
                {["low", "medium", "high" ].map((level) => (
                    <button
                    key = { level }
                    onClick = { () => { handleClick(level)}}
                    className = { `flex items-center justify-between gap-4 border border-slate-300 px-4 py-3 w-full rounded-xl
                        active:bg-slate-100 cursor-pointer`}
                    >
                        <div  className = {`${level === "low" ? "bg-brand-success-700 shadow-brand-success-200" : 
                            level === "high" ? "bg-brand-error-600 shadow-brand-error-200" :
                             "bg-brand-warning-600 shadow-brand-warning-400"} 
                             rounded-full p-2.5 shadow-xl `}
                        />
                        <p className = "capitalize flex-1 text-left">{level}</p>

                    </button>
                ))}
            </div>

            <div className = "px-6 pt-6 pb-2 w-full">
                <BrandButton 
                onClick = { onClose }
                variant="secondary">
                Close
                </BrandButton>
            </div>
        </TaskModal>
    );
}

export default PriorityModal;