import React from 'react';
import { Moon, Sun, Settings, Volume2, VolumeX } from 'lucide-react';

export default function Header({ isDark, toggleTheme, settingsOpen, toggleSettings, soundOn, toggleSound }) {
    const btnClass = `p-2 rounded-lg transition-colors ${
        isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
    }`;

    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Finger Keyboard</h1>
            </div>
            
            <div className="flex gap-2">
                <button onClick={toggleSound} className={btnClass}>
                    {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleSettings} className={btnClass}>
                    <Settings className="w-5 h-5" />
                </button>
                <button onClick={toggleTheme} className={btnClass}>
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
}