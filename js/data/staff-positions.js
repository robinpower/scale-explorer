/**
 * Staff Positions Data - Note positioning data for musical staff notation
 * Contains positioning information for treble and bass clef
 */

/**
 * Get base note positions for a specific clef
 * @param {string} clef - Clef type ('treble' or 'bass')
 * @param {number} staffTop - Top position of the staff
 * @param {number} staffSpacing - Spacing between staff lines
 * @returns {Object} Object mapping note names to Y positions
 */
function getBaseNotePositions(clef, staffTop, staffSpacing) {
    if (clef === 'treble') {
        return {
            'C': staffTop + 75, 'C#': staffTop + 75, 'Db': staffTop + 67.5, 
            'D': staffTop + 67.5, 'D#': staffTop + 67.5, 'Eb': staffTop + 60, 
            'E': staffTop + 60, 'E#': staffTop + 60, 'F': staffTop + 52.5, 
            'F#': staffTop + 52.5, 'Gb': staffTop + 45, 'G': staffTop + 45, 
            'G#': staffTop + 45, 'Ab': staffTop + 37.5, 'A': staffTop + 37.5, 
            'A#': staffTop + 37.5, 'Bb': staffTop + 30, 'B': staffTop + 30, 
            'B#': staffTop + 75, 'Cb': staffTop + 75, 'Fb': staffTop + 52.5
        };
    } else { // bass clef
        return {
            'C': staffTop + 37.5, 'C#': staffTop + 37.5, 'Db': staffTop + 30, 
            'D': staffTop + 30, 'D#': staffTop + 30, 'Eb': staffTop + 22.5, 
            'E': staffTop + 22.5, 'E#': staffTop + 22.5, 'F': staffTop + 15, 
            'F#': staffTop + 15, 'Gb': staffTop + 7.5, 'G': staffTop + 7.5, 
            'G#': staffTop + 7.5, 'Ab': staffTop, 'A': staffTop, 
            'A#': staffTop, 'Bb': staffTop - 7.5, 'B': staffTop - 7.5, 
            'B#': staffTop + 37.5, 'Cb': staffTop + 37.5, 'Fb': staffTop + 15
        };
    }
}

/**
 * Calculate note position with octave information
 * @param {string} note - Note name (e.g., 'C', 'F#', 'Bb')
 * @param {string} clef - Clef type ('treble' or 'bass')
 * @returns {Object} Object with note name and octave information
 */
function calculateNotePosition(note, clef) {
    // Extract base note (remove accidentals for octave calculation)
    const baseNote = note.charAt(0);
    
    // Default octave based on clef and note
    let octave = 0;
    
    // Treble clef default octaves (middle C = C4)
    if (clef === 'treble') {
        const trebleOctaves = {
            'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'A': 0, 'B': 0
        };
        octave = trebleOctaves[baseNote] || 0;
    } else {
        // Bass clef default octaves
        const bassOctaves = {
            'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'A': 0, 'B': 0
        };
        octave = bassOctaves[baseNote] || 0;
    }
    
    return {
        note: baseNote,
        originalNote: note,
        octave: octave
    };
}

/**
 * Sort notes by pitch for proper staff display
 * @param {string[]} notes - Array of note names
 * @param {string} clef - Clef type
 * @returns {Array} Array of note objects sorted by pitch
 */
function sortNotesByPitch(notes, clef) {
    return notes.map(note => calculateNotePosition(note, clef))
                .sort((a, b) => {
                    // Sort by octave first, then by chromatic position
                    if (a.octave !== b.octave) {
                        return a.octave - b.octave;
                    }
                    
                    // Get chromatic positions for comparison
                    const chromaticOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
                    const aPos = getChromaticIndex(a.originalNote);
                    const bPos = getChromaticIndex(b.originalNote);
                    
                    return aPos - bPos;
                });
}
