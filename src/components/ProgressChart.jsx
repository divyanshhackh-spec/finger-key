import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TEXT_MODES } from '../constants/textModes';

export default function ProgressChart({ history, isDark, card, border }) {
    const hasHistory = history && history.length > 0;
    
    return (
        <div className={`${card} p-6 rounded-xl border ${border} shadow-lg`}>
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-bold">Progress</h3>
            </div>
            
            {hasHistory ? (
                <>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={history}>
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke={isDark ? '#374151' : '#e5e7eb'} 
                            />
                            <XAxis 
                                dataKey="date" 
                                tickFormatter={(date) => {
                                    const d = new Date(date);
                                    return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
                                }}
                                stroke={isDark ? '#9ca3af' : '#6b7280'}
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis 
                                stroke={isDark ? '#9ca3af' : '#6b7280'} 
                                style={{ fontSize: '12px' }} 
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: isDark ? '#1f2937' : '#fff',
                                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                                    borderRadius: '8px'
                                }}
                                labelFormatter={(date) => new Date(date).toLocaleString()}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="wpm" 
                                stroke="#3b82f6" 
                                strokeWidth={2} 
                                dot={{ r: 4 }} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    
                    {/* Recent tests list */}
                    <div className="mt-4 space-y-2">
                        <h4 className="font-semibold text-sm opacity-70">Recent Tests</h4>
                        {history.slice(-5).reverse().map((entry, idx) => (
                            <div 
                                key={idx} 
                                className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-blue-500">{entry.wpm} WPM</span>
                                    <span className="text-sm opacity-70">{entry.accuracy}%</span>
                                </div>
                                <div className="text-xs opacity-50 mt-1">
                                    {TEXT_MODES[entry.difficulty]?.name || 'Unknown'} • {new Date(entry.date).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-8 opacity-50">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p>Complete a test to see your progress!</p>
                </div>
            )}
        </div>
    );
}