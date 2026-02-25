import { useAppSelector } from "../../store/hooks";
import { parseISO, isSameDay } from "date-fns";
import TaskItem from "./TaskItem";
import { Plus } from "lucide-react";
import calendarIcon from "../../assets/calendar_icon.png";


const TaskList = () => {

    const { items } = useAppSelector((state) => state.tasks);
    const selectedDateStr = useAppSelector((state) => state.calendar.selectedDate);
    const selectedDate = parseISO(selectedDateStr);

    const filteredTasks = items.filter((task) => isSameDay(task.dueDate, selectedDate))

    return (
        <div className="space-y-4">
            <h3 className = "text-lg font-bold">Current Tasks</h3>
            {filteredTasks.length > 0 ? (
                
                filteredTasks.map((task) => (
                    <TaskItem key = {task.id} item = {task} />
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