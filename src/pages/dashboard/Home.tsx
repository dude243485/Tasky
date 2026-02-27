import DaySlider from "../../components/dashboard/DaySlider";
import TaskList from "../../components/tasks/TaskList";
import { dummyTasks } from "../../tempData/tasks";
import { useAppSelector } from "../../store/hooks";
import { parseISO, isSameDay } from "date-fns";

const Home = () => {
    const { items } = useAppSelector((state) => state.tasks);
    const selectedDateStr = useAppSelector((state) => state.calendar.selectedDate);
    const selectedDate = parseISO(selectedDateStr);

    const filteredTasks = items.filter((task) => isSameDay(task.dueDate, selectedDate))
    return (
        <div className="px-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ">
            <div className="">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Hi, Ude Daniel</h3>
                <p className="text-slate-600 dark:text-slate-400">Let's finish your tasks today</p>
            </div>
            <div className="py-6">
                <DaySlider tasks={dummyTasks} />
            </div>
            <div className="py-8 rounded-2xl  text-slate-900 dark:text-slate-100  ">
                <TaskList taskItems = { filteredTasks} />
            </div>
        </div>
    )
}

export default Home;