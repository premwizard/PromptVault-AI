// Color Palette
const COLORS = {
  background: "#09090B",
  foreground: "#F5F5F7",
  card: "#111827",
  glass: "rgba(17, 24, 39, 0.4)",
  glassSlight: "rgba(17, 24, 39, 0.2)",
  border: "#27272A",

  // Accent colors
  accentBlue: "#3B82F6",
  accentPurple: "#A78BFA",
  accentCyan: "#06B6D4",
  accentPink: "#EC4899",
  accentGreen: "#10B981",

  // UI
  muted: "#64748B",
  mutedForeground: "#94A3B8",
  destructive: "#EF4444",
} as const;

// Spacing
const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
} as const;

// Border radius
const BORDER_RADIUS = {
  sm: "0.375rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "1.75rem",
  "3xl": "2rem",
} as const;

// Animation durations
export const ANIMATIONS = {
  fast: 0.2,
  base: 0.3,
  medium: 0.5,
  slow: 0.8,
  slower: 1.2,
} as const;

// Framer Motion variants
const MOTION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: ANIMATIONS.base },
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: ANIMATIONS.medium },
  },

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: ANIMATIONS.medium },
  },

  slideLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: ANIMATIONS.medium },
  },

  slideRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: ANIMATIONS.medium },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: ANIMATIONS.medium },
  },

  stagger: (delay: number = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: ANIMATIONS.medium, delay },
  }),

  hoverLift: {
    whileHover: { y: -4, transition: { duration: ANIMATIONS.fast } },
    whileTap: { y: -2 },
  },

  pulseGlow: {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0.3)",
        "0 0 0 10px rgba(59, 130, 246, 0)",
      ],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
} as const;

// Navigation items
const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  { id: "prompts", label: "Prompts", href: "/prompts", icon: "MessageCircle" },
  {
    id: "collections",
    label: "Collections",
    href: "/collections",
    icon: "FolderOpen",
  },
  { id: "favorites", label: "Favorites", href: "/favorites", icon: "Heart" },
] as const;

// Categories
export const PROMPT_CATEGORIES = [
  "Writing",
  "Marketing",
  "Development",
  "Analysis",
  "Brainstorm",
  "Design",
  "Other",
] as const;

// AI Models
export const AI_MODELS = [
  "GPT-4",
  "GPT-3.5",
  "Claude 3",
  "Gemini Pro",
  "Llama 2",
] as const;
