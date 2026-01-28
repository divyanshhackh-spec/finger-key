export const createAudioContext = () => {
    return new (window.AudioContext || window.webkitAudioContext)(); // Fixed typo: was "nrw"
};

export const playSound = (audioCtxRef, freq, dur, enabled) => {
    if (!enabled) return;
    
    try {
        if (!audioCtxRef.current) {
            audioCtxRef.current = createAudioContext();
        }
        
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + dur);
    } catch (err) {
        // Audio might not be supported in some browsers
        console.log('Audio not available:', err);
    }
};