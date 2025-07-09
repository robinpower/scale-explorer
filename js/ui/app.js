/**
 * Main Application Controller - Coordinates all modules and manages global state
 * Handles initialization, display updates, and module coordination
 */

// Application state variables
let currentScale = 'D';
let showMode = 'all';
let selectedTriad = 0;
let currentScaleType = 'major';
let currentRoot = 'C';

/**
 * Main display update function - coordinates all display modules
 */
function updateDisplay() {
    updateScaleTable();
    updateTriadTable();
    updateKeySignatures();
    updateStaff();
    updateKeyboard();
}

/**
 * Initialize the entire application when DOM is ready
 */
function initializeApp() {
    // Initialize all UI controls
    initializeScaleTypeSelector();
    initializeRootNoteSelector();
    initializeNavigationButtons();
    initializeTriadSelector();
    
    // Initial display update
    updateDisplay();
}

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', initializeApp);
