import React from 'react';
import { motion } from 'framer-motion';

export default function TypingArea({
  text,
  input,
  isDone,
  isDark,
  card,
  border,
  inputRef,
  onChange,
  getCharColor,
}) {
  const containerBase = `${card} rounded-2xl border ${border} shadow-[0_26px_80px_rgba(0,0,0,0.9)]`;
  const headerText = isDone
    ? 'Completed run'
    : input.length === 0
    ? 'Ready when you are'
    : 'In progress';

  const statusColor = isDone
    ? 'bg-emerald-500/10 text-emerald-300'
    : input.length === 0
    ? 'bg-slate-800/90 text-slate-400'
    : 'bg-red-500/10 text-red-300';

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`${containerBase} relative overflow-hidden p-5 sm:p-6`}
    >
      {/* subtle background sheen */}
      <div className="pointer-events-none absolute inset-px rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.07),transparent_55%)]" />

      <div className="relative flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900/80 text-xs text-slate-300">
            ⌨️
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-300">
              Live typing test
            </span>
            <span className="text-[11px] text-slate-500">
              Type the prompt below as cleanly as possible.
            </span>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusColor}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {headerText}
        </span>
      </div>

      {/* Target text panel */}
      <div className="relative mb-4 rounded-xl border border-slate-800/80 bg-slate-950/90 px-3 py-3 text-[15px] leading-relaxed font-mono text-slate-400 select-none">
        <div className="mb-2 flex items-center justify-between text-[10px] text-slate-500">
          <span>Prompt</span>
          <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
            {text.length} chars
          </span>
        </div>
        <div className="text-[15px] leading-relaxed">
          {text.split('').map((char, i) => (
            <span key={i} className={getCharColor(i)}>
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Input field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={onChange}
          disabled={isDone}
          className={`w-full rounded-xl border-2 px-3 py-3 text-[15px] font-mono outline-none transition-colors transition-shadow duration-150 ${
            isDark
              ? 'bg-slate-900/90 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/40'
              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/40'
          } ${isDone ? 'opacity-75 cursor-not-allowed' : ''}`}
          placeholder={
            isDone
              ? 'Test completed! Click “New Test” to try again.'
              : 'Start typing here...'
          }
        />
        {!isDone && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
            Press keys to begin
          </span>
        )}
      </div>
    </motion.section>
  );
}
