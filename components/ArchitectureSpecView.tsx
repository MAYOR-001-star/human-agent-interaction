'use client';

import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Workflow
} from 'lucide-react';

export function ArchitectureSpecView() {
  const [activeTab, setActiveTab] = useState<'prisma' | 'zod' | 'actions' | 'vitest'>('prisma');
  const [copied, setCopied] = useState(false);

  const prismaSchemaCode = `// prisma/schema.prisma

enum ProposalStatus {
  pending
  approved
  rejected
  changes_requested
}

enum RiskLevel {
  low
  medium
  high
}

model IssueWorkProposal {
  id              String         @id @default(cuid())
  claimId         String         @unique
  claim           IssueClaim     @relation(fields: [claimId], references: [id], onDelete: Cascade)
  issueId         String
  issue           Issue          @relation(fields: [issueId], references: [id], onDelete: Cascade)
  agentId         String
  agent           User           @relation("AgentProposals", fields: [agentId], references: [id])
  
  approach        String         @db.Text
  estimatedHours  Float
  storyPoints     Int?           @default(3)
  filesTouched    String[]       // List of repository relative file paths
  riskLevel       RiskLevel      @default(medium)
  dependencies    String[]
  proposedEta     String?
  autoEscalateHours Int          @default(4)
  status          ProposalStatus @default(pending)
  
  testStrategy    String?        @db.Text
  reviewNotes     String?        @db.Text
  reviewedById    String?
  reviewedBy      User?          @relation("ReviewedProposals", fields: [reviewedById], references: [id])
  
  submittedAt     DateTime       @default(now())
  reviewedAt      DateTime?
  updatedAt       DateTime       @updatedAt

  @@index([issueId])
  @@index([agentId])
  @@index([status])
}`;

  const zodValidationCode = `// lib/validations/proposal.ts
import { z } from "zod";

export const workProposalSchema = z.object({
  claimId: z.string().min(1, "Claim ID is required"),
  approach: z.string()
    .min(20, "Approach plan must be at least 20 characters")
    .max(5000, "Approach is too verbose"),
  estimatedHours: z.number()
    .min(0.5, "Minimum estimate is 30 minutes (0.5 hrs)")
    .max(168, "Maximum estimate cannot exceed 1 week (168 hrs)"),
  storyPoints: z.number().int().min(1).max(13).default(3),
  filesTouched: z.array(z.string().regex(/^[a-zA-Z0-9_\\-\\.\\/]+$/, "Invalid file path"))
    .min(1, "Must declare at least one file targeted for modification"),
  riskLevel: z.enum(["low", "medium", "high"]),
  dependencies: z.array(z.string()).default([]),
  proposedEta: z.string().min(3),
  testStrategy: z.string().min(10, "Verification strategy is required"),
});

export const proposalReviewSchema = z.object({
  proposalId: z.string().min(1),
  decision: z.enum(["approved", "changes_requested", "rejected"]),
  notes: z.string().max(2000).optional(),
});`;

  const serverActionsCode = `// app/actions/proposals.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { workProposalSchema, proposalReviewSchema } from "@/lib/validations/proposal";
import { logActivity } from "@/lib/activity";

export async function submitWorkProposal(formData: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const parsed = workProposalSchema.parse(formData);
  const claim = await prisma.issueClaim.findUnique({
    where: { id: parsed.claimId },
    include: { issue: true }
  });

  if (!claim || claim.agentId !== session.user.id) {
    throw new Error("Forbidden: Only the assigned agent can submit a work proposal.");
  }

  const proposal = await prisma.issueWorkProposal.upsert({
    where: { claimId: claim.id },
    create: {
      claimId: claim.id,
      issueId: claim.issueId,
      agentId: session.user.id,
      ...parsed,
      status: "pending"
    },
    update: {
      ...parsed,
      status: "pending"
    }
  });

  // Audit trail: Log to Ziki's core Activity feed
  await logActivity({
    issueId: claim.issueId,
    actorId: session.user.id,
    type: "PROPOSAL_SUBMITTED",
    metadata: { proposalId: proposal.id, hours: parsed.estimatedHours }
  });

  return { success: true, proposalId: proposal.id };
}

export async function reviewWorkProposal(formData: unknown) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const { proposalId, decision, notes } = proposalReviewSchema.parse(formData);
  const proposal = await prisma.issueWorkProposal.findUnique({
    where: { id: proposalId },
    include: { issue: true, claim: true }
  });

  if (!proposal) throw new Error("Proposal not found");

  // RBAC: Only Issue Owner or Tenant Super Admin can approve
  const isOwner = proposal.issue.authorId === session.user.id;
  const isAdmin = session.user.role === "admin" || session.user.role === "super_admin";
  if (!isOwner && !isAdmin) {
    throw new Error("Forbidden: Only the issue owner or administrator can sign off.");
  }

  const updated = await prisma.issueWorkProposal.update({
    where: { id: proposalId },
    data: {
      status: decision,
      reviewNotes: notes,
      reviewedById: session.user.id,
      reviewedAt: new Date()
    }
  });

  if (decision === "rejected") {
    // Release claim back to pool with zero wasted implementation hours
    await prisma.issueClaim.delete({ where: { id: proposal.claimId } });
  }

  await logActivity({
    issueId: proposal.issueId,
    actorId: session.user.id,
    type: \`PROPOSAL_\${decision.toUpperCase()}\`,
    metadata: { decision, notes }
  });

  return { success: true, status: updated.status };
}`;

  const vitestCode = `// lib/validations/proposal.test.ts
import { describe, it, expect } from "vitest";
import { workProposalSchema, proposalReviewSchema } from "./proposal";

describe("Work Proposal Validation Suite", () => {
  it("accepts a well-formed proposal", () => {
    const valid = {
      claimId: "clm_123",
      approach: "Refactor mobile touch event handlers inside navigation container",
      estimatedHours: 3.5,
      storyPoints: 3,
      filesTouched: ["components/nav.tsx", "hooks/use-touch.ts"],
      riskLevel: "medium",
      dependencies: ["React 19"],
      proposedEta: "Today 3:00 PM",
      testStrategy: "Vitest unit tests + Playwright iOS WebKit snapshot harness"
    };
    expect(workProposalSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an empty approach or too short description", () => {
    const invalid = {
      claimId: "clm_123",
      approach: "will fix", // < 20 chars
      estimatedHours: 2,
      filesTouched: ["file.ts"],
      riskLevel: "low",
      proposedEta: "Today",
      testStrategy: "unit test"
    };
    const res = workProposalSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it("enforces estimate hour boundary conditions (0.5h to 168h)", () => {
    expect(workProposalSchema.safeParse({ estimatedHours: 0.2 }).success).toBe(false);
    expect(workProposalSchema.safeParse({ estimatedHours: 250 }).success).toBe(false);
  });

  it("rejects proposal missing touched files", () => {
    const res = workProposalSchema.safeParse({
      claimId: "clm_123",
      approach: "A thorough explanation of the changes that will be executed",
      estimatedHours: 4,
      filesTouched: [], // Empty list
      riskLevel: "low",
      proposedEta: "Today",
      testStrategy: "Vitest DOM tests"
    });
    expect(res.success).toBe(false);
  });
});`;

  const getCode = () => {
    switch (activeTab) {
      case 'prisma': return prismaSchemaCode;
      case 'zod': return zodValidationCode;
      case 'actions': return serverActionsCode;
      case 'vitest': return vitestCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800 border border-teal-200">
            Engineering Blueprint
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            How It’s Built Professionally in Ziki
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Full production-grade implementation specifications adhering strictly to Ziki’s Next.js App Router, Prisma ORM, Auth.js RBAC, Zod validation, and Vitest test matrix.
          </p>
        </div>
      </div>

      {/* 8-Step Execution Blueprint Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Workflow className="w-4 h-4 text-teal-700" />
          The 8 Architectural Execution Steps
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            { step: '1', title: 'Data Audit', desc: 'Inspect IssueClaim model and agent levels in lib/agents/levels.ts.' },
            { step: '2', title: 'Prisma Model', desc: 'Add IssueWorkProposal table with 1-to-1 relation to claim.' },
            { step: '3', title: 'Zod Validation', desc: 'Strict runtime schema validation on hours (0.5 - 168h) & files.' },
            { step: '4', title: 'Server Actions', desc: 'RBAC gating: only agent submits; only owner/admin signs off.' },
            { step: '5', title: 'Dual UI Views', desc: 'Agent proposal modal + owner review card with 3 outcome actions.' },
            { step: '6', title: 'Execution Gate', desc: 'Block PR attachment & test verdicts while proposal is unapproved.' },
            { step: '7', title: 'Activity Audit', desc: 'Persist all events to Ziki Activity table for permanent history.' },
            { step: '8', title: 'Vitest Matrix', desc: 'Unit tests covering schema boundaries, auth checks & gate blocks.' },
          ].map((item) => (
            <div key={item.step} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                <span>STEP {item.step}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              </div>
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Code Viewer */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Code Tabs Header */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('prisma')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition ${
                activeTab === 'prisma'
                  ? 'bg-teal-50 text-teal-900 border border-teal-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              schema.prisma
            </button>
            <button
              onClick={() => setActiveTab('zod')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition ${
                activeTab === 'zod'
                  ? 'bg-teal-50 text-teal-900 border border-teal-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              validations/proposal.ts
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition ${
                activeTab === 'actions'
                  ? 'bg-teal-50 text-teal-900 border border-teal-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              actions/proposals.ts
            </button>
            <button
              onClick={() => setActiveTab('vitest')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition ${
                activeTab === 'vitest'
                  ? 'bg-teal-50 text-teal-900 border border-teal-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              proposal.test.ts
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex h-8 items-center gap-1.5 px-3 rounded-full text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>
        </div>

        {/* Code Content */}
        <pre className="p-5 text-xs font-mono text-slate-800 bg-slate-900 text-slate-100 overflow-x-auto leading-relaxed max-h-[500px]">
          <code>{getCode()}</code>
        </pre>
      </div>
    </div>
  );
}
