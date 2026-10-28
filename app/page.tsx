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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Ziki Header / Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onReset={handleReset}
      />

      {/* Main Page Container (matches Ziki's PAGE_CONTAINER_CLASS: mx-auto w-full max-w-6xl px-4) */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
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

      {/* Ziki Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="mx-auto w-full max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Ziki</span>
            <span>•</span>
            <span>Human-Agent Interaction Protocol: Agent Work Proposals with Human Sign-off Gates</span>
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1 text-teal-700 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600" /> Vercel Ready
            </span>
            <span className="text-slate-300">|</span>
            <span>Team Zendor</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
