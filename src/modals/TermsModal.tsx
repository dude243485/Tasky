import { useEffect } from "react";
import { createPortal } from "react-dom";


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
                    <button
                    onClick={ () => {onClose("accept")} }
                    className = {`rounded-[10px] text-white bg-brand-primary-600 w-full py-3 duration-200 transition-all hover:bg-brand-primary-500  
                    hover:shadow-lg hover:shadow-brand-primary-500/30 active:scale-95 active:shadow-inner active:bg-brand-primary-700 focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-brand-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 cursor-pointer`}
                    >
                        Agree & Continue
                    </button>
                    <button
                    onClick = { () => { onClose("decline")}}
                    className = {`rounded-[10px] text-brand-primary-600 dark:text-slate-50  border border-brand-primary-600  w-full py-3 duration-200 transition-all  
                    hover:shadow-lg hover:shadow-brand-primary-500/30 active:scale-95 active:shadow-inner active:bg-brand-primary-700 active:text-slate-50 focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-brand-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 cursor-pointer`}
                    >
                        Decline
                    </button>
                    
                </div>
            </div>

        </div>, document.body
    );
}

export default TermsModal;