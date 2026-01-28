import React from 'react';
import { Zap, Target, Trophy } from 'lucide-react';

export default function StatsCards({ wpm, accuracy, time, card, border }) {
    const cardStyle = `${card} p-4 rounded-xl border ${border} shadow-lg`;
    
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className={cardStyle}>
                <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-sm opacity-70">WPM</span>
                </div>
                <div className="text-3xl font-bold">{wpm}</div>
            </div>
            
            <div className={cardStyle}>
                <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-sm opacity-70">Accuracy</span>
                </div>
                <div className="text-3xl font-bold">{accuracy}%</div>
            </div>
            
            <div className={cardStyle}>
                <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm opacity-70">Time</span>
                </div>
                <div className="text-3xl font-bold">{time}s</div>
            </div>
        </div>
    );
}
