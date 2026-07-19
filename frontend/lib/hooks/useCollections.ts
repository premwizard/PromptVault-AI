import { useQuery } from "@tanstack/react-query";
import api from "../api";

export interface Collection {
  id: string;
  name: string;
  description: string;
  is_public: boolean;
  promptCount: number;
}

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      // In reality, this would hit /collections
      // Since it's not implemented yet, we return empty arrays if it fails
      try {
        const { data } = await api.get<Collection[]>("/collections");
        return data;
      } catch {
        return [];
      }
    },
  });
}
