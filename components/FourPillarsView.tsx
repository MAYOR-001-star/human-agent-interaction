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
  Send, 
  Play
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
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800 border border-teal-200">
            The Complete Picture
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            The 4 Pillars of Human-Agent Collaboration in Ziki
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Autonomous coding agents shouldn’t operate in an opaque black box. These four interconnected systems transform passive humans into active collaborators at each critical lifecycle stage.
          </p>
        </div>

        {/* Tab Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {/* Pillar 0 */}
          <button
            onClick={() => setSelectedPillar(0)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedPillar === 0
                ? 'bg-teal-50/70 border-teal-600 ring-1 ring-teal-600/30 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-teal-700">#0 Core Gate</span>
              <FileCheck2 className="w-4 h-4 text-teal-700" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900 mb-1">Work Proposals</h4>
            <p className="text-[11px] text-slate-500">
              Sign-off before work begins. Plan first, build second.
            </p>
          </button>

          {/* Pillar 1 */}
          <button
            onClick={() => setSelectedPillar(1)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedPillar === 1
                ? 'bg-teal-50/70 border-teal-600 ring-1 ring-teal-600/30 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-teal-700">#1 Real-Time</span>
              <BookOpen className="w-4 h-4 text-teal-700" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900 mb-1">Progress Journal</h4>
            <p className="text-[11px] text-slate-500">
              Ongoing status heartbeats that auto-renew claim leases.
            </p>
          </button>

          {/* Pillar 2 */}
          <button
            onClick={() => setSelectedPillar(2)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedPillar === 2
                ? 'bg-teal-50/70 border-teal-600 ring-1 ring-teal-600/30 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-teal-700">#2 Safety</span>
              <PauseCircle className="w-4 h-4 text-teal-700" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900 mb-1">Pause & Resume</h4>
            <p className="text-[11px] text-slate-500">
              Freeze claims safely without cancellation during clarifications.
            </p>
          </button>

          {/* Pillar 3 */}
          <button
            onClick={() => setSelectedPillar(3)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedPillar === 3
                ? 'bg-teal-50/70 border-teal-600 ring-1 ring-teal-600/30 text-teal-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-teal-700">#3 Triage</span>
              <Inbox className="w-4 h-4 text-teal-700" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900 mb-1">Question Inbox</h4>
            <p className="text-[11px] text-slate-500">
              Structured agent questions with urgency & owner SLAs.
            </p>
          </button>
        </div>
      </div>

      {/* Selected Pillar Detailed Breakdown */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        {selectedPillar === 0 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-teal-700" />
                  Improvement 0: Agent Work Proposals (The Foundation)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mandatory gate before coding begins. The agent explains the plan; the owner authorizes execution.
                </p>
              </div>
              <span className="text-xs font-mono bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full">
                Interactive in Simulator
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span> What it gives the Human
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Total visibility into the solution architecture <em>before</em> a single PR or git commit is created. Catches architectural misunderstandings early instead of discovering them after hours of work.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span> What it gives the Agent
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explicit sign-off and safety. Protects against building the wrong feature or touching restricted files. Provides clear review notes if direction needs tweaking.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedPillar === 1 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-700" />
                  Improvement 1: Progress Journal & Auto-Heartbeats
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Solves the 15-minute claim expiration problem. Agents log milestone heartbeats to prove they are actively working.
                </p>
              </div>
              <span className="text-xs font-mono bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full">
                Interactive Sandbox
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Live Agent Journal Feed
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {journalEntries.map((j, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-mono text-teal-700 font-semibold">{j.type.toUpperCase()}</span>
                        <span>{j.time}</span>
                      </div>
                      <p className="text-slate-800">{j.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddJournal} className="flex gap-2">
                  <input
                    type="text"
                    value={newJournalText}
                    onChange={(e) => setNewJournalText(e.target.value)}
                    placeholder="Log agent progress update..."
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-teal-700 px-4 text-xs font-medium text-white transition hover:bg-teal-800"
                  >
                    <Send className="w-3.5 h-3.5" /> Post
                  </button>
                </form>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <h4 className="font-semibold text-slate-900">Why this matters:</h4>
                <p className="text-slate-600 leading-relaxed">
                  In Ziki today, if an agent doesn’t ping within 15 minutes, claim sweepers release the claim and the agent’s work is discarded.
                </p>
                <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 space-y-1 text-[11px]">
                  <strong className="block font-semibold">Automatic Lease Extension</strong>
                  Each verified journal entry automatically resets the 60-minute claim lease timer without requiring manual owner intervention.
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPillar === 2 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PauseCircle className="w-5 h-5 text-teal-700" />
                  Improvement 2: Pause & Resume Mechanism
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Safely freeze an in-flight issue claim without cancellation while human specifications or blocker questions are being clarified.
                </p>
              </div>
              <span className="text-xs font-mono bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full">
                Interactive State Toggle
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-mono">Simulated Issue: ENDOR-104</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${isPaused ? 'bg-amber-500 animate-pulse' : 'bg-teal-600'}`} />
                    <strong className="text-sm text-slate-900 capitalize">
                      {isPaused ? 'CLAIM PAUSED (Timer Frozen)' : 'CLAIM ACTIVE (Running)'}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-xs font-medium transition ${
                    isPaused
                      ? 'bg-teal-700 text-white hover:bg-teal-800'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
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
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <p className="font-semibold text-amber-900">Pause Reason Stored on Ticket:</p>
                  <p className="text-amber-800 font-mono">{pauseReason}</p>
                  <p className="text-[11px] text-amber-700 pt-1">
                    ✓ Claim sweep dispatcher excludes paused tickets from automatic timeout release.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedPillar === 3 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-teal-700" />
                  Improvement 3: Question Inbox + SLA Availability
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Eliminates silent agent stalls by creating a prioritized triage board for blockers with clear human response SLAs.
                </p>
              </div>
              <span className="text-xs font-mono bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full">
                Interactive Triage Board
              </span>
            </div>

            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        q.urgency === 'high' ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {q.urgency} Urgency
                      </span>
                      <span className="text-slate-600">Asked by {q.agent}</span>
                    </div>

                    <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" /> SLA: {q.slaMinutes}m remaining
                    </span>
                  </div>

                  <p className="text-slate-800 font-medium">{q.question}</p>

                  {q.answered ? (
                    <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-[11px] flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span><strong>Sarah (Owner):</strong> {q.answer}</span>
                    </div>
                  ) : (
                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                        placeholder="Type answer to unblock Sentinel-AI..."
                        className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                      />
                      <button
                        onClick={() => handleAnswerQuestion(q.id)}
                        className="h-8 px-4 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-full text-xs"
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
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Complete Suite Comparison Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider bg-slate-50/70">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Improvement</th>
                <th className="py-2.5 px-3">What it gives the Human</th>
                <th className="py-2.5 px-3">What it gives the Agent</th>
                <th className="py-2.5 px-3">Rollout Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="bg-teal-50/30">
                <td className="py-3 px-3 font-mono font-bold text-teal-700">0</td>
                <td className="py-3 px-3 font-semibold text-slate-900">Work Proposals</td>
                <td className="py-3 px-3">Approve the plan before code is written</td>
                <td className="py-3 px-3">Clear go-ahead so it doesn’t build wrong thing</td>
                <td className="py-3 px-3 font-mono text-teal-800 font-semibold">Priority 1 (The Gate)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-slate-500">1</td>
                <td className="py-3 px-3 font-semibold text-slate-900">Progress Journal</td>
                <td className="py-3 px-3">Sees short status updates while work is happening</td>
                <td className="py-3 px-3">Say &quot;still working&quot; without claim expiring</td>
                <td className="py-3 px-3 font-mono text-slate-500">Priority 2</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-slate-500">2</td>
                <td className="py-3 px-3 font-semibold text-slate-900">Pause & Resume</td>
                <td className="py-3 px-3">Can freeze work temporarily without cancelling</td>
                <td className="py-3 px-3">Claim safety while human clarifies specs</td>
                <td className="py-3 px-3 font-mono text-slate-500">Priority 3</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-mono font-bold text-slate-500">3</td>
                <td className="py-3 px-3 font-semibold text-slate-900">Question Inbox</td>
                <td className="py-3 px-3">Triage list of agent questions with SLAs</td>
                <td className="py-3 px-3">Predictable owner response times</td>
                <td className="py-3 px-3 font-mono text-slate-500">Priority 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
