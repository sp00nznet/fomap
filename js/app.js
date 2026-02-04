// Fallout 3 Interactive Map - Main Application

class FalloutMapApp {
    constructor() {
        this.map = null;
        this.allMarkers = [];
        this.visibleCategories = new Set();
        this.visibleCollectibles = new Set();

        this.init();
    }

    init() {
        // Initialize map engine
        this.map = new MapEngine('map-canvas');

        // Setup callbacks
        this.map.onMarkerHover = (marker, x, y) => this.handleMarkerHover(marker, x, y);
        this.map.onMarkerClick = (marker) => this.handleMarkerClick(marker);
        this.map.onViewportChange = (viewport) => this.handleViewportChange(viewport);

        // Build marker list
        this.buildMarkerList();

        // Initialize UI
        this.initCategoryToggles();
        this.initCollectibleToggles();
        this.initSearch();
        this.initButtons();
        this.initModal();

        // Load saved preferences
        this.loadPreferences();

        // Update map markers
        this.updateMapMarkers();
    }

    buildMarkerList() {
        // Add regular locations
        for (const loc of locations) {
            this.allMarkers.push({
                ...loc,
                isCollectible: false
            });
        }

        // Add bobbleheads (S.P.E.C.I.A.L.)
        for (const bob of collectibles.bobbleheads_special) {
            this.allMarkers.push({
                id: bob.id,
                name: bob.name,
                category: 'bobbleheads_special',
                x: bob.x,
                y: bob.y,
                description: bob.description,
                location: bob.location,
                isCollectible: true
            });
        }

        // Add bobbleheads (Skills)
        for (const bob of collectibles.bobbleheads_skills) {
            this.allMarkers.push({
                id: bob.id,
                name: bob.name,
                category: 'bobbleheads_skills',
                x: bob.x,
                y: bob.y,
                description: bob.description,
                location: bob.location,
                isCollectible: true
            });
        }

        // Add skill books
        for (const [type, books] of Object.entries(collectibles.skillbooks)) {
            for (const book of books) {
                this.allMarkers.push({
                    id: book.id,
                    name: book.name,
                    category: 'skillbooks',
                    x: book.x,
                    y: book.y,
                    description: `Skill Book Location: ${book.location}`,
                    location: book.location,
                    isCollectible: true,
                    bookType: type
                });
            }
        }

        this.map.setMarkers(this.allMarkers);
    }

    initCategoryToggles() {
        const container = document.getElementById('category-toggles');
        container.innerHTML = '';

        for (const [key, data] of Object.entries(CATEGORIES)) {
            const count = locations.filter(l => l.category === key).length;
            const item = this.createToggleItem(key, data.name, count, true);
            container.appendChild(item);
            this.visibleCategories.add(key);
        }
    }

    initCollectibleToggles() {
        const container = document.getElementById('collectible-toggles');
        container.innerHTML = '';

        // S.P.E.C.I.A.L. Bobbleheads
        const specialCount = collectibles.bobbleheads_special.length;
        const specialItem = this.createToggleItem(
            'bobbleheads_special',
            'S.P.E.C.I.A.L. Bobbleheads',
            specialCount,
            false,
            true
        );
        container.appendChild(specialItem);

        // Skills Bobbleheads
        const skillsCount = collectibles.bobbleheads_skills.length;
        const skillsItem = this.createToggleItem(
            'bobbleheads_skills',
            'Skills Bobbleheads',
            skillsCount,
            false,
            true
        );
        container.appendChild(skillsItem);

        // Skill Books
        let bookCount = 0;
        for (const books of Object.values(collectibles.skillbooks)) {
            bookCount += books.length;
        }
        const booksItem = this.createToggleItem(
            'skillbooks',
            'Skill Books',
            bookCount,
            false,
            true
        );
        container.appendChild(booksItem);
    }

