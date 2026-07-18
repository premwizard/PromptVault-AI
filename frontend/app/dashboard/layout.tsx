import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

export const metadata = {
  title: 'Dashboard - PromptVault AI',
  description: 'Manage your prompts and collections',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto ml-4 mt-4 rounded-2xl glass-card-subtle backdrop-blur-xl">
        {children}
      </main>
    </div>
  );
}
