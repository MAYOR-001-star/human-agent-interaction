'use client';

import React, { useState } from 'react';
import { WorkProposal } from '@/types/proposal';
import { 
  GitPullRequest, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Play, 
  AlertCircle,
  Terminal,
  ShieldAlert
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
    }, 1200);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Execution Gate: Pull Request & Verification
            </h3>
            {isApproved ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
                <Unlock className="w-3 h-3 text-teal-600" /> Authorized
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                <Lock className="w-3 h-3 text-amber-600" /> Gated by Proposal Sign-off
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Enforces the rule: No code or PR can be attached until the human owner signs off on the proposal.
          </p>
        </div>
      </div>

      {!isApproved ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-amber-900">
              Downstream Coding Privileges Blocked
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Agent <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-900">{proposal.agentName}</code> cannot link a GitHub pull request or submit test verdicts while the work proposal is <strong className="capitalize">{proposal.status.replace('_', ' ')}</strong>.
            </p>
            <p className="text-[11px] text-amber-700 pt-1">
              • Prevents misaligned branch commits and burned compute tokens before plan alignment.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <form onSubmit={handleLinkPr} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="url"
                value={prUrl}
                onChange={(e) => setPrUrl(e.target.value)}
                placeholder="https://github.com/Zedu-Endor/issue-tracker/pull/..."
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 font-mono focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
              <GitPullRequest className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>

            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-teal-700 px-4 text-xs font-medium text-white transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 shrink-0"
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              {proposal.linkedPrUrl ? 'PR Linked ✓' : 'Link Pull Request'}
            </button>
          </form>

          {proposal.linkedPrUrl && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                Pull Request <a href={proposal.linkedPrUrl} target="_blank" rel="noreferrer" className="font-mono underline font-medium">{proposal.linkedPrUrl}</a> attached successfully.
              </span>
            </div>
          )}

          {/* Test Verdict Runner */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium text-slate-700">Vitest Test Verdict Dispatch</span>
              {testResult === 'passed' && (
                <span className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-800">
                  <CheckCircle2 className="w-3 h-3 text-teal-600" /> 8/8 Tests Passed
                </span>
              )}
            </div>

            <button
              onClick={handleRunTests}
              disabled={testsRunning}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <Play className={`w-3 h-3 ${testsRunning ? 'animate-spin text-teal-600' : 'text-slate-500'}`} />
              {testsRunning ? 'Running Vitest Suite...' : 'Dispatch Vitest Run'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
