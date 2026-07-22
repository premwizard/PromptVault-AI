import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  ai_model: string;
  category: { id: string; name: string; color: string; icon: string } | null;
  tags?: { id: string; name: string }[];
  usage_count: number;
  status: string;
  created_at: string;
}

export function usePrompts() {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: async () => {
      const { data } = await api.get<Prompt[]>("/prompts");
      return data;
    },
  });
}

export interface CreatePromptData {
  title: string;
  content: string;
  description?: string;
  ai_model?: string;
  category_id?: string;
  collection_id?: string;
  is_favorite?: boolean;
}

export function useCreatePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPrompt: CreatePromptData) => {
      const { data } = await api.post<Prompt>("/prompts", newPrompt);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
}

export function useUpdatePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreatePromptData>;
    }) => {
      const { data: responseData } = await api.put<Prompt>(
        `/prompts/${id}`,
        data,
      );
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
}

export function useDeletePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/prompts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
}
