import { Outlet } from "react-router";
import DashboardMobileHeader from "../../components/dashboard/DashboardMobileHeader";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getTasks } from "../../store/taskSlice";

const DashboardLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

  return (
    <div className="min-h-screen w-full max-w-md bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ">
        <main>
            <div className="mb-8">
                <DashboardMobileHeader />
            </div>
            <Outlet />
        </main>
    </div>
  )
}

export default DashboardLayout;