'use client';

import React from 'react';
import { UserRole } from '@/types/proposal';
import { 
  Bot, 
  UserCheck, 
  RotateCcw, 
  Layers, 
  Code2, 
  Presentation, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: 'demo' | 'all-four' | 'architecture' | 'deck';
  onTabChange: (tab: 'demo' | 'all-four' | 'architecture' | 'deck') => void;
  onReset: () => void;
}

export function Navbar({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onReset,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Subtitle */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 shadow-md shadow-emerald-500/20">
              Z
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-lg text-white">Ziki</span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                  Protocol Suite
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Improvement 0: Agent Work Proposals
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onTabChange('demo')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'demo'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Live Interactive Demo
            </button>

            <button
              onClick={() => onTabChange('all-four')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'all-four'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              The 4 Improvements
            </button>

            <button
              onClick={() => onTabChange('architecture')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'architecture'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Architecture & Schema
            </button>

            <button
              onClick={() => onTabChange('deck')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'deck'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              Pitch Deck
            </button>
          </nav>

          {/* Right Controls: Role Switcher & Reset */}
          <div className="flex items-center gap-3">
            {/* Persona Switcher Pill */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 px-2 font-mono hidden xl:inline">
                Viewing As:
              </span>
              <button
                onClick={() => onRoleChange('owner')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  currentRole === 'owner'
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Review proposals, approve, request changes, or reject"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Owner (Sarah)</span>
              </button>
              <button
                onClick={() => onRoleChange('agent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  currentRole === 'agent'
                    ? 'bg-purple-500 text-white shadow-sm shadow-purple-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Claim tickets, submit work proposals, link PRs"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Agent (Sentinel)</span>
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
              title="Reset simulator to default state"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-800">
          <button
            onClick={() => onTabChange('demo')}
            className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
              activeTab === 'demo' ? 'bg-emerald-500 text-slate-950 font-semibold' : 'text-slate-400'
            }`}
          >
            Live Demo
          </button>
          <button
            onClick={() => onTabChange('all-four')}
            className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
              activeTab === 'all-four' ? 'bg-emerald-500 text-slate-950 font-semibold' : 'text-slate-400'
            }`}
          >
            4 Improvements
          </button>
          <button
            onClick={() => onTabChange('architecture')}
            className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
              activeTab === 'architecture' ? 'bg-emerald-500 text-slate-950 font-semibold' : 'text-slate-400'
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => onTabChange('deck')}
            className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${
              activeTab === 'deck' ? 'bg-emerald-500 text-slate-950 font-semibold' : 'text-slate-400'
            }`}
          >
            Pitch Deck
          </button>
        </div>
      </div>
    </header>
  );
}
