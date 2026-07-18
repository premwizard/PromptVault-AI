import { useQuery } from '@tanstack/react-query';
import api from '../api';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  ai_model: string;
  category: { id: string; name: string; color: string; icon: string } | null;
  tags: { id: string; name: string }[];
  usage_count: number;
  status: string;
  created_at: string;
}

export function usePrompts() {
  return useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const { data } = await api.get<Prompt[]>('/prompts');
      return data;
    },
  });
}
