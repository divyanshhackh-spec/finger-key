import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
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
            return isDark ? 'text-gray-500' : 'text-gray-400';
        }
        
        const isCorrect = userInput[idx] === targetText[idx];
        if (isCorrect) {
            return isDark ? 'text-green-400' : 'text-green-600';
        }
        
        return isDark ? 'text-red-400' : 'text-red-600';
    };

    // Theme classes
    const bg = isDark ? 'bg-gray-900' : 'bg-gray-50';
    const card = isDark ? 'bg-gray-800' : 'bg-white';
    const txt = isDark ? 'text-white' : 'text-gray-900';
    const border = isDark ? 'border-gray-700' : 'border-gray-200';

    return (
        <div className={`min-h-screen ${bg} ${txt} transition-colors duration-300`}>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Header 
                    isDark={isDark}
                    toggleTheme={() => setIsDark(!isDark)}
                    settingsOpen={settingsOpen}
                    toggleSettings={() => setSettingsOpen(!settingsOpen)}
                    soundOn={soundOn}
                    toggleSound={() => setSoundOn(!soundOn)}
                />
                
                {settingsOpen && (
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
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <StatsCards
                            wpm={wordsPerMin}
                            accuracy={accuracyPercent}
                            time={seconds}
                            card={card}
                            border={border}
                        />
                        
                        {/* Mode indicator */}
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                            }`}>
                                {usingCustom ? '✏️ Custom' : `${TEXT_MODES[mode].name} Mode`}
                            </span>
                        </div>
                        
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

                        {isDone && (
                            <ResultModal
                                wpm={wordsPerMin}
                                accuracy={accuracyPercent}
                                isDark={isDark}
                                card={card}
                                border={border}
                            />
                        )}

                        <button
                            onClick={startNewTest}
                            className={`w-full flex items-center justify-center gap-2 p-4 rounded-xl text-white font-semibold transition-colors shadow-lg ${
                                isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            <RotateCcw className="w-5 h-5" />
                            New Test
                        </button>
                    </div>

                    <div className="lg:col-span-1">
                        <ProgressChart
                            history={testHistory}
                            isDark={isDark}
                            card={card}
                            border={border}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center opacity-50 text-sm">
                    {!hasStarted && "💡 Tip: Focus on accuracy first, speed will come naturally"}
                    {hasStarted && !isDone && "⌨️ Keep typing! You're doing great"}
                    {isDone && "🎉 Amazing work! Try again to beat your score"}
                </div>
            </div>
        </div>
    );
}