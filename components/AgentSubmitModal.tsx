'use client';

import React, { useState } from 'react';
import { WorkProposal, RiskLevel } from '@/types/proposal';
import { Bot, Send, X, AlertTriangle, FileCode, Clock, ShieldCheck, Calendar, Sparkles } from 'lucide-react';

interface AgentSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: WorkProposal;
  onSubmit: (updated: Partial<WorkProposal>) => void;
}

export function AgentSubmitModal({
  isOpen,
  onClose,
  proposal,
  onSubmit,
}: AgentSubmitModalProps) {
  const [approach, setApproach] = useState(proposal.approach);
  const [estimatedHours, setEstimatedHours] = useState(proposal.estimatedHours);
  const [storyPoints, setStoryPoints] = useState(proposal.storyPoints || 3);
  const [filesTouchedText, setFilesTouchedText] = useState(proposal.filesTouched.join(', '));
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(proposal.riskLevel);
  const [dependenciesText, setDependenciesText] = useState((proposal.dependencies || []).join(', '));
  const [proposedEta, setProposedEta] = useState(proposal.proposedEta || 'Today, 2:30 PM (approx 2.5 hours)');
  const [testStrategy, setTestStrategy] = useState(proposal.testStrategy);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const files = filesTouchedText
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const dependencies = dependenciesText
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    onSubmit({
      approach,
      estimatedHours: Number(estimatedHours),
      storyPoints: Number(storyPoints),
      filesTouched: files.length > 0 ? files : ['components/mobile-nav.tsx'],
      riskLevel,
      dependencies,
      proposedEta,
      testStrategy,
      status: 'pending',
      submittedAt: 'Just now',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-800 border border-teal-200/60">
              <Bot className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {proposal.status === 'changes_requested' ? 'Revise Agent Work Proposal' : 'Submit Agent Work Proposal'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Ticket: {proposal.issueKey} • Agent: {proposal.agentName} ({proposal.agentLevel})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {proposal.status === 'changes_requested' && proposal.reviewNotes && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-amber-900">Owner Feedback to Address:</strong>
                <p className="mt-0.5 text-amber-800">{proposal.reviewNotes}</p>
              </div>
            </div>
          )}

          {/* Technical Summary / Approach */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              Proposed Approach & Technical Summary
            </label>
            <textarea
              rows={4}
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
              required
              placeholder="Outline your planned implementation steps before modifying files..."
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600 font-mono leading-relaxed"
            />
          </div>

          {/* Grid: Hours, Story Points & Risk */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Effort (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="168"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(parseFloat(e.target.value) || 1)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                Story Points
              </label>
              <input
                type="number"
                min="1"
                max="13"
                value={storyPoints}
                onChange={(e) => setStoryPoints(parseInt(e.target.value) || 1)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Risk Level
              </label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
              >
                <option value="low">Low (Self-contained fix)</option>
                <option value="medium">Medium (Touches UI events)</option>
                <option value="high">High (Touches auth/database)</option>
              </select>
            </div>
          </div>

          {/* Files to Touch */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-slate-400" />
              Files or Areas of Codebase to Touch (comma separated)
            </label>
            <input
              type="text"
              value={filesTouchedText}
              onChange={(e) => setFilesTouchedText(e.target.value)}
              placeholder="components/mobile-nav.tsx, hooks/use-scroll-lock.ts"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 font-mono focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          </div>

          {/* Grid: Dependencies & Proposed ETA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                Dependencies & System Preconditions
              </label>
              <input
                type="text"
                value={dependenciesText}
                onChange={(e) => setDependenciesText(e.target.value)}
                placeholder="React 19 touch handlers, Tailwind"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Proposed ETA
              </label>
              <input
                type="text"
                value={proposedEta}
                onChange={(e) => setProposedEta(e.target.value)}
                placeholder="Today, 2:30 PM (approx 2.5 hours)"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Testing Strategy */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              Verification & Testing Strategy
            </label>
            <input
              type="text"
              value={testStrategy}
              onChange={(e) => setTestStrategy(e.target.value)}
              placeholder="e.g. Unit tests with jsdom touch events + WebKit emulation check"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-teal-700 px-5 text-xs font-medium text-white transition-colors hover:bg-teal-800 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              {proposal.status === 'changes_requested' ? 'Resubmit Proposal' : 'Submit Proposal for Sign-off'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
