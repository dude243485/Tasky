import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface TaskModalProps {
    isOpen : boolean;
    onClose : () => void;
    children : React.ReactNode;
}

const TaskModal : React.FC<TaskModalProps> = ({
    isOpen, onClose, children
}) => {

    useEffect (() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => { document.body.style.overflow = "unset" }
    })

    if (!isOpen) return null ;

    return createPortal(
        <div className = "fixed inset-0 z-300 flex flex-col items-center justify-center">
            <div
            onClick = { onClose }
            className ="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            />
            <div className = "px-6 py-4 relative z-310 min-w-75 max-w-lg overflow-hidden rounded-3xl bg-slate-50 transition-all dark:bg-slate-900 text-slate-900 dark:text-slate-50 flex flex-col items-center">
                {children}
            </div>
        </div>,
         document.body
    );
}

export default TaskModal;