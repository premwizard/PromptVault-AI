'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Crown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useDashboardStats } from '@/lib/hooks/useDashboard';
import { useUser } from '@clerk/nextjs';
import { ANIMATIONS } from '@/lib/constants';

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

export default function ProfilePage() {
  const { user } = useUser();
  const { data: stats } = useDashboardStats();
  
  const initial = user?.firstName?.charAt(0) || 'U';
  const joinedAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently';

  return (
    <div className="p-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white text-3xl font-bold shrink-0">
                {initial}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-1">{user?.fullName || 'User'}</h1>
                <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    {user?.primaryEmailAddress?.emailAddress || 'No email provided'}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Crown className="w-4 h-4 text-accent-purple" />
                    Member
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined {joinedAt}
                  </div>
                </div>
                <p className="text-foreground mt-3 mb-4">PromptVault user building out an amazing collection.</p>
                <Button className="bg-accent-blue hover:bg-accent-blue/90">
                  Edit Profile
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Prompts', value: stats?.totalPrompts || 0 },
            { label: 'Favorites', value: stats?.favoritePrompts || 0 },
            { label: 'Collections', value: 0 }, // Would come from stats.collections
            { label: 'Time Saved', value: `${stats?.saveTimeHours || 0}h` },
          ].map((stat, idx) => (
            <GlassCard key={idx} className="p-4 text-center">
              <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </GlassCard>
          ))}
        </motion.div>

        {/* Activity Timeline */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <GlassCard className="p-6">
            <div className="space-y-4">
              {stats?.recentActivity?.length ? stats.recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent-blue rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{activity.action} - {activity.item}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
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
