'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { MOCK_COLLECTIONS } from '@/lib/mockData';
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

        {/* Collections Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {MOCK_COLLECTIONS.map((collection) => {
            const Icon = Icons[collection.icon as keyof typeof Icons] || Icons.FolderOpen;
            const colorMap: Record<string, string> = {
              blue: 'from-blue-500 to-cyan-500',
              purple: 'from-purple-500 to-pink-500',
              cyan: 'from-cyan-500 to-blue-500',
              pink: 'from-pink-500 to-purple-500',
            };
            const bgColor = colorMap[collection.color] || 'from-blue-500 to-cyan-500';

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
                    <span className="text-xs text-muted-foreground">{collection.promptCount} prompts</span>
                    <span className="text-xs text-muted-foreground">
                      {collection.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
