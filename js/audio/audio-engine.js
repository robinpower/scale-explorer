/**
 * Audio Engine - Web Audio API wrapper for musical note generation
 * Handles AudioContext creation, note frequency calculations, and sound synthesis
 */

class AudioEngine {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the audio context (must be called after user interaction)
     */
    async initialize() {
        if (this.isInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create master gain node for volume control
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0.3; // Default volume
            
            this.isInitialized = true;
            console.log('Audio engine initialized');
        } catch (error) {
            console.error('Failed to initialize audio engine:', error);
            throw error;
        }
    }

    /**
     * Convert note name to MIDI note number
     * @param {string} noteName - Note name like "C4", "F#5", "Bb3"
     * @returns {number} MIDI note number (0-127)
     */
    noteNameToMidi(noteName) {
        const noteMap = {
            'C': 0, 'C#': 1, 'Db': 1,
            'D': 2, 'D#': 3, 'Eb': 3,
            'E': 4,
            'F': 5, 'F#': 6, 'Gb': 6,
            'G': 7, 'G#': 8, 'Ab': 8,
            'A': 9, 'A#': 10, 'Bb': 10,
            'B': 11
        };

        // Parse note name (e.g., "C#4" -> note="C#", octave=4)
        const match = noteName.match(/^([A-G][#b]?)(\d+)$/);
        if (!match) {
            throw new Error(`Invalid note name: ${noteName}`);
        }

        const [, note, octaveStr] = match;
        const octave = parseInt(octaveStr);
        
        return (octave + 1) * 12 + noteMap[note];
    }

    /**
     * Convert MIDI note number to frequency in Hz
     * @param {number} midiNote - MIDI note number (0-127)
     * @returns {number} Frequency in Hz
     */
    midiToFrequency(midiNote) {
        // A4 (MIDI 69) = 440 Hz
        return 440 * Math.pow(2, (midiNote - 69) / 12);
    }

    /**
     * Convert note name directly to frequency
     * @param {string} noteName - Note name like "C4", "F#5"
     * @returns {number} Frequency in Hz
     */
    noteNameToFrequency(noteName) {
        const midiNote = this.noteNameToMidi(noteName);
        return this.midiToFrequency(midiNote);
    }

    /**
     * Play a single note with specified parameters
     * @param {number} frequency - Frequency in Hz
     * @param {number} duration - Duration in seconds
     * @param {number} volume - Volume (0.0 to 1.0)
     * @param {string} waveform - Waveform type ('sine', 'square', 'sawtooth', 'triangle')
     * @returns {Promise} Promise that resolves when note finishes
     */
    async playNote(frequency, duration = 1.0, volume = 0.5, waveform = 'sine') {
        if (!this.isInitialized) {
            await this.initialize();
        }

        return new Promise((resolve) => {
            const currentTime = this.audioContext.currentTime;
            
            // Create oscillator for the note
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Configure oscillator
            oscillator.type = waveform;
            oscillator.frequency.setValueAtTime(frequency, currentTime);
            
            // Configure envelope (ADSR-like)
            const attackTime = 0.01;
            const decayTime = 0.1;
            const sustainLevel = volume * 0.8;
            const releaseTime = 0.2;
            
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, currentTime + attackTime);
            gainNode.gain.linearRampToValueAtTime(sustainLevel, currentTime + attackTime + decayTime);
            gainNode.gain.setValueAtTime(sustainLevel, currentTime + duration - releaseTime);
            gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
            
            // Connect nodes
            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            // Start and stop
            oscillator.start(currentTime);
            oscillator.stop(currentTime + duration);
            
            // Clean up when finished
            oscillator.onended = () => {
                oscillator.disconnect();
                gainNode.disconnect();
                resolve();
            };
        });
    }

    /**
     * Play a note by name
     * @param {string} noteName - Note name like "C4", "F#5"
     * @param {number} duration - Duration in seconds
     * @param {number} volume - Volume (0.0 to 1.0)
     * @param {string} waveform - Waveform type
     * @returns {Promise} Promise that resolves when note finishes
     */
    async playNoteName(noteName, duration = 1.0, volume = 0.5, waveform = 'sine') {
        const frequency = this.noteNameToFrequency(noteName);
        return this.playNote(frequency, duration, volume, waveform);
    }

    /**
     * Play multiple notes simultaneously (chord)
     * @param {string[]} noteNames - Array of note names
     * @param {number} duration - Duration in seconds
     * @param {number} volume - Volume per note (0.0 to 1.0)
     * @param {string} waveform - Waveform type
     * @returns {Promise} Promise that resolves when all notes finish
     */
    async playChord(noteNames, duration = 2.0, volume = 0.3, waveform = 'sine') {
        const promises = noteNames.map(noteName => 
            this.playNoteName(noteName, duration, volume, waveform)
        );
        return Promise.all(promises);
    }

    /**
     * Play notes in sequence (melody/scale)
     * @param {string[]} noteNames - Array of note names
     * @param {number} noteDuration - Duration per note in seconds
     * @param {number} volume - Volume (0.0 to 1.0)
     * @param {string} waveform - Waveform type
     * @returns {Promise} Promise that resolves when sequence finishes
     */
    async playSequence(noteNames, noteDuration = 0.5, volume = 0.5, waveform = 'sine') {
        for (const noteName of noteNames) {
            await this.playNoteName(noteName, noteDuration, volume, waveform);
        }
    }

    /**
     * Set master volume
     * @param {number} volume - Volume (0.0 to 1.0)
     */
    setVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        }
    }

    /**
     * Stop all currently playing sounds
     */
    stopAll() {
        if (this.audioContext && this.audioContext.state === 'running') {
            // Create a new audio context to effectively stop all sounds
            this.audioContext.close();
            this.isInitialized = false;
        }
    }
}

// Export for use in other modules
window.AudioEngine = AudioEngine;
