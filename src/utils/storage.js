const STORAGE_KEY = 'typingHistory';
const MAX_HISTORY_ITEMS = 10;

export const loadHistory = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Failed to load history:', err);
        return [];
    }
};

export const saveToHistory = (currentHistory, wpm, acc, diff) => {
    try {
        const entry = {
            wpm: wpm,
            accuracy: acc,
            difficulty: diff,
            date: new Date().toISOString()
        };
        
        // Keep only last 10 entries
        const updated = [...currentHistory, entry].slice(-MAX_HISTORY_ITEMS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        
        return updated;
    } catch (err) {
        console.error('Failed to save history:', err);
        return currentHistory;
    }
};