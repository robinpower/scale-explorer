/**
 * Triad Generation - Core logic for constructing triads from scales
 * Handles triad construction, inversions, and chord analysis
 */

/**
 * Get triad notes for a specific scale degree
 * @param {number} degree - Scale degree (0-6)
 * @param {string[]|null} scale - Scale to use (if null, generates current scale)
 * @returns {string[]} Array of three note names [root, third, fifth]
 */
function getTriadNotes(degree, scale = null) {
    // Use provided scale or generate current scale
    const currentScale = scale || generateScale(currentRoot, currentScaleType);
    const root = currentScale[degree];
    const third = currentScale[(degree + 2) % 7];
    const fifth = currentScale[(degree + 4) % 7];
    return [root, third, fifth];
}

/**
 * Generate all triads for a given scale
 * @param {string[]} scale - Array of scale notes
 * @returns {Array} Array of triad objects with degree, notes, and quality
 */
function generateAllTriads(scale) {
    const triads = [];
    
    for (let degree = 0; degree < 7; degree++) {
        const notes = getTriadNotes(degree, scale);
        triads.push({
            degree: degree,
            roman: romanNumerals[degree],
            root: scale[degree],
            notes: notes,
            quality: triadQualities[degree]
        });
    }
    
    return triads;
}

/**
 * Get triad inversions for a given triad
 * @param {string[]} triadNotes - Array of three note names [root, third, fifth]
 * @returns {Object} Object with root position, first inversion, and second inversion
 */
function getTriadInversions(triadNotes) {
    const [root, third, fifth] = triadNotes;
    
    return {
        rootPosition: [root, third, fifth],
        firstInversion: [third, fifth, root],
        secondInversion: [fifth, root, third]
    };
}

/**
 * Analyze triad quality based on intervals
 * @param {string[]} triadNotes - Array of three note names
 * @returns {string} Triad quality (Major, minor, diminished, augmented)
 */
function analyzeTriadQuality(triadNotes) {
    // This is a simplified version - could be expanded for more detailed analysis
    // For now, we rely on the predefined triadQualities array
    // Future enhancement: calculate intervals and determine quality dynamically
    return 'Major'; // Placeholder
}
