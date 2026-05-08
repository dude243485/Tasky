import { useState, useEffect } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { getWeeklyStats, type DayStat } from "../../services/statsService";

type WeekOption = "current" | "last";

// ── Custom tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({
    active,
    payload,
}: {
    active?: boolean;
    payload?: { payload: DayStat; value: number }[];
}) => {
    if (!active || !payload?.length) return null;
    const { value, payload: data } = payload[0];
    return (
        <div className="bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
            {value} {value === 1 ? "Task" : "Tasks"}
            <span className="ml-1 font-normal opacity-60">· {data.fullDay}</span>
        </div>
    );
};

// ── Skeleton loader ───────────────────────────────────────────────────────────
const ChartSkeleton = () => (
    <div className="flex items-end gap-2 h-24 mt-4 px-2 animate-pulse">
        {Array.from({ length: 7 }).map((_, i) => (
            <div
                key={i}
                className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-t-sm"
                style={{ height: `${30 + Math.random() * 50}%` }}
            />
        ))}
    </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const ActivityChart = () => {
    const [week, setWeek] = useState<WeekOption>("current");
    const [data, setData] = useState<DayStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getWeeklyStats(week)
            .then((res) => {
                if (!cancelled) {
                    setData(res.stats);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [week]);

    const maxCount = Math.max(...data.map((d) => d.count), 3);

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-5 mt-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-50">
                    Activity
                </h3>

                {/* Week picker dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen((p) => !p)}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400
                            bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700
                            px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
                    >
                        {week === "current" ? "This Week" : "Last Week"}
                        <ChevronDown
                            className={`size-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {dropdownOpen && (
                        <div
                            className="absolute right-0 top-8 z-50 w-32 bg-white dark:bg-slate-800
                                border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg
                                overflow-hidden animate-in fade-in zoom-in duration-150"
                        >
                            {(["current", "last"] as WeekOption[]).map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => { setWeek(opt); setDropdownOpen(false); }}
                                    className={`w-full text-left text-xs px-3 py-2.5 font-medium transition-colors cursor-pointer
                                        ${week === opt
                                            ? "bg-brand-primary-100 text-brand-primary-700 dark:bg-brand-primary-900/30 dark:text-brand-primary-300"
                                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {opt === "current" ? "This Week" : "Last Week"}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Chart */}
            {loading ? (
                <ChartSkeleton />
            ) : (
                <ResponsiveContainer width="100%" height={120}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 4, left: -32, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#546FFF" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#546FFF" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            stroke="currentColor"
                            strokeOpacity={0.06}
                        />

                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: "currentColor", opacity: 0.45, fontWeight: 600 }}
                            dy={6}
                        />

                        <YAxis
                            domain={[0, maxCount + 1]}
                            hide={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "currentColor", opacity: 0.35 }}
                            tickCount={4}
                            allowDecimals={false}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: "#546FFF", strokeWidth: 1, strokeDasharray: "4 4" }}
                        />

                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#546FFF"
                            strokeWidth={2.5}
                            fill="url(#activityGradient)"
                            dot={false}
                            activeDot={{
                                r: 5,
                                fill: "#546FFF",
                                stroke: "#fff",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default ActivityChart;
