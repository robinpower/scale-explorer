/**
 * Tables UI - Interactive table management for scales and triads
 * Handles table generation, user interactions, and state management
 */

/**
 * Update the scale notes table with current scale data
 */
function updateScaleTable() {
    const tbody = document.getElementById('scaleTableBody');
    tbody.innerHTML = '';
    
    // Generate current scale dynamically
    const currentScale = generateScale(currentRoot, currentScaleType);
    
    currentScale.forEach((note, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = note;
        row.insertCell(2).textContent = degreeNames[index];
        
        // Add individual note play button
        const playCell = row.insertCell(3);
        playCell.innerHTML = `<button onclick="playIndividualNote('${note}')" class="play-btn" title="Play ${note}">♪</button>`;
        
        // Add click functionality to display the scale
        row.style.cursor = 'pointer';
        row.addEventListener('click', (e) => {
            // Don't trigger if clicking on buttons
            if (!e.target.classList.contains('play-btn')) {
                showMode = 'all';
                updateDisplay();
            }
        });
        
        // Highlight when in scale mode
        if (showMode === 'all') {
            row.style.backgroundColor = '#e8f5e8';
        }
    });
}

/**
 * Update the triads table with current scale's triads
 */
function updateTriadTable() {
    const tbody = document.getElementById('triadTableBody');
    tbody.innerHTML = '';
    
    // Generate current scale dynamically
    const currentScale = generateScale(currentRoot, currentScaleType);
    
    currentScale.forEach((note, index) => {
        const triadNotes = getTriadNotes(index, currentScale);
        const row = tbody.insertRow();
        row.insertCell(0).textContent = romanNumerals[index];
        row.insertCell(1).textContent = note;
        row.insertCell(2).textContent = triadNotes.join(' - ');
        row.insertCell(3).textContent = triadQualities[index];
        
        // Add play buttons cell
        const playCell = row.insertCell(4);
        playCell.innerHTML = `
            <button onclick="playTriadChord(['${triadNotes.join("','")}'])" class="play-btn" title="Play chord">≡</button>
            <button onclick="playTriadArpeggio(['${triadNotes.join("','")}'])" class="play-btn" title="Play arpeggio">♪♪♪</button>
        `;
        
        // Add click functionality to select this triad
        row.style.cursor = 'pointer';
        row.addEventListener('click', (e) => {
            // Don't trigger if clicking on buttons
            if (!e.target.classList.contains('play-btn')) {
                selectedTriad = index;
                showMode = 'triad';
                updateDisplay();
            }
        });
        
        // Highlight selected triad
        if (showMode === 'triad' && index === selectedTriad) {
            row.style.backgroundColor = '#e8f5e8';
        }
    });
}
