import React from 'react';
import { Moon, Sun, Settings, Volume2, VolumeX } from 'lucide-react';

export default function Header({
  isDark,
  toggleTheme,
  settingsOpen,
  toggleSettings,
  soundOn,
  toggleSound,
}) {
  const baseBtn =
    'relative inline-flex items-center justify-center rounded-xl border text-xs font-medium transition-colors transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';
  const iconSize = 'h-4 w-4';

  const btnClass = isDark
    ? `${baseBtn} border-white/5 bg-slate-900/80 text-slate-300 hover:border-red-500/40 hover:bg-slate-900 hover:text-red-200`
    : `${baseBtn} border-slate-200 bg-white text-slate-700 hover:border-red-400 hover:bg-red-50 hover:text-red-700`;

  const activeBtnClass = isDark
    ? 'border-red-500/60 bg-red-500/15 text-red-200'
    : 'border-red-500/70 bg-red-50 text-red-700';

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        className={`${btnClass} px-2.5 py-2 hover:scale-[1.03] active:scale-[0.97]`}
        aria-label={soundOn ? 'Mute sound' : 'Unmute sound'}
      >
        {soundOn ? (
          <Volume2 className={iconSize} />
        ) : (
          <VolumeX className={iconSize} />
        )}
      </button>

      {/* Settings toggle */}
      <button
        onClick={toggleSettings}
        className={`${btnClass} px-2.5 py-2 hover:scale-[1.03] active:scale-[0.97] ${
          settingsOpen ? activeBtnClass : ''
        }`}
        aria-label="Open settings"
      >
        <Settings className={iconSize} />
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`${btnClass} px-2.5 py-2 hover:scale-[1.03] active:scale-[0.97]`}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className={`${iconSize} text-amber-300`} />
        ) : (
          <Moon className={`${iconSize} text-slate-700`} />
        )}
      </button>
    </div>
  );
}
