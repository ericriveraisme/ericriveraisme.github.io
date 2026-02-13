import React, { useEffect, useRef, useState } from 'react';
import { FF6_CHARACTER_SPRITES, FF6_CHARACTER_SPRITES_BACK } from './assets/sprites/ff6-characters.js';
import { FF6_ENEMY_SPRITES } from './assets/sprites/ff6-enemies.js';
import { resumeData } from './src/data/resumeData.js';

/**
 * FF6 Portfolio App
 * 
 * A retro Final Fantasy 6-inspired portfolio website featuring:
 * - Canvas-based pixel art animation with FF6 character sprites
 * - Parallax scrolling landscape (Narshe ice caves theme)
 * - Falling snowflakes and wind effects
 * - Interactive enemy sprite (Cactuar) walking across screen
 * - Professional resume/portfolio data display
 * - Responsive canvas that adapts to window resize
 * 
 * @component
 * @returns {JSX.Element} Rendered portfolio app with canvas and controls
 * 
 * @example
 * // In your main entry point:
 * import App from './FF6PortfolioApp.jsx';
 * 
 * // Component renders full-screen canvas with portfolio content
 */
const App = () => {
  const canvasRef = useRef(null);
  const [fps, setFps] = useState(0);
  const [watchMode, setWatchMode] = useState(false);

  /**
   * Toggle watch mode (currently unused but available for future features)
   * @function toggleWatchMode
   * @returns {void}
   */
  const toggleWatchMode = () => {
    setWatchMode(!watchMode);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    
    // --- Constants ---
    const SCALE = 3; 
    const TILE_SIZE = 16; 
    
    // --- State ---
    let animationFrameId;
    let lastTime = performance.now();
    let cameraY = 0;
    
    // Performance optimization: track average FPS and reduce particles if low
    let fpsSamples = [];
    let particleCount = 150; // Start with 150 snowflakes
    
    // --- Assets (FF6 Sprites) - Imported from assets folder ---
    // Using sprites from assets/sprites/ff6-characters.js
    const TERRA = FF6_CHARACTER_SPRITES.TERRA;
    const LOCKE = FF6_CHARACTER_SPRITES.LOCKE;
    const EDGAR = FF6_CHARACTER_SPRITES.EDGAR;
    const CELES = FF6_CHARACTER_SPRITES.CELES;
    
    // Back-facing versions (walking away from camera)
    const TERRA_BACK = FF6_CHARACTER_SPRITES_BACK.TERRA_BACK;
    const LOCKE_BACK = FF6_CHARACTER_SPRITES_BACK.LOCKE_BACK;
    const EDGAR_BACK = FF6_CHARACTER_SPRITES_BACK.EDGAR_BACK;
    const CELES_BACK = FF6_CHARACTER_SPRITES_BACK.CELES_BACK;

    const PARTY = [
      { sprite: EDGAR_BACK, x: 8, y: 0 },     // First character (top-left, zig) - shifted right ~1.5 tiles
      { sprite: TERRA_BACK, x: 36, y: 15 },   // Diagonally descending (zag, right) - shifted right ~1.5 tiles
      { sprite: CELES_BACK, x: 12, y: 30 },   // Diagonally descending (zig, left) - shifted right ~1.5 tiles
      { sprite: LOCKE_BACK, x: 40, y: 45 }    // Last character (zag, bottom-right) - shifted right ~1.5 tiles
    ];

    // --- Snow System ---
    const snowflakes = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 1 + Math.random() * 3,
      size: Math.random() * 2,
      drift: (Math.random() - 0.5) * 0.5
    }));

    // --- Enemy Mob (Cactuar) - Imported from assets folder ---
    const CACTUAR = FF6_ENEMY_SPRITES.CACTUAR;

    // Enemy state
    let enemyX = 0;
    let enemyY = 0;
    let enemyDirection = 1; // 1 = right, -1 = left
    let enemySpeed = 80; // pixels per second

    // --- Renderer ---

    /**
     * Resize canvas to match window dimensions and update rendering context
     * Called on mount and whenever window is resized (debounced to max 1 per 250ms)
     * Debouncing prevents excessive canvas dimension updates during window resize events
     * @function resize
     * @returns {void}
     */
    let resizeTimeoutId;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    
    // Debounce resize events to avoid thrashing (max 1 per 250ms)
    const onWindowResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(resize, 250);
    };
    window.addEventListener('resize', onWindowResize);
    resize();

    // Frame rate limiting variables (target 60fps)
    let lastFrameTime = performance.now();
    const FRAME_RATE = 60;
    const FRAME_INTERVAL = 1000 / FRAME_RATE;

    /**
     * Draw a character sprite at specified position with animation
     * Handles pixel-art scaling, horizontal flipping, and walking animation
     * Includes shadow effect on snow surface
     * 
     * @function drawCharacter
     * @param {Object} char - Character object with sprite property
     * @param {number} cx - Canvas X coordinate for character center
     * @param {number} cy - Canvas Y coordinate for character base position
     * @param {number} frame - Animation frame counter (0+, increments each loop)
     * @param {boolean} [flipHorizontal=false] - Whether to flip sprite horizontally
     * @returns {void}
     */
    const drawCharacter = (char, cx, cy, frame, flipHorizontal = false) => {
      const pixelSize = SCALE;
      const palette = char.sprite.palette;
      const rows = char.sprite.pixels;

      // Bobbing & Walking Animation
      const bob = Math.floor(Math.sin(frame * 0.15) * 2); 
      const walkFrame = Math.floor(frame * 0.2) % 4; 
      
      const baseX = Math.floor(cx);
      const baseY = Math.floor(cy + bob);

      // Shadow on Snow
      ctx.fillStyle = "rgba(0,10,20,0.3)";
      ctx.fillRect(baseX + 2*pixelSize, baseY + 15*pixelSize, 12*pixelSize, 3*pixelSize);

      rows.forEach((row, r) => {
        for(let c=0; c<row.length; c++) {
          const colorCode = row[c];
          if(colorCode !== ' ') {
            let drawY = baseY + r * pixelSize;
            // Flip horizontally by reversing column index
            const colIndex = flipHorizontal ? (row.length - 1 - c) : c;
            let drawX = baseX + colIndex * pixelSize;

            if (r >= 13) {
               if (walkFrame === 1 && c < 8) drawY -= pixelSize; 
               if (walkFrame === 3 && c >= 8) drawY -= pixelSize; 
            }
            if (r >= 9 && r <= 10) {
               if (walkFrame === 1 && c >= 12) drawY -= pixelSize; 
               if (walkFrame === 3 && c <= 3) drawY -= pixelSize; 
            }

            ctx.fillStyle = palette[colorCode];
            ctx.fillRect(drawX, drawY, pixelSize, pixelSize);
          }
        }
      });
    };

    /**
     * Draw an enemy sprite (Cactuar) at specified position with animation
     * Handles bouncing animation and horizontal flipping
     * Includes shadow effect beneath the sprite
     * 
     * @function drawEnemy
     * @param {Object} enemy - Enemy sprite object with palette and pixels
     * @param {number} x - Canvas X coordinate
     * @param {number} y - Canvas Y coordinate
     * @param {number} frame - Animation frame counter (0+)
     * @param {number} [scale=1.0] - Scale multiplier for sprite size
     * @param {boolean} [flipHorizontal=false] - Whether to flip sprite horizontally
     * @returns {void}
     */
    const drawEnemy = (enemy, x, y, frame, scale = 1.0, flipHorizontal = false) => {
      const pixelSize = SCALE * scale; // Smaller scale for Cactuar
      const palette = enemy.palette;
      const rows = enemy.pixels;

      // Running animation (bounce)
      const bounce = Math.floor(Math.sin(frame * 0.25) * 2);
      
      const baseX = Math.floor(x);
      const baseY = Math.floor(y + bounce);

      // Shadow
      ctx.fillStyle = "rgba(0,10,20,0.4)";
      ctx.fillRect(baseX + 2*pixelSize, baseY + 25*pixelSize, 8*pixelSize, 2*pixelSize);

      rows.forEach((row, r) => {
        for(let c=0; c<row.length; c++) {
          const colorCode = row[c];
          if(colorCode !== ' ') {
            const drawY = baseY + r * pixelSize;
            // Flip horizontally by reversing column index
            const colIndex = flipHorizontal ? (row.length - 1 - c) : c;
            const drawX = baseX + colIndex * pixelSize;

            ctx.fillStyle = palette[colorCode];
            ctx.fillRect(drawX, drawY, pixelSize, pixelSize);
          }
        }
      });
    };

    /**
     * Main animation loop - renders all visual elements and updates game state
     * Called repeatedly via requestAnimationFrame for smooth 60fps animation
     * Implements frame rate limiting to avoid excessive CPU usage on low-end devices
     * 
     * Renders (in z-order):
     * 1. Sky gradient background
     * 2. Parallax cloud layer
     * 3. Mountain silhouettes with city lights
     * 4. Snow/ground tiles (checkerboard pattern)
     * 5. Trees and obstacles
     * 6. Enemy sprite (Cactuar)
     * 7. Player party characters (walking away from camera)
     * 8. Snowflake particles (count reduced on detection of low frame rates)
     * 9. Wind/snow drift effects (animated wavy bands, optimized every 2 frames)
     * 
     * @function loop
     * @param {number} timestamp - Performance timestamp (milliseconds since page load)
     * @returns {void}
     */
    const loop = (timestamp) => {
      // Frame rate limiting: skip frame if not enough time has passed
      const deltaTime = timestamp - lastFrameTime;
      if (deltaTime < FRAME_INTERVAL) {
        animationFrameId = window.requestAnimationFrame(loop);
        return;
      }
      lastFrameTime = timestamp - (deltaTime % FRAME_INTERVAL);
      
      const dt = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      setFps(Math.round(1/dt));

      cameraY -= 50 * dt; 

      // --- SKY ---
      // Dark Magitek Night
      ctx.fillStyle = '#02040a'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const horizonY = Math.floor(canvas.height * 0.40); 
      
      // --- LAYER 1: Parallax Mountains (Narshe Cliffs) ---
      
      // Distant Fog/Clouds
      ctx.fillStyle = '#0f172a'; // Dark Slate
      for(let i=0; i<4; i++) {
        const cloudX = ((timestamp/80) + i * 250) % (canvas.width + 300) - 150;
        const cloudY = horizonY - 100 + Math.sin(timestamp/2000 + i)*20;
        ctx.fillRect(cloudX, cloudY, 200, 60);
      }

      // Mountain Silhouette (lighter, more visible like Narshe)
      const cx = canvas.width / 2;
      const cy = horizonY; 
      
      // Lighter city silhouette - dark grey instead of black
      ctx.fillStyle = '#1a1f2e'; // Dark blue-grey (lighter than black)
      ctx.beginPath();
      // Jagged Peaks
      ctx.moveTo(0, cy);
      ctx.lineTo(cx - 200, cy - 80);
      ctx.lineTo(cx - 150, cy - 120); // Narshe Peak
      ctx.lineTo(cx - 100, cy - 90);
      ctx.lineTo(cx, cy - 140); // Main Spire
      ctx.lineTo(cx + 80, cy - 90);
      ctx.lineTo(cx + 180, cy - 110);
      ctx.lineTo(canvas.width, cy);
      ctx.fill();
      
      // Add some structure details to the city (lighter areas)
      ctx.fillStyle = '#2d3748'; // Medium grey for city structures
      ctx.fillRect(cx - 180, cy - 75, 20, 15);
      ctx.fillRect(cx - 120, cy - 105, 15, 20);
      ctx.fillRect(cx - 60, cy - 125, 25, 30);
      ctx.fillRect(cx + 20, cy - 130, 30, 35);
      ctx.fillRect(cx + 70, cy - 85, 18, 12);
      ctx.fillRect(cx + 120, cy - 95, 22, 18);

      // Industrial Lights (Narshe Windows) - Twinkling lights
      const lights = [
        { x: cx - 142, y: cy - 102, offset: 0 },
        { x: cx - 132, y: cy - 92, offset: 200 },
        { x: cx + 8, y: cy - 112, offset: 400 },
        { x: cx - 48, y: cy - 118, offset: 600 },
        { x: cx + 52, y: cy - 98, offset: 800 },
        { x: cx - 78, y: cy - 108, offset: 1000 },
        { x: cx + 102, y: cy - 103, offset: 1200 }
      ];
      
      lights.forEach(light => {
        // Twinkling animation: fade in and out (0 to 1)
        const twinkle = (Math.sin((timestamp + light.offset) / 300) + 1) / 2; // 0 to 1
        const intensity = Math.pow(twinkle, 2); // Square for smoother fade
        
        if (intensity > 0.1) { // Only draw if visible enough
          // Glow effect (varies with intensity)
          ctx.fillStyle = `rgba(251, 191, 36, ${0.3 * intensity})`;
          ctx.fillRect(light.x - 3, light.y - 3, 10, 10);
          
          // Bright city light (varies with intensity)
          const lightColor = `rgba(254, 240, 138, ${intensity})`;
          ctx.fillStyle = lightColor;
          ctx.fillRect(light.x, light.y, 4, 4);
          
          // Brightest core (varies with intensity)
          ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`;
          ctx.fillRect(light.x + 1, light.y + 1, 2, 2);
        }
      });

      // --- LAYER 2: Snowy Ground ---
      
      const effectiveH = canvas.height - horizonY;
      const startRow = Math.floor(cameraY / (TILE_SIZE * SCALE));
      const pixelOffset = Math.floor(cameraY % (TILE_SIZE * SCALE));
      
      const visibleRows = Math.ceil(effectiveH / (TILE_SIZE * SCALE)) + 1;
      const cols = Math.ceil(canvas.width / (TILE_SIZE * SCALE)) + 1;
      const centerCol = Math.floor(cols / 2);

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, horizonY, canvas.width, effectiveH);
      ctx.clip();

      for (let r = -1; r < visibleRows; r++) {
          const tileY = horizonY + (r * TILE_SIZE * SCALE) - pixelOffset;
          if (tileY + TILE_SIZE*SCALE < horizonY) continue; 
          
          const worldRow = startRow + r;

          for (let c = 0; c < cols; c++) {
              const tileX = c * TILE_SIZE * SCALE;
              const distFromCenter = Math.abs(c - centerCol);
              
              // Path Logic
              if (distFromCenter <= 2) {
                  // Frozen Path (Dark Grey/Blue)
                  ctx.fillStyle = (worldRow + c) % 2 === 0 ? '#1e293b' : '#334155';
                  ctx.fillRect(tileX, tileY, TILE_SIZE*SCALE+1, TILE_SIZE*SCALE+1);
              } else {
                  // Snow (White/Grey)
                  ctx.fillStyle = ((worldRow * 7 + c) % 3 === 0) ? '#e2e8f0' : '#cbd5e1';
                  ctx.fillRect(tileX, tileY, TILE_SIZE*SCALE+1, TILE_SIZE*SCALE+1);

                  // Dead Trees / Rocks (Darker for contrast)
                  if ((worldRow * 3 + c * 7) % 13 === 0 && distFromCenter > 3) {
                      const treeScale = SCALE;
                      ctx.fillStyle = '#0f172a'; // Dead wood color
                      // Trunk
                      ctx.fillRect(tileX + 6*treeScale, tileY + 4*treeScale, 4*treeScale, 10*treeScale);
                      // Bare Branches
                      ctx.fillRect(tileX + 2*treeScale, tileY + 2*treeScale, 12*treeScale, 2*treeScale);
                  }
              }
          }
      }
      ctx.restore(); 

      // --- LAYER 2.5: Enemy Mob (Cactuar - below characters, lower part) ---
      enemyX += enemyDirection * enemySpeed * dt;
      enemyY = horizonY + 280; // Much lower, well below the party
      
      // Bounce at screen edges (accounting for smaller scale)
      const cactuarScale = 0.6; // Make Cactuar smaller
      const enemyWidth = CACTUAR.pixels[0].length * SCALE * cactuarScale;
      if (enemyX + enemyWidth >= canvas.width) {
        enemyX = canvas.width - enemyWidth;
        enemyDirection = -1; // Moving left, flip sprite
      } else if (enemyX <= 0) {
        enemyX = 0;
        enemyDirection = 1; // Moving right, normal sprite
      }
      
      // Flip sprite when moving left (direction = -1)
      const shouldFlip = enemyDirection === -1;
      drawEnemy(CACTUAR, enemyX, enemyY, timestamp / 50, cactuarScale, shouldFlip);

      // --- LAYER 3: Characters (walking up toward city lights, showing backs) ---
      const partyY = horizonY + 80; // Positioned lower/closer to camera 
      const sortedParty = [...PARTY].sort((a,b) => a.y - b.y);

      sortedParty.forEach((p, i) => {
          // Center characters on the dark path tiles (centerCol area)
          // Path is 5 tiles wide (centerCol-2 to centerCol+2), so center is at centerCol
          // Character sprite is ~16 pixels wide, so center it on the path
          // Use canvas center (cx) which aligns with the path center
          drawCharacter(p, cx + p.x * SCALE - (8*SCALE), partyY + p.y * SCALE, timestamp / 50 + i*100, false);
      });

      // --- LAYER 4: Snow Particles ---
      ctx.fillStyle = '#ffffff';
      snowflakes.forEach(flake => {
          flake.y += flake.speed;
          flake.x += flake.drift;
          
          if (flake.y > canvas.height) {
              flake.y = 0;
              flake.x = Math.random() * canvas.width;
          }
          
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size * SCALE, 0, Math.PI*2);
          ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // --- LAYER 4.5: Snow Drift/Wind Effects (obscuring city like FF6) ---
      // PERFORMANCE: Skip wind effect rendering every other frame to reduce CPU load
      // Wind effect is the most expensive operation due to bezier curve calculations
      const shouldRenderWind = Math.floor(timestamp / 16.67) % 2 === 0;
      
      if (shouldRenderWind) {
        // Generate smaller sections at regular intervals, moving left to right
        const sectionWidth = 180; // Width of each section
        const sectionSpacing = 250; // Spacing between sections
        const horizontalSpeed = 25;
        const numLayers = 3;
        
        for (let layerIndex = 0; layerIndex < numLayers; layerIndex++) {
          const baseY = horizonY - 45 + layerIndex * 15;
          const waveAmplitude = 18 + Math.sin(timestamp / 1500 + layerIndex) * 8;
          const waveFrequency = 0.015;
          const bandThickness = 20 + Math.sin(timestamp / 800 + layerIndex) * 8;
          const layerOffset = layerIndex * (sectionSpacing / numLayers);
          
          // Generate multiple sections at regular intervals
          for (let sectionIndex = 0; sectionIndex < 8; sectionIndex++) {
            const sectionStartX = -sectionWidth + ((timestamp / horizontalSpeed) + (sectionIndex * sectionSpacing) + layerOffset) % (canvas.width + sectionSpacing * 2);
            
            // Only draw if section is visible or about to enter
            if (sectionStartX < canvas.width + sectionWidth && sectionStartX > -sectionWidth) {
              // Create wavy band section using bezier curves
              ctx.beginPath();
              const points = [];
              const numPoints = Math.ceil(sectionWidth / 6);
              
              // Generate top and bottom wave points for this section
              for (let i = 0; i <= numPoints; i++) {
                const x = sectionStartX + (i * 6);
                const wavePhase = (x * waveFrequency) + (timestamp / 1000) + layerIndex;
                const y = baseY + Math.sin(wavePhase) * waveAmplitude;
                points.push({ x, y });
              }
              
              // Draw top curve
              ctx.moveTo(points[0].x, points[0].y);
              for (let i = 0; i < points.length - 1; i++) {
                const cp1x = points[i].x + (points[i + 1].x - points[i].x) / 3;
                const cp1y = points[i].y;
                const cp2x = points[i].x + 2 * (points[i + 1].x - points[i].x) / 3;
                const cp2y = points[i + 1].y;
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, points[i + 1].x, points[i + 1].y);
              }
              
              // Draw bottom curve (offset by band thickness)
              for (let i = points.length - 1; i >= 0; i--) {
                const x = points[i].x;
                const wavePhase = (x * waveFrequency) + (timestamp / 1000) + layerIndex;
              const y = baseY + Math.sin(wavePhase) * waveAmplitude + bandThickness;
              if (i === points.length - 1) {
                ctx.lineTo(x, y);
              } else {
                const cp1x = points[i + 1].x - (points[i + 1].x - points[i].x) / 3;
                const cp1y = points[i + 1].y + bandThickness;
                const cp2x = points[i + 1].x - 2 * (points[i + 1].x - points[i].x) / 3;
                const cp2y = points[i].y + bandThickness;
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
              }
            }
            
            ctx.closePath();
            
            // Fill with gradient that fades at edges
            const gradient = ctx.createLinearGradient(sectionStartX, baseY - waveAmplitude, sectionStartX + sectionWidth, baseY + waveAmplitude + bandThickness);
            const opacity = 0.35 + Math.sin(timestamp / 600 + layerIndex + sectionIndex) * 0.15;
            gradient.addColorStop(0, `rgba(226, 232, 240, 0)`);
            gradient.addColorStop(0.15, `rgba(203, 213, 225, ${opacity * 0.5})`);
            gradient.addColorStop(0.5, `rgba(226, 232, 240, ${opacity})`);
            gradient.addColorStop(0.85, `rgba(203, 213, 225, ${opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(226, 232, 240, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Add wind streaks integrated into each section
            for (let windIndex = 0; windIndex < 3; windIndex++) {
              const windX = sectionStartX + (windIndex * 50) + ((timestamp / 18) % 50);
              if (windX > sectionStartX && windX < sectionStartX + sectionWidth) {
                const wavePhase = (windX * waveFrequency) + (timestamp / 1000) + layerIndex;
                const windY = baseY + Math.sin(wavePhase) * waveAmplitude + bandThickness / 2;
                const windLength = 60 + Math.sin(timestamp / 250 + windIndex + sectionIndex) * 20;
                const windOpacity = 0.3 + Math.sin(timestamp / 350 + windIndex + sectionIndex) * 0.1;
                
                const windGradient = ctx.createLinearGradient(windX, windY, windX + windLength, windY);
                windGradient.addColorStop(0, 'rgba(203, 213, 225, 0)');
                windGradient.addColorStop(0.3, `rgba(203, 213, 225, ${windOpacity})`);
                windGradient.addColorStop(0.7, `rgba(203, 213, 225, ${windOpacity})`);
                windGradient.addColorStop(1, 'rgba(203, 213, 225, 0)');
                
                ctx.fillStyle = windGradient;
                ctx.fillRect(windX, windY - 1, windLength, 2);
              }
            }
          }
        }
      }
      } // End shouldRenderWind optimization

      // --- LAYER 5: Fog Gradient (lighter, more like FF6) ---
      const gradient = ctx.createLinearGradient(0, horizonY - 80, 0, horizonY + 50);
      gradient.addColorStop(0, 'rgba(2, 6, 23, 0)');
      gradient.addColorStop(0.5, 'rgba(2, 6, 23, 0.5)'); // Lighter fog
      gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, horizonY - 80, canvas.width, 130);

      animationFrameId = window.requestAnimationFrame(loop);
    };

    animationFrameId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onWindowResize);
      clearTimeout(resizeTimeoutId);
    };
  }, []);

  return (
    <div className="font-mono min-h-screen text-slate-200 relative selection:bg-cyan-500 selection:text-white bg-slate-900">
      
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pixelated" />

      <div className={`fixed inset-0 bg-black transition-opacity duration-1000 z-[1] pointer-events-none ${watchMode ? 'opacity-0' : 'opacity-60'}`}></div>

      <button onClick={toggleWatchMode} className="fixed right-6 top-1/2 -translate-y-1/2 z-50 group flex flex-col items-center gap-2">
        <div className="w-12 h-12 bg-slate-900 border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform">
           {watchMode ? (
             <svg className="w-5 h-5 text-cyan-400 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
           ) : (
             <svg className="w-5 h-5 text-cyan-400 fill-current ml-1" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
           )}
        </div>
        <span className="bg-black/80 text-cyan-400 px-2 py-1 rounded text-[10px] font-bold font-8bit uppercase tracking-widest backdrop-blur-sm border border-cyan-900/50">
          {watchMode ? 'Resume' : 'View'}
        </span>
      </button>

      {/* UI Content Layer */}
      <div className={`relative z-10 transition-all duration-1000 transform ${watchMode ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        
        <header className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500 drop-shadow-lg mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                    {resumeData.personal.name}
                </h1>
                <div className="inline-block px-3 py-1 bg-slate-900/60 border border-slate-500/30 rounded backdrop-blur-sm">
                    <p className="font-8bit text-cyan-400 text-xs tracking-widest">
                        {resumeData.personal.tagline}
                    </p>
                </div>
            </div>
            
            <div className="flex gap-4">
                <a href={resumeData.personal.github} className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-600 rounded text-slate-200 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105">
                    <span>GitHub</span>
                </a>
                <a href={`mailto:${resumeData.personal.email}`} className="flex items-center gap-2 px-4 py-2 bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-500 rounded text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-105">
                    <span>Summon</span>
                </a>
            </div>
        </header>

        <main className="container mx-auto px-4 pb-20">
            
            <section className="mb-16">
                <div className="relative rounded-xl p-8 md:p-12 border-2 border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-blue-950/80 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                    <div className="absolute top-0 right-0 bg-cyan-600 text-white text-[10px] font-8bit px-8 py-1 transform translate-x-[30%] translate-y-[40%] rotate-45 shadow-lg z-20">
                        LEGENDARY
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl">{resumeData.featured.emoji}</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-cyan-100" style={{ fontFamily: 'Cinzel, serif' }}>{resumeData.featured.title}</h2>
                            </div>
                            <p className="text-slate-300 text-lg mb-6 leading-relaxed max-w-2xl">
                                {resumeData.featured.description}
                            </p>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {resumeData.featured.skills.map(tag => (
                                    <span key={tag} className="bg-slate-950/50 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded font-mono text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a href={resumeData.featured.ctaLink} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded shadow-lg transition-colors inline-flex items-center gap-2">
                                <span>{resumeData.featured.ctaText}</span>
                            </a>
                        </div>
                        <div className="w-full md:w-auto flex justify-center">
                            <div className="w-48 h-48 rounded-full border-4 border-slate-700 bg-black/40 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-transparent border-b-blue-600 border-l-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                                <span className="text-5xl">⚡</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-colors shadow-lg max-h-96 overflow-y-auto">
                    <h3 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        <span>📜</span> Character Sheet
                    </h3>
                    <div className="flex flex-col gap-6">
                        <div className="w-24 h-24 bg-slate-950 border-2 border-slate-600 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-4xl">{resumeData.about.avatar}</span>
                        </div>
                        <div>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                {resumeData.about.bio}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950/50 p-3 rounded border border-slate-700/50">
                                    <span className="block text-[10px] text-cyan-500 uppercase font-bold tracking-wider">Class</span>
                                    <span className="text-white font-bold" style={{ fontFamily: 'Cinzel, serif' }}>{resumeData.about.class}</span>
                                </div>
                                <div className="bg-slate-950/50 p-3 rounded border border-slate-700/50">
                                    <span className="block text-[10px] text-cyan-500 uppercase font-bold tracking-wider">Guild</span>
                                    <span className="text-white font-bold" style={{ fontFamily: 'Cinzel, serif' }}>{resumeData.about.guild}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-colors shadow-lg max-h-96 overflow-y-auto">
                    <h3 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        <span>⚔️</span> Active Quests
                    </h3>
                    <ul className="space-y-4">
                        {resumeData.activeQuests.map((quest, index) => (
                            <li key={index} className={`${index > 0 ? 'border-t border-slate-800 pt-3' : ''} group`}>
                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{quest.title}</h4>
                                <p className="text-slate-400 text-sm">{quest.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-colors shadow-lg max-h-96 overflow-y-auto">
                    <h3 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        <span>🎒</span> Skills
                    </h3>
                    <div className="space-y-4">
                        {resumeData.skills.map((skill) => (
                            <div key={skill.name}>
                                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                    <span>{skill.name}</span>
                                    <span>LVL {skill.level}</span>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                                    <div className={`h-full ${skill.color}`} style={{ width: `${skill.level * 10}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-colors shadow-lg mt-8">
                <h3 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-6 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                    <span>🗺️</span> Adventure Log
                </h3>
                <div className="space-y-6">
                    {resumeData.experience.map((job, index) => (
                        <div key={index} className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-2xl flex-shrink-0">
                                    {index === 0 ? '⚡' : index === 1 ? '🔧' : index === 2 ? '🌐' : index === 3 ? '💻' : '📋'}
                                </span>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-cyan-100">{job.title}</h4>
                                    <div className="text-sm text-cyan-400 font-mono mt-1">{job.company}</div>
                                </div>
                            </div>
                            
                            <div className="text-xs text-slate-400 font-mono mb-4 pl-11">
                                {job.startDate} → {job.endDate}
                            </div>
                            
                            <p className="text-slate-300 text-sm leading-relaxed mb-4 pl-11">
                                {job.description}
                            </p>
                            
                            <div className="pl-11">
                                <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2">Key Achievements:</div>
                                <ul className="space-y-2">
                                    {job.achievements && job.achievements.map((achievement, achIndex) => (
                                        <li key={achIndex} className="text-slate-300 text-sm flex items-start gap-2">
                                            <span className="text-cyan-500 flex-shrink-0 mt-1">▸</span>
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="text-center py-12 text-slate-500 text-xs font-mono">
                <p>© {new Date().getFullYear()} {resumeData.footer.copyright}. Crafted with {resumeData.footer.craftedWith}.</p>
            </footer>

        </main>
      </div>
    </div>
  );
};

export default App;
