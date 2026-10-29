'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { UserRole } from '@/types/proposal';
import {
  Bot,
  RotateCcw,
  Layers,
  Code2,
  Presentation,
  SlidersHorizontal,
  ChevronDown,
  Building2,
  MoreHorizontal,
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: 'demo' | 'all-four' | 'architecture' | 'deck';
  onTabChange: (tab: 'demo' | 'all-four' | 'architecture' | 'deck') => void;
  onReset: () => void;
}

// Nav tabs grouped by product vs. demo/pitch chrome.
// Product-critical tabs stay in the main line; demo/pitch tabs overflow into "More".
const NAV_ITEMS: {
  key: 'demo' | 'all-four' | 'architecture' | 'deck';
  label: string;
  icon: React.ElementType;
  group: 'product' | 'demo';
}[] = [
  { key: 'demo', label: 'Simulator', icon: SlidersHorizontal, group: 'demo' },
  { key: 'all-four', label: '4 Pillars', icon: Layers, group: 'demo' },
  { key: 'architecture', label: 'Architecture', icon: Code2, group: 'product' },
  { key: 'deck', label: 'Pitch Deck', icon: Presentation, group: 'demo' },
];

export function Navbar({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onReset,
}: NavbarProps) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Tabs that have overflowed into the "More" dropdown.
  const [overflowKeys, setOverflowKeys] = useState<Set<string>>(new Set());
  const [moreOpen, setMoreOpen] = useState(false);

  // Close role dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close "More" dropdown on outside click
  useEffect(() => {
    function handleMoreClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMoreClickOutside);
    return () => document.removeEventListener('mousedown', handleMoreClickOutside);
  }, []);

  // Recalculate which tabs overflow into "More" on resize.
  // Product-critical tabs and the active tab always stay visible.
  const recalculate = useCallback(() => {
    const container = navRef.current;
    if (!container) return;
    const containerWidth = container.getBoundingClientRect().width;
    let used = 0;
    const next: Set<string> = new Set();

    NAV_ITEMS.forEach((item) => {
      const el = container.querySelector(`[data-nav-key="${item.key}"]`);
      if (!el) return;
      const width = el.getBoundingClientRect().width + 6; // include gap
      const isActive = activeTab === item.key;
      const isProduct = item.group === 'product';
      const fits = used + width <= containerWidth || isActive || isProduct;
      if (!fits) {
        next.add(item.key);
      } else {
        used += width;
      }
    });

    setOverflowKeys(next);
  }, [activeTab]);

  useEffect(() => {
    const container = navRef.current;
    if (!container) return;
    const ro = new ResizeObserver(recalculate);
    ro.observe(container);
    requestAnimationFrame(recalculate);
    return () => ro.disconnect();
  }, [recalculate]);

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
                Owner Sign-Off Gate
              </span>
            </div>
          </div>

          {/* Workspace Switcher Pill (matches Ziki WorkspaceSwitcher) */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/70 px-2.5 py-1 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-800">Endor</span>
          </div>
        </div>

        {/* Center: Main Navigation Tabs (single-line, fixed height; overflow → "More") */}
        <nav
          aria-label="Main"
          ref={navRef}
          className="hidden md:flex items-center gap-1 whitespace-nowrap overflow-hidden"
        >
          {NAV_ITEMS.filter((item) => !overflowKeys.has(item.key)).map((item) => {
            const Icon = item.icon;
            const isDemoChip = item.key === 'demo';
            return (
              <button
                key={item.key}
                data-nav-key={item.key}
                onClick={() => onTabChange(item.key)}
                className={tabClass(activeTab === item.key)}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{item.label}</span>
                {isDemoChip && (
                  <span className="inline-flex items-center justify-center rounded-full bg-amber-500 px-1.5 py-0.2 text-[10px] font-semibold leading-none text-white">
                    P-0
                  </span>
                )}
              </button>
            );
          })}

          {overflowKeys.size > 0 && (
            <div className="relative group" data-nav-key="more">
              <button
                onClick={() => setMoreOpen((prev) => !prev)}
                className={tabClass(false)}
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">More</span>
              </button>
              {moreOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-lg z-50 animate-in fade-in zoom-in duration-150"
                >
                  {NAV_ITEMS.filter((item) => overflowKeys.has(item.key)).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        data-nav-key={item.key}
                        onClick={() => {
                          onTabChange(item.key);
                          setMoreOpen(false);
                        }}
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                      >
                        <Icon className="w-4 h-4 text-slate-500" />
                        <span className="whitespace-nowrap text-slate-900">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right: Demo Toolbar (gray, smaller) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Ziki Points Chip (gray, smaller) */}
          <div
            title="1,420 pts earned"
            className="hidden sm:inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 text-slate-500 shadow-xs"
          >
            <span className="text-xs font-semibold tabular-nums text-slate-700">1,420</span>
            <span className="text-[10px] text-slate-400">pts</span>
            <span className="hidden h-[1px] w-6 overflow-hidden rounded-full bg-slate-200 sm:block" aria-hidden="true">
              <span className="block h-full rounded-full bg-slate-400" style={{ width: '72%' }} />
            </span>
          </div>

          {/* Role Switcher Dropdown (single perspective label) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 text-[10px] font-medium text-slate-600 hover:bg-slate-50 shadow-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              {currentRole === 'owner' ? (
                <>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-100 text-teal-800 font-bold text-[9px]">
                    SJ
                  </span>
                  <span className="font-semibold text-slate-800 truncate whitespace-nowrap">Owner · Sarah Jenkins</span>
                </>
              ) : (
                <>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold text-[9px]">
                    <Bot className="w-2.5 h-2.5" />
                  </span>
                  <span className="font-semibold text-slate-800 truncate whitespace-nowrap">Agent · Sentinel-AI</span>
                </>
              )}
              <ChevronDown className="w-3 h-3 text-slate-400" />
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
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition shadow-xs"
            title="Reset simulator state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
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
