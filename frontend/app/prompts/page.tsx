'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PromptCardTilt } from '@/components/ui/PromptCardTilt';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePrompts } from '@/lib/hooks/usePrompts';
import { ANIMATIONS, PROMPT_CATEGORIES, AI_MODELS } from '@/lib/constants';

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

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const { data: prompts = [], isLoading, isError } = usePrompts();

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || prompt.category?.name === selectedCategory;
    const matchesModel = !selectedModel || prompt.ai_model === selectedModel;
    return matchesSearch && matchesCategory && matchesModel;
  });

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
          <h1 className="text-4xl font-bold mb-2">Prompt Library</h1>
          <p className="text-muted-foreground">Browse and manage your prompt collection</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="space-y-4">
          <GlassCard className="p-6">
            <div className="flex gap-4 flex-wrap items-end">
              <div className="flex-1 min-w-64">
                <label className="text-sm text-muted-foreground mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="min-w-40">
                <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm"
                >
                  <option value="">All Categories</option>
                  {PROMPT_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-40">
                <label className="text-sm text-muted-foreground mb-2 block">Model</label>
                <select
                  value={selectedModel || ''}
                  onChange={(e) => setSelectedModel(e.target.value || null)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm"
                >
                  <option value="">All Models</option>
                  {AI_MODELS.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 hover:bg-white/5"
              >
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Prompts Grid */}
        <motion.div variants={itemVariants}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Loading prompts..." : `Showing ${filteredPrompts.length} of ${prompts.length} prompts`}
            </p>
          </div>
          
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
              ))}
            </div>
          )}
          
          {isError && (
             <div className="text-center py-16 px-4 rounded-2xl border border-red-500/20 bg-red-500/5">
               <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                 <Filter className="w-8 h-8 text-red-400" />
               </div>
               <p className="text-red-400 font-medium">Failed to load prompts.</p>
               <p className="text-muted-foreground text-sm mt-2">Please try refreshing the page or check your connection.</p>
             </div>
          )}

          {!isLoading && !isError && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPrompts.map((prompt) => (
                <motion.div key={prompt.id} variants={itemVariants}>
                  <PromptCardTilt
                    title={prompt.title}
                    description={prompt.description}
                    category={prompt.category?.name || "Uncategorized"}
                    aiModel={prompt.ai_model}
                    tags={prompt.tags.map(t => t.name)}
                    favorited={false}
                    usageCount={prompt.usage_count}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && filteredPrompts.length === 0 && !isError && (
            <div className="text-center py-16 px-4 rounded-2xl border border-white/5 bg-white/[0.02] mt-8">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Search className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No prompts found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Try adjusting your search criteria or clear your filters to find what you're looking for.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
