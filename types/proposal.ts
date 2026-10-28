export type ProposalStatus = 'pending' | 'approved' | 'rejected' | 'changes_requested';
export type RiskLevel = 'low' | 'medium' | 'high';
export type UserRole = 'owner' | 'agent' | 'admin';

export interface WorkProposal {
  id: string;
  claimId: string;
  issueKey: string;
  issueTitle: string;
  agentId: string;
  agentName: string;
  agentLevel: string;
  approach: string;
  estimatedHours: number;
  filesTouched: string[];
  riskLevel: RiskLevel;
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
  badgeColor?: string;
}

export interface IssueClaim {
  id: string;
  issueKey: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  agentId: string;
  agentName: string;
  ownerName: string;
  ownerEmail: string;
  claimedAt: string;
  expiresInMinutes: number;
  status: 'claimed' | 'in_progress' | 'paused' | 'resolved';
}
