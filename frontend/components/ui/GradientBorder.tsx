'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  animated?: boolean;
  borderWidth?: number;
}

export const GradientBorder = React.forwardRef<HTMLDivElement, GradientBorderProps>(
  ({ className, children, animated = true, borderWidth = 2, ...props }, ref) => {
    const gradientColor =
      'linear-gradient(135deg, #3B82F6 0%, #A78BFA 25%, #EC4899 50%, #06B6D4 75%, #3B82F6 100%)';

    if (!animated) {
      return (
        <div
          ref={ref}
          className={cn('relative rounded-2xl', className)}
          style={{
            background: gradientColor,
            backgroundSize: '400% 400%',
            padding: borderWidth,
          }}
          {...props}
        >
          <div className="relative h-full w-full rounded-2xl bg-background">{children}</div>
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn('relative rounded-2xl', className)}
        style={{
          background: gradientColor,
          backgroundSize: '400% 400%',
          padding: borderWidth,
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        {...props}
      >
        <div className="relative h-full w-full rounded-2xl bg-background">{children}</div>
      </motion.div>
    );
  }
);
GradientBorder.displayName = 'GradientBorder';
