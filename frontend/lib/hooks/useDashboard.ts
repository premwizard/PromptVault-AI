import { useQuery } from "@tanstack/react-query";
import api from "../api";

export interface DashboardStats {
  totalPrompts: number;
  favoritePrompts: number;
  usageThisMonth: number;
  usageLastMonth: number;
  saveTimeHours: number;
  recentActivity: Array<{
    action: string;
    item: string;
    time: string;
  }>;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      try {
        const { data } = await api.get<DashboardStats>("/stats");
        return data;
      } catch {
        // Fallback or empty structure if API is not yet ready
        return {
          totalPrompts: 0,
          favoritePrompts: 0,
          usageThisMonth: 0,
          usageLastMonth: 0,
          saveTimeHours: 0,
          recentActivity: [],
        };
      }
    },
  });
}
