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
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info
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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#3b82f6', '#8b5cf6'],
    });

    onUpdateProposal({
      status: 'approved',
      reviewedAt: 'Just now',
      reviewedBy: 'Sarah Jenkins (Owner)',
      reviewNotes: 'Plan is solid. Approach mitigates the risk cleanly. Approved for PR.',
    });

    onAddAuditLog({
      timestamp: 'Just now',
      actor: 'Sarah Jenkins (Owner)',
      actorType: 'human',
      action: 'Approved Proposal',
      details: 'Work proposal #prp_2026_094 signed off. Coding privileges unlocked on ENDOR-104.',
      badgeColor: 'emerald',
    });
  };

  // Owner Modal Decision (Request Changes or Reject)
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
        details: `Changes requested on proposal: "${notes}"`,
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
        details: `Proposal rejected and claim released back to the open pool. Reason: "${notes}"`,
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
        ? 'Updated technical proposal addressing Sarah Jenkins’ feedback. Re-submitted for sign-off.'
        : 'Submitted new work proposal for ENDOR-104.',
      badgeColor: 'blue',
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
      details: `Attached PR: ${prUrl} (Authorized by owner approval).`,
      badgeColor: 'emerald',
    });
  };

  // Visual helper for badge status
  const getStatusBadge = () => {
    switch (proposal.status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved • Work Authorized
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            Changes Requested • Revision Needed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            Rejected • Claim Released
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            Pending Owner Sign-off
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Explaining Improvement 0 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                Improvement 0
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Agent Work Proposals: Sign-off Before Work Begins
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              <strong>Plan first, build second.</strong> The agent claims an issue but cannot link PRs or submit code until the human owner reviews and approves the technical approach, estimated hours, and touched files.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] text-slate-400">Current Simulator Role</p>
              <p className="text-xs font-bold text-white capitalize flex items-center justify-end gap-1">
                {currentRole === 'owner' ? (
                  <span className="text-sky-400 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" /> Sarah Jenkins (Owner)
                  </span>
                ) : (
                  <span className="text-purple-400 flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5" /> Sentinel-AI (Agent)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Interactive Pipeline Tracker */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Step 1 */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-[10px]">
              ✓
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase">Step 1</p>
              <p className="font-semibold text-slate-200">Issue Claimed</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-[10px]">
              ✓
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase">Step 2</p>
              <p className="font-semibold text-slate-200">Plan Submitted</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
            proposal.status === 'approved'
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
              : proposal.status === 'changes_requested'
              ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
              : proposal.status === 'rejected'
              ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
              : 'bg-sky-950/20 border-sky-500/30 text-sky-300'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border ${
              proposal.status === 'approved'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-900 text-slate-200 border-slate-700'
            }`}>
              {proposal.status === 'approved' ? '✓' : '3'}
            </div>
            <div>
              <p className="text-[10px] opacity-75 font-mono uppercase">Step 3</p>
              <p className="font-semibold capitalize">Owner Review ({proposal.status.replace('_', ' ')})</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className={`flex items-center gap-2.5 p-2 rounded-xl border ${
            proposal.status === 'approved'
              ? 'bg-slate-950/80 border-emerald-500/30 text-emerald-300'
              : 'bg-slate-950/30 border-slate-800/60 text-slate-500'
          }`}>
            <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-[10px]">
              {proposal.status === 'approved' ? <Unlock className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3 text-slate-500" />}
            </div>
            <div>
              <p className="text-[10px] opacity-75 font-mono uppercase">Step 4</p>
              <p className="font-semibold">Code & PR Gate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Issue Info & Proposal Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Issue Context & Claim Info */}
        <div className="space-y-6 lg:col-span-1">
          {/* Issue Meta Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {claim.issueKey}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Priority: {claim.priority}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white leading-snug">
                {claim.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {claim.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Assigned Agent:</span>
                <span className="text-purple-300 font-mono font-medium">{claim.agentName}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Issue Owner:</span>
                <span className="text-sky-300 font-medium">{claim.ownerName}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Claim Lease:</span>
                <span className="text-slate-300 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" /> {claim.expiresInMinutes}m remaining
                </span>
              </div>
            </div>
          </div>

          {/* Proposal Status & Dynamic Controls Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Sign-off Action Controls
              </h4>
              {getStatusBadge()}
            </div>

            {/* If viewed as Human Owner */}
            {currentRole === 'owner' ? (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs text-sky-200">
                  <p className="font-medium flex items-center gap-1.5 text-sky-300">
                    <UserCheck className="w-4 h-4" /> You are reviewing as Owner
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Evaluate the agent’s implementation plan below. Choose whether to approve work, request changes, or reject the plan.
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={handleApprove}
                    disabled={proposal.status === 'approved'}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md ${
                      proposal.status === 'approved'
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {proposal.status === 'approved' ? 'Proposal Approved ✓' : 'Approve Plan (Go Ahead)'}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setOwnerModalAction('request_changes');
                        setIsOwnerModalOpen(true);
                      }}
                      className="py-2 px-3 rounded-xl text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition flex items-center justify-center gap-1.5"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Request Changes
                    </button>

                    <button
                      onClick={() => {
                        setOwnerModalAction('reject');
                        setIsOwnerModalOpen(true);
                      }}
                      className="py-2 px-3 rounded-xl text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject & Release
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* If viewed as AI Agent */
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                  <p className="font-medium flex items-center gap-1.5 text-purple-300">
                    <Bot className="w-4 h-4" /> You are operating as Agent
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1">
                    {proposal.status === 'approved'
                      ? 'Owner has approved your proposal! You now have permission to link PR and run test verdicts.'
                      : proposal.status === 'changes_requested'
                      ? 'Owner requested updates to your plan. Revise and resubmit to unlock work.'
                      : 'Proposal is awaiting human review. You may modify the plan before sign-off.'}
                  </p>
                </div>

                <button
                  onClick={() => setIsAgentModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20 transition flex items-center justify-center gap-2"
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
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
            {/* Proposal Card Header */}
            <div className="px-6 py-4 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FileCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Work Proposal #{proposal.id}</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Submitted by {proposal.agentName} ({proposal.agentLevel}) • {proposal.submittedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> Est: {proposal.estimatedHours} hrs
                </span>
                <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                  proposal.riskLevel === 'low'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : proposal.riskLevel === 'medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  <ShieldCheck className="w-3 h-3" /> Risk: {proposal.riskLevel}
                </span>
              </div>
            </div>

            {/* Proposal Details Body */}
            <div className="p-6 space-y-5">
              {/* Review Feedback Banner (if changes requested or approved with notes) */}
              {proposal.reviewNotes && (
                <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                  proposal.status === 'changes_requested'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : proposal.status === 'rejected'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                }`}>
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">
                      Owner Decision by {proposal.reviewedBy} ({proposal.reviewedAt}):
                    </p>
                    <p className="text-slate-300 leading-relaxed">{proposal.reviewNotes}</p>
                  </div>
                </div>
              )}

              {/* Technical Approach Section */}
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  Technical Approach & Architecture Plan
                </h5>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {proposal.approach}
                </div>
              </div>

              {/* Files to Touch Section */}
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  Targeted Files for Modification ({proposal.filesTouched.length})
                </h5>
                <div className="flex flex-wrap gap-2">
                  {proposal.filesTouched.map((file, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                    >
                      <FileCode className="w-3 h-3 text-emerald-400" />
                      {file}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification & Testing Strategy */}
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Verification & Testing Strategy
                </h5>
                <p className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                  {proposal.testStrategy}
                </p>
              </div>
            </div>
          </div>

          {/* Downstream PR Gate Section */}
          <PrGateSection proposal={proposal} onLinkPr={handleLinkPr} />

          {/* Audit Log Timeline */}
          <AuditLogTimeline logs={auditLogs} />
        </div>
      </div>

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
