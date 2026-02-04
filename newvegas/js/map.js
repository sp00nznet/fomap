// Fallout New Vegas Map Engine - Canvas-based pan/zoom

class MapEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.mapWidth = 800;
        this.mapHeight = 800;
        this.viewport = { x: 0, y: 0, zoom: 1, minZoom: 0.5, maxZoom: 3 };
        this.isDragging = false;
        this.lastMousePos = { x: 0, y: 0 };
        this.hoveredMarker = null;
        this.selectedMarker = null;
        this.markers = [];
        this.visibleCategories = new Set();
        this.onMarkerHover = null;
        this.onMarkerClick = null;
        this.onViewportChange = null;
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
            this.viewport.x += e.clientX - this.lastMousePos.x;
            this.viewport.y += e.clientY - this.lastMousePos.y;
            this.lastMousePos = { x: e.clientX, y: e.clientY };
            this.notifyViewportChange();
        } else {
            const marker = this.getMarkerAtPosition(mouseX, mouseY);
            if (marker !== this.hoveredMarker) {
                this.hoveredMarker = marker;
                this.canvas.style.cursor = marker ? 'pointer' : 'grab';
                if (this.onMarkerHover) this.onMarkerHover(marker, mouseX, mouseY);
            }
        }
    }

    onMouseUp() { this.isDragging = false; this.canvas.style.cursor = this.hoveredMarker ? 'pointer' : 'grab'; }
    onMouseLeave() { this.isDragging = false; this.hoveredMarker = null; this.canvas.style.cursor = 'grab'; if (this.onMarkerHover) this.onMarkerHover(null, 0, 0); }
    onClick() { if (this.hoveredMarker && this.onMarkerClick) { this.selectedMarker = this.hoveredMarker; this.onMarkerClick(this.hoveredMarker); } }

    onWheel(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        this.zoomAt(e.clientX - rect.left, e.clientY - rect.top, e.deltaY > 0 ? 0.9 : 1.1);
    }

    onTouchStart(e) { e.preventDefault(); this.touches = Array.from(e.touches); if (this.touches.length === 1) { this.isDragging = true; this.lastMousePos = { x: this.touches[0].clientX, y: this.touches[0].clientY }; } else if (this.touches.length === 2) { this.lastPinchDistance = this.getPinchDistance(this.touches); } }
    onTouchMove(e) { e.preventDefault(); const newTouches = Array.from(e.touches); if (newTouches.length === 1 && this.isDragging) { this.viewport.x += newTouches[0].clientX - this.lastMousePos.x; this.viewport.y += newTouches[0].clientY - this.lastMousePos.y; this.lastMousePos = { x: newTouches[0].clientX, y: newTouches[0].clientY }; this.notifyViewportChange(); } else if (newTouches.length === 2) { const newDist = this.getPinchDistance(newTouches); const center = this.getPinchCenter(newTouches); const rect = this.canvas.getBoundingClientRect(); this.zoomAt(center.x - rect.left, center.y - rect.top, newDist / this.lastPinchDistance); this.lastPinchDistance = newDist; } this.touches = newTouches; }
    onTouchEnd(e) { this.touches = Array.from(e.touches); if (this.touches.length < 2) { this.isDragging = this.touches.length === 1; if (this.isDragging) this.lastMousePos = { x: this.touches[0].clientX, y: this.touches[0].clientY }; } if (e.changedTouches.length === 1 && this.touches.length === 0) { const t = e.changedTouches[0]; const rect = this.canvas.getBoundingClientRect(); const marker = this.getMarkerAtPosition(t.clientX - rect.left, t.clientY - rect.top); if (marker && this.onMarkerClick) { this.selectedMarker = marker; this.onMarkerClick(marker); } } }

    getPinchDistance(t) { return Math.sqrt(Math.pow(t[0].clientX - t[1].clientX, 2) + Math.pow(t[0].clientY - t[1].clientY, 2)); }
    getPinchCenter(t) { return { x: (t[0].clientX + t[1].clientX) / 2, y: (t[0].clientY + t[1].clientY) / 2 }; }

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

    setMarkers(markers) { this.markers = markers; }
    setVisibleCategories(categories) { this.visibleCategories = new Set(categories); }

    getMarkerAtPosition(canvasX, canvasY) {
        const markerRadius = 15 * this.viewport.zoom;
        for (const marker of this.markers) {
            if (!this.visibleCategories.has(marker.category)) continue;
            const screenX = marker.x * this.mapWidth * this.viewport.zoom + this.viewport.x;
            const screenY = marker.y * this.mapHeight * this.viewport.zoom + this.viewport.y;
            if (Math.sqrt(Math.pow(canvasX - screenX, 2) + Math.pow(canvasY - screenY, 2)) <= markerRadius) return marker;
        }
        return null;
    }

    panToLocation(x, y) {
        const targetX = this.canvas.width / 2 - x * this.mapWidth * this.viewport.zoom;
        const targetY = this.canvas.height / 2 - y * this.mapHeight * this.viewport.zoom;
        const startX = this.viewport.x, startY = this.viewport.y;
        const duration = 500, startTime = performance.now();
        const animate = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            this.viewport.x = startX + (targetX - startX) * eased;
            this.viewport.y = startY + (targetY - startY) * eased;
            this.notifyViewportChange();
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    highlightMarker(marker) { if (marker) this.panToLocation(marker.x, marker.y); }
    startRenderLoop() { const render = () => { this.render(); requestAnimationFrame(render); }; requestAnimationFrame(render); }

    render() {
        const ctx = this.ctx;
        ctx.fillStyle = '#1a0d00';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderTerrain();
        this.renderGrid();
        this.renderMarkers();
    }

    renderTerrain() {
        const ctx = this.ctx;
        const vx = this.viewport.x, vy = this.viewport.y, vz = this.viewport.zoom;
        const mw = this.mapWidth * vz, mh = this.mapHeight * vz;

        ctx.strokeStyle = '#ff9f0a';
        ctx.lineWidth = 2;
        ctx.strokeRect(vx, vy, mw, mh);

        ctx.fillStyle = 'rgba(255, 159, 10, 0.03)';
        ctx.fillRect(vx, vy, mw, mh);

        // Draw Mojave terrain features
        ctx.strokeStyle = 'rgba(255, 159, 10, 0.15)';
        ctx.lineWidth = 1;

        // Colorado River (east side)
        ctx.beginPath();
        ctx.moveTo(vx + mw * 0.85, vy);
        ctx.quadraticCurveTo(vx + mw * 0.9, vy + mh * 0.5, vx + mw * 0.95, vy + mh);
        ctx.stroke();

        // Lake Mead
        ctx.fillStyle = 'rgba(255, 159, 10, 0.1)';
        ctx.beginPath();
        ctx.ellipse(vx + mw * 0.85, vy + mh * 0.45, mw * 0.08, mh * 0.12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Mountains
        ctx.strokeStyle = 'rgba(255, 159, 10, 0.2)';
        ctx.beginPath();
        ctx.moveTo(vx, vy + mh * 0.1);
        ctx.lineTo(vx + mw * 0.25, vy + mh * 0.15);
        ctx.stroke();
    }

    renderGrid() {
        const ctx = this.ctx;
        const vx = this.viewport.x, vy = this.viewport.y, vz = this.viewport.zoom;
        const mw = this.mapWidth * vz, mh = this.mapHeight * vz;
        ctx.strokeStyle = 'rgba(255, 159, 10, 0.08)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            ctx.beginPath(); ctx.moveTo(vx + (mw / 10) * i, vy); ctx.lineTo(vx + (mw / 10) * i, vy + mh); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(vx, vy + (mh / 10) * i); ctx.lineTo(vx + mw, vy + (mh / 10) * i); ctx.stroke();
        }
    }

    renderMarkers() {
        const ctx = this.ctx;
        const baseSize = 12;
        for (const marker of this.markers) {
            if (!this.visibleCategories.has(marker.category)) continue;
            const screenX = marker.x * this.mapWidth * this.viewport.zoom + this.viewport.x;
            const screenY = marker.y * this.mapHeight * this.viewport.zoom + this.viewport.y;
            const size = baseSize * this.viewport.zoom;
            if (screenX < -size || screenX > this.canvas.width + size || screenY < -size || screenY > this.canvas.height + size) continue;

            const isHovered = marker === this.hoveredMarker;
            const isSelected = marker === this.selectedMarker;

            if (isHovered || isSelected) {
                ctx.beginPath();
                ctx.arc(screenX, screenY, size + 6, 0, Math.PI * 2);
                ctx.fillStyle = marker.isCollectible ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 159, 10, 0.4)';
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
            const category = CATEGORIES[marker.category] || COLLECTIBLE_CATEGORIES[marker.category];
            ctx.fillStyle = category ? category.color : '#ff9f0a';
            ctx.fill();
            ctx.strokeStyle = isSelected ? '#ffffff' : '#3d2500';
            ctx.lineWidth = isSelected ? 3 : 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(screenX, screenY, size * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = '#3d2500';
            ctx.fill();

            if (isHovered && this.viewport.zoom >= 0.8) this.renderLabel(screenX, screenY - size - 10, marker.name);
        }
    }

    renderLabel(x, y, text) {
        const ctx = this.ctx;
        ctx.font = '14px "Share Tech Mono", monospace';
        const tw = ctx.measureText(text).width;
        const p = 6;
        ctx.fillStyle = 'rgba(13, 8, 0, 0.9)';
        ctx.fillRect(x - tw / 2 - p, y - 10, tw + p * 2, 20);
        ctx.strokeStyle = '#ff9f0a';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - tw / 2 - p, y - 10, tw + p * 2, 20);
        ctx.fillStyle = '#ff9f0a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    }

    notifyViewportChange() { if (this.onViewportChange) this.onViewportChange({ zoom: this.viewport.zoom, x: this.viewport.x, y: this.viewport.y }); }
}

if (typeof module !== 'undefined' && module.exports) module.exports = MapEngine;
