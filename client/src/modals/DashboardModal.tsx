import { useEffect } from "react";
import { createPortal } from "react-dom";
import logo from "/icons/Logo.svg";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { Home, ClipboardCheck, X } from "lucide-react";

interface DashboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DashboardModal: React.FC<DashboardModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === "/dashboard";
    const isTasks = location.pathname === "/dashboard/tasks";


    const handleHome = () => {
        navigate("/dashboard");
        onClose()
    }

    const handleTasks = () => {
        navigate("/dashboard/tasks");
        onClose();
    }



    //prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen])

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-150  ">
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity "
            />
            <div className={`fixed z-150 w-3/4 overflow-hidden rounded-r-4xl bg-slate-50  dark:bg-slate-900 
                text-slate-900 dark:text-slate-50 px-6 min-h-screen`}>
                <button
                    onClick={onClose}
                    className="mt-8 mb-14 cursor-pointer hover:text-slate-400 transition-all duration-300 ">
                    <X className="size-6" />
                </button>
                <div className="flex gap-2 items-center justify-start mb-10">
                    <img
                        src={logo}
                        alt="Logo"
                        className="size-7"
                    />
                    <h3 className="text-2xl font-bold">Tasky</h3>
                </div>
                <div
                    role="navigation"
                    className="flex flex-col gap-1 text-slate-500 dark:text-slate-400"
                >
                    <button
                        onClick={handleHome}
                        className={`px-3 py-3 flex gap-2 items-center rounded-[10px] cursor-pointer  ${isHome ? "bg-slate-200 text-slate-700" : ""}`}>
                        <Home className="size-5" />
                        <p className="text-[14px] font-medium">Home</p>
                    </button>
                    <button
                        onClick={handleTasks}
                        className={`px-3 py-3 flex gap-2 items-center rounded-[10px] cursor-pointer ${isTasks ? "bg-slate-200 text-slate-700" : ""}`}>
                        <ClipboardCheck className="size-5" />
                        <p className="text-[14px] font-medium">Tasks</p>
                    </button>

                </div>

            </div>
        </div>, document.body
    )
}
export default DashboardModal;