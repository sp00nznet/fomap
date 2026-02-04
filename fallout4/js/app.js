// Fallout 4 Interactive Map - Main Application

class FalloutMapApp {
    constructor() {
        this.map = null;
        this.allMarkers = [];
        this.visibleCategories = new Set();
        this.visibleCollectibles = new Set();
        this.init();
    }

    init() {
        this.map = new MapEngine('map-canvas');
        this.map.onMarkerHover = (marker, x, y) => this.handleMarkerHover(marker, x, y);
        this.map.onMarkerClick = (marker) => this.handleMarkerClick(marker);
        this.map.onViewportChange = (viewport) => this.handleViewportChange(viewport);

        this.buildMarkerList();
        this.map.setMarkers(this.allMarkers);

        this.initCategoryToggles();
        this.initCollectibleToggles();
        this.initSearch();
        this.initButtons();
        this.loadPreferences();
        this.updateMapMarkers();
    }

    buildMarkerList() {
        for (const loc of locations) {
            this.allMarkers.push({ ...loc, isCollectible: false });
        }
        if (collectibles && collectibles.bobbleheads) {
            for (const bb of collectibles.bobbleheads) {
                this.allMarkers.push({
                    id: bb.id, name: bb.name, category: 'bobbleheads',
                    x: bb.x, y: bb.y, description: bb.description,
                    location: bb.location, isCollectible: true
                });
            }
        }
    }

    initCategoryToggles() {
        const container = document.getElementById('category-toggles');
        container.innerHTML = '';
        for (const [key, data] of Object.entries(CATEGORIES)) {
            const count = locations.filter(l => l.category === key).length;
            const item = this.createToggleItem(key, data.name, count, false);
            container.appendChild(item);
            this.visibleCategories.add(key);
        }
    }

    initCollectibleToggles() {
        const container = document.getElementById('collectible-toggles');
        if (!container) return;
        container.innerHTML = '';
        if (collectibles && collectibles.bobbleheads) {
            const item = this.createToggleItem('bobbleheads', 'Bobbleheads (20)', collectibles.bobbleheads.length, true);
            container.appendChild(item);
        }
    }

    createToggleItem(key, name, count, isCollectible) {
        const item = document.createElement('div');
        item.className = 'toggle-item' + (isCollectible ? '' : ' active');
        item.dataset.category = key;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'toggle-checkbox';
        checkbox.id = `toggle-${key}`;
        checkbox.checked = !isCollectible;

        const label = document.createElement('label');
        label.className = 'toggle-label';
        label.htmlFor = `toggle-${key}`;
        label.textContent = name;

        const countSpan = document.createElement('span');
        countSpan.className = 'toggle-count';
        countSpan.textContent = `(${count})`;

        item.appendChild(checkbox);
        item.appendChild(label);
        item.appendChild(countSpan);

        checkbox.addEventListener('change', () => {
            if (isCollectible) {
                if (checkbox.checked) this.visibleCollectibles.add(key);
                else this.visibleCollectibles.delete(key);
            } else {
                if (checkbox.checked) this.visibleCategories.add(key);
                else this.visibleCategories.delete(key);
            }
            item.classList.toggle('active', checkbox.checked);
            this.updateMapMarkers();
            this.savePreferences();
        });

        return item;
    }

    initSearch() {
        const input = document.getElementById('search-input');
        const results = document.getElementById('search-results');
        input.addEventListener('input', () => {
            const query = input.value.toLowerCase().trim();
            if (query.length < 2) { results.classList.remove('active'); return; }
            const matches = this.allMarkers.filter(m => m.name.toLowerCase().includes(query)).slice(0, 10);
            if (matches.length === 0) { results.classList.remove('active'); return; }
            results.innerHTML = '';
            for (const match of matches) {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                const catName = (CATEGORIES[match.category] || COLLECTIBLE_CATEGORIES[match.category])?.name || match.category;
                item.innerHTML = `<div class="result-name">${match.name}</div><div class="result-category">${catName}</div>`;
                item.addEventListener('click', () => { this.selectLocation(match); input.value = ''; results.classList.remove('active'); });
                results.appendChild(item);
            }
            results.classList.add('active');
        });
        document.addEventListener('click', (e) => { if (!e.target.closest('.search-container')) results.classList.remove('active'); });
    }

