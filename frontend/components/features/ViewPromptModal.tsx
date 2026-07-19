"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, TerminalSquare } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/lib/hooks/usePrompts";

interface ViewPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: Prompt | null;
}

export const ViewPromptModal = ({
  isOpen,
  onClose,
  prompt,
}: ViewPromptModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!prompt) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <TerminalSquare className="w-5 h-5 text-accent-blue" />
          <span>Prompt Details</span>
        </div>
      }
      className="sm:max-w-2xl"
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{prompt.title}</h2>
          {prompt.description && (
            <p className="text-muted-foreground">{prompt.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {prompt.category && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/90 border border-white/20">
                {prompt.category.name}
              </span>
            )}
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
              {prompt.ai_model}
            </span>
          </div>
        </div>

        {/* Content Box */}
        <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/40">
          {/* Header of Content Box */}
          <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/10">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Content
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-3 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    <span>Copy</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>

          {/* Actual Content */}
          <div className="p-4 overflow-y-auto max-h-[40vh] custom-scrollbar">
            <pre className="text-sm text-white/90 whitespace-pre-wrap font-sans leading-relaxed">
              {prompt.content}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex justify-end">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
