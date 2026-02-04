# Fallout Interactive Maps Collection

Modern HTML5 interactive maps for the Fallout game series, converted from Flash and enhanced with game-specific themes.

![Pip-Boy Theme](https://img.shields.io/badge/Theme-Pip--Boy-14fe17?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-f7df1e?style=flat-square)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-success?style=flat-square)

---

## Available Maps

| Game | Year | Region | Theme | Locations |
|------|------|--------|-------|-----------|
| [**Fallout 1**](fallout1/) | 2161 | Southern California | Amber CRT | 25+ |
| [**Fallout 2**](fallout2/) | 2241 | New California | Amber CRT | 40+ |
| [**Fallout 3**](fallout3/) | 2277 | Capital Wasteland | Pip-Boy Green | 130+ |
| [**Fallout: New Vegas**](newvegas/) | 2281 | Mojave Wasteland | Desert Amber | 80+ |
| [**Fallout 4**](fallout4/) | 2287 | The Commonwealth | Pip-Boy Cyan | 80+ |
| [**Fallout 76**](fallout76/) | 2102 | Appalachia | Vault-Tec Blue | 85+ |

---

## Features

### All Maps Include:
- **Pan & Zoom** - Click and drag to pan, scroll wheel to zoom
- **Touch Support** - Pinch-to-zoom and touch drag for mobile
- **Category Toggles** - Show/hide location types
- **Search** - Find locations by name with autocomplete
- **Location Details** - View descriptions for each location
- **Persistent Preferences** - Settings saved to localStorage

### Game-Specific Features:

**Fallout 3:**
- 20 Bobbleheads (S.P.E.C.I.A.L. + Skills)
- DC Metro system popup
- Full location images

**Fallout: New Vegas:**
- 7 Snow Globes + 4 DLC Snow Globes
- Faction territories
- NCR vs Legion locations

**Fallout 4:**
- 20 Bobbleheads (S.P.E.C.I.A.L. + Skills)
- Settlement locations
- Faction headquarters

**Fallout 76:**
- 7 Region categories
- Workshop locations
- Vault locations

---

## Visual Themes

Each map features a unique color scheme inspired by the game:

| Game | Primary Color | Style |
|------|---------------|-------|
| Fallout 1 & 2 | `#ffb000` (Amber) | Classic CRT terminal |
| Fallout 3 | `#14fe17` (Green) | Pip-Boy 3000 |
| New Vegas | `#ff9f0a` (Orange) | Desert Pip-Boy |
| Fallout 4 | `#00ff99` (Cyan) | Pip-Boy 3000 Mk IV |
| Fallout 76 | `#00aaff` (Blue) | Vault-Tec corporate |

---

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/sp00nznet/fomap.git
   ```

2. Open any `index.html` file in a modern web browser:
   - `index.html` - Hub page (game selector)
   - `fallout1/index.html` - Fallout 1
   - `fallout2/index.html` - Fallout 2
   - `fallout3/index.html` - Fallout 3
   - `newvegas/index.html` - Fallout: New Vegas
   - `fallout4/index.html` - Fallout 4
   - `fallout76/index.html` - Fallout 76

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
├── index.html              # Hub page (game selector)
│
├── fallout1/               # Fallout 1 map
│   ├── index.html
│   ├── css/style.css
│   ├── js/
│   └── assets/
│
├── fallout2/               # Fallout 2 map
│   ├── index.html
│   ├── css/style.css
│   ├── js/
│   └── assets/
│
├── fallout3/               # Fallout 3 map
│   ├── index.html
│   ├── css/style.css
│   ├── js/
│   └── assets/
│
├── newvegas/               # Fallout: New Vegas map
│   ├── index.html
│   ├── css/style.css
│   ├── js/
│   └── assets/
│
├── fallout4/               # Fallout 4 map
│   ├── index.html
│   ├── css/style.css
│   ├── js/
│   └── assets/
│
└── fallout76/              # Fallout 76 map
    ├── index.html
    ├── css/style.css
    ├── js/
    └── assets/
```

---

## Location Data

Each game includes comprehensive location databases:

- **Major settlements and towns**
- **Vaults**
- **Faction headquarters**
- **Military installations**
- **Caves and dungeons**
- **Landmarks and points of interest**
- **Collectibles** (where applicable)

---

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

## Credits

- **Game Data** - Bethesda Softworks / Obsidian Entertainment
- **Development** - Claude Code

---

## License

This project is a fan-made tool for the Fallout community. Fallout is a registered trademark of Bethesda Softworks LLC.

---

*War. War never changes.*
