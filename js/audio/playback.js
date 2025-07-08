/**
 * Playback Controller - High-level interface for playing scales and triads
 * Integrates with the main Scale Explorer application
 */

class ScalePlayback {
    constructor() {
        this.audioEngine = new AudioEngine();
        this.isPlaying = false;
        this.currentPlayback = null;
        
        // Default settings
        this.settings = {
            tempo: 120, // BPM for scale playback
            volume: 0.5,
            waveform: 'sine',
            chordDuration: 2.0,
            scaleDuration: 0.5
        };
    }

    /**
     * Initialize audio (call after user interaction)
     */
    async initialize() {
        await this.audioEngine.initialize();
    }

    /**
     * Calculate note duration from tempo
     * @param {number} tempo - Beats per minute
     * @returns {number} Duration in seconds
     */
    tempoToNoteDuration(tempo) {
        return 60 / tempo; // Quarter note duration
    }

    /**
     * Convert scale notes to proper octave for playback
     * @param {string[]} scaleNotes - Array of note names without octave
     * @param {number} startOctave - Starting octave number
     * @param {boolean} ascending - True for ascending, false for descending
     * @returns {string[]} Array of note names with octaves
     */
    addOctavesToScale(scaleNotes, startOctave = 4, ascending = true) {
        let currentOctave = startOctave;
        
        return scaleNotes.map((note, index) => {
            if (index === 0) {
                return `${note}${currentOctave}`;
            }
            
            const prevNote = scaleNotes[index - 1];
            const currentNote = note;
            
            // Get base note names (without sharps/flats)
            const prevBaseName = prevNote.charAt(0);
            const currentBaseName = currentNote.charAt(0);
            
            const noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
            const prevIndex = noteOrder.indexOf(prevBaseName);
            const currentIndex = noteOrder.indexOf(currentBaseName);
            
            if (ascending) {
                // For ascending: if we go backwards in the alphabet (B to C), increment octave
                if (currentIndex < prevIndex) {
                    currentOctave++;
                }
            } else {
                // For descending: if we go forwards in the alphabet (C to B), decrement octave
                if (currentIndex > prevIndex) {
                    currentOctave--;
                }
            }
            
            return `${currentNote}${currentOctave}`;
        });
    }

    /**
     * Play a complete scale ascending
     * @param {string[]} scaleNotes - Array of note names (without octaves)
     * @param {Object} options - Playback options
     * @returns {Promise} Promise that resolves when playback finishes
     */
    async playScale(scaleNotes, options = {}) {
        if (this.isPlaying) {
            this.stop();
        }

        const settings = { ...this.settings, ...options };
        const noteDuration = this.tempoToNoteDuration(settings.tempo);
        const notesWithOctaves = this.addOctavesToScale(scaleNotes, 4, true);

        this.isPlaying = true;
        
        try {
            this.currentPlayback = this.audioEngine.playSequence(
                notesWithOctaves,
                noteDuration,
                settings.volume,
                settings.waveform
            );
            
            await this.currentPlayback;
        } finally {
            this.isPlaying = false;
            this.currentPlayback = null;
        }
    }

    /**
     * Play a scale both ascending and descending
     * @param {string[]} scaleNotes - Array of note names
     * @param {Object} options - Playback options
     * @returns {Promise} Promise that resolves when playback finishes
     */
    async playScaleAscendingDescending(scaleNotes, options = {}) {
        if (this.isPlaying) {
            this.stop();
        }

        const settings = { ...this.settings, ...options };
        const noteDuration = this.tempoToNoteDuration(settings.tempo);
        
        // Calculate ascending portion
        const ascending = this.addOctavesToScale(scaleNotes, 4, true);
        
        // For descending, we want to start from the same octave as the second-to-last ascending note
        // and work our way down. Remove the duplicate root note first.
        const descendingNotes = [...scaleNotes].reverse().slice(1);
        const descending = this.addOctavesToScale(descendingNotes, 4, false);
        
        const fullScale = [...ascending, ...descending];

        this.isPlaying = true;
        
        try {
            this.currentPlayback = this.audioEngine.playSequence(
                fullScale,
                noteDuration,
                settings.volume,
                settings.waveform
            );
            
            await this.currentPlayback;
        } finally {
            this.isPlaying = false;
            this.currentPlayback = null;
        }
    }

    /**
     * Play a triad (3 notes simultaneously)
     * @param {string[]} triadNotes - Array of 3 note names
     * @param {Object} options - Playback options
     * @returns {Promise} Promise that resolves when playback finishes
     */
    async playTriad(triadNotes, options = {}) {
        if (this.isPlaying) {
            this.stop();
        }

        const settings = { ...this.settings, ...options };
        const notesWithOctaves = this.addOctavesToScale(triadNotes, 4, true);

        this.isPlaying = true;
        
        try {
            this.currentPlayback = this.audioEngine.playChord(
                notesWithOctaves,
                settings.chordDuration,
                settings.volume,
                settings.waveform
            );
            
            await this.currentPlayback;
        } finally {
            this.isPlaying = false;
            this.currentPlayback = null;
        }
    }

    /**
     * Play a triad as an arpeggio (notes in sequence)
     * @param {string[]} triadNotes - Array of 3 note names
     * @param {Object} options - Playback options
     * @returns {Promise} Promise that resolves when playback finishes
     */
    async playTriadArpeggio(triadNotes, options = {}) {
        const settings = { ...this.settings, ...options };
        const noteDuration = this.tempoToNoteDuration(settings.tempo) * 0.75; // Slightly faster for arpeggios
        
        return this.playScale(triadNotes, { ...settings, scaleDuration: noteDuration });
    }

    /**
     * Play all triad inversions in sequence
     * @param {string[]} rootTriad - Root position triad notes
     * @param {Object} options - Playback options
     * @returns {Promise} Promise that resolves when playback finishes
     */
    async playTriadInversions(rootTriad, options = {}) {
        if (rootTriad.length !== 3) {
            throw new Error('Triad must have exactly 3 notes');
        }

        // Generate inversions
        const root = [...rootTriad];
        const first = [rootTriad[1], rootTriad[2], rootTriad[0]];
        const second = [rootTriad[2], rootTriad[0], rootTriad[1]];

        // Play each inversion with a brief pause
        await this.playTriad(root, options);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        await this.playTriad(first, options);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        await this.playTriad(second, options);
    }

    /**
     * Play a single note
     * @param {string} noteName - Note name (without octave)
     * @param {Object} options - Playback options
     * @returns {Promise} Promise that resolves when playback finishes
     */
    async playNote(noteName, options = {}) {
        const settings = { ...this.settings, ...options };
        const noteWithOctave = `${noteName}4`;
        
        return this.audioEngine.playNoteName(
            noteWithOctave,
            settings.scaleDuration,
            settings.volume,
            settings.waveform
        );
    }

    /**
     * Stop current playback
     */
    stop() {
        if (this.isPlaying) {
            this.audioEngine.stopAll();
            this.isPlaying = false;
            this.currentPlayback = null;
        }
    }

    /**
     * Update playback settings
     * @param {Object} newSettings - Settings to update
     */
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.audioEngine.setVolume(this.settings.volume);
    }

    /**
     * Get current settings
     * @returns {Object} Current settings
     */
    getSettings() {
        return { ...this.settings };
    }

    /**
     * Check if audio is currently playing
     * @returns {boolean} True if playing
     */
    getIsPlaying() {
        return this.isPlaying;
    }
}

// Export for use in other modules
window.ScalePlayback = ScalePlayback;
