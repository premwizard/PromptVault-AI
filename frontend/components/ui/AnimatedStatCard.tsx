"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { LucideIcon } from "lucide-react";
import { useMotionPreferences } from "@/components/hooks/useMotion";

interface AnimatedStatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: "blue" | "purple" | "cyan" | "green";
  trend?: number;
}

export function AnimatedStatCard({
  label,
  value,
  icon: Icon,
  color,
  trend,
}: AnimatedStatCardProps) {
  const prefersReducedMotion = useMotionPreferences();

  const colorMap = {
    blue: "from-blue-600/20 to-blue-600/5",
    purple: "from-purple-600/20 to-purple-600/5",
    cyan: "from-cyan-600/20 to-cyan-600/5",
    green: "from-green-600/20 to-green-600/5",
  };

  const glowMap = {
    blue: "shadow-lg shadow-blue-600/20",
    purple: "shadow-lg shadow-purple-600/20",
    cyan: "shadow-lg shadow-cyan-600/20",
    green: "shadow-lg shadow-green-600/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <GlassCard
        className={`p-6 h-full bg-gradient-to-br ${colorMap[color]} ${glowMap[color]}`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{label}</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </motion.div>
            {trend !== undefined && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-xs mt-2 ${trend > 0 ? "text-green-400" : "text-red-400"}`}
              >
                {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
              </motion.p>
            )}
          </div>
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1.05, 1],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