    initButtons() {
        document.getElementById('show-all-btn').addEventListener('click', () => this.setAllCategories(true));
        document.getElementById('hide-all-btn').addEventListener('click', () => this.setAllCategories(false));
        document.getElementById('reset-view-btn').addEventListener('click', () => this.map.centerMap());
    }

    setAllCategories(visible) {
        document.querySelectorAll('#category-toggles .toggle-checkbox').forEach(cb => {
            cb.checked = visible;
            const key = cb.id.replace('toggle-', '');
            if (visible) this.visibleCategories.add(key);
            else this.visibleCategories.delete(key);
            cb.closest('.toggle-item').classList.toggle('active', visible);
        });
        this.updateMapMarkers();
        this.savePreferences();
    }

    selectLocation(marker) {
        const cat = marker.isCollectible ? this.visibleCollectibles : this.visibleCategories;
        if (!cat.has(marker.category)) {
            cat.add(marker.category);
            const cb = document.getElementById(`toggle-${marker.category}`);
            if (cb) { cb.checked = true; cb.closest('.toggle-item').classList.add('active'); }
            this.updateMapMarkers();
        }
        this.map.highlightMarker(marker);
        this.map.selectedMarker = marker;
        this.showLocationInfo(marker);
    }

    handleMarkerHover(marker, x, y) {
        const tooltip = document.getElementById('cursor-tooltip');
        if (marker) {
            tooltip.textContent = marker.name;
            tooltip.style.left = `${x + 15}px`;
            tooltip.style.top = `${y - 30}px`;
            tooltip.classList.add('visible');
        } else { tooltip.classList.remove('visible'); }
    }

    handleMarkerClick(marker) { this.showLocationInfo(marker); }
    handleViewportChange(viewport) { document.getElementById('zoom-level').textContent = `Zoom: ${Math.round(viewport.zoom * 100)}%`; }

    showLocationInfo(marker) {
        document.querySelector('.info-placeholder').style.display = 'none';
        const content = document.getElementById('info-content');
        content.style.display = 'block';
        document.getElementById('info-name').textContent = marker.name;
        const catName = (CATEGORIES[marker.category] || COLLECTIBLE_CATEGORIES[marker.category])?.name || marker.category;
        document.getElementById('info-category').textContent = catName;
        let desc = marker.description || 'No description available.';
        if (marker.location) desc += `\n\nLocation: ${marker.location}`;
        document.getElementById('info-description').textContent = desc;
    }

    updateMapMarkers() {
        const visible = new Set([...this.visibleCategories, ...this.visibleCollectibles]);
        this.map.setVisibleCategories(visible);
    }

    savePreferences() {
        const prefs = { categories: Array.from(this.visibleCategories), collectibles: Array.from(this.visibleCollectibles) };
        localStorage.setItem('fo4map_prefs', JSON.stringify(prefs));
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('fo4map_prefs');
            if (stored) {
                const prefs = JSON.parse(stored);
                this.visibleCategories = new Set(prefs.categories || []);
                this.visibleCollectibles = new Set(prefs.collectibles || []);
                document.querySelectorAll('#category-toggles .toggle-checkbox').forEach(cb => {
                    const key = cb.id.replace('toggle-', '');
                    cb.checked = this.visibleCategories.has(key);
                    cb.closest('.toggle-item').classList.toggle('active', cb.checked);
                });
                document.querySelectorAll('#collectible-toggles .toggle-checkbox').forEach(cb => {
                    const key = cb.id.replace('toggle-', '');
                    cb.checked = this.visibleCollectibles.has(key);
                    cb.closest('.toggle-item').classList.toggle('active', cb.checked);
                });
            }
        } catch (e) { console.warn('Failed to load preferences:', e); }
    }
}

document.addEventListener('DOMContentLoaded', () => { window.app = new FalloutMapApp(); });
