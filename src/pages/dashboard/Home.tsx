import DaySlider from "../../components/dashboard/DaySlider";
import TaskList from "../../components/tasks/TaskList";
import { dummyTasks } from "../../tempData/tasks";

const Home = () => {
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
                <TaskList />
            </div>
        </div>
    )
}

export default Home;