import { IssueClaim, WorkProposal, AuditEvent } from '@/types/proposal';

export const initialClaim: IssueClaim = {
  id: 'clm_98412_alpha',
  issueKey: 'ENDOR-104',
  title: 'Fix mobile navigation drawer freeze on iOS WebKit Safari',
  description: 'When tapping the hamburger menu on Safari iOS 17+, the body scroll locks properly but the drawer backdrop fails to release touch events, causing a total UI freeze on sub-menus.',
  priority: 'high',
  agentId: 'usr_agent_sentinel_07',
  agentName: 'Sentinel-AI v2.4',
  agentLevel: 'Contributor (Level 2)',
  ownerName: 'Sarah Jenkins',
  ownerEmail: 'sarah.jenkins@endor.team',
  claimedAt: '12 minutes ago',
  deliverBy: '48m remaining',
  expiresInMinutes: 48,
  status: 'claimed',
};

export const initialProposal: WorkProposal = {
  id: 'prp_2026_094',
  claimId: 'clm_98412_alpha',
  bidId: 'bid_endor_104_01',
  issueKey: 'ENDOR-104',
  issueTitle: 'Fix mobile navigation drawer freeze on iOS WebKit Safari',
  agentId: 'usr_agent_sentinel_07',
  agentName: 'Sentinel-AI v2.4',
  agentLevel: 'Contributor (Level 2)',
  approach: `1. Isolate the WebKit passive touch event bug inside \`use-scroll-lock.ts\`.
2. Replace window touch-action lock with CSS container \`overscroll-behavior: contain\` and conditional \`touch-action: none\` on the backdrop modal layer only.
3. Add cleanup handler in \`mobile-nav.tsx\` useEffect to reset body overflow on component unmount.
4. Add Vitest unit test verifying lock teardown under simulated touch triggers.`,
  estimatedHours: 2.5,
  storyPoints: 3,
  filesTouched: [
    'components/mobile-nav.tsx',
    'hooks/use-scroll-lock.ts',
    'components/mobile-nav.test.tsx'
  ],
  riskLevel: 'medium',
  dependencies: ['React 19 touch event dispatchers', 'Tailwind touch-action classes'],
  proposedEta: 'Today, 2:30 PM (approx 2.5 hours)',
  autoEscalationHours: 4,
  escalationStatus: 'normal',
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
    details: 'Discovered issue on GET /api/v1/feed. Acquired claim lease on ENDOR-104. Coding permissions gated until proposal sign-off.',
    badgeColor: 'teal',
  },
  {
    id: 'aud_2',
    timestamp: 'Just now',
    actor: 'Sentinel-AI v2.4',
    actorType: 'agent',
    action: 'Submitted Work Proposal',
    details: 'Submitted technical proposal tied to IssueClaim #clm_98412_alpha (Est: 2.5h / 3pts, Risk: Medium). Awaiting Sarah Jenkins sign-off.',
    badgeColor: 'amber',
  },
];
