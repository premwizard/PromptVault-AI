'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Heart, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PromptCardTilt } from '@/components/ui/PromptCardTilt';
import { AnimatedStatCard } from '@/components/ui/AnimatedStatCard';
import { Button } from '@/components/ui/button';
import { MOCK_STATS, MOCK_PROMPTS, MOCK_USER } from '@/lib/mockData';
import { ANIMATIONS } from '@/lib/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export default function DashboardPage() {
  const favoritePrompts = MOCK_PROMPTS.filter(p => p.favorited).slice(0, 3);

  return (
    <div className="p-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Welcome Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">{MOCK_USER.name.split(' ')[0]}</span>
          </h1>
          <p className="text-muted-foreground">You have {MOCK_STATS.totalPrompts} prompts in your vault</p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStatCard
            icon={Sparkles}
            label="Total Prompts"
            value={MOCK_STATS.totalPrompts}
            color="blue"
            trend={12}
          />
          <AnimatedStatCard
            icon={Heart}
            label="Favorites"
            value={MOCK_STATS.favoritePrompts}
            color="purple"
            trend={3}
          />
          <AnimatedStatCard
            icon={TrendingUp}
            label="This Month"
            value={MOCK_STATS.usageThisMonth}
            color="green"
            trend={Math.round(((MOCK_STATS.usageThisMonth - MOCK_STATS.usageLastMonth) / MOCK_STATS.usageLastMonth) * 100)}
          />
          <AnimatedStatCard
            icon={Zap}
            label="Time Saved"
            value={`${MOCK_STATS.saveTimeHours}h`}
            color="cyan"
            trend={24}
          />
        </motion.div>



        {/* Favorites Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Your Favorites
            </h2>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5"
            >
              View All
            </Button>
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {favoritePrompts.map((prompt) => (
              <motion.div key={prompt.id} variants={itemVariants}>
                <PromptCardTilt
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
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5"
            >
              View Timeline
            </Button>
          </div>
          <GlassCard className="p-6">
            <div className="space-y-4">
              {[
                { action: 'Created prompt', item: 'SEO Blog Post Writer', time: '2 hours ago' },
                { action: 'Favorited', item: 'Code Reviewer', time: '5 hours ago' },
                { action: 'Updated', item: 'Data Analyst Assistant', time: '1 day ago' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div>
                    <p className="text-foreground font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
