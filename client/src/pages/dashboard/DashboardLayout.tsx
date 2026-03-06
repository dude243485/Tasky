import { Outlet } from "react-router";
import DashboardMobileHeader from "../../components/dashboard/DashboardMobileHeader";

const DashboardLayout = () => {
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