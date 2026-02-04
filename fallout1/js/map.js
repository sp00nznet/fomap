// Fallout 1 Map Engine - Canvas-based with classic world map style

class MapEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Map dimensions (classic proportions)
        this.mapWidth = 800;
        this.mapHeight = 800;

        // Viewport state
        this.viewport = {
            x: 0,
            y: 0,
            zoom: 1,
            minZoom: 0.5,
            maxZoom: 3
        };

        // Interaction state
        this.isDragging = false;
        this.lastMousePos = { x: 0, y: 0 };
        this.hoveredMarker = null;
        this.selectedMarker = null;

        // Markers
        this.markers = [];
        this.visibleCategories = new Set();

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
        this.setupEventListeners();
        this.startRenderLoop();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.centerMap();
    }

    centerMap() {
        const scaleX = this.canvas.width / this.mapWidth;
        const scaleY = this.canvas.height / this.mapHeight;
        this.viewport.zoom = Math.min(scaleX, scaleY) * 0.85;
        this.viewport.x = (this.canvas.width - this.mapWidth * this.viewport.zoom) / 2;
        this.viewport.y = (this.canvas.height - this.mapHeight * this.viewport.zoom) / 2;
        this.notifyViewportChange();
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        this.canvas.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
        this.canvas.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
        this.canvas.addEventListener('click', (e) => this.onClick(e));

        this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
        this.canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));

        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.resizeCanvas(), 100);
        });
    }

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
        if (this.onMarkerHover) this.onMarkerHover(null, 0, 0);
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

    onTouchStart(e) {
        e.preventDefault();
        this.touches = Array.from(e.touches);
        if (this.touches.length === 1) {
            this.isDragging = true;
            this.lastMousePos = { x: this.touches[0].clientX, y: this.touches[0].clientY };
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
            this.lastMousePos = { x: newTouches[0].clientX, y: newTouches[0].clientY };
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
                this.lastMousePos = { x: this.touches[0].clientX, y: this.touches[0].clientY };
            }
        }
        if (e.changedTouches.length === 1 && this.touches.length === 0) {
            const touch = e.changedTouches[0];
            const rect = this.canvas.getBoundingClientRect();
            const marker = this.getMarkerAtPosition(touch.clientX - rect.left, touch.clientY - rect.top);
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

    zoomAt(x, y, factor) {
        const oldZoom = this.viewport.zoom;
        const newZoom = Math.max(this.viewport.minZoom, Math.min(this.viewport.maxZoom, oldZoom * factor));
        if (newZoom !== oldZoom) {
            const mapX = (x - this.viewport.x) / oldZoom;
            const mapY = (y - this.viewport.y) / oldZoom;
            this.viewport.zoom = newZoom;
            this.viewport.x = x - mapX * newZoom;
            this.viewport.y = y - mapY * newZoom;
            this.notifyViewportChange();
        }
    }

    setMarkers(markers) {
        this.markers = markers;
    }

    setVisibleCategories(categories) {
        this.visibleCategories = new Set(categories);
    }

    getMarkerAtPosition(canvasX, canvasY) {
        const markerRadius = 18 * this.viewport.zoom;
        for (const marker of this.markers) {
            if (!this.visibleCategories.has(marker.category)) continue;
            const screenX = marker.x * this.mapWidth * this.viewport.zoom + this.viewport.x;
            const screenY = marker.y * this.mapHeight * this.viewport.zoom + this.viewport.y;
            const dx = canvasX - screenX;
            const dy = canvasY - screenY;
            if (Math.sqrt(dx * dx + dy * dy) <= markerRadius) {
                return marker;
            }
        }
        return null;
    }

    panToLocation(x, y) {
        const targetX = this.canvas.width / 2 - x * this.mapWidth * this.viewport.zoom;
        const targetY = this.canvas.height / 2 - y * this.mapHeight * this.viewport.zoom;
        const startX = this.viewport.x;
        const startY = this.viewport.y;
        const duration = 500;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            this.viewport.x = startX + (targetX - startX) * eased;
            this.viewport.y = startY + (targetY - startY) * eased;
            this.notifyViewportChange();
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    highlightMarker(marker) {
        if (marker) this.panToLocation(marker.x, marker.y);
    }

    startRenderLoop() {
        const render = () => {
            this.render();
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }

    render() {
        const ctx = this.ctx;

        // Background - dark wasteland
        ctx.fillStyle = '#1a1408';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw map terrain (stylized)
        this.renderTerrain();

        // Draw grid lines (classic Fallout style)
        this.renderGrid();

        // Draw markers
        this.renderMarkers();
    }

    renderTerrain() {
        const ctx = this.ctx;
        const vx = this.viewport.x;
        const vy = this.viewport.y;
        const vz = this.viewport.zoom;
        const mw = this.mapWidth * vz;
        const mh = this.mapHeight * vz;

        // Map border
        ctx.strokeStyle = '#ffb000';
        ctx.lineWidth = 2;
        ctx.strokeRect(vx, vy, mw, mh);

        // Terrain features (simplified SoCal geography)
        ctx.fillStyle = 'rgba(255, 176, 0, 0.05)';
        ctx.fillRect(vx, vy, mw, mh);

        // Mountain ranges (stylized)
        ctx.strokeStyle = 'rgba(255, 176, 0, 0.2)';
        ctx.lineWidth = 1;

        // Sierra Nevada (eastern edge)
        ctx.beginPath();
        ctx.moveTo(vx + mw * 0.7, vy);
        ctx.lineTo(vx + mw * 0.8, vy + mh * 0.3);
        ctx.lineTo(vx + mw * 0.75, vy + mh * 0.6);
        ctx.stroke();

        // Coastal range
        ctx.beginPath();
        ctx.moveTo(vx, vy + mh * 0.3);
        ctx.lineTo(vx + mw * 0.15, vy + mh * 0.5);
        ctx.lineTo(vx + mw * 0.1, vy + mh * 0.8);
        ctx.stroke();

        // Pacific coast
        ctx.strokeStyle = 'rgba(255, 176, 0, 0.3)';
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(vx, vy + mh);
        ctx.stroke();
    }

    renderGrid() {
        const ctx = this.ctx;
        const vx = this.viewport.x;
        const vy = this.viewport.y;
        const vz = this.viewport.zoom;
        const mw = this.mapWidth * vz;
        const mh = this.mapHeight * vz;

        ctx.strokeStyle = 'rgba(255, 176, 0, 0.1)';
        ctx.lineWidth = 1;

        // Draw grid
        const gridSize = 10;
        for (let i = 0; i <= gridSize; i++) {
            const x = vx + (mw / gridSize) * i;
            const y = vy + (mh / gridSize) * i;

            ctx.beginPath();
            ctx.moveTo(x, vy);
            ctx.lineTo(x, vy + mh);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(vx, y);
            ctx.lineTo(vx + mw, y);
            ctx.stroke();
        }
    }

    renderMarkers() {
        const ctx = this.ctx;
        const baseSize = 15;

        for (const marker of this.markers) {
            if (!this.visibleCategories.has(marker.category)) continue;

            const screenX = marker.x * this.mapWidth * this.viewport.zoom + this.viewport.x;
            const screenY = marker.y * this.mapHeight * this.viewport.zoom + this.viewport.y;
            const size = baseSize * this.viewport.zoom;

            if (screenX < -size || screenX > this.canvas.width + size ||
                screenY < -size || screenY > this.canvas.height + size) continue;

            const isHovered = marker === this.hoveredMarker;
            const isSelected = marker === this.selectedMarker;

            // Glow effect
            if (isHovered || isSelected) {
                ctx.beginPath();
                ctx.arc(screenX, screenY, size + 8, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 176, 0, 0.3)';
                ctx.fill();
            }

            // Classic Fallout circle marker
            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);

            // Get category color
            const category = CATEGORIES[marker.category];
            ctx.fillStyle = category ? category.color : '#ffb000';
            ctx.fill();

            ctx.strokeStyle = isSelected ? '#ffffff' : '#332200';
            ctx.lineWidth = isSelected ? 3 : 2;
            ctx.stroke();

            // Inner dot
            ctx.beginPath();
            ctx.arc(screenX, screenY, size * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#332200';
            ctx.fill();

            // Label on hover
            if (isHovered && this.viewport.zoom >= 0.8) {
                this.renderLabel(screenX, screenY - size - 10, marker.name);
            }
        }
    }

    renderLabel(x, y, text) {
        const ctx = this.ctx;
        ctx.font = '18px VT323, monospace';
        const textWidth = ctx.measureText(text).width;
        const padding = 6;

        ctx.fillStyle = 'rgba(10, 8, 0, 0.9)';
        ctx.fillRect(x - textWidth / 2 - padding, y - 12, textWidth + padding * 2, 24);

        ctx.strokeStyle = '#ffb000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - textWidth / 2 - padding, y - 12, textWidth + padding * 2, 24);

        ctx.fillStyle = '#ffb000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    }

    notifyViewportChange() {
        if (this.onViewportChange) {
            this.onViewportChange({ zoom: this.viewport.zoom, x: this.viewport.x, y: this.viewport.y });
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapEngine;
}
