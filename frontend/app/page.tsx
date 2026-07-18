'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Globe, Lock, BrainCircuit, Star, ChevronRight, CheckCircle2, MessageSquare, Code2, Copy, FileText, Check, Layers, Search, Heart, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';

// ---------------------------------------------------------
// Navigation Component
// ---------------------------------------------------------
const LandingNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            PromptVault
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#workflow" className="hover:text-white transition-colors">How it works</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 hidden sm:flex">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// ---------------------------------------------------------
// Hero Section
// ---------------------------------------------------------
const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center text-center px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-purple/20 blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent-blue/10 blur-[100px] opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-accent-blue" />
          <span className="text-sm font-medium text-white/90">The #1 Platform for AI Prompts</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          Manage your AI workspace <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
            with absolute clarity.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop losing your best prompts in chat histories. Save, organize, and reuse your most effective AI interactions in a secure, unified workspace built for professionals.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-accent-blue to-accent-purple text-white border-0 shadow-[0_0_30px_rgba(167,139,250,0.3)] hover:shadow-[0_0_40px_rgba(167,139,250,0.5)] hover:scale-105 transition-all">
              Start Building Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="#showcase">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white">
              View Product Tour
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm font-medium text-white/40">
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-blue" /> No credit card required</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-purple" /> Free forever plan</div>
        </div>
      </motion.div>
    </section>
  );
};

// ---------------------------------------------------------
// Interactive Showcase
// ---------------------------------------------------------
const Showcase = () => {
  return (
    <section id="showcase" className="py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-2 md:p-4 shadow-2xl shadow-accent-purple/10 overflow-hidden relative"
        >
          {/* Mock Browser Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="mx-auto bg-white/5 rounded-md px-24 py-1 text-xs text-white/40">app.promptvault.ai</div>
          </div>
          
          {/* Dashboard Mockup */}
          <div className="grid grid-cols-12 gap-4 h-[400px] md:h-[600px] px-2 pb-2">
            {/* Sidebar */}
            <div className="hidden md:block col-span-2 rounded-xl bg-white/5 border border-white/5 p-4 space-y-4">
              <div className="h-8 bg-white/10 rounded-lg w-full" />
              <div className="h-4 bg-white/5 rounded w-3/4 mt-8" />
              <div className="space-y-2">
                {[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-white/5 rounded-lg w-full" />)}
              </div>
            </div>
            {/* Main Content */}
            <div className="col-span-12 md:col-span-10 rounded-xl bg-white/5 border border-white/5 p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-6 bg-white/10 rounded w-48 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-64" />
                </div>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Globe className="w-5 h-5 text-muted-foreground hover:text-white transition-colors" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <MessageSquare className="w-5 h-5 text-muted-foreground hover:text-white transition-colors" />
                  </a>
                <div className="h-10 w-32 bg-accent-blue/80 rounded-lg" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3].map(i => <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/5" />)}
              </div>
              <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex gap-4">
                <div className="w-1/3 space-y-2">
                  {[1,2,3,4].map(i => <div key={i} className="h-16 bg-white/5 rounded-lg border border-white/5" />)}
                </div>
                <div className="w-2/3 bg-white/5 rounded-lg border border-white/5 p-4">
                  <div className="h-6 w-1/3 bg-white/10 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-5/6 bg-white/5 rounded" />
                    <div className="h-4 w-4/6 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------
// Core Features
// ---------------------------------------------------------
const Features = () => {
  const features = [
    {
      icon: <Layers className="w-6 h-6 text-accent-blue" />,
      title: 'Prompt Organization',
      description: 'Categorize your prompts with collections, tags, and folders. Never lose a valuable interaction again.'
    },
    {
      icon: <Search className="w-6 h-6 text-accent-purple" />,
      title: 'Lightning Fast Search',
      description: 'Find exactly what you need in milliseconds. Search by content, title, model, or tags across your entire workspace.'
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      title: 'Favorites & Quick Access',
      description: 'Pin your most used prompts for instant access. Build a personalized toolkit of your highest-performing queries.'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: 'One-Click Copy',
      description: 'No friction. Find your prompt, click once, and drop it directly into ChatGPT, Claude, or your tool of choice.'
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: 'Private & Secure',
      description: 'Your data is yours. Enterprise-grade encryption ensures your proprietary prompts remain completely confidential.'
    },
    {
      icon: <FolderOpen className="w-6 h-6 text-accent-cyan" />,
      title: 'Dynamic Collections',
      description: 'Group related prompts for specific projects, workflows, or clients. Keep your context completely separated.'
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to work <span className="text-accent-purple">smarter</span></h2>
          <p className="text-lg text-white/60">PromptVault is purposefully designed to remove friction from your AI workflows. Just the features you need, executed perfectly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard interactive variant="subtle" className="p-8 h-full flex flex-col group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/60 leading-relaxed flex-1">{f.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------
// Workflow Section
// ---------------------------------------------------------
const Workflow = () => {
  const steps = [
    { num: '01', title: 'Create & Refine', desc: 'Craft your perfect prompt in your preferred AI tool.' },
    { num: '02', title: 'Save to Vault', desc: 'Store it with context, variables, and performance notes.' },
    { num: '03', title: 'Organize', desc: 'Tag and sort into relevant project collections.' },
    { num: '04', title: 'Deploy Instantly', desc: 'Find and copy with one click when you need it again.' },
  ];

  return (
    <section id="workflow" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-accent-blue/10 blur-[150px] opacity-50 rounded-[100%]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold">The modern AI workflow</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
              )}
              <div className="text-6xl font-black text-white/5 mb-6">{step.num}</div>
              <h3 className="text-xl font-bold mb-3 text-white/90">{step.title}</h3>
              <p className="text-white/60">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------
// Final CTA & Footer
// ---------------------------------------------------------
const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <GlassCard className="relative overflow-hidden p-12 md:p-20 text-center border-accent-purple/30 bg-black/40">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 via-transparent to-accent-purple/10 pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to upgrade your workflow?</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
            Join thousands of professionals who have stopped losing their best prompts and started building a real AI knowledge base.
          </p>
          
          <Link href="/register">
            <Button size="lg" className="h-14 px-10 text-lg bg-white text-black hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Get Started for Free
            </Button>
          </Link>
        </GlassCard>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/50 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PromptVault</span>
          </div>
          <p className="text-white/50 max-w-sm mb-6">
            The professional workspace for saving, organizing, and deploying your most effective AI prompts.
          </p>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white rounded-full hover:bg-white/10"><Globe className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white rounded-full hover:bg-white/10"><Code2 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white rounded-full hover:bg-white/10"><MessageSquare className="w-4 h-4" /></Button>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-white/90">Product</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li><Link href="#" className="hover:text-accent-blue transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-accent-blue transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-accent-blue transition-colors">Integrations</Link></li>
            <li><Link href="#" className="hover:text-accent-blue transition-colors">Changelog</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-white/90">Legal</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li><Link href="#" className="hover:text-accent-blue transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-accent-blue transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-accent-blue transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-sm text-white/30">
        &copy; {new Date().getFullYear()} PromptVault AI. All rights reserved.
      </div>
    </footer>
  );
};

// ---------------------------------------------------------
// Main Page
// ---------------------------------------------------------
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-foreground selection:bg-accent-purple/30 selection:text-white font-sans">
      <LandingNav />
      <Hero />
      <Showcase />
      <Features />
      <Workflow />
      <CTA />
      <Footer />
    </main>
  );
}
