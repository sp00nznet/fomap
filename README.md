# Fallout 3 Interactive Map

A modern HTML5 web application for exploring the Capital Wasteland, converted from the original Flash-based interactive map.

![Pip-Boy Theme](https://img.shields.io/badge/Theme-Pip--Boy%203000-14fe17?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-f7df1e?style=flat-square)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-success?style=flat-square)

---

## Features

### Interactive Map
- **Pan & Zoom** - Click and drag to pan, scroll wheel to zoom
- **Touch Support** - Pinch-to-zoom and touch drag for mobile devices
- **Smooth Animations** - Canvas-based rendering with 60fps performance

### 130+ Locations
Organized into 14 categories:
- Vaults (101, 106, 108, 87, 92, 112, Vault-Tec HQ)
- Metro Stations
- Settlements (Megaton, Rivet City, Tenpenny Tower, etc.)
- Caves & Natural Landmarks
- Cities & Urban Ruins
- Factories & Industrial
- Military Installations
- Monuments & Landmarks
- Sewers
- Towns
- Doors/Entrances
- Unmarked Locations

### Collectibles Tracking
- **S.P.E.C.I.A.L. Bobbleheads** (7 total)
- **Skills Bobbleheads** (13 total)
- **Skill Books** (Multiple categories)

### User Interface
- **Category Toggles** - Show/hide location types
- **Search** - Find locations by name with autocomplete
- **Location Details** - View descriptions and images
- **DC Metro Map** - Popup overlay of the metro system
- **Persistent Preferences** - Settings saved to localStorage

---

## Screenshots

The map features a full Pip-Boy 3000 terminal aesthetic:
- Green phosphor display (`#14fe17`)
- CRT scanline overlay
- Monospace terminal font
- Glowing UI elements

---

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/sp00nznet/fomap.git
   ```

2. Open `index.html` in any modern web browser

3. Start exploring the Capital Wasteland!

> **Note:** No build process or server required - pure HTML/CSS/JS

---

## Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Pan | Click + Drag | Touch + Drag |
| Zoom In | Scroll Up | Pinch Out |
| Zoom Out | Scroll Down | Pinch In |
| Select Location | Click Marker | Tap Marker |
| Search | Type in Search Bar | Type in Search Bar |

---

## Project Structure

```
fomap/
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # Pip-Boy themed styling
├── js/
│   ├── app.js          # Main application logic
│   ├── map.js          # Canvas map engine (pan/zoom)
│   └── locations.js    # Location database (130+ entries)
└── assets/
    ├── img_1499.jpg    # Main world map (658x663)
    ├── img_0555.jpg    # DC Metro system map
    ├── img_*.jpg       # Location detail images
    └── icon_*.jpg      # Map marker icons
```

---

## Technical Details

### Map Engine (`map.js`)
- Canvas-based rendering for smooth performance
- Viewport tracking with pan offset and zoom level
- Mouse and touch event handling
- Marker hit detection via distance calculation
- Animated transitions for pan-to-location

### Location Data (`locations.js`)
- Relative coordinates (0-1 range) for responsive positioning
- Category system for filtering
- Full descriptions and image references
- Collectibles with detailed location info

### Styling (`style.css`)
- CSS custom properties for theme colors
- Flexbox/Grid layout system
- Responsive breakpoints for mobile
- CRT scanline effect via repeating gradient

---

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

## Credits

- **Original Map Data** - Bethesda Softworks / Fallout 3
- **Flash to HTML5 Conversion** - Claude Code

---

## License

This project is a fan-made tool for the Fallout 3 community. Fallout is a registered trademark of Bethesda Softworks LLC.

---

*War. War never changes.*
