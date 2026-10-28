'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { UserRole } from '@/types/proposal';
import { 
  Bot, 
  UserCheck, 
  RotateCcw, 
  Layers, 
  Code2, 
  Presentation, 
  SlidersHorizontal,
  Bell,
  ChevronDown,
  Building2
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
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabClass = (active: boolean) =>
    `relative inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
      active
        ? 'bg-teal-50 text-teal-900 font-semibold'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto w-full max-w-6xl px-4 flex h-14 items-center justify-between gap-4">
        {/* Left: Brand Lockup & Workspace Indicator */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <Image
              src="/ziki-mark.svg"
              alt="Ziki Logo"
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                Ziki
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-800 border border-teal-200/60">
                Work Proposals Gate
              </span>
            </div>
          </div>

          {/* Workspace Switcher Pill (matches Ziki WorkspaceSwitcher) */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/70 px-2.5 py-1 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-800">Zedu / Endor</span>
          </div>
        </div>

        {/* Center: Main Navigation Tabs */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onTabChange('demo')}
            className={tabClass(activeTab === 'demo')}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
            <span className="inline-flex items-center justify-center rounded-full bg-amber-500 px-1.5 py-0.2 text-[10px] font-semibold leading-none text-white">
              P-0
            </span>
          </button>

          <button
            onClick={() => onTabChange('all-four')}
            className={tabClass(activeTab === 'all-four')}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4 Pillars Suite</span>
          </button>

          <button
            onClick={() => onTabChange('architecture')}
            className={tabClass(activeTab === 'architecture')}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Architecture & Schema</span>
          </button>

          <button
            onClick={() => onTabChange('deck')}
            className={tabClass(activeTab === 'deck')}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Pitch Deck</span>
          </button>
        </nav>

        {/* Right: Points Chip, Persona Switcher & Reset Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Ziki Points Chip */}
          <div
            title="1,420 points earned"
            className="hidden sm:inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-slate-700 shadow-2xs"
          >
            <span className="text-sm font-semibold tabular-nums text-slate-900">1,420</span>
            <span className="text-xs text-slate-500">pts</span>
            <span className="hidden h-1.5 w-8 overflow-hidden rounded-full bg-slate-200 sm:block" aria-hidden="true">
              <span className="block h-full rounded-full bg-teal-700" style={{ width: '72%' }} />
            </span>
          </div>

          {/* Role Switcher Dropdown (Persona Selector) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              {currentRole === 'owner' ? (
                <>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-teal-800 font-bold text-[10px]">
                    SJ
                  </span>
                  <span className="font-semibold text-slate-900">Owner (Sarah)</span>
                </>
              ) : (
                <>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
                    <Bot className="w-3 h-3" />
                  </span>
                  <span className="font-semibold text-purple-900">Agent (Sentinel)</span>
                </>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Perspective
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('owner');
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition ${
                    currentRole === 'owner' ? 'bg-teal-50 text-teal-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-teal-800 font-bold text-[10px]">
                    SJ
                  </span>
                  <div>
                    <div className="font-medium text-slate-900">Sarah Jenkins (Owner)</div>
                    <div className="text-[10px] text-slate-500">Reviews & signs off proposals</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('agent');
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition mt-1 ${
                    currentRole === 'agent' ? 'bg-purple-50 text-purple-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
                    <Bot className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <div className="font-medium text-slate-900">Sentinel-AI (Contributor)</div>
                    <div className="text-[10px] text-slate-500">Claims issue & proposes plan</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={onReset}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition shadow-2xs"
            title="Reset simulator state"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Nav row */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 gap-1 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={() => onTabChange('demo')}
          className={tabClass(activeTab === 'demo')}
        >
          Simulator
        </button>
        <button
          onClick={() => onTabChange('all-four')}
          className={tabClass(activeTab === 'all-four')}
        >
          4 Pillars
        </button>
        <button
          onClick={() => onTabChange('architecture')}
          className={tabClass(activeTab === 'architecture')}
        >
          Architecture
        </button>
        <button
          onClick={() => onTabChange('deck')}
          className={tabClass(activeTab === 'deck')}
        >
          Pitch Deck
        </button>
      </div>
    </header>
  );
}
