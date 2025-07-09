/**
 * Staff Notation Display - SVG-based musical staff rendering
 * Handles staff drawing, note positioning, and musical notation display
 */

/**
 * Update both treble and bass staff displays
 */
function updateStaff() {
    drawStaff('trebleStaff', 'treble');
    drawStaff('bassStaff', 'bass');
}

/**
 * Draw a complete musical staff with clef, key signature, and notes
 * @param {string} svgId - ID of the SVG element
 * @param {string} clef - Clef type ('treble' or 'bass')
 */
function drawStaff(svgId, clef) {
    const svg = document.getElementById(svgId);
    svg.innerHTML = '';
    
    // Adjust SVG width for inversions
    const svgWidth = showMode === 'triad' ? 800 : 600;
    svg.setAttribute('width', svgWidth);
    
    const staffTop = 35;
    const staffSpacing = 15;
    
    // Draw staff lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', staffTop + i * staffSpacing);
        line.setAttribute('x2', svgWidth);
        line.setAttribute('y2', staffTop + i * staffSpacing);
        line.setAttribute('stroke', '#000');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }
    
    // Draw clef symbol (relative to staff)
    const clefText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    clefText.setAttribute('x', 15);
    clefText.setAttribute('y', clef === 'treble' ? staffTop + 45 : staffTop + 15);
    clefText.setAttribute('font-family', 'Noto Music, serif');
    clefText.setAttribute('font-size', '48');
    clefText.textContent = clef === 'treble' ? '𝄞' : '𝄢';
    svg.appendChild(clefText);
    
    // Draw key signature after clef
    drawStaffKeySignature(svg, clef, 70, staffTop, staffSpacing);
    
    if (showMode === 'all') {
        drawScaleNotes(svg, clef, 140, staffTop, staffSpacing);
    } else {
        drawTriadWithInversions(svg, clef, 140, staffTop, staffSpacing);
    }
}

/**
 * Draw key signature on staff
 * @param {SVGElement} svg - SVG element
 * @param {string} clef - Clef type
 * @param {number} startX - Starting X position
 * @param {number} staffTop - Top of staff
 * @param {number} staffSpacing - Space between staff lines
 */
function drawStaffKeySignature(svg, clef, startX, staffTop, staffSpacing) {
    drawKeySignatureAccidentals(svg, clef, startX, staffSpacing, staffTop);
}

/**
 * Draw scale notes on the staff
 * @param {SVGElement} svg - SVG element
 * @param {string} clef - Clef type
 * @param {number} startX - Starting X position
 * @param {number} staffTop - Top of staff
 * @param {number} staffSpacing - Space between staff lines
 */
function drawScaleNotes(svg, clef, startX = 100, staffTop = 50, staffSpacing = 15) {
    // Generate current scale dynamically
    const scaleNotes = generateScale(currentRoot, currentScaleType);
    
    // Get base note positions for this clef
    const basePositions = getBaseNotePositions(clef, staffTop, staffSpacing);
    
    scaleNotes.forEach((note, index) => {
        // Calculate note position with octave
        const noteObj = calculateNotePosition(note, clef);
        const x = startX + index * 60;
        const baseY = basePositions[noteObj.note];
        const y = baseY - (noteObj.octave * 52.5); // Apply octave offset like triads
        
        drawNote(svg, x, y, 'note-highlighted');
        drawLedgerLines(svg, x, y, clef, staffTop, staffSpacing);
        
        // Add note label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y + 25);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#666');
        label.textContent = note;
        svg.appendChild(label);
    });
}

/**
 * Draw triad with all inversions on the staff
 * @param {SVGElement} svg - SVG element
 * @param {string} clef - Clef type
 * @param {number} startX - Starting X position
 * @param {number} staffTop - Top of staff
 * @param {number} staffSpacing - Space between staff lines
 */
