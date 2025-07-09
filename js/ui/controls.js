/**
 * Controls UI - User interface controls and navigation
 * Handles dropdowns, buttons, and user input events
 */

/**
 * Initialize scale type radio button selector
 */
function initializeScaleTypeSelector() {
    const container = document.getElementById('scaleTypeRadios');
    const options = getScaleTypeOptions();
    
    container.innerHTML = '';
    
    options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'scale-type-option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = `scaleType_${option.value}`;
        radio.name = 'scaleType';
        radio.value = option.value;
        radio.checked = option.value === currentScaleType;
        radio.onchange = updateScaleType;
        
        const label = document.createElement('label');
        label.htmlFor = radio.id;
        label.textContent = option.label;
        
        div.appendChild(radio);
        div.appendChild(label);
        container.appendChild(div);
    });
}

/**
 * Handle scale type change from radio buttons
 */
function updateScaleType() {
    const selectedRadio = document.querySelector('input[name="scaleType"]:checked');
    if (selectedRadio) {
        currentScaleType = selectedRadio.value;
        updateDisplay();
    }
}

/**
 * Set up root note dropdown selector
 */
function initializeRootNoteSelector() {
    const rootSelect = document.getElementById('rootNoteSelect');
    if (rootSelect) {
        rootSelect.value = currentRoot;
        rootSelect.onchange = function() {
            currentRoot = this.value;
            updateDisplay();
        };
    }
}

/**
 * Set up navigation arrow buttons
 */
function initializeNavigationButtons() {
    // Previous scale button
    const prevButton = document.getElementById('prevScale');
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            const currentIndex = scaleOrder.indexOf(currentRoot);
            const prevIndex = (currentIndex - 1 + scaleOrder.length) % scaleOrder.length;
            currentRoot = scaleOrder[prevIndex];
            document.getElementById('rootNoteSelect').value = currentRoot;
            updateDisplay();
        });
    }
    
    // Next scale button
    const nextButton = document.getElementById('nextScale');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const currentIndex = scaleOrder.indexOf(currentRoot);
            const nextIndex = (currentIndex + 1) % scaleOrder.length;
            currentRoot = scaleOrder[nextIndex];
            document.getElementById('rootNoteSelect').value = currentRoot;
            updateDisplay();
        });
    }
}

/**
 * Set up triad selector dropdown (legacy support)
 */
function initializeTriadSelector() {
    const triadSelect = document.getElementById('triadSelect');
    if (triadSelect) {
        triadSelect.addEventListener('change', function() {
            selectedTriad = parseInt(this.value);
            updateDisplay();
        });
    }
}
