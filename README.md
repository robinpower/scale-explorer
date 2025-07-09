# Musical Scale Explorer

An interactive web application for exploring musical scales, triads, and key signatures with visual staff notation, piano keyboard display, and audio playback capabilities.

## Features

### Scale Exploration
- **12 Chromatic Root Notes**: All scales from C to B (including sharps/flats)
- **Multiple Scale Types**: Major, Natural Minor, Harmonic Minor, Melodic Minor
- **Interactive Tables**: Click scale table rows to display the full scale
- **Proper Enharmonic Spelling**: Scales use correct accidentals based on key signatures
- **Degree Names**: Shows scale degree names (Tonic, Supertonic, etc.)

### Triad Analysis
- **All Scale Triads**: Displays all seven triads built from each scale degree
- **Roman Numeral Analysis**: Shows proper roman numerals (I, ii, iii, IV, V, vi, vii°)
- **Triad Inversions**: Click triad table rows to see root position, 1st inversion, and 2nd inversion
- **Quality Labels**: Shows triad qualities (Major, minor, diminished)
- **Interactive Display**: Each inversion shown separately on staff notation

### Visual Notation
- **Dual Staff Display**: Both treble and bass clef notation with proper positioning
- **Key Signatures**: Accurate key signature display for all scale types and keys
- **Proper Note Positioning**: Notes positioned correctly on staff lines and spaces
- **Ledger Lines**: Automatic ledger lines for notes above/below the staff
- **Smart Octave Placement**: Notes and triads positioned for optimal readability
- **Inversion Visualization**: Clear display of all three triad inversions

### Piano Keyboard
- **Visual Highlighting**: Scale notes highlighted on four-octave piano keyboard
- **Root Note Emphasis**: Root note displayed in red, other scale notes in green
- **Triad Mode**: Different highlighting when viewing triad inversions
- **Real-time Updates**: Keyboard updates when switching between scales and triads

### Audio Playback
- **Individual Notes**: Click play buttons to hear individual scale notes
- **Scale Playback**: Play entire scales ascending or ascending/descending
- **Triad Chords**: Play triads as simultaneous chords
- **Triad Arpeggios**: Play triads as broken chords (arpeggiated)
- **Web Audio API**: High-quality synthesis with customizable settings

### Navigation & Controls
- **Root Note Selector**: Dropdown to select any of the 12 chromatic notes
- **Scale Type Selector**: Radio buttons for Major, Natural Minor, Harmonic Minor, Melodic Minor
- **Arrow Navigation**: Previous/next buttons to cycle through scales in circle of fifths order
- **Interactive Tables**: Click any table row to switch between scale and triad display modes

## Usage

### Getting Started
1. Open `index.html` in a web browser
2. Use the **Root Note** dropdown to select any chromatic note
3. Choose a **Scale Type** using the radio buttons
4. Explore scales and triads using the interactive tables

### Exploring Scales
- **View Full Scale**: Click any row in the "Scale Notes" table
- **Play Scale**: Use the play buttons to hear individual notes or the entire scale
- **Staff Notation**: See the scale displayed on both treble and bass clef
- **Keyboard Display**: Scale notes highlighted on the piano keyboard

### Analyzing Triads
- **View Triad Inversions**: Click any row in the "Triads" table
- **Play Triads**: Use chord (≡) and arpeggio (♪♪♪) buttons to hear each triad
- **Inversion Display**: See root position, 1st inversion, and 2nd inversion on staff
- **Roman Numeral Analysis**: Understand the harmonic function of each triad

### Navigation
- **Arrow Buttons**: Use ‹ and › buttons to cycle through scales in circle of fifths order
- **Direct Selection**: Use dropdowns to jump to any scale immediately
- **Scale Types**: Switch between major and minor scale variations

## Technical Architecture

### Modular Design
The application uses a clean, modular architecture with separated concerns:

