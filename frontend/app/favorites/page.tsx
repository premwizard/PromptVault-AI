'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { PromptCardTilt } from '@/components/ui/PromptCardTilt';
import { usePrompts, useDeletePrompt, Prompt } from '@/lib/hooks/usePrompts';
import { ANIMATIONS } from '@/lib/constants';
import { CreatePromptModal } from '@/components/features/CreatePromptModal';
import { ViewPromptModal } from '@/components/features/ViewPromptModal';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATIONS.medium },
  },
};

export default function FavoritesPage() {
  const { data: prompts = [], isLoading, isError } = usePrompts();
  const deletePrompt = useDeletePrompt();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [promptToEdit, setPromptToEdit] = useState<Prompt | null>(null);
  const [promptToView, setPromptToView] = useState<Prompt | null>(null);

  // Right now favorites is mocked by grabbing the first 3 prompts or any favorited ones.
  const favorites = prompts.slice(0, 3); // Temporarily mapped

  const handleEdit = (prompt: Prompt) => {
    setPromptToEdit(prompt);
    setIsModalOpen(true);
  };

  const handleView = (prompt: Prompt) => {
    setPromptToView(prompt);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      deletePrompt.mutate(id);
    }
  };

  return (
    <div className="p-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-500" />
            Your Favorites
          </h1>
          <p className="text-muted-foreground">
            {isLoading ? "Loading..." : `Your ${favorites.length} favorite prompts`}
          </p>
        </motion.div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
               <div key={i} className="h-[280px] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-16 px-4 rounded-2xl border border-red-500/20 bg-red-500/5">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <Heart className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 font-medium">Failed to load favorite prompts.</p>
            <p className="text-muted-foreground text-sm mt-2">Please try refreshing the page or check your connection.</p>
          </div>
        )}

        {/* Favorites Grid */}
        {!isLoading && !isError && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {favorites.map((prompt) => (
              <motion.div key={prompt.id} variants={itemVariants}>
                <PromptCardTilt
                  title={prompt.title}
                  description={prompt.description}
                  category={prompt.category?.name || "Uncategorized"}
                  aiModel={prompt.ai_model}
                  tags={prompt.tags.map(t => t.name)}
                  favorited={true}
                  usageCount={prompt.usage_count}
                  onClick={() => handleView(prompt)}
                  onEdit={() => handleEdit(prompt)}
                  onDelete={() => handleDelete(prompt.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && !isError && favorites.length === 0 && (
          <div className="text-center py-16 px-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Heart className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No favorites yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Click the heart icon on any prompt to add it to your favorites for quick access.
            </p>
          </div>
        )}
      </motion.div>

      <CreatePromptModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPromptToEdit(null);
        }}
        promptToEdit={promptToEdit}
      />
      <ViewPromptModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setPromptToView(null);
        }}
        prompt={promptToView}
      />
    </div>
  );
}