function drawTriadWithInversions(svg, clef, startX = 100, staffTop = 65, staffSpacing = 15) {
    const triadNotes = getTriadNotes(selectedTriad);
    const [root, third, fifth] = triadNotes;
    
    // Calculate proper pitch positions for each inversion
    const inversions = [
        { name: 'Root Position', notes: [root, third, fifth] },
        { name: '1st Inversion', notes: [third, fifth, root] },
        { name: '2nd Inversion', notes: [fifth, root, third] }
    ];
    
    // Get base note positions for this clef
    const basePositions = getBaseNotePositions(clef, staffTop, staffSpacing);
    
    inversions.forEach((inversion, invIndex) => {
        // Calculate positions for each note in the inversion
        inversion.notes = inversion.notes.map(note => calculateNotePosition(note, clef));
        
        const inversionStartX = startX + invIndex * 200;
        
        // Draw inversion label (positioned relative to staffTop with proper clearance)
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', inversionStartX + 60);
        label.setAttribute('y', staffTop - 10);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '14');
        label.setAttribute('font-weight', 'bold');
        label.textContent = inversion.name;
        svg.appendChild(label);
        
        // Draw the three notes with proper octave positioning
        inversion.notes.forEach((noteObj, noteIndex) => {
            const x = inversionStartX + noteIndex * 30;
            const baseY = basePositions[noteObj.note];
            let y = baseY - (noteObj.octave * 52.5);
            
            // If the starting note (bass note) is above threshold, move entire triad down an octave
            if (noteIndex === 0 && y < staffTop + 15) { // Relative threshold: staffTop + 15 (4th line)
                // Move all notes in this inversion down an octave
                inversion.notes.forEach(n => n.octave -= 1);
                y = baseY - (noteObj.octave * 52.5);
            }
            
            drawNote(svg, x, y, 'note-triad');
            drawLedgerLines(svg, x, y, clef, staffTop, staffSpacing);
            
            // Add note label
            const noteLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            noteLabel.setAttribute('x', x);
            noteLabel.setAttribute('y', y + 25);
            noteLabel.setAttribute('text-anchor', 'middle');
            noteLabel.setAttribute('font-size', '10');
            noteLabel.setAttribute('fill', '#666');
            noteLabel.textContent = noteObj.originalNote;
            svg.appendChild(noteLabel);
        });
    });
}

/**
 * Draw a musical note (circle)
 * @param {SVGElement} svg - SVG element
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {string} className - CSS class name
 */
function drawNote(svg, x, y, className) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 6);
    circle.setAttribute('class', className);
    svg.appendChild(circle);
}

/**
 * Draw ledger lines for notes outside the staff
 * @param {SVGElement} svg - SVG element
 * @param {number} x - X position of note
 * @param {number} y - Y position of note
 * @param {string} clef - Clef type
 * @param {number} staffTop - Top of staff
 * @param {number} staffSpacing - Space between staff lines
 */
function drawLedgerLines(svg, x, y, clef, staffTop = 35, staffSpacing = 15) {
    // Draw ledger lines for notes outside the staff (relative to staffTop)
    const staffBottom = staffTop + (4 * staffSpacing); // Bottom line of staff
    const needsLedger = (y < staffTop || y >= staffBottom + staffSpacing);
    
    if (needsLedger) {
        if (y >= staffBottom + staffSpacing) {
            // Below staff - draw ledger lines
            for (let ly = staffBottom + staffSpacing; ly <= y; ly += staffSpacing * 0.5) {
                const ledger = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                ledger.setAttribute('x1', x - 10);
                ledger.setAttribute('y1', ly);
                ledger.setAttribute('x2', x + 10);
                ledger.setAttribute('y2', ly);
                ledger.setAttribute('stroke', '#000');
                ledger.setAttribute('stroke-width', '1');
                svg.appendChild(ledger);
            }
        } else if (y < staffTop) {
            // Above staff - draw ledger lines
            for (let ly = staffTop - staffSpacing; ly >= y; ly -= staffSpacing) {
                const ledger = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                ledger.setAttribute('x1', x - 10);
                ledger.setAttribute('y1', ly);
                ledger.setAttribute('x2', x + 10);
                ledger.setAttribute('y2', ly);
                ledger.setAttribute('stroke', '#000');
                ledger.setAttribute('stroke-width', '1');
                svg.appendChild(ledger);
            }
        }
    }
}
