import DaySlider from "../../components/dashboard/DaySlider";
import TaskList from "../../components/tasks/TaskList";
import { dummyTasks } from "../../tempData/tasks";
import { useAppSelector } from "../../store/hooks";
import { parseISO, isSameDay } from "date-fns";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";


const Home = () => {
    const navigate = useNavigate();
    const { items } = useAppSelector((state) => state.tasks);
    const selectedDateStr = useAppSelector((state) => state.calendar.selectedDate);
    const selectedDate = parseISO(selectedDateStr);
    const user = useAppSelector((state) => state.auth.user)



    const handleAddTaskButtonClick = () => {
        console.log("You clicked add task");
        navigate("/add-task");

        //...
    }

    const filteredTasks = items.filter((task) => isSameDay(parseISO(task.dueDate), selectedDate))
    return (
        <div className="px-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ">
            <div className="">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Hi, {user.name}</h3>
                <p className="text-slate-600 dark:text-slate-400">Let's finish your tasks today</p>
            </div>
            <div className="py-6">
                <DaySlider tasks={dummyTasks} />
            </div>
            <div className="py-8 rounded-2xl  text-slate-900 dark:text-slate-100  ">
                <TaskList taskItems={filteredTasks} />
            </div>
            <button
                onClick={handleAddTaskButtonClick}
                className={`text-white rounded-full shadow-2xl bg-brand-primary-600 hover:scale-[1.02] hover:bg-brand-primary-500 duration-300
            ease-in-out transition-all cursor-pointer fixed bottom-8 right-8 active:scale-[0.98] active:ring-2 active:ring-white p-6 shadow-brand-primary-600/50 hover:shadow-2xl 
            hover:shadow-brand-primary-600/60 `}>
                <Plus className="size-6" />
            </button>

        </div>
    )
}

export default Home;