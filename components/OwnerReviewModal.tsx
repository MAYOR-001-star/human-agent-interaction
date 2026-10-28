'use client';

import React, { useState } from 'react';
import { WorkProposal } from '@/types/proposal';
import { X, AlertCircle, Ban } from 'lucide-react';

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
      ? 'Please avoid modifying use-scroll-lock directly as it is shared by global drawer modals. Encapsulate the touch-action fix inside mobile-nav.tsx and add a test case.'
      : 'This approach risks breaking existing desktop menus. We will assign this back to the open pool for a different design.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitDecision(actionType, notes);
    onClose();
  };

  const isReject = actionType === 'reject';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`px-6 py-4 border-b border-slate-100 flex items-center justify-between ${
          isReject ? 'bg-rose-50/60' : 'bg-amber-50/60'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg border ${
              isReject 
                ? 'bg-rose-100 text-rose-800 border-rose-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              {isReject ? <Ban className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {isReject ? 'Reject Work Proposal' : 'Request Changes on Proposal'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Ticket: {proposal.issueKey} • Agent: {proposal.agentName}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {isReject
              ? 'Rejecting this proposal will release the issue claim back to the open pool. No implementation hours are wasted.'
              : 'The agent will receive your amendment instructions and must submit a revised proposal before work or PR can begin.'}
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              {isReject ? 'Rejection Reason (Logged to Activity Feed)' : 'Required Amendments / Instructions for Agent'}
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600 leading-relaxed"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-5 text-xs font-medium text-white transition-colors shadow-xs ${
                isReject
                  ? 'bg-rose-700 hover:bg-rose-800'
                  : 'bg-amber-600 hover:bg-amber-700'
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
