# Musical Scale Explorer

An interactive web application for exploring musical scales, triads, and key signatures with visual staff notation and piano keyboard display.

## Features

### Scale Exploration
- **12 Chromatic Root Notes**: All major scales from C to B (including sharps/flats)
- **Interactive Tables**: Click scale table rows to display the full scale
- **Ascending Note Order**: Scale notes displayed in proper ascending pitch order
- **Degree Names**: Shows scale degree names (Tonic, Supertonic, etc.)

### Triad Analysis
- **All Scale Triads**: Displays all seven triads built from each scale degree
- **Roman Numeral Analysis**: Shows proper roman numerals (I, ii, iii, IV, V, vi, vii°)
- **Triad Inversions**: Click triad table rows to see root position, 1st inversion, and 2nd inversion
- **Quality Labels**: Shows triad qualities (Major, minor, diminished)

### Visual Notation
- **Dual Staff Display**: Both treble and bass clef notation
- **Key Signatures**: Accurate key signature display for all major keys
- **Proper Note Positioning**: Notes positioned correctly on staff lines and spaces
- **Ledger Lines**: Automatic ledger lines for notes above/below the staff
- **Smart Octave Placement**: Triads automatically positioned for optimal readability

### Piano Keyboard
- **Visual Highlighting**: Scale notes highlighted on piano keyboard
- **Root Note Emphasis**: Root note displayed in red, other scale notes in green
- **Real-time Updates**: Keyboard updates when switching between scales and triads

### Navigation
- **Dropdown Selectors**: Separate selectors for root note and scale type
- **Arrow Navigation**: Previous/next buttons to cycle through scales
- **Table Interaction**: Click any table row to switch display modes

## Usage

### Getting Started
1. Open `index.html` in a web browser
2. Use the **Root Note** dropdown to select any of the 12 chromatic notes
3. The **Scale Type** is currently set to Major (ready for future expansion)

### Exploring Scales
- **View Full Scale**: Click any row in the "Scale Notes" table
- **Staff Notation**: See the scale displayed on both treble and bass clef
- **Keyboard Display**: Scale notes highlighted on the piano keyboard

### Analyzing Triads
- **View Triad Inversions**: Click any row in the "Triads" table
- **Inversion Display**: See root position, 1st inversion, and 2nd inversion
- **Roman Numeral Analysis**: Understand the harmonic function of each triad

### Navigation
- **Arrow Buttons**: Use ‹ and › buttons to cycle through scales
- **Direct Selection**: Use dropdowns to jump to any scale immediately

## Technical Details

### Architecture
- **Single HTML File**: Self-contained application with embedded CSS and JavaScript
- **Responsive Design**: Clean, professional interface that works on different screen sizes
- **SVG Graphics**: Scalable vector graphics for staff notation and key signatures

### Key Components
- **Scale Data**: Complete major scale definitions for all 12 keys
- **Key Signatures**: Accurate sharp/flat data for proper notation
- **Triad Generation**: Algorithmic triad construction from scale degrees
- **Staff Positioning**: Relative positioning system for flexible layout
- **Keyboard Mapping**: Piano key highlighting with proper enharmonic handling

### Code Organization
- **Musical Data**: Scales, key signatures, and theory data
- **Display Functions**: Staff drawing, keyboard rendering, table updates
- **Event Handlers**: User interaction and navigation
- **Utility Functions**: Note calculations and positioning logic

## Future Enhancements

The application is designed for easy expansion:

### Planned Features
- **Minor Scales**: Natural minor, harmonic minor, melodic minor
- **Church Modes**: Dorian, Phrygian, Lydian, Mixolydian, Locrian
- **Jazz Scales**: Blues, pentatonic, whole tone, diminished
- **Advanced Harmony**: Seventh chords, extended chords, chord progressions

### Technical Improvements
- **Audio Playback**: Play scales and chords
- **MIDI Support**: Connect MIDI keyboards
- **Export Features**: Save notation as images or MIDI files
- **Mobile Optimization**: Touch-friendly interface

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Requirements**: JavaScript enabled, SVG support
- **No Dependencies**: Pure HTML/CSS/JavaScript implementation

## File Structure

```
scale-explorer/
├── index.html          # Main application file
└── README.md          # This documentation
```

## Contributing

This is an experimental project for musical education and exploration. The codebase is designed to be readable and extensible for adding new musical concepts and features.

## License

Educational/Experimental Project - Feel free to use and modify for learning purposes.
