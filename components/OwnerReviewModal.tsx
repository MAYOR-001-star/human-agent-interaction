'use client';

import React, { useState } from 'react';
import { WorkProposal } from '@/types/proposal';
import { UserCheck, X, AlertCircle, Ban } from 'lucide-react';

interface OwnerReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: WorkProposal;
  actionType: 'request_changes' | 'reject';
  onSubmitDecision: (decision: 'request_changes' | 'reject', notes: string) => void;
}

export function OwnerReviewModal({
  isOpen,
  onClose,
  proposal,
  actionType,
  onSubmitDecision,
}: OwnerReviewModalProps) {
  const [notes, setNotes] = useState(
    actionType === 'request_changes'
      ? 'Please avoid modifying use-scroll-lock directly as it is shared by modal drawers. Encapsulate the fix inside mobile-nav.tsx and add a test case.'
      : 'This approach risks breaking existing desktop menus. We will assign this back to the pool for a different design.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitDecision(actionType, notes);
    onClose();
  };

  const isReject = actionType === 'reject';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`px-6 py-4 border-b border-slate-800 flex items-center justify-between ${
          isReject ? 'bg-rose-950/20' : 'bg-amber-950/20'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg border ${
              isReject 
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {isReject ? <Ban className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {isReject ? 'Reject Work Proposal' : 'Request Changes on Proposal'}
              </h3>
              <p className="text-xs text-slate-400">
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-300">
            {isReject
              ? 'Rejecting this proposal will cancel the claim and release the issue back to the open pool for another worker.'
              : 'The agent will receive your feedback and must resubmit an updated proposal before work can proceed.'}
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              {isReject ? 'Rejection Reason (Audit Log)' : 'Required Amendments / Feedback for Agent'}
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed font-sans"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white shadow-lg transition ${
                isReject
                  ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/25'
                  : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/25'
              }`}
            >
              {isReject ? 'Confirm Rejection & Release' : 'Send Change Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
