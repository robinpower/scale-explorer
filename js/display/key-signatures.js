/**
 * Key Signatures Display - Rendering key signatures for different clefs
 * Handles sharp and flat positioning for treble and bass clef
 */

// Key signature data (sharps and flats in order)
const keySignatures = {
    // Major key signatures
    major: {
        'C': { sharps: [], flats: [] },
        'Db': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'] },
        'D': { sharps: ['F#', 'C#'], flats: [] },
        'Eb': { sharps: [], flats: ['Bb', 'Eb', 'Ab'] },
        'E': { sharps: ['F#', 'C#', 'G#', 'D#'], flats: [] },
        'F': { sharps: [], flats: ['Bb'] },
        'F#': { sharps: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'], flats: [] },
        'Gb': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'] },
        'G': { sharps: ['F#'], flats: [] },
        'Ab': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db'] },
        'A': { sharps: ['F#', 'C#', 'G#'], flats: [] },
        'Bb': { sharps: [], flats: ['Bb', 'Eb'] },
        'B': { sharps: ['F#', 'C#', 'G#', 'D#', 'A#'], flats: [] }
    },
    // Natural minor key signatures (same as their relative major)
    naturalMinor: {
        'C': { sharps: [], flats: ['Bb', 'Eb', 'Ab'] },        // C minor = Eb major
        'Db': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'] }, // Db minor = Fb major (theoretical)
        'D': { sharps: [], flats: ['Bb'] },                    // D minor = F major
        'Eb': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'] }, // Eb minor = Gb major
        'E': { sharps: ['F#'], flats: [] },                    // E minor = G major
        'F': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db'] }, // F minor = Ab major
        'F#': { sharps: ['F#', 'C#'], flats: [] },             // F# minor = A major
        'Gb': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db'] }, // Gb minor = Ab major (enharmonic)
        'G': { sharps: [], flats: ['Bb', 'Eb'] },              // G minor = Bb major
        'Ab': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'] }, // Ab minor = Cb major
        'A': { sharps: [], flats: [] },                        // A minor = C major
        'Bb': { sharps: [], flats: ['Bb', 'Eb', 'Ab'] },      // Bb minor = Db major
        'B': { sharps: ['F#', 'C#'], flats: [] }               // B minor = D major
    },
    // Harmonic minor uses same key signature as natural minor (raised 7th shown as accidental)
    harmonicMinor: {
        'C': { sharps: [], flats: ['Bb', 'Eb', 'Ab'] },
        'Db': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'] },
        'D': { sharps: [], flats: ['Bb'] },
        'Eb': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'] },
        'E': { sharps: ['F#'], flats: [] },
        'F': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db'] },
        'F#': { sharps: ['F#', 'C#'], flats: [] },
        'Gb': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db'] },
        'G': { sharps: [], flats: ['Bb', 'Eb'] },
        'Ab': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'] },
        'A': { sharps: [], flats: [] },
        'Bb': { sharps: [], flats: ['Bb', 'Eb', 'Ab'] },
        'B': { sharps: ['F#', 'C#'], flats: [] }
    },
    // Melodic minor uses same key signature as natural minor (raised 6th & 7th shown as accidentals)
    melodicMinor: {
        'C': { sharps: [], flats: ['Bb', 'Eb', 'Ab'] },
        'Db': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'] },
        'D': { sharps: [], flats: ['Bb'] },
        'Eb': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'] },
        'E': { sharps: ['F#'], flats: [] },
        'F': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db'] },
        'F#': { sharps: ['F#', 'C#'], flats: [] },
        'Gb': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db'] },
        'G': { sharps: [], flats: ['Bb', 'Eb'] },
        'Ab': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'] },
        'A': { sharps: [], flats: [] },
        'Bb': { sharps: [], flats: ['Bb', 'Eb', 'Ab'] },
        'B': { sharps: ['F#', 'C#'], flats: [] }
    }
};

/**
 * Update both treble and bass key signature displays
 */
function updateKeySignatures() {
    drawKeySignature('trebleKeySignature', 'treble');
    drawKeySignature('bassKeySignature', 'bass');
}

/**
 * Draw key signature for a specific clef
 * @param {string} svgId - ID of the SVG element
 * @param {string} clef - Clef type ('treble' or 'bass')
 */
function drawKeySignature(svgId, clef) {
    const svg = document.getElementById(svgId);
    svg.innerHTML = '';
    
    const staffTop = 35;
    const staffSpacing = 12;
    
    // Draw staff lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', staffTop + i * staffSpacing);
        line.setAttribute('x2', 200);
        line.setAttribute('y2', staffTop + i * staffSpacing);
        line.setAttribute('stroke', '#000');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }
    
    // Draw clef symbol (larger to match main staff)
    const clefText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    clefText.setAttribute('x', 5);
    clefText.setAttribute('y', clef === 'treble' ? staffTop + 36 : staffTop + 12);
    clefText.setAttribute('font-family', 'Noto Music, serif');
    clefText.setAttribute('font-size', '36');
    clefText.textContent = clef === 'treble' ? '𝄞' : '𝄢';
    svg.appendChild(clefText);
    
    // Draw sharps or flats using consistent positioning
    drawKeySignatureAccidentals(svg, clef, 35, staffSpacing, staffTop);
}

