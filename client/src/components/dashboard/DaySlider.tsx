import { useState } from "react";
import { format, addDays, subDays, startOfWeek, isSameDay, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Task } from "../../types/taskTypes";
import { setSelectedDate } from "../../store/calendarSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";


interface DateSliderProps {
    tasks: Task[];
}



const DaySlider = ({ tasks }: DateSliderProps) => {
    const dispatch = useAppDispatch()
    //Generate 5 days centered around a pivot
    // const [selectedDate, setSelectedDate] = useState(new Date());

    //get global state
    const selectedDateStr = useAppSelector((state) => state.calendar.selectedDate);
    const selectedDate = parseISO(selectedDateStr);

    const [activeWeekStart, setActiveWeekStart] = useState(startOfWeek(selectedDate));




    //generate the 7 days for the current view
    const daysInWeek = Array.from({ length: 5 }).map((_, i) =>
        addDays(activeWeekStart, i));

    const handlePrevWeek = () => setActiveWeekStart(prev => subDays(prev, 5));
    const handleNextWeek = () => setActiveWeekStart(prev => addDays(prev, 5));
    const hasTasks = (date: Date) =>
        tasks.some((task: Task) => isSameDay(parseISO(task.dueDate), date));



    return (
        <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm max-w-md">
            <div className="flex items-center justify-between mb-10 px-2 w-full">
                <button
                    onClick={handlePrevWeek}
                    className="text-slate-500 hover:text-slate-300 dark:hover:text-slate-600 transition-colors group cursor-pointer" >
                    <ChevronLeft />
                </button>
                <h2 className="font-semibold text-slate-900 dark:text-slate-50">{format(activeWeekStart, "MMMM yyyy")}</h2>
                <button
                    onClick={handleNextWeek}
                    className="text-slate-500 hover:text-slate-300 dark:hover:text-slate-600 transition-colors group cursor-pointer" >
                    <ChevronRight />
                </button>
            </div>

            {/*slider grid*/}
            <div className="grid grid-cols-5 gap-2">
                {daysInWeek.map((date) => {
                    const isSelected = isSameDay(date, selectedDate);
                    const dayHasTasks = hasTasks(date);

                    return (
                        <div key={date.toString()}

                            className={` ${isSelected ? " relative bg-slate-950 text-slate-50 dark:bg-slate-50 dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-slate-200"
                                : "hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300 text-slate-700 "} 
                        flex flex-col items-center px-1.5 py-1.5 gap-3 rounded-full cursor-pointer transition-colors   dark:text-slate-100 group relative
                        `}>
                            <span className="text-xs font-bold   uppercase tracking-widest">
                                {format(date, "eeeeee")}
                            </span>

                            <div className="relative flex flex-col items-center px-2">
                                {isSelected && (
                                    <div className="absolute -top-14 botom-[-8px] w-12 bg-slate-900 rounded-full -z-10 " />
                                )}
                                <button
                                    onClick={() => dispatch(setSelectedDate(date.toISOString()))}
                                    className={`
                                    flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all mx-2 
                                    ${isSelected ? "bg-brand-primary-600 text-white shadow-md" : "dark:text-slate-300 dark:hover:text-slate-700 text-slate-700 hover:bg-slate-100"}`}
                                >
                                    {format(date, "d")}
                                </button>
                            </div>

                            {dayHasTasks && (
                                <div
                                    className={`mt-2 w-1.5 h-1.5 absolute bottom-1 right-[50%] translate-x-1/2 rounded-full z-50
                                        ${isSelected ? "bg-brand-primary-600" : "bg-brand-primary-300"}`}
                                />
                            )}
                        </div>
                    )
                })}

            </div>

        </div>
    );
}

export default DaySlider;