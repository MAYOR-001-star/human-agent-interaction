'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  GitPullRequest, 
  Layers
} from 'lucide-react';

export function PitchDeckView() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      tag: 'The Status Quo Problem',
      title: 'The Challenge: Blind Agent Execution in Ziki',
      subtitle: 'Why the existing workflow creates wasted compute, burned tokens, and late reviews.',
      icon: AlertTriangle,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[10px] font-mono uppercase text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Back-loaded Loop
              </span>
              <h4 className="text-sm font-semibold text-slate-900">Late Discovery of Misaligned Work</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                An agent claims an issue from <code className="text-slate-800 font-mono bg-slate-200/60 px-1 py-0.5 rounded">GET /api/v1/feed</code> and starts writing code immediately. The human owner only discovers what was built after a PR is linked — after hours of compute and claim time have already passed.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[10px] font-mono uppercase text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Reactive Escalations
              </span>
              <h4 className="text-sm font-semibold text-slate-900">No Proactive Sign-off Gate</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Existing escalations (<code className="text-slate-800 font-mono bg-slate-200/60 px-1 py-0.5 rounded">lib/agent-questions.ts</code>) are reactive: they fire when an agent is already stuck. There is no structured checkpoint for the agent to say, <em>&ldquo;Here is my plan; do I have your go-ahead?&rdquo;</em>
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-3">
            <span className="font-bold text-rose-800 shrink-0">Core Takeaway:</span>
            <span>Humans are currently passive bystanders at task start rather than active partners.</span>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      tag: 'The Proposed Innovation',
      title: 'Agent Work Proposals: Plan First, Build Second',
      subtitle: 'A structured checkpoint layer between claiming an issue and starting implementation.',
      icon: ShieldCheck,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-teal-700 mb-1">1. Claim</div>
              <p className="text-xs text-slate-600">Agent claims issue; coding & PR permissions remain locked.</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-teal-800 mb-1">2. Propose</div>
              <p className="text-xs text-slate-600">Agent submits approach, files, hours, points, risk, and ETA.</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-teal-900 mb-1">3. Sign-off</div>
              <p className="text-xs text-slate-600">Human reviews & grants permission to link PR and write code.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center gap-3">
            <span className="font-bold text-teal-800 shrink-0">Tangible Benefit:</span>
            <span>Zero lines of code are written without explicit alignment on architecture and touched files.</span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      tag: 'Review Matrix',
      title: 'The 3 Human Review Pathways',
      subtitle: 'Giving the human owner clear, calibrated control over the agent’s direction.',
      icon: CheckCircle2,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-teal-50/70 border border-teal-200 space-y-2">
            <span className="inline-flex items-center rounded-full bg-teal-700 text-white px-2.5 py-0.5 text-[10px] font-bold">
              APPROVE
            </span>
            <h4 className="text-xs font-bold text-slate-900">Authorize Execution</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlocks GitHub PR linking and Vitest test verdict submissions. Sets ticket to in-progress.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <span className="inline-flex items-center rounded-full bg-amber-600 text-white px-2.5 py-0.5 text-[10px] font-bold">
              REQUEST CHANGES
            </span>
            <h4 className="text-xs font-bold text-slate-900">Revise & Resubmit</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides specific architectural feedback. Agent updates the proposal before coding begins.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
            <span className="inline-flex items-center rounded-full bg-rose-700 text-white px-2.5 py-0.5 text-[10px] font-bold">
              REJECT
            </span>
            <h4 className="text-xs font-bold text-slate-900">Release Claim</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Releases the claim back to the open pool for another worker. Zero implementation time wasted.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      tag: 'Security & Gating',
      title: 'Enforcement, RBAC & Audit Trail',
      subtitle: 'Guaranteed execution bounds backed by database constraints and immutable logs.',
      icon: GitPullRequest,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-semibold text-slate-900">Downstream Execution Gate</h5>
              <p className="text-slate-600 leading-relaxed">
                UI and server actions reject any PR linking or verdict submissions unless <code className="text-teal-700 font-mono">status == &apos;approved&apos;</code>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-semibold text-slate-900">Agent Level & Role Rules</h5>
              <p className="text-slate-600 leading-relaxed">
                Only agents at contributor level or above can submit; only the agent’s owner or tenant admin can approve.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-semibold text-slate-900">Immutable Activity Records</h5>
              <p className="text-slate-600 leading-relaxed">
                Every proposal submission, change request, and sign-off is recorded in Ziki’s core <code className="text-teal-700 font-mono">Activity</code> table.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-semibold text-slate-900">Auto-Escalation SLA</h5>
              <p className="text-slate-600 leading-relaxed">
                If unreviewed within N hours, automatically notifies the owner or escalates to a tenant admin.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      tag: 'Strategic Roadmap',
      title: 'The Full 4-Pillar Human-Agent Interaction Suite',
      subtitle: 'Shifting Ziki from &ldquo;delegate and hope&rdquo; into &ldquo;propose, review, then execute.&rdquo;',
      icon: Layers,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
              <span className="font-bold text-teal-800">#0 Proposals</span>
              <p className="text-[11px] text-slate-600 mt-1">Plan first, build second</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">#1 Journal</span>
              <p className="text-[11px] text-slate-600 mt-1">Status & heartbeat lease</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">#2 Pause/Resume</span>
              <p className="text-[11px] text-slate-600 mt-1">Safe claim freezing</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">#3 Question SLA</span>
              <p className="text-[11px] text-slate-600 mt-1">Blocker triage board</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <span className="text-slate-700">
              Transforming AI agents from independent black-boxes into trusted pair-programming partners.
            </span>
            <span className="font-mono text-teal-700 font-semibold">Deploy Ready ✓</span>
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
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <div className="flex gap-1.5 ml-2">
            {slides.map((s) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(s.id)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === s.id ? 'w-6 bg-teal-700' : 'w-2 bg-slate-200 hover:bg-slate-300'
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
            className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-full bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-800 font-semibold">
              {slide.tag}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {slide.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {slide.subtitle}
            </p>
          </div>

          <div className="pt-4">{slide.content}</div>
        </div>

        {/* Footer info */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Ziki • Team Zendor</span>
          <span>Use ◄ / ► buttons to navigate presentation</span>
        </div>
      </div>
    </div>
  );
}
