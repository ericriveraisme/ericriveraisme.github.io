import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const [fps, setFps] = useState(0);
  const [watchMode, setWatchMode] = useState(false);
  const audioRef = useRef(null);

  // --- Toggle Audio/View ---
  const toggleWatchMode = () => {
    const newMode = !watchMode;
    setWatchMode(newMode);
    
    if (audioRef.current) {
      if (newMode) {
        audioRef.current.volume = 0.6;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => console.log("Audio play blocked"));
        }
      } else {
        audioRef.current.pause();
      }
    }
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
    
    // --- Assets (FF6 Sprites) ---
    // Terra (Green Hair, Red Armor/Dress)
    const TERRA = {
      palette: {
        G: '#4ade80', S: '#fde68a', R: '#dc2626', P: '#fca5a5', 
        W: '#ffffff', B: '#000000'
      },
      pixels: [
        "      GGGG      ",
        "     GGGGGG     ",
        "    GGGGGGGG    ",
        "   GGGGGGGGGG   ",
        "   GGSGSGSGGG   ",
        "   GGSBSSBGGG   ",
        "    SSSSSSSS    ",
        "   RRRRRRRRRR   ", 
        "  RRRRRRRRRRRR  ",
        "  SS RRRRRR SS  ",
        "  WW RRPPRR WW  ",
        "     RRRRRR     ",
        "    RRRRRRRR    ",
        "    RRRRRRRR    ",
        "    RRRRRRRR    ",
        "    RR    RR    "
      ]
    };

    const LOCKE = {
      palette: {
        U: '#3b82f6', S: '#fde68a', W: '#f3f4f6', L: '#1e3a8a', 
        V: '#4b5563', B: '#000000'
      },
      pixels: [
        "      UUUU      ",
        "     UUUUUU     ",
        "    UUUUUUUU    ",
        "   UUUUUUUUUU   ",
        "   UUSUSUSUUU   ",
        "   UUSBSSBUUU   ",
        "    SSSSSSSS    ",
        "   VVVVVVVVVV   ",
        "  VVVVVVVVVVVV  ",
        "  SS VVVVVV SS  ",
        "  SS WWVVWW SS  ",
        "     BBBBBB     ",
        "    LLLLLLLL    ",
        "    LLLLLLLL    ",
        "    LLLLLLLL    ",
        "    LL    LL    "
      ]
    };

    const EDGAR = {
      palette: {
        Y: '#facc15', S: '#fde68a', G: '#15803d', D: '#14532d', 
        L: '#374151', B: '#000000'
      },
      pixels: [
        "      YYYY      ",
        "     YYYYYY     ",
        "    YYYYYYYY    ",
        "   YYYYYYYYYY   ",
        "   YYSYSYSYYY   ",
        "   YYSBSSBYYY   ",
        "    SSSSSSSS    ",
        "   GGGGGGGGGG   ",
        "  GGGGGGGGGGGG  ",
        "  SS GGGGGG SS  ",
        "  SS GGGGGG SS  ",
        "     DDDDDD     ",
        "    LLLLLLLL    ",
        "    LLLLLLLL    ",
        "    LLLLLLLL    ",
        "    LL    LL    "
      ]
    };

    const CELES = {
      palette: {
        Y: '#fef08a', S: '#fde68a', W: '#ffffff', G: '#22c55e', 
        L: '#ffffff', B: '#000000'
      },
      pixels: [
        "      YYYY      ",
        "     YYYYYY     ",
        "    YYYYYYYY    ",
        "   YYYYYYYYYY   ",
        "   YYSYSYSYYY   ",
        "   YYSBSSBYYY   ",
        "    SSSSSSSS    ",
        "   WWWWWWWWWW   ", 
        "  WWWWWWWWWWWW  ",
        "  SS GGGGGG SS  ",
        "  SS GGGGGG SS  ",
        "     GGGGGG     ",
        "    SSSSSSSS    ",
        "    SSSSSSSS    ",
        "    LLLLLLLL    ",
        "    LL    LL    "
      ]
    };

    const PARTY = [
      { sprite: EDGAR, x: -40, y: 0 },
      { sprite: TERRA, x: -12, y: 20 },
      { sprite: CELES, x: 12,  y: 5 },
      { sprite: LOCKE, x: 40,  y: 25 }
    ];

    // --- Snow System ---
    const snowflakes = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 1 + Math.random() * 3,
      size: Math.random() * 2,
      drift: (Math.random() - 0.5) * 0.5
    }));

    // --- Renderer ---

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = false;
    };
    window.addEventListener('resize', resize);
    resize();

    const drawCharacter = (char, cx, cy, frame) => {
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
            let drawX = baseX + c * pixelSize;

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

    const loop = (timestamp) => {
      const dt = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      setFps(Math.round(1/dt));

      cameraY += 50 * dt; 

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

      // Mountain Silhouette
      const cx = canvas.width / 2;
      const cy = horizonY; 
      
      ctx.fillStyle = '#000000'; 
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

      // Industrial Lights (Narshe Windows)
      ctx.fillStyle = '#fbbf24'; 
      if (Math.floor(timestamp / 800) % 2 === 0) {
        ctx.fillRect(cx - 140, cy - 100, 2, 2);
        ctx.fillRect(cx - 130, cy - 90, 2, 2);
        ctx.fillRect(cx + 10, cy - 110, 3, 5);
      }

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

      // --- LAYER 3: Characters ---
      const partyY = horizonY + 100; 
      const sortedParty = [...PARTY].sort((a,b) => a.y - b.y);

      sortedParty.forEach((p, i) => {
          drawCharacter(p, cx + p.x * SCALE - (8*SCALE), partyY + p.y * SCALE, timestamp / 50 + i*100);
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

      // --- LAYER 5: Fog Gradient ---
      const gradient = ctx.createLinearGradient(0, horizonY - 80, 0, horizonY + 50);
      gradient.addColorStop(0, 'rgba(2, 6, 23, 0)');
      gradient.addColorStop(0.5, 'rgba(2, 6, 23, 0.8)'); // Night Fog
      gradient.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, horizonY - 80, canvas.width, 130);

      animationFrameId = window.requestAnimationFrame(loop);
    };

    animationFrameId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="font-mono min-h-screen text-slate-200 relative selection:bg-cyan-500 selection:text-white bg-slate-900">
      
      <audio ref={audioRef} loop src="https://opengameart.org/sites/default/files/The%20Field%20of%20Dreams.mp3" />

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pixelated" />

      <div className={`fixed inset-0 bg-black transition-opacity duration-1000 z-1 pointer-events-none ${watchMode ? 'opacity-0' : 'opacity-60'}`}></div>

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
            <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500 drop-shadow-lg mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                    Eric Rivera
                </h1>
                <div className="inline-block px-3 py-1 bg-slate-900/60 border border-slate-500/30 rounded backdrop-blur-sm">
                    <p className="font-8bit text-cyan-400 text-xs tracking-widest">
                        &lt;NetDevOps Mage /&gt;
                    </p>
                </div>
            </div>
            
            <div className="flex gap-4">
                <a href="https://github.com/ericriveraisme" className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-600 rounded text-slate-200 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105">
                    <span>GitHub</span>
                </a>
                <a href="mailto:eric@example.com" className="flex items-center gap-2 px-4 py-2 bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-500 rounded text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-105">
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
                                <span className="text-4xl">🔮</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-cyan-100" style={{ fontFamily: 'Cinzel, serif' }}>NetDevOps Complete</h2>
                            </div>
                            <p className="text-slate-300 text-lg mb-6 leading-relaxed max-w-2xl">
                                The ultimate grimoire for network automation. A comprehensive framework orchestrating the network infrastructure, one packet at a time.
                            </p>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {['Python', 'Ansible', 'Docker', 'CI/CD'].map(tag => (
                                    <span key={tag} className="bg-slate-950/50 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded font-mono text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded shadow-lg transition-colors flex items-center gap-2">
                                <span>Enter The Portal</span>
                            </button>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="col-span-1 lg:col-span-2 bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-colors shadow-lg">
                    <h3 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        <span>📜</span> Character Sheet
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-24 h-24 bg-slate-950 border-2 border-slate-600 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-4xl">🧙‍♂️</span>
                        </div>
                        <div>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Greetings, traveler. I am Eric Rivera, a Full Stack Developer specializing in Network Automation. 
                                I bridge the gap between traditional networking hardware and modern software development practices.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950/50 p-3 rounded border border-slate-700/50">
                                    <span className="block text-[10px] text-cyan-500 uppercase font-bold tracking-wider">Class</span>
                                    <span className="text-white font-bold" style={{ fontFamily: 'Cinzel, serif' }}>Technomancer</span>
                                </div>
                                <div className="bg-slate-950/50 p-3 rounded border border-slate-700/50">
                                    <span className="block text-[10px] text-cyan-500 uppercase font-bold tracking-wider">Guild</span>
                                    <span className="text-white font-bold" style={{ fontFamily: 'Cinzel, serif' }}>NetDevOps</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-colors shadow-lg">
                    <h3 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        <span>🎒</span> Skills
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: "Network Engineering", lvl: 10, color: "bg-blue-500" },
                            { name: "Python Automation", lvl: 9, color: "bg-cyan-500" },
                            { name: "Ansible", lvl: 9, color: "bg-cyan-500" },
                            { name: "Docker/K8s", lvl: 7, color: "bg-indigo-500" }
                        ].map((skill) => (
                            <div key={skill.name}>
                                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                                    <span>{skill.name}</span>
                                    <span>LVL {skill.lvl}</span>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                                    <div className={`h-full ${skill.color}`} style={{ width: `${skill.lvl * 10}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-colors shadow-lg">
                    <h3 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        <span>⚔️</span> Active Quests
                    </h3>
                    <ul className="space-y-4">
                        <li className="group">
                            <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Physical Cultivation</h4>
                            <p className="text-slate-400 text-sm">Increasing strength stats & endurance.</p>
                        </li>
                        <li className="border-t border-slate-800 pt-3 group">
                            <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Arcane Studies</h4>
                            <p className="text-slate-400 text-sm">Mastering NetDevOps & Python scripting.</p>
                        </li>
                        <li className="border-t border-slate-800 pt-3 group">
                            <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Linguistic Decoding</h4>
                            <p className="text-slate-400 text-sm">Learning Japanese (Nihongo).</p>
                        </li>
                    </ul>
                </div>

                <div className="col-span-1 lg:col-span-2 bg-slate-900/60 border border-slate-700/50 p-6 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition-colors shadow-lg">
                    <h3 className="text-xl text-cyan-200 font-bold border-b border-slate-700 pb-3 mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        <span>🗺️</span> Adventure Log
                    </h3>
                    <div className="space-y-8 pl-2">
                        <div className="relative border-l-2 border-slate-600 pl-8 pb-2">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-slate-900 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                            <h4 className="text-lg font-bold text-white">Senior Network Engineer</h4>
                            <div className="text-sm text-cyan-400 font-mono mb-2">TechCorp Citadel | 2020 - Present</div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-2">
                                Led the modernization of legacy infrastructure into a software-defined network. Implemented CI/CD pipelines for network config changes using GitLab and Ansible, reducing deployment time by 80%.
                            </p>
                        </div>
                        <div className="relative border-l-2 border-slate-600 pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-600 border-2 border-slate-900"></div>
                            <h4 className="text-lg font-bold text-white">Network Administrator</h4>
                            <div className="text-sm text-cyan-400 font-mono mb-2">Regional ISP | 2017 - 2020</div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-2">
                                Managed OSPF and BGP routing for a regional backbone serving 50k+ subscribers. Troubleshooting complex layer 2/3 issues.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <footer className="text-center py-12 text-slate-500 text-xs font-mono">
                <p>© {new Date().getFullYear()} Eric Rivera. Crafted with React & Tailwind.</p>
            </footer>

        </main>
      </div>
    </div>
  );
};

export default App;
