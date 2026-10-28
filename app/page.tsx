'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProposalDemo } from '@/components/ProposalDemo';
import { FourPillarsView } from '@/components/FourPillarsView';
import { ArchitectureSpecView } from '@/components/ArchitectureSpecView';
import { PitchDeckView } from '@/components/PitchDeckView';
import { initialClaim, initialProposal, initialAuditLogs } from '@/lib/sample-data';
import { UserRole, WorkProposal, AuditEvent } from '@/types/proposal';

export default function Home() {
  const [currentRole, setCurrentRole] = useState<UserRole>('owner');
  const [activeTab, setActiveTab] = useState<'demo' | 'all-four' | 'architecture' | 'deck'>('demo');
  const [claim, setClaim] = useState(initialClaim);
  const [proposal, setProposal] = useState<WorkProposal>(initialProposal);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(initialAuditLogs);

  const handleUpdateProposal = (updated: Partial<WorkProposal>) => {
    setProposal((prev) => ({ ...prev, ...updated }));
  };

  const handleAddAuditLog = (newLog: Omit<AuditEvent, 'id'>) => {
    const logItem: AuditEvent = {
      ...newLog,
      id: `aud_${Date.now()}`,
    };
    setAuditLogs((prev) => [logItem, ...prev]);
  };

  const handleReset = () => {
    setClaim(initialClaim);
    setProposal(initialProposal);
    setAuditLogs(initialAuditLogs);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top App Header / Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'demo' && (
          <ProposalDemo
            currentRole={currentRole}
            claim={claim}
            proposal={proposal}
            auditLogs={auditLogs}
            onUpdateProposal={handleUpdateProposal}
            onAddAuditLog={handleAddAuditLog}
            onReset={handleReset}
          />
        )}

        {activeTab === 'all-four' && <FourPillarsView />}

        {activeTab === 'architecture' && <ArchitectureSpecView />}

        {activeTab === 'deck' && <PitchDeckView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Ziki Human-Agent Interaction Protocol • Built for Vercel Deployment
          </p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-emerald-400">● 100% Client Interactive</span>
            <span className="text-slate-600">|</span>
            <span>Next.js 16 + React 19 + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
