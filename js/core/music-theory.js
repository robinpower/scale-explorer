/**
 * Music Theory Utilities - Helper functions for musical calculations
 * Handles note calculations, intervals, and theoretical concepts
 */

/**
 * Calculate the interval between two notes in semitones
 * @param {string} note1 - First note
 * @param {string} note2 - Second note
 * @returns {number} Interval in semitones
 */
function calculateInterval(note1, note2) {
    const chromaticIndex1 = getChromaticIndex(note1);
    const chromaticIndex2 = getChromaticIndex(note2);
    
    let interval = chromaticIndex2 - chromaticIndex1;
    if (interval < 0) interval += 12;
    
    return interval;
}

/**
 * Get chromatic index for a note (0-11)
 * @param {string} note - Note name
 * @returns {number} Chromatic index
 */
function getChromaticIndex(note) {
    // Convert enharmonic equivalents to standard chromatic notes
    const noteMap = {
        'C': 0, 'C#': 1, 'Db': 1,
        'D': 2, 'D#': 3, 'Eb': 3,
        'E': 4, 'E#': 5, 'Fb': 4,
        'F': 5, 'F#': 6, 'Gb': 6,
        'G': 7, 'G#': 8, 'Ab': 8,
        'A': 9, 'A#': 10, 'Bb': 10,
        'B': 11, 'B#': 0, 'Cb': 11
    };
    
    return noteMap[note] !== undefined ? noteMap[note] : -1;
}

/**
 * Transpose a note by a given number of semitones
 * @param {string} note - Original note
 * @param {number} semitones - Number of semitones to transpose
 * @returns {string} Transposed note
 */
function transposeNote(note, semitones) {
    const chromaticIndex = getChromaticIndex(note);
    if (chromaticIndex === -1) return note;
    
    const newIndex = (chromaticIndex + semitones) % 12;
    return CHROMATIC_NOTES[newIndex];
}

/**
 * Get the circle of fifths order
 * @returns {string[]} Array of keys in circle of fifths order
 */
function getCircleOfFifths() {
    return ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
}

/**
 * Get the relative minor key for a major key
 * @param {string} majorKey - Major key root note
 * @returns {string} Relative minor key root note
 */
function getRelativeMinor(majorKey) {
    const chromaticIndex = getChromaticIndex(majorKey);
    if (chromaticIndex === -1) return majorKey;
    
    // Relative minor is a minor third (3 semitones) below the major key
    const minorIndex = (chromaticIndex - 3 + 12) % 12;
    return CHROMATIC_NOTES[minorIndex];
}

/**
 * Get the relative major key for a minor key
 * @param {string} minorKey - Minor key root note
 * @returns {string} Relative major key root note
 */
function getRelativeMajor(minorKey) {
    const chromaticIndex = getChromaticIndex(minorKey);
    if (chromaticIndex === -1) return minorKey;
    
    // Relative major is a minor third (3 semitones) above the minor key
    const majorIndex = (chromaticIndex + 3) % 12;
    return CHROMATIC_NOTES[majorIndex];
}

/**
 * Check if a note is enharmonic equivalent to another
 * @param {string} note1 - First note
 * @param {string} note2 - Second note
 * @returns {boolean} True if enharmonically equivalent
 */
function areEnharmonicEquivalents(note1, note2) {
    return getChromaticIndex(note1) === getChromaticIndex(note2);
}
