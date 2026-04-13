import type { LucideIcon } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface PopupModalProps {
    isOpen: boolean;
    onClose: () => void;
    icon?: string | LucideIcon;
    children: React.ReactNode;
}

const PopupModal: React.FC<PopupModalProps> = ({
    isOpen, onClose, icon: Icon, children
}) => {

    //prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset"
        }

        return () => { document.body.style.overflow = "unset" }
    }, [isOpen])




    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-120 flex flex-col justify-end md:items-center md:justify-center ">
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            />
            <div className="p-8 z-120 w-full max-w-lg overflow-hidden rounded-t-4xl md:rounded-4xl bg-slate-50 transition-all dark:bg-slate-900 text-slate-900 dark:text-slate-50 flex flex-col items-center">
                <div className={`  p-6.5 rounded-2xl flex items-center justify-center mx-auto absolute -translate-y-20 z-100 shadow-xl 
                    shadow-brand-primary-600/50 hover:shadow-2xl hover:shadow-brand-primary-600/60 bg-brand-primary-600`}>
                    {typeof Icon === "string" ? (
                        <img
                            src={Icon}
                            alt="pop-up icon"
                            className="text-slate-50 "
                        />
                    ) : (Icon !== undefined && (<Icon className="text-white" />)

                    )
                    }
                </div>
                <div>
                    {children}
                </div>
            </div>

        </div>,
        document.body);
}

export default PopupModal;