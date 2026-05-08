import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Home, ClipboardCheck, User, LogOut } from "lucide-react";
import logo from "/icons/Logo.svg";
import { useAppSelector } from "../../store/hooks";
import { resolveAvatarUrl } from "../../utils/avatar";
import LogoutModal from "../../modals/LogoutModal";
import daniel from "/images/daniel.png";

const navItems = [
    { label: "Home", icon: Home, path: "/dashboard" },
    { label: "Tasks", icon: ClipboardCheck, path: "/dashboard/tasks" },
    { label: "Profile", icon: User, path: "/profile/view-profile" },
];

const DesktopSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector((state) => state.auth.user);
    const [logoutOpen, setLogoutOpen] = useState(false);

    return (
        <>
            {/* Sidebar — only visible on lg+ */}
            <aside
                className={`hidden md:flex flex-col w-64 min-h-screen shrink-0
                bg-white dark:bg-slate-900
                border-r border-slate-200 dark:border-slate-800
                shadow-[1px_0_20px_rgba(0,0,0,0.04)]
                sticky top-0 h-screen`}
            >
                {/* ── Logo ── */}
                <div className="flex items-center gap-2.5 px-6 py-7 border-b border-slate-100 dark:border-slate-800">
                    <img src={logo} alt="Tasky logo" className="size-7" />
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                        Tasky
                    </span>
                </div>

                {/* ── Nav links ── */}
                <nav className="flex flex-col gap-1 px-3 py-6 flex-1">
                    {navItems.map(({ label, icon: Icon, path }) => {
                        const isActive =
                            path === "/dashboard"
                                ? location.pathname === "/dashboard"
                                : location.pathname.startsWith(path);

                        return (
                            <button
                                key={path}
                                onClick={() => navigate(path)}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                                    transition-all duration-200 cursor-pointer w-full text-left
                                    ${isActive
                                        ? "bg-brand-primary-100 text-brand-primary-700 dark:bg-brand-primary-900/30 dark:text-brand-primary-300"
                                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                                    }`}
                            >
                                <Icon
                                    className={`size-5 shrink-0 ${isActive ? "text-brand-primary-600 dark:text-brand-primary-400" : ""}`}
                                />
                                {label}
                            </button>
                        );
                    })}
                </nav>

                {/* ── User + Sign Out ── */}
                <div className="px-3 py-5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                    {/* User card */}
                    <button
                        onClick={() => navigate("/profile/view-profile")}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 w-full cursor-pointer"
                    >
                        <img
                            src={resolveAvatarUrl(user?.avatar) ?? daniel}
                            alt="avatar"
                            referrerPolicy="no-referrer"
                            className="size-9 rounded-full object-cover ring-2 ring-brand-primary-200 dark:ring-brand-primary-800 shrink-0"
                        />
                        <div className="text-left overflow-hidden">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                                {user?.firstName ?? user?.name ?? "User"}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                {user?.email ?? ""}
                            </p>
                        </div>
                    </button>

                    {/* Sign out */}
                    <button
                        onClick={() => setLogoutOpen(true)}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                            text-brand-error-600 dark:text-brand-error-400
                            hover:bg-brand-error-100 dark:hover:bg-brand-error-700/20
                            transition-all duration-200 cursor-pointer w-full"
                    >
                        <LogOut className="size-5 shrink-0" />
                        Sign Out
                    </button>
                </div>
            </aside>

            <LogoutModal
                isOpen={logoutOpen}
                onClose={() => setLogoutOpen(false)}
                icon={LogOut}
            />
        </>
    );
};

export default DesktopSidebar;
