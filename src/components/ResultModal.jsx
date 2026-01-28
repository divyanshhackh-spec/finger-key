import React from 'react';
import { Trophy } from 'lucide-react';

export default function ResultModal({ wpm, accuracy, isDark, card, border }) {
    const statBox = isDark ? 'bg-gray-700' : 'bg-gray-100';
    
    return (
        <div className={`${card} p-8 rounded-xl border ${border} shadow-2xl text-center`}>
            <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg opacity-70 mb-6">You've completed the typing test</p>
            
            <div className="grid grid-cols-2 gap-4">
                <div className={`${statBox} p-4 rounded-lg`}>
                    <div className="text-4xl font-bold text-blue-500">{wpm}</div>
                    <div className="text-sm opacity-70">Words Per Minute</div>
                </div>
                <div className={`${statBox} p-4 rounded-lg`}>
                    <div className="text-4xl font-bold text-green-500">{accuracy}%</div>
                    <div className="text-sm opacity-70">Accuracy</div>
                </div>
            </div>
        </div>
    );
}