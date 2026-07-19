"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROMPT_CATEGORIES, AI_MODELS } from "@/lib/constants";
import {
  useCreatePrompt,
  useUpdatePrompt,
  CreatePromptData,
  Prompt,
} from "@/lib/hooks/usePrompts";
import { useCollections } from "@/lib/hooks/useCollections";

interface CreatePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptToEdit?: Prompt | null;
}

export const CreatePromptModal = ({
  isOpen,
  onClose,
  promptToEdit,
}: CreatePromptModalProps) => {
  const [formData, setFormData] = useState<CreatePromptData>({
    title: promptToEdit?.title || "",
    content: promptToEdit?.content || "",
    description: promptToEdit?.description || "",
    category_id: promptToEdit?.category?.id || "",
    collection_id: "", // Add collection logic if exists on prompt
    ai_model: promptToEdit?.ai_model || "",
    is_favorite: false, // Update if prompt has favorite flag
  });

  // Effect to reset form when promptToEdit changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        title: promptToEdit?.title || "",
        content: promptToEdit?.content || "",
        description: promptToEdit?.description || "",
        category_id: promptToEdit?.category?.id || "",
        collection_id: "",
        ai_model: promptToEdit?.ai_model || "",
        is_favorite: false,
      });
    }
  }, [isOpen, promptToEdit]);

  const { data: collections = [] } = useCollections();
  const createPrompt = useCreatePrompt();
  const updatePrompt = useUpdatePrompt();
  const isEditMode = !!promptToEdit;

  const isPending = createPrompt.isPending || updatePrompt.isPending;
  const isError = createPrompt.isError || updatePrompt.isError;

  const handleClose = () => {
    // Optional: add a confirmation if there's unsaved content
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const onSuccess = () => {
      onClose();
    };

    const onError = (err: any) => {
      console.error("Failed to save prompt", err);
    };

    if (isEditMode && promptToEdit) {
      updatePrompt.mutate(
        { id: promptToEdit.id, data: formData },
        { onSuccess, onError },
      );
    } else {
      createPrompt.mutate(formData, { onSuccess, onError });
    }
  };

  const isFormValid =
    formData.title.trim() !== "" && formData.content.trim() !== "";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? "Edit Prompt" : "Create New Prompt"}
      className="sm:max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-medium text-white/90">
            Title <span className="text-red-400">*</span>
          </label>
          <Input
            id="title"
            name="title"
            placeholder="E.g., SEO Blog Post Generator"
            value={formData.title}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <label
            htmlFor="content"
            className="text-sm font-medium text-white/90"
          >
            Prompt Content <span className="text-red-400">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            rows={5}
            placeholder="Act as an expert SEO copywriter..."
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full min-w-0 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-base transition-all duration-300 outline-none placeholder:text-muted-foreground focus-visible:border-accent-blue/50 focus-visible:bg-black/40 focus-visible:ring-4 focus-visible:ring-accent-blue/20 md:text-sm custom-scrollbar"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-white/90"
          >
            Description{" "}
            <span className="text-white/40 text-xs font-normal">
              (Optional)
            </span>
          </label>
          <Input
            id="description"
            name="description"
            placeholder="Brief explanation of what this prompt does"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Two Column Layout for Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category */}
          <div className="space-y-1">
            <label
              htmlFor="category_id"
              className="text-sm font-medium text-white/90"
            >
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-3 py-2 h-10 rounded-lg bg-black/20 border border-white/10 text-foreground text-sm focus:border-accent-blue/50 focus:ring-4 focus:ring-accent-blue/20 outline-none transition-all"
            >
              <option value="">Select a category</option>
              {PROMPT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div className="space-y-1">
            <label
              htmlFor="ai_model"
              className="text-sm font-medium text-white/90"
            >
              Target AI Model
            </label>
            <select
              id="ai_model"
              name="ai_model"
              value={formData.ai_model}
              onChange={handleChange}
              className="w-full px-3 py-2 h-10 rounded-lg bg-black/20 border border-white/10 text-foreground text-sm focus:border-accent-blue/50 focus:ring-4 focus:ring-accent-blue/20 outline-none transition-all"
            >
              <option value="">Select AI Model</option>
              {AI_MODELS.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Collection */}
        <div className="space-y-1">
          <label
            htmlFor="collection_id"
            className="text-sm font-medium text-white/90"
          >
            Add to Collection
          </label>
          <select
            id="collection_id"
            name="collection_id"
            value={formData.collection_id}
            onChange={handleChange}
            className="w-full px-3 py-2 h-10 rounded-lg bg-black/20 border border-white/10 text-foreground text-sm focus:border-accent-blue/50 focus:ring-4 focus:ring-accent-blue/20 outline-none transition-all"
          >
            <option value="">No Collection (Standalone)</option>
            {collections.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>
        </div>

        {/* Favorite Toggle */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="is_favorite"
            name="is_favorite"
            checked={formData.is_favorite}
            onChange={handleChange}
            className="w-4 h-4 rounded border-white/10 bg-black/20 text-accent-blue focus:ring-accent-blue/50 focus:ring-offset-background"
          />
          <label
            htmlFor="is_favorite"
            className="text-sm font-medium text-white/80 cursor-pointer select-none"
          >
            Mark as Favorite
          </label>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="text-white/70 hover:text-white hover:bg-white/10"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-accent-blue text-white hover:bg-accent-blue/90"
            disabled={!isFormValid || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Create Prompt"
            )}
          </Button>
        </div>

        {/* Error message */}
        {isError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-red-400 text-sm mt-2"
          >
            Something went wrong. Please try again.
          </motion.p>
        )}
      </form>
    </Modal>
  );
};
