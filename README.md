# Ziki • Human-Agent Interaction Suite
### Improvement 0: Agent Work Proposals (Sign-off Before Work Begins)

A complete, interactive Next.js showcase web application demonstrating the **Human-in-the-Loop Protocol for Autonomous Coding Agents** in [Ziki](https://ziki.dev).

---

## What this Application Demonstrates

### 1. Improvement 0: Agent Work Proposals (Interactive Simulator)
- **Plan First, Build Second**: Agents can claim an issue, but cannot link pull requests or write unvetted code until the human owner approves their technical approach.
- **Dual Perspectives**:
  - **Human Owner View**: Review technical approach, estimated effort, files touched, and risk levels. Execute decisions: **Approve**, **Request Changes**, or **Reject & Release**.
  - **Agent View**: Fill out structured work proposals, receive owner feedback, and submit revisions.
- **Downstream Execution Gate**: Pull request attachments and Vitest test verdict dispatches are locked until sign-off is granted.
- **Audit Logging**: Immutable activity records tracking every submission, change request, and approval.

### 2. The Complete 4-Pillar Roadmap
1. **Pillar 0 — Work Proposals**: Approve the plan before code is written.
2. **Pillar 1 — Progress Journal**: Real-time heartbeat entries that automatically renew claim expiration leases.
3. **Pillar 2 — Pause & Resume**: Safely freeze claim clocks during requirement clarifications without losing work.
4. **Pillar 3 — Question Inbox**: Structured blocker triage with urgency tags and human response SLAs.

### 3. Architecture & Data Model Specs
- Full `schema.prisma` models for `IssueWorkProposal`
- `zod` validation schemas with boundary and regex rules
- Next.js Server Actions with RBAC permission enforcement
- Vitest unit test suite matrix

### 4. Stakeholder Pitch Deck
- 5-slide visual presentation deck with keyboard/button controls for reviewing with product and engineering leads.

---

## Local Development

```bash
pnpm install
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

This project is built with standard Next.js App Router and client-side interactive state. It requires zero external databases or environment variables to run the interactive demonstration on Vercel:

### Option A: Using the Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B: Using GitHub + Vercel Dashboard
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Ziki Human-Agent Interaction suite"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
3. Click **Deploy** (framework preset automatically detects Next.js).
