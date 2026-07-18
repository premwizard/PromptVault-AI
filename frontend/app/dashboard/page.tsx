'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Heart, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { PromptCardTilt } from '@/components/ui/PromptCardTilt';
import { AnimatedStatCard } from '@/components/ui/AnimatedStatCard';
import { Button } from '@/components/ui/button';
import { useDashboardStats } from '@/lib/hooks/useDashboard';
import { usePrompts } from '@/lib/hooks/usePrompts';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: prompts = [] } = usePrompts();
  
  // We can derive favorites from prompts, or they might come from a different endpoint.
  // Assuming prompts has a favorited status or we just grab top 3 for now.
  const favoritePrompts = prompts.slice(0, 3); // Modify this later if favorited is a field
  
  const firstName = user?.username || user?.email?.split('@')[0] || 'User';

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
            Welcome back, <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">{firstName}</span>
          </h1>
          <p className="text-muted-foreground">You have {stats?.totalPrompts || 0} prompts in your vault</p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStatCard
            icon={Sparkles}
            label="Total Prompts"
            value={stats?.totalPrompts || 0}
            color="blue"
            trend={12}
          />
          <AnimatedStatCard
            icon={Heart}
            label="Favorites"
            value={stats?.favoritePrompts || 0}
            color="purple"
            trend={3}
          />
          <AnimatedStatCard
            icon={TrendingUp}
            label="This Month"
            value={stats?.usageThisMonth || 0}
            color="green"
            trend={stats?.usageLastMonth ? Math.round(((stats.usageThisMonth - stats.usageLastMonth) / stats.usageLastMonth) * 100) : 0}
          />
          <AnimatedStatCard
            icon={Zap}
            label="Time Saved"
            value={`${stats?.saveTimeHours || 0}h`}
            color="cyan"
            trend={24}
          />
        </motion.div>

        {/* Favorites Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
              Your Favorites
            </h2>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5 hover:border-white/20 transition-colors"
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
            {statsLoading ? (
              // Skeleton Loaders
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[280px] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
              ))
            ) : favoritePrompts.length > 0 ? (
              favoritePrompts.map((prompt) => (
                <motion.div key={prompt.id} variants={itemVariants}>
                  <PromptCardTilt
                    title={prompt.title}
                    description={prompt.description}
                    category={prompt.category?.name || "Uncategorized"}
                    aiModel={prompt.ai_model}
                    tags={prompt.tags?.map(t => t.name) || []}
                    favorited={true}
                    usageCount={prompt.usage_count}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 text-center py-16 px-4 rounded-2xl border border-white/5 bg-white/[0.02]">
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
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
              Recent Activity
            </h2>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5 hover:border-white/20 transition-colors"
            >
              View Timeline
            </Button>
          </div>
          <GlassCard className="p-2 md:p-6" variant="subtle">
            <div className="space-y-2">
              {statsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
                ))
              ) : stats?.recentActivity?.length ? (
                stats.recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-accent-blue group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-shadow" />
                      <div>
                        <p className="text-foreground font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.item}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-muted-foreground">{activity.time}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent activity.</p>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
