import React from 'react';
import { Trophy } from 'lucide-react';

export default function ResultModal({ wpm, accuracy, isDark, card, border }) {
  const statBoxBase =
    'rounded-2xl p-4 border text-left shadow-[0_18px_45px_rgba(0,0,0,0.75)]';
  const statBox = isDark
    ? `${statBoxBase} border-white/5 bg-slate-900/90`
    : `${statBoxBase} border-slate-200 bg-white`;

  return (
    <div
      className={`${card} relative mt-4 rounded-2xl border ${border} p-6 text-left shadow-[0_26px_80px_rgba(0,0,0,0.9)] bg-gradient-to-br from-slate-950/95 via-slate-950/85 to-slate-900/85`}
    >
      {/* subtle background accent */}
      <div className="pointer-events-none absolute inset-px rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.1),transparent_55%)]" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-[0_18px_45px_rgba(0,0,0,0.8)]">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-50">
              Run completed
            </h2>
            <p className="text-sm text-slate-400">
              Great job! Review your performance and start a new test to
              iterate on your score.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Session saved to history
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={statBox}>
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            <span>Speed</span>
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] text-red-300">
              WPM
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight text-slate-50">
              {wpm}
            </span>
            <span className="text-xs text-slate-500">words/min</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            Higher WPM means faster typing over the same duration.
          </p>
        </div>

        <div className={statBox}>
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            <span>Accuracy</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
              %
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight text-slate-50">
              {accuracy}
            </span>
            <span className="text-xs text-slate-500">correct</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            Aim for consistency above 95% before pushing speed.
          </p>
        </div>
      </div>
    </div>
  );
}
