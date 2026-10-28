'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  GitPullRequest, 
  Layers, 
  TrendingUp,
  Sparkles,
  Zap,
  Users
} from 'lucide-react';

export function PitchDeckView() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      tag: 'The Challenge',
      title: 'The Problem: Blind Agent Execution',
      subtitle: 'Why the existing workflow creates wasted compute and frustrated engineers.',
      icon: AlertTriangle,
      color: 'amber',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">Today’s Flaw</span>
              <h4 className="text-sm font-semibold text-white">Late Discovery of Misunderstandings</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                An agent claims an issue and immediately begins writing code. The human owner only discovers what was built after a Pull Request is opened — usually hours later.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">The Cost</span>
              <h4 className="text-sm font-semibold text-white">Wasted Compute & Burned Tokens</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                If the agent took the wrong architectural direction or modified the wrong files, 100% of the compute, claim lease time, and reviewer attention is wasted.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-200 text-xs flex items-center gap-3">
            <span className="font-bold text-rose-400 shrink-0">Key Takeaway:</span>
            <span>Humans are currently passive bystanders rather than proactive supervisors.</span>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      tag: 'Core Innovation',
      title: 'Improvement 0: Agent Work Proposals',
      subtitle: 'Mandatory "Plan First, Build Second" protocol before touching code.',
      icon: ShieldCheck,
      color: 'emerald',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xl font-black text-emerald-400 mb-1">1. Claim</div>
              <p className="text-xs text-slate-400">Agent claims issue; downstream code permissions stay locked.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xl font-black text-sky-400 mb-1">2. Propose</div>
              <p className="text-xs text-slate-400">Agent submits structured plan: approach, files, hours, risk.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xl font-black text-purple-400 mb-1">3. Sign-off</div>
              <p className="text-xs text-slate-400">Human reviews & grants permission to link PR and write code.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 text-xs flex items-center gap-3">
            <span className="font-bold text-emerald-400 shrink-0">Tangible Benefit:</span>
            <span>Zero lines of code are written without explicit alignment on architecture and touched files.</span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      tag: 'Decision Matrix',
      title: 'The 3 Human Review Pathways',
      subtitle: 'Giving the human owner clear, calibrated control over the agent’s direction.',
      icon: CheckCircle2,
      color: 'sky',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-slate-950">
              APPROVE
            </span>
            <h4 className="text-xs font-bold text-white">Go Ahead with Plan</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlocks GitHub PR linking and Vitest test verdict submissions. Sets ticket to in-progress.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500 text-slate-950">
              REQUEST CHANGES
            </span>
            <h4 className="text-xs font-bold text-white">Revise Plan</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides specific architectural feedback. Agent must update the proposal before coding begins.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500 text-white">
              REJECT
            </span>
            <h4 className="text-xs font-bold text-white">Cancel & Re-Pool</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Releases the claim back to the open pool for another human or agent to attempt.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      tag: 'Security & Gating',
      title: 'Enforcement & Audit Trail',
      subtitle: 'Guaranteed execution bounds backed by database constraints and immutable logs.',
      icon: GitPullRequest,
      color: 'purple',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <h5 className="font-semibold text-slate-200">Enforced Execution Gate</h5>
              <p className="text-slate-400 leading-relaxed">
                UI and server actions reject any PR linking or verdict submissions unless <code className="text-emerald-400">status == &apos;approved&apos;</code>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <h5 className="font-semibold text-slate-200">Role-Based Access Control (RBAC)</h5>
              <p className="text-slate-400 leading-relaxed">
                Only the assigned agent can submit proposals; only the issue author or tenant super-admin can sign off.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <h5 className="font-semibold text-slate-200">Immutable Activity Records</h5>
              <p className="text-slate-400 leading-relaxed">
                Every proposal submission, change request, and sign-off is recorded in Ziki’s core <code className="text-sky-400">Activity</code> table.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <h5 className="font-semibold text-slate-200">Automated Vitest Coverage</h5>
              <p className="text-slate-400 leading-relaxed">
                Unit test matrix validates boundary values (0.5h - 168h), file array restrictions, and unauthorized approval blocks.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      tag: 'Strategic Roadmap',
      title: 'The Full 4-Pillar Suite',
      subtitle: 'A comprehensive human-agent operating system for high-velocity software teams.',
      icon: Layers,
      color: 'emerald',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <span className="font-bold text-emerald-400">#0 Proposals</span>
              <p className="text-[11px] text-slate-400 mt-1">Plan first, build second</p>
            </div>
            <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/30">
              <span className="font-bold text-sky-400">#1 Journal</span>
              <p className="text-[11px] text-slate-400 mt-1">Status & heartbeat lease</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30">
              <span className="font-bold text-purple-400">#2 Pause/Resume</span>
              <p className="text-[11px] text-slate-400 mt-1">Safe claim freezing</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <span className="font-bold text-amber-400">#3 Question SLA</span>
              <p className="text-[11px] text-slate-400 mt-1">Blocker triage board</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-300">
              Transforming AI agents from independent black-boxes into trusted pair-programming partners.
            </span>
            <span className="font-mono text-emerald-400 font-semibold">Deploy Ready ✓</span>
          </div>
        </div>
      ),
    },
  ];

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      {/* Slide Navigation Header */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <div className="flex gap-1.5 ml-2">
            {slides.map((s) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(s.id)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === s.id ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Jump to slide ${s.id + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-semibold transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              {slide.tag}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {slide.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {slide.subtitle}
            </p>
          </div>

          <div className="pt-4">{slide.content}</div>
        </div>

        {/* Footer info */}
        <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Ziki • Team Zendor</span>
          <span>Use ◄ / ► arrow buttons to navigate presentation</span>
        </div>
      </div>
    </div>
  );
}
