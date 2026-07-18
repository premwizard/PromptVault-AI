'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientBorder } from '@/components/ui/GradientBorder';
import { ANIMATIONS } from '@/lib/constants';

export const LandingHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-blue/20 blur-3xl opacity-50 animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-purple/10 blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-cyan/10 blur-3xl opacity-30" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="w-full max-w-4xl text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <GradientBorder animated={false} className="w-fit mx-auto mb-6" borderWidth={1}>
            <div className="px-4 py-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-blue" />
              <span className="text-sm font-medium">Now with Advanced Analytics</span>
            </div>
          </GradientBorder>
        </motion.div>

        {/* Main heading */}
        <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
            Manage Your AI Prompts
          </span>
          <br />
          <span className="text-white">Like Never Before</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          PromptVault is your complete prompt management solution. Organize, share, and optimize your AI prompts
          with powerful tools designed for professionals.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-accent-blue hover:bg-accent-blue/90 text-white rounded-lg font-semibold"
            >
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-foreground hover:bg-white/5 rounded-lg font-semibold"
          >
            Watch Demo
          </Button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
        >
          {[
            { label: '5K+ Prompts', subtext: 'Ready to use' },
            { label: '99.9% Uptime', subtext: 'Enterprise reliability' },
            { label: '24/7 Support', subtext: 'Always here for you' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card-subtle p-4 rounded-xl">
              <div className="font-semibold text-foreground">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.subtext}</div>
            </div>
          ))}
        </motion.div>

        {/* Hero image/visual */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <GradientBorder className="overflow-hidden max-w-3xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-blue/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-accent-blue" />
                </div>
                <p className="text-muted-foreground">Interactive Dashboard Preview</p>
              </div>
            </div>
          </GradientBorder>
        </motion.div>
      </motion.div>
    </section>
  );
};