/**
 * Draw key signature accidentals (sharps and flats)
 * @param {SVGElement} svg - SVG element
 * @param {string} clef - Clef type
 * @param {number} startX - Starting X position
 * @param {number} staffSpacing - Space between staff lines
 * @param {number} staffTop - Top of staff
 */
function drawKeySignatureAccidentals(svg, clef, startX, staffSpacing, staffTop) {
    const keyData = keySignatures[currentScaleType][currentRoot];
    let xPos = startX;
    
    // Sharp positions for treble and bass clef
    const sharpPositions = {
        treble: { 'F#': 'line4', 'C#': 'space4', 'G#': 'line5', 'D#': 'space3', 'A#': 'line3', 'E#': 'space5' },
        bass: { 'F#': 'space3', 'C#': 'line4', 'G#': 'space4', 'D#': 'line2', 'A#': 'space2', 'E#': 'line5' }
    };
    
    // Flat positions for treble and bass clef
    const flatPositions = {
        treble: { 'Bb': 'line3', 'Eb': 'space4', 'Ab': 'line2', 'Db': 'space3', 'Gb': 'line1', 'Cb': 'space2' },
        bass: { 'Bb': 'line2', 'Eb': 'space2', 'Ab': 'line1', 'Db': 'space1', 'Gb': 'space0', 'Cb': 'line0' }
    };
    
    // Position mapping
    const positionMap = {
        'line0': staffTop - staffSpacing,
        'space0': staffTop - (staffSpacing / 2),
        'line1': staffTop,
        'space1': staffTop + (staffSpacing / 2),
        'line2': staffTop + staffSpacing,
        'space2': staffTop + (staffSpacing * 1.5),
        'line3': staffTop + (staffSpacing * 2),
        'space3': staffTop + (staffSpacing * 2.5),
        'line4': staffTop + (staffSpacing * 3),
        'space4': staffTop + (staffSpacing * 3.5),
        'line5': staffTop + (staffSpacing * 4),
        'space5': staffTop + (staffSpacing * 4.5)
    };
    
    // Draw sharps
    keyData.sharps.forEach((sharp, index) => {
        const sharpSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        sharpSymbol.setAttribute('x', xPos);
        const position = sharpPositions[clef][sharp];
        sharpSymbol.setAttribute('y', positionMap[position] + 4);
        sharpSymbol.setAttribute('font-family', 'Noto Music, serif');
        sharpSymbol.setAttribute('font-size', '20');
        sharpSymbol.textContent = '♯';
        svg.appendChild(sharpSymbol);
        xPos += 12;
    });
    
    // Draw flats
    keyData.flats.forEach((flat, index) => {
        const flatSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        flatSymbol.setAttribute('x', xPos);
        const position = flatPositions[clef][flat];
        flatSymbol.setAttribute('y', positionMap[position] + 4);
        flatSymbol.setAttribute('font-family', 'Noto Music, serif');
        flatSymbol.setAttribute('font-size', '20');
        flatSymbol.textContent = '♭';
        svg.appendChild(flatSymbol);
        xPos += 12;
    });
}
