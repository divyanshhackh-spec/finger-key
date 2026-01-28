export const getRandomText = (difficulty, modes) => {
    const textsForMode = modes[difficulty].texts;
    const randomIdx = Math.floor(Math.random() * textsForMode.length);
    return textsForMode[randomIdx];
};

export const calculateAccuracy = (typed, target) => {
    if (typed.length === 0) return 100;
    
    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === target[i]) {
            correctChars++;
        }
    }
    
    return Math.round((correctChars / typed.length) * 100);
};

export const calculateWPM = (text, startTime) => {
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const wordCount = text.split(' ').length; // Fixed: was split('') which counts characters
    return Math.round(wordCount / elapsedMinutes);
};