/**
 * Basic Constants - Simple UI labels and arrays
 */

// Scale degree names
const degreeNames = ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading tone'];

// Roman numerals for triads
const romanNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

// Triad qualities
const triadQualities = ['Major', 'minor', 'minor', 'Major', 'Major', 'minor', 'diminished'];

// Enharmonic equivalents for note positioning and keyboard highlighting
const enharmonicMap = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
    'C#': 'C#', 'D#': 'D#', 'F#': 'F#', 'G#': 'G#', 'A#': 'A#',
    'Cb': 'B', 'E#': 'F', 'B#': 'C', 'Fb': 'E'
};

// Helper function for enharmonic equivalents
function getEnharmonicEquivalent(note) {
    return enharmonicMap[note] || note;
}

// Convert any note to its chromatic equivalent for positioning
function getChromaticEquivalent(note) {
    return enharmonicMap[note] || note;
}

// Piano keyboard layout
const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackKeys = ['C#', 'D#', '', 'F#', 'G#', 'A#', ''];

// Scale order for navigation
const scaleOrder = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
