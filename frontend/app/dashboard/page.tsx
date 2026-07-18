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
                  category={prompt.category?.name || "Uncategorized"}
                  aiModel={prompt.ai_model}
                  tags={prompt.tags?.map(t => t.name) || []}
                  favorited={true}
                  usageCount={prompt.usage_count}
                />
              </motion.div>
            ))}
            
            {favoritePrompts.length === 0 && (
              <div className="col-span-1 md:col-span-3 text-center py-12">
                <p className="text-muted-foreground">You don't have any favorite prompts yet.</p>
              </div>
            )}
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
              {stats?.recentActivity?.length ? stats.recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div>
                    <p className="text-foreground font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              )) : (
                <p className="text-muted-foreground">No recent activity.</p>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
