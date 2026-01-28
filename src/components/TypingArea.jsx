import React from 'react';

export default function TypingArea({ text, input, isDone, isDark, card, border, inputRef, onChange, getCharColor }) {
    return (
        <div className={`${card} p-8 rounded-xl border ${border} shadow-2xl`}>
            {/* Display text to type */}
            <div className="mb-6 text-2xl leading-relaxed font-mono select-none">
                {text.split('').map((char, i) => (
                    <span key={i} className={getCharColor(i)}>
                        {char}
                    </span>
                ))}
            </div>

            {/* Input field */}
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={onChange}
                disabled={isDone}
                className={`w-full p-4 text-lg rounded-lg border-2 outline-none transition-colors font-mono ${
                    isDark
                        ? 'bg-gray-700 border-gray-600 focus:border-blue-500'
                        : 'bg-gray-50 border-gray-300 focus:border-blue-500'
                }`}
                placeholder={isDone ? "Test completed! Click reset to try again." : "Start typing here..."}
            />
        </div>
    );
}