    createToggleItem(key, name, count, isCategory, isCollectible = false) {
        const item = document.createElement('div');
        item.className = 'toggle-item active';
        item.dataset.category = key;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'toggle-checkbox';
        checkbox.id = `toggle-${key}`;
        checkbox.checked = isCategory; // Categories on by default, collectibles off

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

        // Event listener
        checkbox.addEventListener('change', () => {
            if (isCollectible) {
                if (checkbox.checked) {
                    this.visibleCollectibles.add(key);
                } else {
                    this.visibleCollectibles.delete(key);
                }
            } else {
                if (checkbox.checked) {
                    this.visibleCategories.add(key);
                } else {
                    this.visibleCategories.delete(key);
                }
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
                results.innerHTML = '';
                return;
            }

            const matches = this.allMarkers.filter(m =>
                m.name.toLowerCase().includes(query)
            ).slice(0, 10);

            if (matches.length === 0) {
                results.classList.remove('active');
                results.innerHTML = '';
                return;
            }

            results.innerHTML = '';
            for (const match of matches) {
                const item = document.createElement('div');
                item.className = 'search-result-item';

                const name = document.createElement('div');
                name.className = 'result-name';
                name.textContent = match.name;

                const category = document.createElement('div');
                category.className = 'result-category';
                category.textContent = this.getCategoryDisplayName(match.category);

                item.appendChild(name);
                item.appendChild(category);

                item.addEventListener('click', () => {
                    this.selectLocation(match);
                    input.value = '';
                    results.classList.remove('active');
                });

                results.appendChild(item);
            }

            results.classList.add('active');
        });

        // Close results on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                results.classList.remove('active');
            }
        });

        // Keyboard navigation
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                results.classList.remove('active');
                input.blur();
            }
        });
    }

    initButtons() {
        // Show All button
        document.getElementById('show-all-btn').addEventListener('click', () => {
            this.setAllCategories(true);
        });

        // Hide All button
        document.getElementById('hide-all-btn').addEventListener('click', () => {
            this.setAllCategories(false);
        });

        // Reset View button
        document.getElementById('reset-view-btn').addEventListener('click', () => {
            this.map.centerMap();
        });

        // DC Metro button
        document.getElementById('metro-btn').addEventListener('click', () => {
            this.showMetroModal();
        });
    }

    initModal() {
        const modal = document.getElementById('metro-modal');
        const closeBtn = document.getElementById('metro-close');

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }

    setAllCategories(visible) {
        const checkboxes = document.querySelectorAll('#category-toggles .toggle-checkbox');

        checkboxes.forEach(checkbox => {
            checkbox.checked = visible;
            const key = checkbox.id.replace('toggle-', '');
            const item = checkbox.closest('.toggle-item');

            if (visible) {
                this.visibleCategories.add(key);
            } else {
                this.visibleCategories.delete(key);
            }
            item.classList.toggle('active', visible);
        });

        this.updateMapMarkers();
        this.savePreferences();
    }

    showMetroModal() {
        document.getElementById('metro-modal').classList.add('active');
    }

    selectLocation(marker) {
        // Ensure category is visible
        if (!this.visibleCategories.has(marker.category) &&
            !this.visibleCollectibles.has(marker.category)) {

            if (marker.isCollectible) {
                this.visibleCollectibles.add(marker.category);
                const checkbox = document.getElementById(`toggle-${marker.category}`);
                if (checkbox) {
                    checkbox.checked = true;
                    checkbox.closest('.toggle-item').classList.add('active');
                }
            } else {
                this.visibleCategories.add(marker.category);
                const checkbox = document.getElementById(`toggle-${marker.category}`);
                if (checkbox) {
                    checkbox.checked = true;
                    checkbox.closest('.toggle-item').classList.add('active');
                }
            }
            this.updateMapMarkers();
        }

        // Highlight and pan to marker
        this.map.highlightMarker(marker);
        this.map.selectedMarker = marker;

        // Show info panel
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
        document.getElementById('zoom-level').textContent =
            `Zoom: ${Math.round(viewport.zoom * 100)}%`;
    }

    showLocationInfo(marker) {
        const placeholder = document.querySelector('.info-placeholder');
        const content = document.getElementById('info-content');

        placeholder.style.display = 'none';
        content.style.display = 'block';

        document.getElementById('info-name').textContent = marker.name;
        document.getElementById('info-category').textContent =
            this.getCategoryDisplayName(marker.category);

        // Set image
        const imgElement = document.getElementById('info-image');
        if (marker.image) {
            imgElement.src = `assets/${marker.image}`;
            imgElement.alt = marker.name;
            imgElement.parentElement.style.display = 'block';
        } else {
            imgElement.parentElement.style.display = 'none';
        }

        // Set description
        let description = marker.description || 'No description available.';
        if (marker.location) {
            description += `\n\nLocation: ${marker.location}`;
        }
        document.getElementById('info-description').textContent = description;

        // Set coordinates
        document.getElementById('info-coords').textContent =
            `Map Position: ${Math.round(marker.x * 100)}%, ${Math.round(marker.y * 100)}%`;
    }

    getCategoryDisplayName(category) {
        if (CATEGORIES[category]) {
            return CATEGORIES[category].name;
        }
        if (COLLECTIBLE_CATEGORIES[category]) {
            return COLLECTIBLE_CATEGORIES[category].name;
        }
        return category;
    }

    updateMapMarkers() {
        const visible = new Set([
            ...this.visibleCategories,
            ...this.visibleCollectibles
        ]);
        this.map.setVisibleCategories(visible);
    }

    savePreferences() {
        const prefs = {
            categories: Array.from(this.visibleCategories),
            collectibles: Array.from(this.visibleCollectibles)
        };
        localStorage.setItem('fo3map_preferences', JSON.stringify(prefs));
    }

    loadPreferences() {
        try {
            const stored = localStorage.getItem('fo3map_preferences');
            if (stored) {
                const prefs = JSON.parse(stored);

                // Restore categories
                this.visibleCategories = new Set(prefs.categories || []);
                this.visibleCollectibles = new Set(prefs.collectibles || []);

                // Update UI
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
        } catch (e) {
            console.warn('Failed to load preferences:', e);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FalloutMapApp();
});
