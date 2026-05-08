import { Outlet } from "react-router";
import DashboardMobileHeader from "../../components/dashboard/DashboardMobileHeader";
import DesktopSidebar from "../../components/dashboard/DesktopSidebar";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getTasks } from "../../store/taskSlice";

const DashboardLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            {/* Persistent sidebar — only renders visually on lg+ */}
            <DesktopSidebar />

            {/* Main content column */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* Mobile header — hidden on desktop */}
                <div className="md:hidden">
                    <DashboardMobileHeader />
                </div>
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;