```
scale-explorer/
├── index.html                    # Main HTML structure
├── css/
│   └── styles.css               # Application styles
└── js/
    ├── data/                    # Data & Constants
    │   ├── constants.js         # Basic constants and mappings
    │   └── staff-positions.js   # Note positioning data for staff notation
    ├── core/                    # Musical Logic
    │   ├── music-theory.js      # Musical calculations and utilities
    │   ├── scales.js            # Scale generation and enharmonic spelling
    │   └── triads.js            # Triad construction and inversions
    ├── display/                 # Visual Rendering
    │   ├── key-signatures.js    # Key signature display and data
    │   ├── staff-notation.js    # SVG staff rendering and note positioning
    │   └── keyboard.js          # Piano keyboard display and highlighting
    ├── ui/                      # User Interface
    │   ├── tables.js            # Interactive table management
    │   ├── controls.js          # Dropdowns, buttons, and navigation
    │   └── app.js               # Main application controller
    └── audio/                   # Audio Playback
        ├── audio-engine.js      # Web Audio API wrapper
        └── playback.js          # Musical playback interface
```

### Key Components
- **Scale Generation**: Algorithmic scale construction with proper enharmonic spelling
- **Key Signatures**: Complete key signature data for all scale types
- **Triad Analysis**: Dynamic triad construction from scale degrees
- **Staff Rendering**: SVG-based musical notation with accurate positioning
- **Audio Engine**: Web Audio API integration for musical playback
- **Interactive UI**: Event-driven interface with coordinated display updates

### Code Organization
- **Separation of Concerns**: Clear boundaries between musical logic, display, and interaction
- **Pure Functions**: Core musical functions are testable and reusable
- **Event-Driven**: User interactions coordinate updates across all display modules
- **Modular Loading**: Scripts loaded in dependency order for clean initialization

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Requirements**: JavaScript enabled, SVG support, Web Audio API
- **Audio**: Requires user interaction to initialize (browser security requirement)
- **No Dependencies**: Pure HTML/CSS/JavaScript implementation

## Future Enhancements

The modular architecture makes expansion straightforward:

### Planned Musical Features
- **Church Modes**: Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian
- **Jazz Scales**: Blues, pentatonic, whole tone, diminished, altered scales
- **Advanced Harmony**: Seventh chords, extended chords, chord progressions
- **Chord Substitutions**: Secondary dominants, tritone substitutions

### Technical Improvements
- **Interactive Staff**: Click notes on staff to play them
- **Interactive Keyboard**: Click piano keys to play notes
- **MIDI Support**: Connect MIDI keyboards for input
- **Export Features**: Save notation as images, MIDI files, or audio
- **Mobile Optimization**: Touch-friendly interface improvements
- **Customizable Audio**: Waveform selection, tempo control, volume settings

### Educational Features
- **Ear Training**: Interval recognition, chord identification
- **Practice Modes**: Scale practice with metronome
- **Theory Lessons**: Integrated music theory explanations
- **Progress Tracking**: User progress and achievement system

## Development

### Architecture Benefits
- **Maintainable**: Each module has a single, clear responsibility
- **Testable**: Pure functions can be easily unit tested
- **Reusable**: Core modules can be used in other musical applications
- **Scalable**: Easy to add new features without modifying existing code
- **Readable**: Well-organized code structure with clear module boundaries

### Adding New Features
1. **Musical Logic**: Add to `js/core/` modules
2. **Visual Display**: Add to `js/display/` modules  
3. **User Interface**: Add to `js/ui/` modules
4. **Data/Constants**: Add to `js/data/` modules

## Contributing

This is an educational project for musical exploration and learning. The codebase is designed to be readable and extensible for adding new musical concepts and features.

### Getting Started
1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. Explore the modular code structure in the `js/` directory
4. Make changes and test in the browser

## License

Educational/Experimental Project - Feel free to use and modify for learning purposes.
