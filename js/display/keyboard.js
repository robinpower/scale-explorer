/**
 * Piano Keyboard Display - Visual piano keyboard with note highlighting
 * Handles keyboard rendering and note highlighting for scales and triads
 */

/**
 * Update the piano keyboard display with current scale/triad highlighting
 */
function updateKeyboard() {
    const keyboard = document.getElementById('pianoKeyboard');
    keyboard.innerHTML = '';
    
    // Generate current scale dynamically
    const currentScale = generateScale(currentRoot, currentScaleType);
    const notesToHighlight = showMode === 'all' ? currentScale : getTriadNotes(selectedTriad);
    const rootNote = showMode === 'all' ? currentRoot : getTriadNotes(selectedTriad)[0];
    
    // Create four octaves of keys
    for (let octave = 0; octave < 4; octave++) {
        whiteKeys.forEach((key, index) => {
            const keyDiv = document.createElement('div');
            keyDiv.className = 'piano-key';
            
            const whiteKeyDiv = document.createElement('div');
            whiteKeyDiv.className = 'white-key';
            
            // Apply highlighting
            const chromaticRoot = getChromaticEquivalent(rootNote);
            const chromaticNotes = notesToHighlight.map(note => getChromaticEquivalent(note));
            
            if (key === chromaticRoot || key === rootNote) {
                whiteKeyDiv.classList.add('root-highlighted');
            } else if (chromaticNotes.includes(key) || notesToHighlight.includes(key)) {
                whiteKeyDiv.classList.add(showMode === 'triad' ? 'triad-highlighted' : 'highlighted');
            }
            
            const label = document.createElement('div');
            label.className = 'key-label';
            label.textContent = key;
            whiteKeyDiv.appendChild(label);
            
            keyDiv.appendChild(whiteKeyDiv);
            
            // Add black key if it exists
            if (blackKeys[index]) {
                const blackKeyDiv = document.createElement('div');
                blackKeyDiv.className = 'black-key';
                blackKeyDiv.style.left = '30px';
                
                // Apply highlighting to black keys
                const chromaticRoot = getChromaticEquivalent(rootNote);
                const chromaticNotes = notesToHighlight.map(note => getChromaticEquivalent(note));
                
                if (blackKeys[index] === chromaticRoot) {
                    blackKeyDiv.classList.add('root-highlighted');
                } else if (chromaticNotes.includes(blackKeys[index])) {
                    blackKeyDiv.classList.add(showMode === 'triad' ? 'triad-highlighted' : 'highlighted');
                }
                
                const blackLabel = document.createElement('div');
                blackLabel.className = 'key-label';
                blackLabel.textContent = blackKeys[index];
                blackKeyDiv.appendChild(blackLabel);
                
                keyDiv.appendChild(blackKeyDiv);
            }
            
            keyboard.appendChild(keyDiv);
        });
    }
}
