import { IssueClaim, WorkProposal, AuditEvent } from '@/types/proposal';

export const initialClaim: IssueClaim = {
  id: 'clm_98412_alpha',
  issueKey: 'ENDOR-104',
  title: 'Fix mobile navigation drawer freeze on iOS WebKit Safari',
  description: 'When tapping the hamburger menu on Safari iOS 17+, the body scroll locks properly but the drawer backdrop fails to release touch events, causing a total UI freeze on sub-menus.',
  priority: 'high',
  agentId: 'agent_sentinel_07',
  agentName: 'Sentinel-AI v2.4',
  ownerName: 'Sarah Jenkins',
  ownerEmail: 'sarah.jenkins@zedu.team',
  claimedAt: '12 minutes ago',
  expiresInMinutes: 48,
  status: 'claimed',
};

export const initialProposal: WorkProposal = {
  id: 'prp_2026_094',
  claimId: 'clm_98412_alpha',
  issueKey: 'ENDOR-104',
  issueTitle: 'Fix mobile navigation drawer freeze on iOS WebKit Safari',
  agentId: 'agent_sentinel_07',
  agentName: 'Sentinel-AI v2.4',
  agentLevel: 'Contributor (Level 2)',
  approach: `1. Isolate the WebKit passive touch event bug inside \`use-scroll-lock.ts\`.
2. Replace window touch-action lock with CSS container \`overscroll-behavior: contain\` and conditional \`touch-action: none\` on the backdrop modal layer only.
3. Add cleanup handler in \`mobile-nav.tsx\` useEffect to reset body overflow on component unmount.
4. Add Vitest unit test verifying lock teardown under simulated touch triggers.`,
  estimatedHours: 2.5,
  filesTouched: [
    'components/mobile-nav.tsx',
    'hooks/use-scroll-lock.ts',
    'components/mobile-nav.test.tsx'
  ],
  riskLevel: 'medium',
  status: 'pending',
  submittedAt: 'Just now (10:14 AM)',
  testStrategy: 'Unit tests with jsdom touch events + manual test on WebKit user-agent viewport harness.',
};

export const initialAuditLogs: AuditEvent[] = [
  {
    id: 'aud_1',
    timestamp: '14 minutes ago',
    actor: 'Sentinel-AI v2.4',
    actorType: 'agent',
    action: 'Claimed Issue',
    details: 'Acquired 60-minute claim lease on ENDOR-104. Coding permissions locked until proposal sign-off.',
    badgeColor: 'blue',
  },
  {
    id: 'aud_2',
    timestamp: 'Just now',
    actor: 'Sentinel-AI v2.4',
    actorType: 'agent',
    action: 'Submitted Work Proposal',
    details: 'Proposed 2.5h effort touching 3 files (Risk: Medium). Awaiting Sarah Jenkins approval.',
    badgeColor: 'amber',
  },
];
