'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PromptCardTilt = React.memo(({
  title,
  description,
  category,
  aiModel,
  tags,
  favorited = false,
  usageCount = 0,
  onFavorite,
  onClick,
  onEdit,
  onDelete,
}: PromptCardTiltProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionPreferences();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

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
      onClick={(e) => {
        // Prevent click if we're clicking the menu or its children
        if (menuRef.current && menuRef.current.contains(e.target as Node)) {
          return;
        }
        onClick?.();
      }}
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
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFavorite}
                  className="p-1.5 rounded-lg flex-shrink-0 text-muted-foreground hover:bg-white/5 transition-colors"
                >
                  <Heart
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isFavorited ? 'fill-red-500 text-red-500' : 'hover:text-red-500'
                    )}
                  />
                </motion.button>
                
                <div className="relative" ref={menuRef}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(!showMenu);
                    }}
                    className="p-1.5 rounded-lg flex-shrink-0 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </motion.button>

                  <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-1 w-36 py-1 rounded-xl bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl z-20"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          onEdit?.();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenu(false);
                          onDelete?.();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        Delete
                      </button>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              </div>
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
});
PromptCardTilt.displayName = 'PromptCardTilt';
