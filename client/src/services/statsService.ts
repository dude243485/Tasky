import apiClient from "./apiClient";

export interface DayStat {
    day: string;       // "S", "M", "T" …
    fullDay: string;   // "Sun", "Mon" …
    date: string;      // "yyyy-MM-dd"
    count: number;
}

export interface WeeklyStatsResponse {
    stats: DayStat[];
    weekStart: string;
    weekEnd: string;
}

export const getWeeklyStats = async (
    week: "current" | "last" = "current"
): Promise<WeeklyStatsResponse> => {
    const { data } = await apiClient.get<WeeklyStatsResponse>(
        `/api/tasks/stats/weekly?week=${week}`
    );
    return data;
};
