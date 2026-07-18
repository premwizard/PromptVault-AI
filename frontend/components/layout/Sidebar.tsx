'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageCircle,
  FolderOpen,
  Heart,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/contexts/AuthContext';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Prompts', href: '/prompts', icon: MessageCircle },
  { label: 'Collections', href: '/collections', icon: FolderOpen },
  { label: 'Favorites', href: '/favorites', icon: Heart },
];

const SECONDARY_NAV = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Profile', href: '/profile', icon: User },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 text-white shadow-lg shadow-black/50 hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: mobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? -280 : 0) }}
        className={cn(
          'fixed left-0 top-0 z-40 h-screen transition-all duration-300 md:left-4 md:top-4 md:h-[calc(100vh-2rem)] flex',
          collapsed ? 'w-20' : 'w-64',
          !mobileOpen && 'max-md:-translate-x-full'
        )}
      >
      <GlassCard className="h-full overflow-hidden flex flex-col p-6" variant="default">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={false}
            animate={{ width: collapsed ? 0 : 'auto', opacity: collapsed ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <h1 className="text-lg font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              PromptVault
            </h1>
          </motion.div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group',
                    active
                      ? 'bg-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
                      : 'text-muted-foreground hover:text-white'
                  )}
                >
                  <Icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", active ? "text-accent-blue" : "group-hover:text-accent-purple")} />
                  <motion.span
                    initial={false}
                    animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap font-medium"
                  >
                    {item.label}
                  </motion.span>
                  {active && !collapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 w-1.5 h-6 bg-gradient-to-b from-accent-blue to-accent-purple rounded-l-full shadow-[0_0_10px_rgba(167,139,250,0.8)]"
                    />
                  )}
                </motion.button>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Secondary Navigation */}
        <nav className="space-y-2 mb-6">
          {SECONDARY_NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <motion.button
                  whileHover={{ x: 4 }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors',
                    active
                      ? 'bg-accent-blue/20 text-accent-blue'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <motion.span
                    initial={false}
                    animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex-shrink-0 flex items-center justify-center text-white font-bold uppercase">
              {user?.username?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <motion.div
              initial={false}
              animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden flex-1 min-w-0"
            >
              <p className="text-sm font-medium truncate text-white">{user?.username || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || 'Member'}</p>
            </motion.div>
          </div>
        </div>

        {/* Logout */}
        <motion.button
          onClick={() => logout()}
          whileHover={{ x: 4 }}
          className="w-full flex items-center gap-3 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors text-sm mt-2"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <motion.span
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap"
          >
            Logout
          </motion.span>
        </motion.button>
      </GlassCard>
    </motion.aside>
    </>
  );
};
