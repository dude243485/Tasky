import { type Task } from "../../types/taskTypes";
import { Categories } from "../../tempData/categories";
import { Check, CircleDot } from "lucide-react";
import { useState } from "react";
import ViewTaskModal from "../../modals/ViewTaskModal";

interface TaskItemProps {
    item: Task;
    onEdit?: (task: Task) => void;
    onDelete?: (task: Task) => void;
    onStatusChange?: (task: Task, status: "pending" | "completed") => void;
    onDescriptionChange?: (task: Task, desc: string) => void;
}

const TaskItem = ({
    item,
    onEdit,
    onDelete,
    onStatusChange,
    onDescriptionChange,
}: TaskItemProps) => {
    const [viewTaskOpen, setViewTaskOpen] = useState<boolean>(false);

    let polishedDescription = "";
    if (item.description) {
        polishedDescription = item.description.slice(0, 30) + " ...";
    }

    const category = Categories[item.category as keyof typeof Categories];

    const handleDoubleClick = () => {
        setViewTaskOpen(true);
    };

    return (
        <>
            <div
                className="bg-white dark:bg-slate-900 p-3 space-y-4 rounded-xl cursor-pointer select-none"
                onDoubleClick={handleDoubleClick}
            >
                {item.image && (
                    <div className="w-full h-35 rounded-xl overflow-hidden">
                        <img
                            src={item.image}
                            alt="task image"
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
                <div className="flex gap-3 justify-between items-start">
                    <div
                        className="p-2 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                    >
                        <img
                            className="invert size-7 brightness-0"
                            src={category.image}
                            alt={`${category.label} icon`}
                        />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[16px] font-semibold leading-tight">{item.title}</h4>
                        {polishedDescription && (
                            <p className="text-[11px] text-slate-700 dark:text-slate-300">
                                {polishedDescription}
                            </p>
                        )}
                    </div>
                    <button
                        className={`cursor-pointer p-2 rounded-full justify-center flex items-center transition-all duration-300 ease-in-out
                            ${item.status === "pending"
                                ? "bg-slate-200 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-300"
                                : "bg-brand-success-200 text-brand-success-800 hover:bg-brand-success-100 hover:text-brand-success-700"
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            const newStatus = item.status === "pending" ? "completed" : "pending";
                            onStatusChange?.(item, newStatus);
                        }}
                    >
                        {item.status === "pending" ? (
                            <CircleDot className="size-5" />
                        ) : (
                            <Check className="size-5" />
                        )}
                    </button>
                </div>
            </div>

            <ViewTaskModal
                isOpen={viewTaskOpen}
                onClose={() => setViewTaskOpen(false)}
                task={item}
                onEdit={() => onEdit?.(item)}
                onDelete={() => onDelete?.(item)}
                onStatusChange={(status) => onStatusChange?.(item, status)}
                onDescriptionChange={(desc) => onDescriptionChange?.(item, desc)}
            />
        </>
    );
};

export default TaskItem;