'use client';

import React, { useState } from 'react';
import { WorkProposal, RiskLevel } from '@/types/proposal';
import { Bot, Send, X, AlertTriangle, FileCode, Clock, ShieldCheck } from 'lucide-react';

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
  const [filesTouchedText, setFilesTouchedText] = useState(proposal.filesTouched.join(', '));
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(proposal.riskLevel);
  const [testStrategy, setTestStrategy] = useState(proposal.testStrategy);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const files = filesTouchedText
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    onSubmit({
      approach,
      estimatedHours: Number(estimatedHours),
      filesTouched: files.length > 0 ? files : ['components/mobile-nav.tsx'],
      riskLevel,
      testStrategy,
      status: 'pending',
      submittedAt: 'Just now',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {proposal.status === 'changes_requested' ? 'Revise Work Proposal' : 'Submit Agent Work Proposal'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Ticket: {proposal.issueKey} • Agent: {proposal.agentName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {proposal.status === 'changes_requested' && proposal.reviewNotes && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-amber-300">Owner Feedback to Address:</strong>
                <p className="mt-0.5 text-slate-300">{proposal.reviewNotes}</p>
              </div>
            </div>
          )}

          {/* Approach */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Technical Approach & Architecture Plan
            </label>
            <textarea
              rows={4}
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
              required
              placeholder="Detail your step-by-step implementation strategy before touching any code..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-xs leading-relaxed"
            />
          </div>

          {/* Grid: Hours & Risk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Estimated Effort (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="168"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(parseFloat(e.target.value) || 1)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Risk Assessment Level
              </label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="low">Low Risk (Self-contained fix)</option>
                <option value="medium">Medium Risk (Touches UI/Events)</option>
                <option value="high">High Risk (Touches Core Schema / Auth)</option>
              </select>
            </div>
          </div>

          {/* Files Touched */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-slate-400" />
              Files Intended to Touch (comma separated)
            </label>
            <input
              type="text"
              value={filesTouchedText}
              onChange={(e) => setFilesTouchedText(e.target.value)}
              placeholder="components/mobile-nav.tsx, hooks/use-scroll-lock.ts"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Testing Strategy */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Verification & Testing Strategy
            </label>
            <input
              type="text"
              value={testStrategy}
              onChange={(e) => setTestStrategy(e.target.value)}
              placeholder="e.g. Vitest DOM tests + manual WebKit emulation check"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 transition"
            >
              <Send className="w-3.5 h-3.5" />
              {proposal.status === 'changes_requested' ? 'Resubmit Proposal' : 'Submit Proposal for Sign-Off'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
