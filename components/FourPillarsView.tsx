'use client';

import React, { useState } from 'react';
import { 
  FileCheck2, 
  BookOpen, 
  PauseCircle, 
  Inbox, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  ShieldAlert, 
  Send, 
  Play,
  RotateCw,
  MessageSquare
} from 'lucide-react';

export function FourPillarsView() {
  const [selectedPillar, setSelectedPillar] = useState<0 | 1 | 2 | 3>(0);

  // Pillar 1 state (Journal simulation)
  const [journalEntries, setJournalEntries] = useState([
    { time: '10:14 AM', text: 'Started isolating WebKit touch-action event propagation in use-scroll-lock.ts', type: 'progress' },
    { time: '10:28 AM', text: 'Touch handler rewritten. Running local vitest mock test suite.', type: 'heartbeat' }
  ]);
  const [newJournalText, setNewJournalText] = useState('');

  // Pillar 2 state (Pause/Resume simulation)
  const [isPaused, setIsPaused] = useState(false);
  const [pauseReason, setPauseReason] = useState('Waiting on Figma design clarification for drawer animation curve.');

  // Pillar 3 state (Question Inbox simulation)
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      urgency: 'high',
      question: 'Should we support iOS 15 legacy WebKit fallback or focus strictly on iOS 17+?',
      agent: 'Sentinel-AI',
      slaMinutes: 14,
      answered: false,
      answer: ''
    },
    {
      id: 'q2',
      urgency: 'medium',
      question: 'Does the backdrop dismissal require an analytical track event?',
      agent: 'Sentinel-AI',
      slaMinutes: 52,
      answered: true,
      answer: 'Yes, emit trackEvent("drawer_closed_backdrop").'
    }
  ]);
  const [answerInput, setAnswerInput] = useState('');

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournalText.trim()) return;
    setJournalEntries([
      ...journalEntries,
      { time: 'Just now', text: newJournalText, type: 'progress' }
    ]);
    setNewJournalText('');
  };

  const handleAnswerQuestion = (qId: string) => {
    if (!answerInput.trim()) return;
    setQuestions(questions.map(q => q.id === qId ? { ...q, answered: true, answer: answerInput } : q));
    setAnswerInput('');
  };

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
            The Complete Picture
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            The 4 Pillars of Human-Agent Collaboration in Ziki
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Autonomous coding agents shouldn’t operate in an opaque black box. These four interconnected systems transform passive humans into active collaborators at each critical lifecycle stage.
          </p>
        </div>

        {/* Tab Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {/* Pillar 0 */}
          <button
            onClick={() => setSelectedPillar(0)}
            className={`p-4 rounded-xl border text-left transition-all relative ${
              selectedPillar === 0
                ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">#0 Core</span>
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Work Proposals</h4>
            <p className="text-[11px] text-slate-400">
              Sign-off before work begins. Plan first, build second.
            </p>
          </button>

          {/* Pillar 1 */}
          <button
            onClick={() => setSelectedPillar(1)}
            className={`p-4 rounded-xl border text-left transition-all relative ${
              selectedPillar === 1
                ? 'bg-sky-500/10 border-sky-500 text-white shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-sky-400">#1 Real-Time</span>
              <BookOpen className="w-4 h-4 text-sky-400" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Progress Journal</h4>
            <p className="text-[11px] text-slate-400">
              Ongoing status heartbeats that auto-renew claim leases.
            </p>
          </button>

          {/* Pillar 2 */}
          <button
            onClick={() => setSelectedPillar(2)}
            className={`p-4 rounded-xl border text-left transition-all relative ${
              selectedPillar === 2
                ? 'bg-purple-500/10 border-purple-500 text-white shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/30'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-purple-400">#2 Safety</span>
              <PauseCircle className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Pause & Resume</h4>
            <p className="text-[11px] text-slate-400">
              Freeze claims safely without cancellation during requirement clarifications.
            </p>
          </button>

          {/* Pillar 3 */}
          <button
            onClick={() => setSelectedPillar(3)}
            className={`p-4 rounded-xl border text-left transition-all relative ${
              selectedPillar === 3
                ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-amber-400">#3 Triage</span>
              <Inbox className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Question Inbox</h4>
            <p className="text-[11px] text-slate-400">
              Structured agent questions with urgency ratings & owner SLAs.
            </p>
          </button>
        </div>
      </div>

      {/* Selected Pillar Detailed Interactive Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        {selectedPillar === 0 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-400" />
                  Improvement 0: Agent Work Proposals (The Foundation)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mandatory gate before coding begins. The agent explains the plan; the owner decides whether to authorize execution.
                </p>
              </div>
              <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
                Implemented in Live Simulator
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> What it gives the Human
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Total visibility into the solution architecture <em>before</em> a single PR or git commit is created. Catches architectural misunderstandings instantly instead of after hours of work.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span> What it gives the Agent
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Explicit sign-off and safety. Protects against building the wrong feature or touching restricted files. Provides clear review notes if direction needs tweaking.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300">
                Ready to try the interactive approval flow? Switch to the <strong>Live Interactive Demo</strong> tab above.
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-semibold flex items-center gap-1 hover:bg-emerald-400 transition"
              >
                Go to Simulator <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {selectedPillar === 1 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                  Improvement 1: Progress Journal & Auto-Heartbeats
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Solves the 15-minute claim expiration problem. Agents log milestone heartbeats to prove they are actively working.
                </p>
              </div>
              <span className="text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full">
                Interactive Mock Sandbox
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Live Agent Journal Feed
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {journalEntries.map((j, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-mono text-sky-400 font-semibold">{j.type.toUpperCase()}</span>
                        <span>{j.time}</span>
                      </div>
                      <p className="text-slate-200">{j.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddJournal} className="flex gap-2">
                  <input
                    type="text"
                    value={newJournalText}
                    onChange={(e) => setNewJournalText(e.target.value)}
                    placeholder="Log agent progress update..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition"
                  >
                    <Send className="w-3.5 h-3.5" /> Post
                  </button>
                </form>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <h4 className="font-semibold text-slate-200">Why this matters:</h4>
                <p className="text-slate-400 leading-relaxed">
                  In Ziki today, if an agent doesn’t ping within 15 minutes, claim sweepers release the claim and the agent’s work is discarded.
                </p>
                <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-200 space-y-1 text-[11px]">
                  <strong className="block font-semibold">Automatic Lease Extension</strong>
                  Each verified journal entry automatically resets the 60-minute claim lease timer without requiring manual owner intervention.
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPillar === 2 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PauseCircle className="w-5 h-5 text-purple-400" />
                  Improvement 2: Pause & Resume Mechanism
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Safely freeze an in-flight issue claim without cancellation while human specifications or blocker questions are being clarified.
                </p>
              </div>
              <span className="text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full">
                Interactive State Toggle
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Simulated Issue: ENDOR-104</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${isPaused ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                    <strong className="text-sm text-white capitalize">
                      {isPaused ? 'CLAIM PAUSED (Timer Frozen)' : 'CLAIM ACTIVE (Running)'}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                    isPaused
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20'
                  }`}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5" /> Resume Claim Clock
                    </>
                  ) : (
                    <>
                      <PauseCircle className="w-3.5 h-3.5" /> Freeze Claim (Pause)
                    </>
                  )}
                </button>
              </div>

              {isPaused && (
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 space-y-1">
                  <p className="font-semibold text-purple-300">Pause Reason Stored on Ticket:</p>
                  <p className="text-slate-300 font-mono">{pauseReason}</p>
                  <p className="text-[11px] text-slate-400 pt-1">
                    ✓ Claim sweep dispatcher excludes paused tickets from automatic timeout release.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedPillar === 3 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-amber-400" />
                  Improvement 3: Question Inbox + SLA Availability
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Eliminates silent agent stalls by creating a prioritized triage board for blockers with clear human response SLAs.
                </p>
              </div>
              <span className="text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full">
                Interactive Triage Board
              </span>
            </div>

            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        q.urgency === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {q.urgency} Urgency
                      </span>
                      <span className="text-slate-400">Asked by {q.agent}</span>
                    </div>

                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" /> SLA: {q.slaMinutes}m remaining
                    </span>
                  </div>

                  <p className="text-slate-200 font-medium">{q.question}</p>

                  {q.answered ? (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      <span><strong>Sarah (Owner):</strong> {q.answer}</span>
                    </div>
                  ) : (
                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                        placeholder="Type answer to unblock Sentinel-AI..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        onClick={() => handleAnswerQuestion(q.id)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs"
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Complete Suite Comparison Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Improvement</th>
                <th className="py-2.5 px-3">What it gives the Human</th>
                <th className="py-2.5 px-3">What it gives the Agent</th>
                <th className="py-2.5 px-3">Recommended Rollout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="bg-emerald-500/5">
                <td className="py-3 px-3 font-mono font-bold text-emerald-400">0</td>
                <td className="py-3 px-3 font-semibold text-white">Work Proposals</td>
                <td className="py-3 px-3">Approve the plan before code is written</td>
                <td className="py-3 px-3">Clear go-ahead so it doesn’t build wrong thing</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">Priority 1 (The Gate)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-sky-400">1</td>
                <td className="py-3 px-3 font-semibold text-white">Progress Journal</td>
                <td className="py-3 px-3">Sees short status updates while work is happening</td>
                <td className="py-3 px-3">Say &quot;still working&quot; without claim expiring</td>
                <td className="py-3 px-3 font-mono text-slate-400">Priority 2</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-purple-400">2</td>
                <td className="py-3 px-3 font-semibold text-white">Pause & Resume</td>
                <td className="py-3 px-3">Can freeze work temporarily without cancelling</td>
                <td className="py-3 px-3">Claim safety while human clarifies specs</td>
                <td className="py-3 px-3 font-mono text-slate-400">Priority 3</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-amber-400">3</td>
                <td className="py-3 px-3 font-semibold text-white">Question Inbox</td>
                <td className="py-3 px-3">Triage list of agent questions with SLAs</td>
                <td className="py-3 px-3">Predictable owner response times</td>
                <td className="py-3 px-3 font-mono text-slate-400">Priority 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
