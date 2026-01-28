// app.jsx
import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import StatsCards from './components/StatsCards';
import TypingArea from './components/TypingArea';
import ResultModal from './components/ResultModal';
import ProgressChart from './components/ProgressChart';
import { TEXT_MODES } from './constants/textModes';
import { playSound } from './utils/audio';
import { loadHistory, saveToHistory } from './utils/storage';
import { getRandomText, calculateAccuracy, calculateWPM } from './utils/textUtils';

export default function TypingSpeedTest() {
  const [isDark, setIsDark] = useState(true);
  const [mode, setMode] = useState('medium');
  const [targetText, setTargetText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [testStartTime, setTestStartTime] = useState(null);
  const [wordsPerMin, setWordsPerMin] = useState(0);
  const [accuracyPercent, setAccuracyPercent] = useState(100);
  const [seconds, setSeconds] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userCustomText, setUserCustomText] = useState('');
  const [usingCustom, setUsingCustom] = useState(false);
  const [testHistory, setTestHistory] = useState([]);
  const [soundOn, setSoundOn] = useState(true);

  const typingInput = useRef(null);
  const audioCtx = useRef(null);

  // Load saved data when app starts
  useEffect(() => {
    startNewTest();
    const saved = loadHistory();
    if (saved && saved.length > 0) {
      setTestHistory(saved);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let timer;
    if (hasStarted && !isDone && testStartTime) {
      timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - testStartTime) / 1000);
        setSeconds(elapsed);
      }, 100);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [hasStarted, isDone, testStartTime]);

  // Reset test when difficulty changes
  useEffect(() => {
    if (!usingCustom) {
      startNewTest();
    }
  }, [mode]);

  const startNewTest = () => {
    let textToUse;

    if (usingCustom && userCustomText.trim()) {
      textToUse = userCustomText.trim();
    } else {
      textToUse = getRandomText(mode, TEXT_MODES);
    }

    setTargetText(textToUse);
    setUserInput('');
    setHasStarted(false);
    setIsDone(false);
    setTestStartTime(null);
    setWordsPerMin(0);
    setAccuracyPercent(100);
    setSeconds(0);

    // Auto-focus the input field
    setTimeout(() => {
      if (typingInput.current) {
        typingInput.current.focus();
      }
    }, 100);
  };

  const onTyping = (e) => {
    const typed = e.target.value;

    // Start timer on first keypress
    if (!hasStarted) {
      setHasStarted(true);
      setTestStartTime(Date.now());
    }

    // Play typing sound (if enabled)
    playSound(audioCtx, 400, 0.05, soundOn);

    setUserInput(typed);

    // Calculate accuracy in real-time
    const currentAccuracy = calculateAccuracy(typed, targetText);
    setAccuracyPercent(currentAccuracy);

    // Check if test is complete
    if (typed.length === targetText.length) {
      setIsDone(true);

      // Calculate final WPM
      const finalWPM = calculateWPM(targetText, testStartTime);
      setWordsPerMin(finalWPM);

      // Save to history
      const updatedHist = saveToHistory(testHistory, finalWPM, currentAccuracy, mode);
      setTestHistory(updatedHist);

      // Play success sound
      playSound(audioCtx, 800, 0.3, soundOn);
    }
  };

  const submitCustomText = () => {
    const trimmed = userCustomText.trim();

    if (trimmed.length < 20) {
      alert('Text needs to be at least 20 characters!');
      return;
    }

    setTargetText(trimmed);
    setUsingCustom(true);
    setSettingsOpen(false);
  };

  // Determine character color based on correctness
  const getCharColor = (idx) => {
    if (idx >= userInput.length) {
      return isDark ? 'text-slate-500' : 'text-slate-400';
    }

    const isCorrect = userInput[idx] === targetText[idx];
    if (isCorrect) {
      return isDark ? 'text-emerald-400' : 'text-emerald-600';
    }

    // primary brand error color in dark red theme
    return isDark ? 'text-red-400' : 'text-red-600';
  };

  // Theme classes (dark is now the primary, with deep red accent)
  const bg = isDark
    ? 'bg-[#050509]'
    : 'bg-slate-50';
  const card = isDark
    ? 'bg-slate-950/80'
    : 'bg-white';
  const txt = isDark
    ? 'text-slate-50'
    : 'text-slate-900';
  const border = isDark
    ? 'border-white/5'
    : 'border-slate-200';

  return (
    <div className={`min-h-screen ${bg} ${txt} transition-colors duration-300`}>
      {/* subtle background gradients for depth */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.12),transparent_55%),radial-gradient(circle_at_bottom,_#020617,_#000000)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:py-8">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-xs font-semibold tracking-tight text-white shadow-[0_18px_45px_rgba(0,0,0,0.8)]">
                TT
              </span>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-50">
                  Typing Dashboard
                </h1>
                <p className="text-xs text-slate-400">
                  Real-time speed, accuracy, and history in a focused workspace.
                </p>
              </div>
            </div>
          </div>

          {/* Keep existing Header component but give it space like right-side controls */}
          <div className="flex items-center justify-end gap-3">
            <Header
              isDark={isDark}
              toggleTheme={() => setIsDark(!isDark)}
              settingsOpen={settingsOpen}
              toggleSettings={() => setSettingsOpen(!settingsOpen)}
              soundOn={soundOn}
              toggleSound={() => setSoundOn(!soundOn)}
            />
          </div>
        </motion.div>

        {/* Settings panel */}
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-5"
          >
            <div
              className={`rounded-2xl border ${border} bg-gradient-to-br from-slate-950/95 via-slate-950/80 to-slate-900/80 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.85)]`}
            >
              <SettingsPanel
                isDark={isDark}
                card={card}
                border={border}
                currentMode={mode}
                changeMode={setMode}
                usingCustom={usingCustom}
                setUsingCustom={setUsingCustom}
                customText={userCustomText}
                setCustomText={setUserCustomText}
                onSubmitCustom={submitCustomText}
              />
            </div>
          </motion.div>
        )}

        {/* Main grid */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
          className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3"
        >
          <div className="space-y-6 lg:col-span-2">
            {/* Stats cards */}
            <StatsCards
              wpm={wordsPerMin}
              accuracy={accuracyPercent}
              time={seconds}
              card={card}
              border={border}
            />

            {/* Mode indicator as a badge row */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                  isDark
                    ? 'bg-red-500/10 text-red-300 ring-1 ring-red-500/40'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]" />
                {usingCustom ? '✏️ Custom text' : `${TEXT_MODES[mode].name} mode`}
              </span>
              <span className="text-[11px] text-slate-500">
                Optimized for consistent practice sessions.
              </span>
            </div>

            {/* Typing area */}
            <TypingArea
              text={targetText}
              input={userInput}
              isDone={isDone}
              isDark={isDark}
              card={card}
              border={border}
              inputRef={typingInput}
              onChange={onTyping}
              getCharColor={getCharColor}
            />

            {/* Result modal */}
            {isDone && (
              <ResultModal
                wpm={wordsPerMin}
                accuracy={accuracyPercent}
                isDark={isDark}
                card={card}
                border={border}
              />
            )}

            {/* New Test CTA */}
            <motion.button
              onClick={startNewTest}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 35px rgba(248,113,113,0.25)',
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 p-4 text-sm font-semibold tracking-tight text-white shadow-[0_22px_60px_rgba(0,0,0,0.85)] transition-colors hover:from-red-400 hover:via-red-500 hover:to-red-400"
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(248,250,252,0.18),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100" />
              <RotateCcw className="relative h-5 w-5" />
              <span className="relative">New Test</span>
            </motion.button>
          </div>

          {/* Right column: Progress chart */}
          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`rounded-2xl border ${border} bg-gradient-to-br from-slate-950 via-slate-950/90 to-slate-900/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.85)]`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Progress trend
                  </h2>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    History of your recent test sessions.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Last {testHistory?.length || 0} runs
                </span>
              </div>

              <div className="mt-2 rounded-xl border border-slate-800/80 bg-slate-950/80 px-2 py-2">
                <ProgressChart
                  history={testHistory}
                  isDark={isDark}
                  card={card}
                  border={border}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-500">
          {!hasStarted && '💡 Tip: Focus on accuracy first, speed will follow.'}
          {hasStarted && !isDone && "⌨️ Stay in the flow — you're doing great."}
          {isDone && '🎉 Nice work! Start a new test to beat your previous score.'}
        </div>
      </div>
    </div>
  );
}
