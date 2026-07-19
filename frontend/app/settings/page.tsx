"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Lock, Palette, Database } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ANIMATIONS } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

interface SettingState {
  notifications: boolean;
  emailUpdates: boolean;
  darkMode: boolean;
  dataCollection: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingState>({
    notifications: true,
    emailUpdates: false,
    darkMode: true,
    dataCollection: false,
  });

  const toggleSetting = (key: keyof SettingState) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsList = [
    {
      icon: Bell,
      title: "Notifications",
      description: "Receive notifications about your prompts",
      key: "notifications" as const,
    },
    {
      icon: Mail,
      title: "Email Updates",
      description: "Get weekly email summaries",
      key: "emailUpdates" as const,
    },
    {
      icon: Palette,
      title: "Dark Mode",
      description: "Use dark mode by default",
      key: "darkMode" as const,
    },
    {
      icon: Database,
      title: "Data Collection",
      description: "Help us improve by sharing usage data",
      key: "dataCollection" as const,
    },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-8 max-w-2xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </motion.div>

        {/* Settings Sections */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>
          <GlassCard className="space-y-px overflow-hidden">
            {settingsList.map((setting, idx) => {
              const Icon = setting.icon;
              return (
                <motion.div
                  key={setting.key}
                  className={`p-4 flex items-center justify-between border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent-blue/20">
                      <Icon className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {setting.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSetting(setting.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[setting.key] ? "bg-accent-blue" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[setting.key]
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </motion.div>
              );
            })}
          </GlassCard>
        </motion.div>

        {/* Account Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="space-y-4">
            <GlassCard className="p-6">
              <h3 className="font-medium mb-2">Change Password</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Update your password to keep your account secure
              </p>
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/5"
              >
                Change Password
              </Button>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-medium mb-2">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data
              </p>
              <Button
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                Delete Account
              </Button>
            </GlassCard>
          </div>
        </motion.div>

        {/* Storage Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-4">Storage</h2>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground">Storage Usage</span>
              <span className="font-semibold">2.4 GB of 5 GB</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full"
                style={{ width: "48%" }}
              />
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Add Mail icon if not already imported
import { Mail } from "lucide-react";
