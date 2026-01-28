import React from 'react';
import { TEXT_MODES } from '../constants/textModes';

export default function SettingsPanel({
    isDark,
    card,
    border,
    currentMode,
    changeMode,
    usingCustom,
    setUsingCustom,
    customText,
    setCustomText,
    onSubmitCustom
}) {
    return (
        <div className={`${card} p-6 rounded-xl border ${border} shadow-lg mb-6`}>
            <h3 className="text-xl font-bold mb-4">Settings</h3>

            {/* Difficulty selector */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Difficulty & Mode</label>
                <div className="grid grid-cols-3 gap-2">
                    {Object.keys(TEXT_MODES).map((modeKey) => {
                        const isActive = currentMode === modeKey && !usingCustom;
                        
                        return (
                            <button
                                key={modeKey}
                                onClick={() => {
                                    changeMode(modeKey);
                                    setUsingCustom(false);
                                }}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                    isActive
                                        ? isDark
                                            ? 'border-blue-500 bg-blue-600/20'
                                            : 'border-blue-500 bg-blue-100'
                                        : isDark
                                            ? 'border-gray-700 hover:border-gray-600'
                                            : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                {TEXT_MODES[modeKey].name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Custom text input */}
            <div>
                <label className="block mb-2 font-semibold">Custom Text</label>
                <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className={`w-full p-3 rounded-lg border-2 outline-none mb-2 ${
                        isDark
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-gray-50 border-gray-300'
                    }`}
                    rows="3"
                    placeholder="Enter your own text (minimum 20 characters)..."
                />
                <button
                    onClick={onSubmitCustom}
                    className={`w-full p-3 rounded-lg text-white font-semibold transition-colors ${
                        isDark
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                    Use Custom Text
                </button>
            </div>
        </div>
    );
}