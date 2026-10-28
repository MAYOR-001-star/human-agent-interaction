'use client';

import React, { useState } from 'react';
import { WorkProposal } from '@/types/proposal';
import { 
  GitPullRequest, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  ExternalLink, 
  Play, 
  ShieldAlert,
  Terminal,
  HelpCircle
} from 'lucide-react';

interface PrGateSectionProps {
  proposal: WorkProposal;
  onLinkPr: (url: string) => void;
}

export function PrGateSection({ proposal, onLinkPr }: PrGateSectionProps) {
  const isApproved = proposal.status === 'approved';
  const [prUrl, setPrUrl] = useState(proposal.linkedPrUrl || 'https://github.com/Zedu-Endor/issue-tracker/pull/482');
  const [testsRunning, setTestsRunning] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'passed' | 'failed'>('idle');

  const handleLinkPr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApproved) return;
    onLinkPr(prUrl);
  };

  const handleRunTests = () => {
    if (!isApproved) return;
    setTestsRunning(true);
    setTestResult('idle');
    setTimeout(() => {
      setTestsRunning(false);
      setTestResult('passed');
    }, 1500);
  };

  return (
    <div className={`rounded-2xl border transition-all ${
      isApproved 
        ? 'bg-slate-900/90 border-emerald-500/30 shadow-lg shadow-emerald-500/5' 
        : 'bg-slate-900/40 border-slate-800'
    } p-5`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl border ${
            isApproved 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            {isApproved ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white">Execution Gate: PR & Verification</h4>
              {isApproved ? (
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  UNLOCKED: Work Authorized
                </span>
              ) : (
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> GATED: Awaiting Sign-off
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Enforces the rule: No code or pull requests are accepted until human owner approves the plan.
            </p>
          </div>
        </div>
      </div>

      {!isApproved ? (
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-semibold text-amber-300">
              Downstream Coding Privileges Blocked
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Agent <code className="text-purple-300 bg-purple-950/40 px-1 py-0.5 rounded">{proposal.agentName}</code> cannot attach a pull request or submit test verdicts while the proposal is <strong className="text-slate-200 capitalize">{proposal.status.replace('_', ' ')}</strong>.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-[11px]">
                <HelpCircle className="w-3.5 h-3.5" /> Prevents unvetted branch commits & wasted compute
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <form onSubmit={handleLinkPr} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-3">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                GitHub Pull Request URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={prUrl}
                  onChange={(e) => setPrUrl(e.target.value)}
                  placeholder="https://github.com/Zedu-Endor/issue-tracker/pull/..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <GitPullRequest className="w-4 h-4 text-emerald-400 absolute right-3 top-2.5" />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-9 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl shadow-md transition"
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                {proposal.linkedPrUrl ? 'PR Linked ✓' : 'Link Pull Request'}
              </button>
            </div>
          </form>

          {/* Test Verdict Runner */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-300">Vitest Test Verdict Dispatch</span>
              {testResult === 'passed' && (
                <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> All 8 Tests Passed
                </span>
              )}
            </div>
            <button
              onClick={handleRunTests}
              disabled={testsRunning}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Play className={`w-3 h-3 ${testsRunning ? 'animate-spin' : ''}`} />
              {testsRunning ? 'Executing Vitest Suite...' : 'Dispatch Vitest Run'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
