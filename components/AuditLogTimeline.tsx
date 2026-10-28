'use client';

import React from 'react';
import { AuditEvent } from '@/types/proposal';
import { History, Shield, Bot, UserCheck, CheckCircle2 } from 'lucide-react';

interface AuditLogTimelineProps {
  logs: AuditEvent[];
}

export function AuditLogTimeline({ logs }: AuditLogTimelineProps) {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-semibold text-white">Immutable Activity & Audit Trail</h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
          Ziki Activity Table Sync
        </span>
      </div>

      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800 before:z-0">
        {logs.map((log) => {
          let badgeStyles = 'bg-slate-800 text-slate-300';
          if (log.badgeColor === 'blue') badgeStyles = 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
          if (log.badgeColor === 'emerald') badgeStyles = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
          if (log.badgeColor === 'amber') badgeStyles = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
          if (log.badgeColor === 'rose') badgeStyles = 'bg-rose-500/10 text-rose-400 border border-rose-500/20';

          return (
            <div key={log.id} className="relative z-10 flex items-start gap-3 text-xs">
              <div className="w-7 h-7 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                {log.actorType === 'agent' ? (
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                ) : log.actorType === 'human' ? (
                  <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
              <div className="flex-1 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{log.actor}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${badgeStyles}`}>
                      {log.action}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                </div>
                <p className="text-slate-400 leading-relaxed font-sans">{log.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
