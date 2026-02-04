// Fallout 2 Interactive Map - Main Application

class FalloutMapApp {
    constructor() {
        this.map = null;
        this.allMarkers = [];
        this.visibleCategories = new Set();
        this.init();
    }

    init() {
        this.map = new MapEngine('map-canvas');
        this.map.onMarkerHover = (marker, x, y) => this.handleMarkerHover(marker, x, y);
        this.map.onMarkerClick = (marker) => this.handleMarkerClick(marker);
        this.map.onViewportChange = (viewport) => this.handleViewportChange(viewport);

        this.allMarkers = [...locations];
        this.map.setMarkers(this.allMarkers);

        this.initCategoryToggles();
        this.initSearch();
        this.initButtons();
        this.loadPreferences();
        this.updateMapMarkers();
    }

    initCategoryToggles() {
        const container = document.getElementById('category-toggles');
        container.innerHTML = '';

        for (const [key, data] of Object.entries(CATEGORIES)) {
            const count = locations.filter(l => l.category === key).length;
            const item = this.createToggleItem(key, data.name, count);
            container.appendChild(item);
            this.visibleCategories.add(key);
        }
    }

    createToggleItem(key, name, count) {
        const item = document.createElement('div');
        item.className = 'toggle-item active';
        item.dataset.category = key;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'toggle-checkbox';
        checkbox.id = `toggle-${key}`;
        checkbox.checked = true;

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
            if (checkbox.checked) {
                this.visibleCategories.add(key);
            } else {
                this.visibleCategories.delete(key);
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
            if (query.length < 2) {
                results.classList.remove('active');
                return;
            }

            const matches = this.allMarkers.filter(m => m.name.toLowerCase().includes(query)).slice(0, 10);
            if (matches.length === 0) {
                results.classList.remove('active');
                return;
            }

            results.innerHTML = '';
            for (const match of matches) {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `<div class="result-name">${match.name}</div><div class="result-category">${CATEGORIES[match.category]?.name || match.category}</div>`;
                item.addEventListener('click', () => {
                    this.selectLocation(match);
                    input.value = '';
                    results.classList.remove('active');
                });
                results.appendChild(item);
            }
            results.classList.add('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) results.classList.remove('active');
        });
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
        if (!this.visibleCategories.has(marker.category)) {
            this.visibleCategories.add(marker.category);
            const cb = document.getElementById(`toggle-${marker.category}`);
            if (cb) {
                cb.checked = true;
                cb.closest('.toggle-item').classList.add('active');
            }
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
        } else {
            tooltip.classList.remove('visible');
        }
    }

    handleMarkerClick(marker) {
        this.showLocationInfo(marker);
    }

    handleViewportChange(viewport) {
        document.getElementById('zoom-level').textContent = `Zoom: ${Math.round(viewport.zoom * 100)}%`;
    }

    showLocationInfo(marker) {
        document.querySelector('.info-placeholder').style.display = 'none';
        const content = document.getElementById('info-content');
        content.style.display = 'block';

        document.getElementById('info-name').textContent = marker.name;
        document.getElementById('info-category').textContent = CATEGORIES[marker.category]?.name || marker.category;
        document.getElementById('info-description').textContent = marker.description || 'No description available.';
    }

    updateMapMarkers() {
        this.map.setVisibleCategories(this.visibleCategories);
    }

    savePreferences() {
        localStorage.setItem('fo2map_prefs', JSON.stringify(Array.from(this.visibleCategories)));
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('fo2map_prefs');
            if (stored) {
                this.visibleCategories = new Set(JSON.parse(stored));
                document.querySelectorAll('#category-toggles .toggle-checkbox').forEach(cb => {
                    const key = cb.id.replace('toggle-', '');
                    cb.checked = this.visibleCategories.has(key);
                    cb.closest('.toggle-item').classList.toggle('active', cb.checked);
                });
            }
        } catch (e) { console.warn('Failed to load preferences:', e); }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new FalloutMapApp();
});
