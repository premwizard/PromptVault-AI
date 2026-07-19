import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const metadata = {
  title: "Collections - PromptVault AI",
  description: "Manage your collections",
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto ml-4 mt-4 rounded-2xl glass-card-subtle backdrop-blur-xl">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
