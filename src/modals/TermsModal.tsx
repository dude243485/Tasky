import { useEffect } from "react";
import { createPortal } from "react-dom";
import BrandButton from "../components/BrandButton";


interface TermsModalProps {
    isOpen : boolean;
    onClose : (choice : "accept" | "decline") => void;
    title? : string;
    children : React.ReactNode
}

const TermsModal : React.FC<TermsModalProps> = ({
    isOpen, onClose, title, children
}) => {

    //prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => { document.body.style.overflow = "unset"}
    }, [isOpen])
 
    if (!isOpen) return null;

    return createPortal(
        <div className = "fixed inset-0 z-50 flex flex-col justify-end ">
            <div
            className = "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick = { () => { onClose("decline")} }
             />

            {/*container */}
            <div 
            className=" relative p-8 w-full max-w-lg overflow-hidden rounded-t-4xl bg-slate-50 transition-all dark:bg-slate-900 text-slate-900 dark:text-slate-50">
                <div>
                    <h3 className = "text-xl font-semibold text-center px-6 mb-6">
                        { title || "Modal Title"}
                    </h3>
                </div>
                <div>
                    { children }
                </div>
                <div className="flex flex-col gap-3 mt-6 font-medium">
                    <BrandButton 
                    onClick = {() => {onClose("accept")}}
                    variant="primary"
                    size = "full"
                     >
                        Agree & Continue
                    </BrandButton>
                    
                    <BrandButton
                    onClick = {() => { onClose("decline")}}
                    variant = "secondary"
                    size = "full"
                    >
                    Decline
                    </BrandButton>
                </div>
            </div>

        </div>, document.body
    );
}

export default TermsModal;