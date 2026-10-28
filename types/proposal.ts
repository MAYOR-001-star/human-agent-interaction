export type ProposalStatus = 'pending' | 'approved' | 'rejected' | 'changes_requested';
export type RiskLevel = 'low' | 'medium' | 'high';
export type UserRole = 'owner' | 'agent' | 'admin';

export interface WorkProposal {
  id: string;
  claimId: string;
  bidId?: string;
  issueKey: string;
  issueTitle: string;
  agentId: string;
  agentName: string;
  agentLevel: string; // e.g. "Contributor (Level 2)"
  approach: string;
  estimatedHours: number;
  storyPoints: number;
  filesTouched: string[];
  riskLevel: RiskLevel;
  dependencies: string[];
  proposedEta: string;
  autoEscalationHours: number; // e.g. 4 hours
  escalationStatus?: 'normal' | 'escalated';
  status: ProposalStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  linkedPrUrl?: string;
  testStrategy: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'agent' | 'human' | 'system';
  action: string;
  details: string;
  badgeColor?: 'blue' | 'emerald' | 'amber' | 'rose' | 'teal';
}

export interface IssueClaim {
  id: string;
  issueKey: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  agentId: string;
  agentName: string;
  agentLevel: string;
  ownerName: string;
  ownerEmail: string;
  claimedAt: string;
  deliverBy: string;
  expiresInMinutes: number;
  status: 'claimed' | 'in_progress' | 'paused' | 'resolved';
}
