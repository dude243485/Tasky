import { useState, useMemo, useRef, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { Search, ArrowUp, ArrowDown, ListFilter } from "lucide-react";
import { parseISO, compareAsc, compareDesc } from "date-fns";
import TaskList from "../../components/tasks/TaskList";
import SortOption from "../../components/dashboard/SortOption";

const TasksExplore = () => {

    const allTasks = useAppSelector((state) => state.tasks.items);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [isDropdownOpen , setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect (() => {
        const handleClickOutside = (event : MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
 

    //logic: Filter -> Sort -> Pass to child
    const filteredAndSortedTasks = useMemo(() => {
        let result = [...allTasks]

        //filter by name or category
        if (searchQuery.trim()) {
            const term = searchQuery.toLowerCase();
            result = result.filter(
                (task) => task.title.toLowerCase().includes(term) ||
                task.category?.toLowerCase().includes(term)
            );
        }

        result.sort((a, b) => {
            const dateA = a.dueDate;
            const dateB = b.dueDate;
            return sortOrder === "asc" ? compareAsc(dateA, dateB) : compareDesc(dateA, dateB);

        });
        return result;

    }, [allTasks, searchQuery, sortOrder])

    return (
        <div className = "p-6 mx-auto bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">

            <h2 className = "font-bold text-[24px] mb-8">Explore Tasks</h2>
            <div className="flex relative flex-wrap gap-4 items-center justify-between mb-10">
                <div className="min-w-62.5 flex-1 relative">
                    <Search className = "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size = { 20 } />
                    <input
                    type = "text"
                    placeholder="Search task..."
                    value = { searchQuery }
                    onChange={ (e) => setSearchQuery(e.target.value)}
                    className = {`w-full  p-4 py-4 border rounded-md shadow-sm focus:outline-none focus:ring-1
                        focus:ring-brand-primary-500 focus:not-first-of-type:border-brand-primary-500 transition-colors duration-200 border-slate-400
                        `}
                     />
                </div>
                <button
                onClick = { () => setIsDropdownOpen(!isDropdownOpen) }
                className = "px-2 py-4 border border-slate-400 text-slate-400 rounded-md flex items-center  transition-colors shadow-sm  cursor-pointer"
                >
                    <ListFilter  size = { 24 }/>
                </button>
                { isDropdownOpen && (
                    <div className = "absolute right-0 top-12.5 mt-3 w-56 bg-white border border-slate-200 rounded-md shadow-md z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className = "p-2">
                            <SortOption 
                            label = "Oldest First"
                            active = { sortOrder === "asc" }
                            onClick = { () => { setSortOrder("asc"); setIsDropdownOpen(false)}}
                            icon = { <ArrowUp size = { 16 } />}
                            />
                            <SortOption 
                            label = "Newest First"
                            active = { sortOrder === "desc" }
                            onClick = { () => { setSortOrder("desc"); setIsDropdownOpen(false)}}
                            icon = { <ArrowDown size = { 16 } />}
                            />
                        </div>
                    </div>
                ) }

            </div>
            <div>
                <TaskList taskItems={ filteredAndSortedTasks }/>
            </div>
        </div>
    );
}

export default TasksExplore ;