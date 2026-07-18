'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/authService';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authService.register({ email, password, username });
      router.push('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background flex-row-reverse">
      {/* Right side: Form (now on left visually because of flex-row-reverse, wait actually let's keep it consistent) */}
      {/* Let's put form on left for consistency with login */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[480px] xl:w-[560px] relative z-10 bg-background">
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-12">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">PromptVault</span>
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Create an account</h1>
              <p className="text-muted-foreground text-sm">
                Start building your personal prompt library today.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/90">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/90">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/90">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  className="text-destructive text-sm"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base mt-2"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2 opacity-70" />}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Already have an account?{' '}
              <Link href="/login" className="text-accent-blue hover:text-white transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Left side: Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center p-12 border-l border-white/5">
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-accent-purple/20 via-background to-accent-cyan/20 opacity-40" />
          <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-accent-purple/30 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-accent-cyan/20 rounded-full blur-[150px] mix-blend-screen" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center mb-6 border border-accent-purple/30">
              <Sparkles className="w-6 h-6 text-accent-purple" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              "The organization and quick access to my best prompts has doubled my daily output."
            </h2>
            <div className="flex items-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20" />
              <div>
                <div className="text-sm font-medium text-white">Michael Chang</div>
                <div className="text-xs text-white/50">Content Strategist</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
