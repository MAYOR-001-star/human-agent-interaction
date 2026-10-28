'use client';

import React, { useState } from 'react';
import { IssueClaim, WorkProposal, AuditEvent, UserRole } from '@/types/proposal';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileCode, 
  ShieldCheck, 
  UserCheck, 
  Bot, 
  GitPullRequest, 
  Lock, 
  Unlock, 
  FileEdit,
  ArrowRight,
  Info,
  Calendar,
  Sparkles,
  Building2,
  Check,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AgentSubmitModal } from './AgentSubmitModal';
import { OwnerReviewModal } from './OwnerReviewModal';
import { PrGateSection } from './PrGateSection';
import { AuditLogTimeline } from './AuditLogTimeline';

interface ProposalDemoProps {
  currentRole: UserRole;
  claim: IssueClaim;
  proposal: WorkProposal;
  auditLogs: AuditEvent[];
  onUpdateProposal: (updated: Partial<WorkProposal>) => void;
  onAddAuditLog: (log: Omit<AuditEvent, 'id'>) => void;
  onReset: () => void;
}

export function ProposalDemo({
  currentRole,
  claim,
  proposal,
  auditLogs,
  onUpdateProposal,
  onAddAuditLog,
  onReset,
}: ProposalDemoProps) {
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [ownerModalAction, setOwnerModalAction] = useState<'request_changes' | 'reject'>('request_changes');

  // Owner Approve Action
  const handleApprove = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#059669', '#14b8a6'],
    });

    onUpdateProposal({
      status: 'approved',
      reviewedAt: 'Just now',
      reviewedBy: 'Sarah Jenkins (Owner)',
      reviewNotes: 'Plan approved. Touch-action encapsulation protects global modals. You may begin coding and attach PR.',
    });

    onAddAuditLog({
      timestamp: 'Just now',
      actor: 'Sarah Jenkins (Owner)',
      actorType: 'human',
      action: 'Approved Work Proposal',
      details: 'Work proposal #prp_2026_094 signed off. PR attachment and test verdicts unlocked on ENDOR-104.',
      badgeColor: 'teal',
    });
  };

  // Owner Review Decision (Request Changes or Reject)
  const handleOwnerDecision = (decision: 'request_changes' | 'reject', notes: string) => {
    if (decision === 'request_changes') {
      onUpdateProposal({
        status: 'changes_requested',
        reviewedAt: 'Just now',
        reviewedBy: 'Sarah Jenkins (Owner)',
        reviewNotes: notes,
      });
      onAddAuditLog({
        timestamp: 'Just now',
        actor: 'Sarah Jenkins (Owner)',
        actorType: 'human',
        action: 'Requested Changes',
        details: `Requested revisions on proposal: "${notes}"`,
        badgeColor: 'amber',
      });
    } else {
      onUpdateProposal({
        status: 'rejected',
        reviewedAt: 'Just now',
        reviewedBy: 'Sarah Jenkins (Owner)',
        reviewNotes: notes,
      });
      onAddAuditLog({
        timestamp: 'Just now',
        actor: 'Sarah Jenkins (Owner)',
        actorType: 'human',
        action: 'Rejected Proposal',
        details: `Proposal rejected. Issue claim released back to the pool with zero wasted implementation hours. Reason: "${notes}"`,
        badgeColor: 'rose',
      });
    }
  };

  // Agent Submit / Revise
  const handleAgentSubmit = (updatedFields: Partial<WorkProposal>) => {
    const isRevision = proposal.status === 'changes_requested';
    onUpdateProposal({
      ...updatedFields,
      status: 'pending',
      reviewNotes: undefined,
      reviewedAt: undefined,
    });

    onAddAuditLog({
      timestamp: 'Just now',
      actor: 'Sentinel-AI v2.4',
      actorType: 'agent',
      action: isRevision ? 'Submitted Revised Proposal' : 'Submitted Proposal',
      details: isRevision
        ? 'Updated technical proposal addressing owner feedback. Re-submitted for sign-off.'
        : 'Submitted new work proposal tied to IssueClaim #clm_98412_alpha.',
      badgeColor: 'teal',
    });
  };

  // Link PR handler
  const handleLinkPr = (prUrl: string) => {
    onUpdateProposal({ linkedPrUrl: prUrl });
    onAddAuditLog({
      timestamp: 'Just now',
      actor: 'Sentinel-AI v2.4',
      actorType: 'agent',
      action: 'Linked Pull Request',
      details: `Attached PR: ${prUrl} (Authorized by owner sign-off).`,
      badgeColor: 'emerald',
    });
  };

  // Status Badge UI
  const getStatusBadge = () => {
    switch (proposal.status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            Approved • Work Authorized
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/70 px-3 py-1 text-xs font-semibold text-amber-900">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Changes Requested • Revision Needed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-800">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Rejected • Claim Released to Pool
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            Pending Owner Sign-off
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb row & Quick Issue Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <span className="hover:underline cursor-pointer text-teal-700 font-medium">Issues</span>
          <span>/</span>
          <span className="font-mono font-semibold text-slate-800">{claim.issueKey}</span>
          <span>/</span>
          <span className="text-slate-500">Work Proposal #{proposal.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-[11px]">Current Simulator Perspective:</span>
          {currentRole === 'owner' ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-semibold text-teal-900">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
              Sarah Jenkins (Human Owner)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-xs font-semibold text-purple-900">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
              Sentinel-AI (Agent Worker)
            </span>
          )}
        </div>
      </div>

      {/* Hero Overview Banner (The Problem & The Proposal) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800 border border-teal-200">
                Core Improvement
              </span>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Agent Work Proposals with Human Sign-off Gates
              </h1>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>The Problem:</strong> Today, the human–agent loop in Ziki is transactional and back-loaded: an agent polls the feed (<code className="text-slate-800 font-mono bg-slate-100 px-1 py-0.5 rounded">GET /api/v1/feed</code>), claims an issue, and codes immediately. The human owner only sees what was built at the very end when points are paid. Reactive escalations (<code className="text-slate-800 font-mono bg-slate-100 px-1 py-0.5 rounded">lib/agent-questions.ts</code>) only fire when something is already broken.
            </p>

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>The Proposal:</strong> Introduce a mandatory sign-off gate between claim and coding. The agent submits a structured plan (approach, effort, touched files, risk, ETA), and the human reviews to <strong>Approve</strong>, <strong>Request Changes</strong>, or <strong>Reject</strong> before a single line of code or PR is accepted.
            </p>
          </div>

          <div className="lg:w-72 shrink-0 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <h4 className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              RBAC & Level Enforced
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              In accordance with <code className="text-slate-800 font-mono">lib/agents/levels.ts</code>, only agents at <strong>contributor</strong> level or above can propose work, and only the issue owner or tenant admin can sign off.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Step Process Pipeline */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Step 1 */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px]">
              ✓
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-mono uppercase">Step 1</p>
              <p className="font-semibold text-slate-800">Issue Claimed</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px]">
              ✓
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-mono uppercase">Step 2</p>
              <p className="font-semibold text-slate-800">Plan Proposed</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${
            proposal.status === 'approved'
              ? 'bg-teal-50 border-teal-200 text-teal-900'
              : proposal.status === 'changes_requested'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : proposal.status === 'rejected'
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : 'bg-amber-50/60 border-amber-200/80 text-amber-900'
          }`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
              proposal.status === 'approved' ? 'bg-teal-700 text-white' : 'bg-white border border-slate-300 text-slate-700'
            }`}>
              {proposal.status === 'approved' ? '✓' : '3'}
            </div>
            <div>
              <p className="text-[10px] opacity-75 font-mono uppercase">Step 3</p>
              <p className="font-semibold capitalize">Owner Sign-off ({proposal.status.replace('_', ' ')})</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className={`flex items-center gap-2.5 p-2 rounded-lg border ${
            proposal.status === 'approved'
              ? 'bg-slate-50 border-teal-200 text-teal-900'
              : 'bg-slate-50/40 border-slate-200/50 text-slate-400'
          }`}>
            <div className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-[10px]">
              {proposal.status === 'approved' ? <Unlock className="w-3 h-3 text-teal-700" /> : <Lock className="w-3 h-3 text-slate-400" />}
            </div>
            <div>
              <p className="text-[10px] opacity-75 font-mono uppercase">Step 4</p>
              <p className="font-semibold">Code & PR Gate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Issue Meta & Review Actions), Right Column (Proposal & Gate) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Issue Context & Decision Controls */}
        <div className="space-y-6 lg:col-span-1">
          {/* Issue Meta Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {claim.issueKey}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Priority: {claim.priority}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                {claim.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {claim.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Assigned Agent:</span>
                <span className="text-slate-900 font-mono font-medium flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-purple-600" /> {claim.agentName}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Agent Level:</span>
                <span className="text-slate-800 font-medium">{claim.agentLevel}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Issue Owner:</span>
                <span className="text-slate-900 font-medium">{claim.ownerName}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Claim Lease:</span>
                <span className="text-slate-800 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-teal-600" /> {claim.expiresInMinutes}m remaining
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Sign-off Controls Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sign-off Action Controls
              </h4>
              {getStatusBadge()}
            </div>

            {currentRole === 'owner' ? (
              /* Review Actions for Human Owner */
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200 text-xs text-teal-900">
                  <p className="font-semibold flex items-center gap-1.5 text-teal-900">
                    <UserCheck className="w-4 h-4 text-teal-700" /> Acting as Human Owner
                  </p>
                  <p className="text-[11px] text-teal-800 mt-0.5">
                    Review Sentinel-AI’s proposed approach. Authorize work, ask for amendments, or reject the plan to free the issue for others.
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={handleApprove}
                    disabled={proposal.status === 'approved'}
                    className={`w-full h-10 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs ${
                      proposal.status === 'approved'
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        : 'bg-teal-700 hover:bg-teal-800 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {proposal.status === 'approved' ? 'Plan Approved ✓' : 'Approve Plan (Go Ahead)'}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setOwnerModalAction('request_changes');
                        setIsOwnerModalOpen(true);
                      }}
                      className="h-9 px-3 rounded-full text-xs font-medium border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 transition flex items-center justify-center gap-1.5"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      Request Changes
                    </button>

                    <button
                      onClick={() => {
                        setOwnerModalAction('reject');
                        setIsOwnerModalOpen(true);
                      }}
                      className="h-9 px-3 rounded-full text-xs font-medium border border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100 transition flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-700" />
                      Reject & Release
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Auto-escalates to tenant admin if unreviewed in 4h</span>
                </div>
              </div>
            ) : (
              /* Agent Actions */
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900">
                  <p className="font-semibold flex items-center gap-1.5 text-purple-900">
                    <Bot className="w-4 h-4 text-purple-700" /> Acting as Sentinel-AI (Agent)
                  </p>
                  <p className="text-[11px] text-purple-800 mt-0.5">
                    {proposal.status === 'approved'
                      ? 'Plan signed off! You now have permission to write code, attach PR, and run test verdicts.'
                      : proposal.status === 'changes_requested'
                      ? 'Sarah Jenkins requested changes. Update your plan below to proceed.'
                      : 'Proposal is awaiting human review. You may modify the plan before sign-off.'}
                  </p>
                </div>

                <button
                  onClick={() => setIsAgentModalOpen(true)}
                  className="w-full h-10 rounded-full text-xs font-semibold bg-purple-700 hover:bg-purple-800 text-white shadow-xs transition flex items-center justify-center gap-2"
                >
                  <FileEdit className="w-4 h-4" />
                  {proposal.status === 'changes_requested' ? 'Revise Plan & Resubmit' : 'Edit / Update Proposal'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Columns: The Proposal Document & PR Gate */}
        <div className="space-y-6 lg:col-span-2">
          {/* Proposal Document Card */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            {/* Proposal Card Header */}
            <div className="px-5 py-4 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-800 border border-teal-200/60">
                  <FileCode className="w-4 h-4 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Work Proposal #{proposal.id}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Tied to {claim.id} • Submitted by {proposal.agentName} • {proposal.submittedAt}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono bg-white text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1 shadow-2xs">
                  <Clock className="w-3 h-3 text-slate-400" /> {proposal.estimatedHours}h ({proposal.storyPoints} pts)
                </span>
                <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                  proposal.riskLevel === 'low'
                    ? 'bg-teal-50 text-teal-800 border-teal-200'
                    : proposal.riskLevel === 'medium'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  <ShieldCheck className="w-3 h-3" /> Risk: {proposal.riskLevel}
                </span>
              </div>
            </div>

            {/* Proposal Details Content */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* Review Feedback Banner */}
              {proposal.reviewNotes && (
                <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                  proposal.status === 'changes_requested'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : proposal.status === 'rejected'
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : 'bg-teal-50 border-teal-200 text-teal-900'
                }`}>
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">
                      Owner Decision by {proposal.reviewedBy} ({proposal.reviewedAt}):
                    </p>
                    <p className="leading-relaxed">{proposal.reviewNotes}</p>
                  </div>
                </div>
              )}

              {/* Approach & Technical Summary */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  Proposed Approach / Technical Summary
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-mono text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {proposal.approach}
                </div>
              </div>

              {/* Codebase Areas / Files to Touch */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  Files or Areas of Codebase Intended to Touch ({proposal.filesTouched.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {proposal.filesTouched.map((file, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono flex items-center gap-1.5"
                    >
                      <FileCode className="w-3 h-3 text-teal-700" />
                      {file}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid: Dependencies & Proposed ETA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                    Dependencies & Risk Factors
                  </h4>
                  <ul className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                    {proposal.dependencies.map((dep, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-slate-400" />
                        {dep}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                    Proposed ETA & Target Timeline
                  </h4>
                  <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{proposal.proposedEta}</span>
                  </div>
                </div>
              </div>

              {/* Verification & Testing Strategy */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                  Verification & Testing Strategy
                </h4>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {proposal.testStrategy}
                </p>
              </div>
            </div>
          </div>

          {/* Downstream Execution Gate Section */}
          <PrGateSection proposal={proposal} onLinkPr={handleLinkPr} />

          {/* Audit Log Timeline (Ziki Activity Model) */}
          <AuditLogTimeline logs={auditLogs} />
        </div>
      </div>

      {/* "What This Means" Comparison Table Section */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900">
            What This Means: Shifting from &ldquo;Delegate and Hope&rdquo; to &ldquo;Propose, Review, Then Execute&rdquo;
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Comparing Ziki&apos;s current transactional workflow against the structured Work Proposals gate.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider bg-slate-50/70">
                <th className="py-2.5 px-4 font-semibold">Dimension</th>
                <th className="py-2.5 px-4 font-semibold">Today (Status Quo)</th>
                <th className="py-2.5 px-4 font-semibold text-teal-800">With Work Proposals (New Gate)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Human Involvement</td>
                <td className="py-3 px-4 text-slate-500">End of task only (merge & points)</td>
                <td className="py-3 px-4 font-medium text-teal-900 bg-teal-50/40">
                  Start of task (approve approach) + end of task
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Agent Autonomy</td>
                <td className="py-3 px-4 text-slate-500">Claims and builds freely without early checkpoint</td>
                <td className="py-3 px-4 font-medium text-teal-900 bg-teal-50/40">
                  Claims, proposes plan, then builds on approval
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Risk Control</td>
                <td className="py-3 px-4 text-slate-500">Discover wasted compute after PR is submitted</td>
                <td className="py-3 px-4 font-medium text-teal-900 bg-teal-50/40">
                  Catch misaligned approach before code is written
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Communication</td>
                <td className="py-3 px-4 text-slate-500">Reactive escalations when already blocked</td>
                <td className="py-3 px-4 font-medium text-teal-900 bg-teal-50/40">
                  Proactive, structured sign-off gate
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Trust Building</td>
                <td className="py-3 px-4 text-slate-500">Implicit and opaque until completion</td>
                <td className="py-3 px-4 font-medium text-teal-900 bg-teal-50/40">
                  Explicit, auditable decisions in Activity history
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Modals */}
      <AgentSubmitModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
        proposal={proposal}
        onSubmit={handleAgentSubmit}
      />

      <OwnerReviewModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        proposal={proposal}
        actionType={ownerModalAction}
        onSubmitDecision={handleOwnerDecision}
      />
    </div>
  );
}
