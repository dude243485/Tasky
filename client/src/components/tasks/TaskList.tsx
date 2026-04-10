
import TaskItem from "./TaskItem";
import { Plus } from "lucide-react";
import calendarIcon from "../../assets/calendar_icon.png";
import {  type Task } from "../../types/taskTypes";
import { useAppDispatch } from "../../store/hooks";
import { toggleTaskStatus, deleteTaskAction, updateTask } from "../../store/taskSlice";
import { useNavigate } from "react-router";

interface TaskListProps {
    taskItems : Task[]
}

const TaskList = ( {taskItems} : TaskListProps) => {


    const dispatch = useAppDispatch();

    const handleStatusChange = (task: Task) => {
        dispatch(toggleTaskStatus(task.id));
    }

    const handleDelete = (task: Task) => {
        dispatch(deleteTaskAction(task.id));
    }

    const handleDescriptionChange = (task: Task, desc: string) => {
        const formData = new FormData();
        formData.append("description", desc);
        dispatch(updateTask({ id: task.id, formData }));
    }

    const navigate = useNavigate();
    const handleEdit = (task: Task) => {
        // Navigate to add-task with state for future editing support
        navigate("/add-task", { state: { taskToEdit: task } });
    }

    return (
        <div className="space-y-4">
            <h3 className = "text-lg font-bold">Current Tasks</h3>
            {taskItems.length > 0 ? (
                
                taskItems.map((task) => (
                    <TaskItem 
                        key = {task.id} 
                        item = {task} 
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                        onDescriptionChange={handleDescriptionChange}
                        onEdit={handleEdit}
                    />
                ))
            ) : (
                <div className = "h-60 w-full flex items-center justify-center flex-col ">
                    <div className="relative flex items-center justify-center rounded-full p-4 bg-slate-200 mb-4 ">
                        <img
                        src = { calendarIcon }
                        className="size-18"
                        alt = "calendar icon"
                         />
                        <div className="flex p-1 absolute bottom-4 right-4 items-center justify-center z-20 bg-brand-primary-600 rounded-full text-white">
                            <Plus className="size-5" />
                        </div>
                    </div>
                    <div className = "text-center space-y-1">
                        <h4 className = "font-semibold text-[16px]">No activities scheduled</h4>
                        <p className="text-[12px]">Add something to plan your day.</p>
                    </div>

                </div>
            )}
        </div>
    ) ;

}

export default TaskList;