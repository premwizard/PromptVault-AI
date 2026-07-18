'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { PromptCard } from '@/components/ui/PromptCard';
import { MOCK_PROMPTS } from '@/lib/mockData';
import { ANIMATIONS } from '@/lib/constants';

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
  const favorites = MOCK_PROMPTS.filter(p => p.favorited);

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
          <p className="text-muted-foreground">Your {favorites.length} favorite prompts</p>
        </motion.div>

        {/* Favorites Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {favorites.map((prompt) => (
            <motion.div key={prompt.id} variants={itemVariants}>
              <PromptCard
                title={prompt.title}
                description={prompt.description}
                category={prompt.category}
                aiModel={prompt.aiModel}
                tags={prompt.tags}
                favorited={prompt.favorited}
                usageCount={prompt.usageCount}
              />
            </motion.div>
          ))}
        </motion.div>

        {favorites.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No favorite prompts yet. Start adding your favorites!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
