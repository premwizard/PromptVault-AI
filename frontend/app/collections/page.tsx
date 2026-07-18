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
    <div className="p-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Collections</h1>
            <p className="text-muted-foreground">Organize your prompts into collections</p>
          </div>
          <Button className="bg-accent-blue hover:bg-accent-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            New Collection
          </Button>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12">
            <p className="text-red-400">Failed to load collections.</p>
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
              const bgColor = 'from-blue-500 to-cyan-500';

              return (
                <motion.div key={collection.id} variants={itemVariants}>
                  <GlassCard interactive className="p-6 group cursor-pointer h-full">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${bgColor} bg-opacity-20 mb-4 w-fit group-hover:bg-opacity-30 transition-all`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-accent-blue transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{collection.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-muted-foreground">{collection.promptCount || 0} prompts</span>
                      <span className="text-xs text-muted-foreground">
                        {/* {new Date(collection.created_at).toLocaleDateString()} */}
                      </span>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        )}
        
        {!isLoading && collections.length === 0 && !isError && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">You haven't created any collections yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
