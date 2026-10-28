'use client';

import React from 'react';
import { AuditEvent } from '@/types/proposal';
import { History, Shield, Bot, UserCheck } from 'lucide-react';

interface AuditLogTimelineProps {
  logs: AuditEvent[];
}

export function AuditLogTimeline({ logs }: AuditLogTimelineProps) {
  return (
    <section
      aria-label="Agent decisions and proposal audit trail"
      className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Agent Decisions & Activity Feed (Activity Model)
        </h3>
        <span className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
          Shared Audit Trail
        </span>
      </div>

      <ol className="relative mt-5 space-y-0 border-l border-slate-200 pl-4 sm:pl-5">
        {logs.map((log) => {
          let dotColor = 'bg-teal-600';
          let badgeBg = 'bg-slate-100 text-slate-700';

          if (log.badgeColor === 'teal') {
            dotColor = 'bg-teal-600';
            badgeBg = 'bg-teal-50 text-teal-800 border-teal-200';
          } else if (log.badgeColor === 'amber') {
            dotColor = 'bg-amber-500';
            badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
          } else if (log.badgeColor === 'rose') {
            dotColor = 'bg-rose-500';
            badgeBg = 'bg-rose-50 text-rose-800 border-rose-200';
          } else if (log.badgeColor === 'emerald') {
            dotColor = 'bg-emerald-600';
            badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
          }

          return (
            <li key={log.id} className="relative pb-5 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[1.2rem] sm:-left-[1.45rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white ${dotColor}`}
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-900">{log.actor}</span>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badgeBg}`}>
                    {log.action}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">{log.timestamp}</span>
              </div>

              <p className="mt-1 text-sm text-slate-700 leading-relaxed font-sans">
                {log.details}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
