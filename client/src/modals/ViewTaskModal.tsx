import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Check, CircleDot, Pencil, Trash2, AlignLeft } from "lucide-react";
import { type Task } from "../types/taskTypes";
import { Categories } from "../tempData/categories";
import DescriptionModal from "./DescriptionModal";

interface ViewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
    onStatusChange?: (status: "pending" | "completed") => void;
    onDescriptionChange?: (desc: string) => void;
}

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({
    isOpen,
    onClose,
    task,
    onEdit,
    onDelete,
    onStatusChange,
    onDescriptionChange,
}) => {
    const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
    const [currentDescription, setCurrentDescription] = useState(task.description ?? "");
    const [currentStatus, setCurrentStatus] = useState<"pending" | "completed">(task.status);

    // sync if task prop changes
    useEffect(() => {
        setCurrentDescription(task.description ?? "");
        setCurrentStatus(task.status);
    }, [task]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const category = Categories[task.category as keyof typeof Categories];

    const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
    });

    const handleStatusToggle = (status: "pending" | "completed") => {
        setCurrentStatus(status);
        onStatusChange?.(status);
    };

    const handleDescriptionSave = (desc: string) => {
        setCurrentDescription(desc);
        onDescriptionChange?.(desc);
    };

    const handleEdit = () => {
        onClose();
        onEdit();
    };

    const handleDelete = () => {
        onClose();
        onDelete();
    };

    return createPortal(
        <>
            {/* Description sub-modal — rendered above the view modal */}
            {descriptionModalOpen && (
                <DescriptionModal
                    isOpen={descriptionModalOpen}
                    onClose={() => setDescriptionModalOpen(false)}
                    value={currentDescription}
                    setter={handleDescriptionSave}
                />
            )}

            <div className="fixed inset-0 z-200 flex flex-col justify-end">
                {/* Backdrop */}
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                />

                {/* Sheet */}
                <div className="relative z-200 w-full max-w-lg mx-auto rounded-t-4xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 px-6 pt-8 pb-10 shadow-2xl">

                    {/* Drag handle */}
                    <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-6" />

                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <h2 className="text-[18px] font-bold leading-snug">{task.title}</h2>
                            <p
                                className="text-[13px] font-semibold mt-1"
                                style={{ color: category?.color }}
                            >
                                {formattedDate}
                            </p>
                        </div>

                        {/* Category icon badge */}
                        <div
                            className="p-2.5 rounded-xl flex items-center justify-center ml-3 shadow-md"
                            style={{ backgroundColor: category?.color }}
                        >
                            <img
                                src={category?.image}
                                alt={category?.label}
                                className="invert brightness-0 size-6"
                            />
                        </div>
                    </div>

                    {/* Status toggle */}
                    <div className="flex gap-px mt-5 mb-6 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                        <button
                            onClick={() => handleStatusToggle("pending")}
                            className={`flex-1 flex flex-col items-center gap-1.5 py-3 cursor-pointer transition-all duration-200
                                ${currentStatus === "pending"
                                    ? "bg-slate-100 dark:bg-slate-800"
                                    : "bg-white dark:bg-slate-900 opacity-50 hover:opacity-70"
                                }`}
                        >
                            <div className={`p-1.5 rounded-full transition-colors duration-200
                                ${currentStatus === "pending"
                                    ? "bg-slate-300 dark:bg-slate-600"
                                    : "bg-slate-100 dark:bg-slate-800"
                                }`}>
                                <CircleDot className="size-5 text-slate-500 dark:text-slate-400" />
                            </div>
                            <span className="text-[12px] font-medium text-slate-600 dark:text-slate-300">Pending</span>
                        </button>

                        <button
                            onClick={() => handleStatusToggle("completed")}
                            className={`flex-1 flex flex-col items-center gap-1.5 py-3 cursor-pointer transition-all duration-200
                                ${currentStatus === "completed"
                                    ? "bg-slate-100 dark:bg-slate-800"
                                    : "bg-white dark:bg-slate-900 opacity-50 hover:opacity-70"
                                }`}
                        >
                            <div className={`p-1.5 rounded-full transition-colors duration-200
                                ${currentStatus === "completed"
                                    ? "bg-brand-success-200"
                                    : "bg-slate-100 dark:bg-slate-800"
                                }`}>
                                <Check className={`size-5 transition-colors duration-200
                                    ${currentStatus === "completed"
                                        ? "text-brand-success-800"
                                        : "text-slate-400"
                                    }`}
                                />
                            </div>
                            <span className="text-[12px] font-medium text-slate-600 dark:text-slate-300">Done</span>
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col">
                        {/* Change Description */}
                        <button
                            onClick={() => setDescriptionModalOpen(true)}
                            className="flex items-center gap-4 py-4 border-b border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-2 transition-colors duration-150"
                        >
                            <AlignLeft className="size-5 text-slate-500 dark:text-slate-400" />
                            <span className="text-[15px] font-medium">Change description</span>
                            {currentDescription && (
                                <span className="ml-auto text-[11px] text-slate-400 truncate max-w-32">
                                    {currentDescription.slice(0, 28)}{currentDescription.length > 28 ? "…" : ""}
                                </span>
                            )}
                        </button>

                        {/* Delete */}
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-4 py-4 border-b border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-red-50 dark:hover:bg-brand-error-700/10 rounded-xl px-2 transition-colors duration-150 group"
                        >
                            <Trash2 className="size-5 text-slate-500 dark:text-slate-400 group-hover:text-brand-error-600 transition-colors duration-150" />
                            <span className="text-[15px] font-medium group-hover:text-brand-error-600 transition-colors duration-150">Delete</span>
                        </button>

                        {/* Edit */}
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-4 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-2 transition-colors duration-150"
                        >
                            <Pencil className="size-5 text-slate-500 dark:text-slate-400" />
                            <span className="text-[15px] font-medium">Edit</span>
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default ViewTaskModal;