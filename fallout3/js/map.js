// Fallout 3 Map Engine - Canvas-based pan/zoom

class MapEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Map image
        this.mapImage = new Image();
        this.mapLoaded = false;
        this.mapWidth = 658;
        this.mapHeight = 663;

        // Viewport state
        this.viewport = {
            x: 0,
            y: 0,
            zoom: 1,
            minZoom: 0.5,
            maxZoom: 4
        };

        // Interaction state
        this.isDragging = false;
        this.lastMousePos = { x: 0, y: 0 };
        this.hoveredMarker = null;
        this.selectedMarker = null;
        this.highlightedMarker = null;

        // Markers
        this.markers = [];
        this.visibleCategories = new Set();
        this.markerIcons = {};

        // Callbacks
        this.onMarkerHover = null;
        this.onMarkerClick = null;
        this.onViewportChange = null;

        // Touch support
        this.touches = [];
        this.lastPinchDistance = 0;

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.loadMapImage();
        this.setupEventListeners();
        this.startRenderLoop();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.centerMap();
    }

    loadMapImage() {
        this.mapImage.onload = () => {
            this.mapLoaded = true;
            this.centerMap();
        };
        this.mapImage.src = 'assets/img_1499.jpg';
    }

    loadMarkerIcons() {
        for (const [category, data] of Object.entries(CATEGORIES)) {
            const img = new Image();
            img.src = `assets/${data.icon}`;
            this.markerIcons[category] = img;
        }
    }

    centerMap() {
        if (!this.mapLoaded) return;

        // Calculate zoom to fit map in viewport
        const scaleX = this.canvas.width / this.mapWidth;
        const scaleY = this.canvas.height / this.mapHeight;
        this.viewport.zoom = Math.min(scaleX, scaleY) * 0.9;

        // Center the map
        this.viewport.x = (this.canvas.width - this.mapWidth * this.viewport.zoom) / 2;
        this.viewport.y = (this.canvas.height - this.mapHeight * this.viewport.zoom) / 2;

        this.notifyViewportChange();
    }

    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        this.canvas.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
        this.canvas.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
        this.canvas.addEventListener('click', (e) => this.onClick(e));

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
        this.canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));

        // Window resize
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.resizeCanvas(), 100);
        });
    }

    // Mouse handlers
    onMouseDown(e) {
        if (e.button === 0) {
            this.isDragging = true;
            this.lastMousePos = { x: e.clientX, y: e.clientY };
            this.canvas.style.cursor = 'grabbing';
        }
    }

    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (this.isDragging) {
            const dx = e.clientX - this.lastMousePos.x;
            const dy = e.clientY - this.lastMousePos.y;

            this.viewport.x += dx;
            this.viewport.y += dy;

            this.lastMousePos = { x: e.clientX, y: e.clientY };
            this.notifyViewportChange();
        } else {
            // Check for marker hover
            const marker = this.getMarkerAtPosition(mouseX, mouseY);

            if (marker !== this.hoveredMarker) {
                this.hoveredMarker = marker;
                this.canvas.style.cursor = marker ? 'pointer' : 'grab';

                if (this.onMarkerHover) {
                    this.onMarkerHover(marker, mouseX, mouseY);
                }
            }
        }
    }

    onMouseUp(e) {
        this.isDragging = false;
        this.canvas.style.cursor = this.hoveredMarker ? 'pointer' : 'grab';
    }

    onMouseLeave(e) {
        this.isDragging = false;
        this.hoveredMarker = null;
        this.canvas.style.cursor = 'grab';

        if (this.onMarkerHover) {
            this.onMarkerHover(null, 0, 0);
        }
    }

    onClick(e) {
        if (this.hoveredMarker && this.onMarkerClick) {
            this.selectedMarker = this.hoveredMarker;
            this.onMarkerClick(this.hoveredMarker);
        }
    }

    onWheel(e) {
        e.preventDefault();

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        this.zoomAt(mouseX, mouseY, zoomFactor);
    }

    // Touch handlers
    onTouchStart(e) {
        e.preventDefault();
        this.touches = Array.from(e.touches);

        if (this.touches.length === 1) {
            this.isDragging = true;
            this.lastMousePos = {
                x: this.touches[0].clientX,
                y: this.touches[0].clientY
            };
        } else if (this.touches.length === 2) {
            this.lastPinchDistance = this.getPinchDistance(this.touches);
        }
    }

    onTouchMove(e) {
        e.preventDefault();
        const newTouches = Array.from(e.touches);

        if (newTouches.length === 1 && this.isDragging) {
            const dx = newTouches[0].clientX - this.lastMousePos.x;
            const dy = newTouches[0].clientY - this.lastMousePos.y;

            this.viewport.x += dx;
            this.viewport.y += dy;

            this.lastMousePos = {
                x: newTouches[0].clientX,
                y: newTouches[0].clientY
            };
            this.notifyViewportChange();
        } else if (newTouches.length === 2) {
            const newDistance = this.getPinchDistance(newTouches);
            const center = this.getPinchCenter(newTouches);
            const rect = this.canvas.getBoundingClientRect();

            const zoomFactor = newDistance / this.lastPinchDistance;
            this.zoomAt(center.x - rect.left, center.y - rect.top, zoomFactor);

            this.lastPinchDistance = newDistance;
        }

        this.touches = newTouches;
    }

    onTouchEnd(e) {
        this.touches = Array.from(e.touches);

        if (this.touches.length < 2) {
            this.isDragging = this.touches.length === 1;
            if (this.isDragging) {
                this.lastMousePos = {
                    x: this.touches[0].clientX,
                    y: this.touches[0].clientY
                };
            }
        }

        // Handle tap for marker selection
        if (e.changedTouches.length === 1 && this.touches.length === 0) {
            const touch = e.changedTouches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            const marker = this.getMarkerAtPosition(x, y);
            if (marker && this.onMarkerClick) {
                this.selectedMarker = marker;
                this.onMarkerClick(marker);
            }
        }
    }

    getPinchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    getPinchCenter(touches) {
        return {
            x: (touches[0].clientX + touches[1].clientX) / 2,
            y: (touches[0].clientY + touches[1].clientY) / 2
        };
    }

    // Zoom functionality
    zoomAt(x, y, factor) {
        const oldZoom = this.viewport.zoom;
        const newZoom = Math.max(
            this.viewport.minZoom,
            Math.min(this.viewport.maxZoom, oldZoom * factor)
        );

        if (newZoom !== oldZoom) {
            // Zoom centered on mouse position
            const mapX = (x - this.viewport.x) / oldZoom;
            const mapY = (y - this.viewport.y) / oldZoom;

            this.viewport.zoom = newZoom;
            this.viewport.x = x - mapX * newZoom;
            this.viewport.y = y - mapY * newZoom;

            this.notifyViewportChange();
        }
    }

    setZoom(zoom) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const factor = zoom / this.viewport.zoom;
        this.zoomAt(centerX, centerY, factor);
    }

    // Marker management
    setMarkers(markers) {
        this.markers = markers;
    }

    setVisibleCategories(categories) {
        this.visibleCategories = new Set(categories);
    }

    getMarkerAtPosition(canvasX, canvasY) {
        const markerRadius = 15 * this.viewport.zoom;

        for (const marker of this.markers) {
            if (!this.visibleCategories.has(marker.category)) continue;

            const screenX = marker.x * this.mapWidth * this.viewport.zoom + this.viewport.x;
            const screenY = marker.y * this.mapHeight * this.viewport.zoom + this.viewport.y;

            const dx = canvasX - screenX;
            const dy = canvasY - screenY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= markerRadius) {
                return marker;
            }
        }

        return null;
    }

    panToLocation(x, y) {
        const targetX = this.canvas.width / 2 - x * this.mapWidth * this.viewport.zoom;
        const targetY = this.canvas.height / 2 - y * this.mapHeight * this.viewport.zoom;

        // Animate pan
        const startX = this.viewport.x;
        const startY = this.viewport.y;
        const duration = 500;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

            this.viewport.x = startX + (targetX - startX) * eased;
            this.viewport.y = startY + (targetY - startY) * eased;

            this.notifyViewportChange();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    highlightMarker(marker) {
        this.highlightedMarker = marker;
        if (marker) {
            this.panToLocation(marker.x, marker.y);
        }
    }

    // Rendering
    startRenderLoop() {
        const render = () => {
            this.render();
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }

    render() {
        const ctx = this.ctx;

        // Clear canvas
        ctx.fillStyle = '#0a1a0a';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.mapLoaded) return;

        // Draw map
        ctx.drawImage(
            this.mapImage,
            this.viewport.x,
            this.viewport.y,
            this.mapWidth * this.viewport.zoom,
            this.mapHeight * this.viewport.zoom
        );

        // Draw markers
        this.renderMarkers();
    }

    renderMarkers() {
        const ctx = this.ctx;
        const baseSize = 12;
        const size = baseSize * Math.max(0.8, Math.min(1.5, this.viewport.zoom));

        for (const marker of this.markers) {
            if (!this.visibleCategories.has(marker.category)) continue;

            const screenX = marker.x * this.mapWidth * this.viewport.zoom + this.viewport.x;
            const screenY = marker.y * this.mapHeight * this.viewport.zoom + this.viewport.y;

            // Skip if off-screen
            if (screenX < -size || screenX > this.canvas.width + size ||
                screenY < -size || screenY > this.canvas.height + size) {
                continue;
            }

            // Determine marker style
            const isHovered = marker === this.hoveredMarker;
            const isSelected = marker === this.selectedMarker;
            const isHighlighted = marker === this.highlightedMarker;

            // Draw marker glow
            if (isHovered || isSelected || isHighlighted) {
                ctx.beginPath();
                ctx.arc(screenX, screenY, size + 6, 0, Math.PI * 2);
                ctx.fillStyle = isHighlighted ? 'rgba(255, 215, 0, 0.4)' : 'rgba(20, 254, 23, 0.4)';
                ctx.fill();
            }

            // Draw marker background
            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);

            // Color based on category/type
            let fillColor = '#14fe17';
            if (marker.isCollectible) {
                fillColor = marker.category.includes('bobblehead') ? '#ffd700' : '#87ceeb';
            } else if (marker.category === 'undiscovered') {
                fillColor = '#666666';
            }

            ctx.fillStyle = fillColor;
            ctx.fill();

            // Draw marker border
            ctx.strokeStyle = isSelected ? '#ffffff' : '#0a3d0c';
            ctx.lineWidth = isSelected ? 3 : 2;
            ctx.stroke();

            // Draw inner circle
            ctx.beginPath();
            ctx.arc(screenX, screenY, size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = '#0a3d0c';
            ctx.fill();

            // Draw marker label on hover
            if (isHovered && this.viewport.zoom >= 1) {
                this.renderMarkerLabel(screenX, screenY, marker.name);
            }
        }
    }

    renderMarkerLabel(x, y, text) {
        const ctx = this.ctx;
        const padding = 6;
        const fontSize = 12;

        ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
        const textWidth = ctx.measureText(text).width;

        const boxX = x - textWidth / 2 - padding;
        const boxY = y - 35;
        const boxWidth = textWidth + padding * 2;
        const boxHeight = fontSize + padding * 2;

        // Background
        ctx.fillStyle = 'rgba(5, 13, 5, 0.9)';
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

        // Border
        ctx.strokeStyle = '#14fe17';
        ctx.lineWidth = 1;
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

        // Text
        ctx.fillStyle = '#14fe17';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, boxY + boxHeight / 2);
    }

    // Utility methods
    notifyViewportChange() {
        if (this.onViewportChange) {
            this.onViewportChange({
                zoom: this.viewport.zoom,
                x: this.viewport.x,
                y: this.viewport.y
            });
        }
    }

    screenToMap(screenX, screenY) {
        return {
            x: (screenX - this.viewport.x) / (this.mapWidth * this.viewport.zoom),
            y: (screenY - this.viewport.y) / (this.mapHeight * this.viewport.zoom)
        };
    }

    mapToScreen(mapX, mapY) {
        return {
            x: mapX * this.mapWidth * this.viewport.zoom + this.viewport.x,
            y: mapY * this.mapHeight * this.viewport.zoom + this.viewport.y
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapEngine;
}
