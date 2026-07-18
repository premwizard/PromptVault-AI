'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMotionPreferences } from '@/components/hooks/useMotion';

export function AnimatedBackground() {
  const prefersReducedMotion = useMotionPreferences();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#09090B] via-[#1a1a2e] to-[#0f0f1e]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 -left-1/3 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl"
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 50, 0],
                y: [0, 100, 0],
                scale: [1, 1.2, 1],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-purple-600/20 to-transparent rounded-full blur-3xl"
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, -50, 0],
                y: [0, -100, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/3 w-1/2 h-1/2 bg-gradient-to-tr from-cyan-600/20 to-transparent rounded-full blur-3xl"
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 30, 0],
                y: [0, 50, 0],
                scale: [1, 0.9, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {isMounted && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-blue/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }
            }
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Grid overlay - subtle */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent calc(100% - 1px), rgba(255,255,255,.1) 1px), linear-gradient(90deg, transparent calc(100% - 1px), rgba(255,255,255,.1) 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
