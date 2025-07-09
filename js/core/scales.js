/**
 * Scale Generation - Core musical logic for generating scales
 * Handles scale patterns, enharmonic spelling, and scale construction
 */

// SCALE PATTERNS - Define interval patterns (semitones)
const SCALE_PATTERNS = {
    major: [2, 2, 1, 2, 2, 2, 1],              // W-W-H-W-W-W-H
    naturalMinor: [2, 1, 2, 2, 1, 2, 2],       // W-H-W-W-H-W-W
    harmonicMinor: [2, 1, 2, 2, 1, 3, 1],      // W-H-W-W-H-W+H-H
    melodicMinor: [2, 1, 2, 2, 2, 2, 1]        // W-H-W-W-W-W-H (ascending)
};

// CHROMATIC FOUNDATION
const CHROMATIC_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// ENHARMONIC SPELLING RULES - which accidentals each key prefers
const ENHARMONIC_RULES = {
    'C': { preferredAccidentals: 'none' },
    'Db': { preferredAccidentals: 'flats' },
    'D': { preferredAccidentals: 'sharps' },
    'Eb': { preferredAccidentals: 'flats' },
    'E': { preferredAccidentals: 'sharps' },
    'F': { preferredAccidentals: 'flats' },
    'F#': { preferredAccidentals: 'sharps' },
    'Gb': { preferredAccidentals: 'flats' },
    'G': { preferredAccidentals: 'sharps' },
    'Ab': { preferredAccidentals: 'flats' },
    'A': { preferredAccidentals: 'sharps' },
    'Bb': { preferredAccidentals: 'flats' },
    'B': { preferredAccidentals: 'sharps' }
};

/**
 * Generate a scale from a root note and pattern
 * @param {string} root - Root note (e.g., 'C', 'F#', 'Bb')
 * @param {string} patternName - Scale pattern name (default: 'major')
 * @returns {string[]} Array of note names in the scale
 */
function generateScale(root, patternName = 'major') {
    const pattern = SCALE_PATTERNS[patternName];
    if (!pattern) {
        throw new Error(`Unknown scale pattern: ${patternName}`);
    }
    
    // Convert flat root notes to their sharp equivalents for chromatic lookup
    const rootToChromatic = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
    };
    
    const chromaticRoot = rootToChromatic[root] || root;
    
    // Find starting position in chromatic circle
    const rootIndex = CHROMATIC_NOTES.indexOf(chromaticRoot);
    if (rootIndex === -1) {
        throw new Error(`Unknown root note: ${root} (chromatic: ${chromaticRoot})`);
    }
    
    // Generate scale using interval pattern
    const scale = [root]; // Start with original root note (preserving flat spelling)
    let currentIndex = rootIndex;
    
    for (let i = 0; i < pattern.length - 1; i++) { // -1 because we don't need the octave
        currentIndex = (currentIndex + pattern[i]) % 12;
        const chromaticNote = CHROMATIC_NOTES[currentIndex];
        
        // Apply enharmonic spelling rules (now passing scale type)
        const spelledNote = applyEnharmonicSpelling(chromaticNote, root, i + 1, patternName);
        scale.push(spelledNote);
    }
    
    return scale;
}

/**
 * Apply enharmonic spelling based on key and scale degree
 * @param {string} chromaticNote - The chromatic note (sharp version)
 * @param {string} keyRoot - The key root note
 * @param {number} scaleDegree - The scale degree (1-7)
 * @param {string} scaleType - The scale type (default: 'major')
 * @returns {string} Properly spelled note name
 */
function applyEnharmonicSpelling(chromaticNote, keyRoot, scaleDegree, scaleType = 'major') {
    const rules = ENHARMONIC_RULES[keyRoot];
    
    // Minor scales generally prefer flats, BUT sharp minor keys keep their sharps
    const isMinorScale = scaleType.includes('Minor') || scaleType.includes('minor');
    const isSharpMinorKey = isMinorScale && (keyRoot.includes('#') || ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'].includes(keyRoot));
    
    // Special cases for rare enharmonics that must be spelled correctly
    const specialCases = {
        'F#': { // F# major needs E# (not F) as 7th degree
            'F': 'E#'
        },
        'Gb': { // Gb major needs Cb (not B) as 4th degree  
            'B': 'Cb'
        },
        'C#': { // C# major would need B# and E# 
            'C': 'B#',
            'F': 'E#'
        },
        'Cb': { // Cb major would need Fb
            'E': 'Fb'
        }
    };
    
    // Check for special case first
    if (specialCases[keyRoot] && specialCases[keyRoot][chromaticNote]) {
        return specialCases[keyRoot][chromaticNote];
    }
    
    // Standard enharmonic equivalents map
    const enharmonicMap = {
        'C#': 'Db', 'Db': 'C#',
        'D#': 'Eb', 'Eb': 'D#', 
        'F#': 'Gb', 'Gb': 'F#',
        'G#': 'Ab', 'Ab': 'G#',
        'A#': 'Bb', 'Bb': 'A#'
    };
    
    // If it's a natural note, return as-is
    if (!chromaticNote.includes('#') && !chromaticNote.includes('b')) {
        return chromaticNote;
    }
    
    // Sharp minor keys keep their sharps (E minor, B minor, F# minor, C# minor, etc.)
    if (isSharpMinorKey && chromaticNote.includes('b')) {
        return enharmonicMap[chromaticNote] || chromaticNote;
    }
    
    // Other minor scales prefer flats (C minor, D minor, F minor, G minor, etc.)
    if (isMinorScale && !isSharpMinorKey && chromaticNote.includes('#')) {
        return enharmonicMap[chromaticNote] || chromaticNote;
    }
    
    // Apply spelling rules based on key preference for major scales
    if (rules.preferredAccidentals === 'flats' && chromaticNote.includes('#')) {
        return enharmonicMap[chromaticNote] || chromaticNote;
    } else if (rules.preferredAccidentals === 'sharps' && chromaticNote.includes('b')) {
        return enharmonicMap[chromaticNote] || chromaticNote;
    }
    
    return chromaticNote;
}

/**
 * Get available scale type options
 * @returns {Array} Array of scale type options with value and label
 */
function getScaleTypeOptions() {
    return Object.keys(SCALE_PATTERNS).map(key => ({
        value: key,
        label: formatScaleTypeName(key)
    }));
}

/**
 * Convert scale pattern keys to display names
 * @param {string} key - Scale pattern key (e.g., 'naturalMinor')
 * @returns {string} Formatted display name (e.g., 'Natural Minor')
 */
function formatScaleTypeName(key) {
    // Convert camelCase to Title Case Words
    return key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .trim();
}
