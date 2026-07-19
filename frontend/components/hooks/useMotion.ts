"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Hook to respect user's motion preferences
 * Returns modified animation config if user prefers reduced motion
 */
const useMotion = (config: any = {}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      ...config,
      initial: "animate",
      animate: "animate",
      exit: "animate",
      transition: { duration: 0 },
    };
  }

  return config;
};

/**
 * Hook to get animation variants with reduced motion support
 */
const useAnimationVariants = (variants: Record<string, any>) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return Object.keys(variants).reduce(
      (acc, key) => {
        acc[key] = {
          ...variants[key],
          transition: { duration: 0 },
        };
        return acc;
      },
      {} as Record<string, any>,
    );
  }

  return variants;
};

/**
 * Hook to get whether user prefers reduced motion
 */
export const useMotionPreferences = () => {
  return useReducedMotion();
};
