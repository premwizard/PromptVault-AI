'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Edit, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { useMotionPreferences } from '@/components/hooks/useMotion';

interface PromptCardTiltProps {
  title: string;
  description: string;
  category: string;
  aiModel: string;
  tags: string[];
  favorited?: boolean;
  usageCount?: number;
  onFavorite?: () => void;
  onClick?: () => void;
}

export const PromptCardTilt = ({
  title,
  description,
  category,
  aiModel,
  tags,
  favorited = false,
  usageCount = 0,
  onFavorite,
  onClick,
}: PromptCardTiltProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionPreferences();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavorite?.();
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Writing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Marketing': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Development': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Analysis': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Brainstorm': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Design': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Other': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[cat] || colors['Other'];
  };

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        perspective: '1000px',
      }}
      className="h-full"
    >
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="h-full"
      >
        <GlassCard
          interactive
          className="h-full p-6 cursor-pointer group"
          variant={isHovered ? 'hover' : 'default'}
        >
          <div className="flex flex-col h-full">
            {/* Header with actions */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-lg truncate group-hover:text-accent-blue transition-colors">
                  {title}
                </h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFavorite}
                className="ml-2 flex-shrink-0"
              >
                <Heart
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-500'
                  )}
                />
              </motion.button>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs rounded-full bg-white/5 text-muted-foreground border border-white/10 hover:border-accent-blue/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && <span className="text-xs text-muted-foreground py-1">+{tags.length - 3}</span>}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <span className={cn('px-2 py-1 text-xs rounded-lg border', getCategoryColor(category))}>
                  {category}
                </span>
                <span className="text-xs text-muted-foreground">{aiModel}</span>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                className="flex items-center gap-2"
              >
                <span className="text-xs text-muted-foreground">{usageCount} uses</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};
