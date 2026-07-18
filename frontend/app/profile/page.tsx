'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Crown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { MOCK_USER, MOCK_STATS, MOCK_ACTIVITY } from '@/lib/mockData';
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
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white text-3xl font-bold">
                {MOCK_USER.name.charAt(0)}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-1">{MOCK_USER.name}</h1>
                <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    {MOCK_USER.email}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Crown className="w-4 h-4 text-accent-purple" />
                    {MOCK_USER.tier} Member
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined {MOCK_USER.joinedAt.toLocaleDateString()}
                  </div>
                </div>
                <p className="text-foreground mt-3 mb-4">{MOCK_USER.bio}</p>
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
            { label: 'Total Prompts', value: MOCK_STATS.totalPrompts },
            { label: 'Favorites', value: MOCK_STATS.favoritePrompts },
            { label: 'Collections', value: MOCK_STATS.collections },
            { label: 'Time Saved', value: `${MOCK_STATS.saveTimeHours}h` },
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
              {MOCK_ACTIVITY.map((activity, idx) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-accent-blue rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {idx !== MOCK_ACTIVITY.length - 1 && (
                    <div className="absolute left-3.5 top-16 w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
