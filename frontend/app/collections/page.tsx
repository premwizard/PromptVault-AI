'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, FolderOpen } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/lib/hooks/useCollections';
import { ANIMATIONS } from '@/lib/constants';
import * as Icons from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function CollectionsPage() {
  const { data: collections = [], isLoading, isError } = useCollections();

  return (
    <div className="p-6 md:p-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">Collections</h1>
            <p className="text-muted-foreground">Organize your prompts into collections</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Collection
          </Button>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[220px] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16 px-4 rounded-2xl border border-red-500/20 bg-red-500/5">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <FolderOpen className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 font-medium">Failed to load collections.</p>
            <p className="text-muted-foreground text-sm mt-2">Please try refreshing the page or check your connection.</p>
          </div>
        )}

        {/* Collections Grid */}
        {!isLoading && !isError && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {collections.map((collection) => {
              // We'll default to a blue folder since icon and color might not be on the model
              const Icon = FolderOpen;
              const bgColor = 'from-accent-blue to-accent-cyan';

              return (
                <motion.div key={collection.id} variants={itemVariants}>
                  <GlassCard interactive className="p-6 group cursor-pointer h-full border border-white/5 hover:border-accent-blue/30 transition-all duration-300">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${bgColor} opacity-80 mb-4 w-fit group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-accent-blue/20`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-accent-blue transition-colors duration-300">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{collection.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs font-medium text-white/50 bg-white/5 px-2 py-1 rounded-md">{collection.promptCount || 0} prompts</span>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        )}
        
        {!isLoading && collections.length === 0 && !isError && (
          <div className="text-center py-16 px-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
              <FolderOpen className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No collections yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-6">
              Collections help you group your prompts by project, workflow, or client.
            </p>
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create your first collection
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
