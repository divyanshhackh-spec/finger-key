import React from 'react';
import { Zap, Target, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsCards({ wpm, accuracy, time, card, border }) {
  const baseCard = `${card} rounded-2xl border ${border} p-4 shadow-[0_22px_60px_rgba(0,0,0,0.75)] bg-gradient-to-br from-slate-950/95 via-slate-950/80 to-slate-900/80`;

  const metrics = [
    {
      label: 'Words per minute',
      short: 'WPM',
      icon: Zap,
      iconBg: 'bg-red-500/15 text-red-300',
      value: wpm,
      unit: '',
      helper: 'Live speed over this test.',
    },
    {
      label: 'Accuracy',
      short: 'ACC',
      icon: Target,
      iconBg: 'bg-emerald-500/15 text-emerald-300',
      value: `${accuracy}%`,
      unit: '',
      helper: 'Correct characters vs total.',
    },
    {
      label: 'Duration',
      short: 'TIME',
      icon: Trophy,
      iconBg: 'bg-amber-500/15 text-amber-300',
      value: `${time}s`,
      unit: '',
      helper: 'Time spent on this run.',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((m) => (
        <motion.div
          key={m.short}
          whileHover={{ y: -2, scale: 1.01 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={`${baseCard} relative overflow-hidden`}
        >
          {/* subtle top red sheen on hover */}
          <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-b from-red-500/7 via-transparent to-transparent opacity-0 transition-opacity hover:opacity-100" />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <div
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-xl text-xs ${m.iconBg}`}
                >
                  <m.icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    {m.short}
                  </span>
                  <span className="text-xs text-slate-400">{m.label}</span>
                </div>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-semibold tracking-tight text-slate-50">
                  {m.value}
                </span>
                {m.unit && (
                  <span className="text-xs text-slate-500">{m.unit}</span>
                )}
              </div>
            </div>

            <div className="mt-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium text-slate-400">
              Live
            </div>
          </div>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />
          <p className="mt-2 text-[11px] text-slate-500">{m.helper}</p>
        </motion.div>
      ))}
    </div>
  );
}
