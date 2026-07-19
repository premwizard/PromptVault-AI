import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "hover";
  interactive?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border backdrop-blur-xl",
          variant === "default" &&
            "border-white/10 bg-glass shadow-lg shadow-black/40",
          variant === "subtle" &&
            "border-white/5 bg-glass-subtle shadow-md shadow-black/20",
          variant === "hover" &&
            "border-white/20 bg-glass shadow-xl shadow-accent-blue/10 transition-all duration-300",
          interactive &&
            "hover:border-white/20 hover:shadow-xl hover:shadow-accent-blue/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer",
          className,
        )}
        {...props}
      />
    );
  },
);
GlassCard.displayName = "GlassCard";
