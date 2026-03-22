import React, { useEffect, useRef } from 'react';

const LabLogsAnimatedHeader = () => {
  const canvasRef = useRef(null);
  const triggerCompileRef = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    const W = canvas.width;
    const H = canvas.height;
    const P = 5;
    const GW = W / P;
    const GH = H / P;
    const C = {
      bg: '#0a0e1a',
      wall: '#161d32',
      wallHi: '#1e2742',
      wallMort: '#0f142a',
      wood: '#5c3a1e',
      woodHi: '#7a5230',
      woodDk: '#3d2512',
      brass: '#b8943c',
      brassHi: '#d4b050',
      brassDk: '#8a6e2a',
      monBody: '#282838',
      monHi: '#3a3a50',
      screen: '#080c16',
      cyan: '#68d3ee',
      cyanDim: '#2d6878',
      green: '#7cfc00',
      greenDim: '#4a9600',
      pink: '#e060c8',
      pinkDim: '#883a78',
      purple: '#7040b8',
      robe: '#6b2040',
      robeHi: '#8a3058',
      robeDk: '#4a1530',
      robePurple: '#5a2f88',
      robePurpleHi: '#7a56b8',
      hat: '#5a1838',
      hatDk: '#401028',
      hatBand: '#d4b050',
      skin: '#d4a070',
      skinSh: '#b8885a',
      flask: '#40c8e0',
      flaskDim: '#2090a0',
      keyBase: '#5a4028',
      keyTop: '#786040',
      keyHi: '#907858',
      gray: '#506070',
      grayDk: '#2a3040',
      white: '#e0e4ec'
    };

    const px = (x, y, w, h, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * P, y * P, w * P, h * P);
    };

    const stoneNoise = (x, y) => (((x * 374761393 + y * 668265263) >>> 0) % 255) / 255;
    let wallCanvas;
    let wallReady = false;
    let startTime = null;
    let animationFrameId = 0;
    let compileTimer = 0;
    const COMPILE_DUR = 50;
    const runes = [];
    const RUNE_CHARS = ['{', '}', '/>', '()', '=>', '0x', '::', '[]', '&&', '!='];
    const dustMotes = Array.from({ length: 18 }, () => ({
      x: Math.random() * GW,
      y: Math.random() * 94,
      speed: 0.02 + Math.random() * 0.03,
      drift: (Math.random() - 0.5) * 0.05,
      phase: Math.random() * Math.PI * 2
    }));

    triggerCompileRef.current = () => {
      compileTimer = COMPILE_DUR;
    };

    const drawWall = () => {
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);
      const bw = 16;
      const bh = 8;
      for (let row = 0; row < Math.ceil(GH / bh) + 1; row++) {
        const off = (row % 2) * (bw / 2);
        for (let col = -1; col < Math.ceil(GW / bw) + 1; col++) {
          const bx = col * bw + off;
          const by = row * bh;
          const v = stoneNoise(col, row);
          const base = v > 0.5 ? C.wallHi : C.wall;
          for (let dy = 0; dy < bh - 1; dy++) {
            for (let dx = 0; dx < bw - 1; dx++) {
              const s = stoneNoise(bx + dx, by + dy);
              px(bx + dx, by + dy, 1, 1, s > 0.93 ? C.wallHi : s < 0.07 ? C.wallMort : base);
            }
          }
          for (let dx = 0; dx < bw; dx++) {
            px(bx + dx, by + bh - 1, 1, 1, C.wallMort);
          }
          for (let dy = 0; dy < bh; dy++) {
            px(bx + bw - 1, by + dy, 1, 1, C.wallMort);
          }
        }
      }
    };

    const drawShelves = () => {
      const bracket = (x, y) => {
        px(x, y, 2, 5, C.brass);
        px(x, y, 2, 1, C.brassHi);
      };
      bracket(4, 19);
      bracket(34, 19);
      px(2, 18, 36, 2, C.wood);
      px(2, 18, 36, 1, C.woodHi);
      bracket(4, 41);
      bracket(34, 41);
      px(2, 40, 36, 2, C.wood);
      px(2, 40, 36, 1, C.woodHi);
    };

    const drawPotion = (x, y, bodyC, glowC, h, t, off) => {
      px(x, y - h, 3, h, bodyC);
      px(x, y - h - 2, 3, 2, C.gray);
      px(x, y - h - 3, 3, 1, C.woodHi);
      const pulse = 0.4 + 0.6 * Math.sin(t * 0.003 + off);
      ctx.globalAlpha = 0.06 * pulse;
      ctx.fillStyle = glowC;
      ctx.fillRect(x * P, (y - h) * P, 3 * P, h * P);
      ctx.globalAlpha = 1;
    };

    const drawPotions = (t) => {
      drawPotion(5, 18, C.pink, C.pink, 6, t, 0);
      drawPotion(11, 18, C.flaskDim, C.cyan, 7, t, 1.2);
      drawPotion(17, 18, C.pinkDim, C.pink, 5, t, 2.4);
      drawPotion(22, 18, C.flaskDim, C.cyan, 6, t, 3.6);
      drawPotion(28, 18, C.pink, C.pink, 7, t, 4.8);
      drawPotion(33, 18, C.pinkDim, C.pink, 6, t, 6.0);
      drawPotion(4, 40, C.flaskDim, C.cyan, 6, t, 0.6);
      drawPotion(10, 40, C.pink, C.pink, 7, t, 1.8);
      drawPotion(16, 40, C.flaskDim, C.cyan, 5, t, 3.0);
      drawPotion(21, 40, C.pinkDim, C.pink, 6, t, 4.2);
      drawPotion(27, 40, C.flaskDim, C.cyan, 7, t, 5.4);
      drawPotion(33, 40, C.pink, C.pink, 6, t, 6.6);
    };

    const drawPipe = () => {
      px(44, 0, 4, 82, C.brass);
      px(44, 0, 1, 82, C.brassHi);
      px(47, 0, 1, 82, C.brassDk);
      px(42, 80, 8, 3, C.brass);
      px(42, 80, 8, 1, C.brassHi);
      px(44, 83, 4, 2, C.brassDk);
      px(44, 83, 4, 1, C.brass);
    };

    const drawOoze = (t) => {
      const cycle = (t % 3500) / 3500;
      const sx = 45;
      const sy = 85;
      const targetY = 94;
      if (cycle < 0.2) {
        const h = Math.ceil((cycle / 0.2) * 5);
        px(sx, sy, 2, h, C.green);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = C.green;
        ctx.fillRect((sx - 1) * P, sy * P, 4 * P, (h + 1) * P);
        ctx.globalAlpha = 1;
      } else if (cycle < 0.3) {
        px(sx, sy, 2, 5, C.green);
        const sl = Math.ceil(((cycle - 0.2) / 0.1) * 4);
        px(sx, sy + 5, 1, sl, C.greenDim);
      } else if (cycle < 0.5) {
        const fp = (cycle - 0.3) / 0.2;
        const dropY = sy + 6 + Math.floor(fp * (targetY - sy - 6));
        px(sx, dropY, 2, 3, C.green);
        ctx.globalAlpha = 0.06;
        ctx.fillStyle = C.green;
        ctx.fillRect(sx * P, sy * P, P, (dropY - sy) * P);
        ctx.globalAlpha = 1;
      } else if (cycle < 0.6) {
        const sp = (cycle - 0.5) / 0.1;
        const spread = Math.floor(sp * 5);
        px(sx - spread, targetY, 2 + spread * 2, 1, C.green);
        ctx.globalAlpha = 0.2 * (1 - sp);
        ctx.fillStyle = C.green;
        ctx.fillRect((sx - spread - 1) * P, (targetY - 1) * P, (spread * 2 + 4) * P, 3 * P);
        ctx.globalAlpha = 1;
      }
      ctx.globalAlpha = 0.04;
      ctx.fillStyle = C.green;
      ctx.fillRect(42 * P, 83 * P, 8 * P, 4 * P);
      ctx.globalAlpha = 1;
    };

    const drawMonitor = () => {
      px(52, 24, 76, 60, C.monBody);
      px(52, 24, 76, 2, C.monHi);
      px(52, 24, 2, 60, C.monHi);
      px(52, 82, 76, 2, C.grayDk);
      px(56, 28, 68, 52, '#040810');
      px(57, 29, 66, 50, C.screen);
      px(57, 29, 66, 1, C.cyanDim);
      px(57, 29, 1, 50, C.cyanDim);
      px(122, 29, 1, 50, C.cyanDim);
      px(57, 78, 66, 1, C.cyanDim);
      px(68, 84, 44, 4, C.monBody);
      px(68, 84, 44, 1, C.monHi);
      px(82, 88, 16, 6, C.monBody);
      px(82, 88, 16, 1, C.monHi);
      px(84, 88, 2, 6, C.grayDk);
      px(76, 94, 28, 2, C.grayDk);
      px(76, 94, 28, 1, C.gray);
      for (let i = 0; i < 5; i++) {
        px(53, 34 + i * 8, 2, 3, C.grayDk);
      }
      px(124, 80, 2, 2, '#30a050');
    };

    const drawScanlines = () => {
      ctx.globalAlpha = 0.04;
      ctx.fillStyle = '#000';
      for (let sy = 29; sy < 78; sy += 2) {
        ctx.fillRect(57 * P, sy * P, 66 * P, P * 0.5);
      }
      ctx.globalAlpha = 1;
    };

    const drawScreen = (t) => {
      ctx.globalAlpha = 0.035 + 0.015 * Math.sin(t * 0.002);
      ctx.fillStyle = C.cyan;
      ctx.fillRect(57 * P, 29 * P, 66 * P, 50 * P);
      ctx.globalAlpha = 1;
      if (compileTimer > 0) {
        if (compileTimer > COMPILE_DUR - 5) {
          ctx.globalAlpha = 0.5;
          ctx.fillStyle = C.cyan;
          ctx.fillRect(57 * P, 29 * P, 66 * P, 50 * P);
          ctx.globalAlpha = 1;
        } else if (compileTimer > 10) {
          ctx.fillStyle = C.cyan;
          ctx.font = `bold ${P * 3}px 'Courier New', monospace`;
          ctx.fillText('$ build complete', 60 * P, 48 * P);
          ctx.fillStyle = C.green;
          ctx.fillText('> SUCCESS', 60 * P, 58 * P);
          ctx.fillStyle = C.cyan;
          ctx.font = `${P * 2}px 'Courier New', monospace`;
          ctx.fillText('0 errors, 0 warnings', 60 * P, 66 * P);
        }
        compileTimer--;
        drawScanlines();
        return;
      }

      const lines = [
        { indent: 0, segs: [{ w: 6, c: C.purple }, { w: 0 }, { w: 14, c: C.cyan }, { w: 0 }, { w: 4, c: C.white }] },
        { indent: 2, segs: [{ w: 4, c: C.purple }, { w: 0 }, { w: 10, c: C.green }, { w: 0 }, { w: 12, c: C.cyan }] },
        { indent: 4, segs: [{ w: 10, c: C.cyan }, { w: 0 }, { w: 16, c: C.white }] },
        { indent: 4, segs: [{ w: 6, c: C.purple }, { w: 0 }, { w: 12, c: C.green }] },
        { indent: 2, segs: [{ w: 3, c: C.white }] },
        { indent: 0, segs: [] },
        { indent: 0, segs: [{ w: 8, c: C.purple }, { w: 0 }, { w: 18, c: C.cyan }] },
        { indent: 2, segs: [{ w: 6, c: C.pink }, { w: 0 }, { w: 12, c: C.white }, { w: 0 }, { w: 8, c: C.cyan }] },
        { indent: 4, segs: [{ w: 14, c: C.green }, { w: 0 }, { w: 10, c: C.white }] },
        { indent: 4, segs: [{ w: 4, c: C.purple }, { w: 0 }, { w: 16, c: C.cyan }] },
        { indent: 2, segs: [{ w: 3, c: C.white }] },
        { indent: 0, segs: [] },
        { indent: 0, segs: [{ w: 12, c: C.gray }, { w: 0 }, { w: 20, c: C.gray }] },
        { indent: 0, segs: [{ w: 4, c: C.purple }, { w: 0 }, { w: 10, c: C.cyan }, { w: 0 }, { w: 14, c: C.green }] },
        { indent: 2, segs: [{ w: 8, c: C.pink }, { w: 0 }, { w: 18, c: C.white }] }
      ];

      for (let i = 0; i < lines.length; i++) {
        let cx = 59 + lines[i].indent;
        const cy = 31 + i * 3;
        if (cy > 76) {
          break;
        }
        for (const seg of lines[i].segs) {
          if (seg.w === 0) {
            cx += 2;
            continue;
          }
          ctx.globalAlpha = 0.5 + 0.3 * Math.sin(t * 0.0015 + i * 0.7);
          px(cx, cy, seg.w, 1, seg.c);
          ctx.globalAlpha = 1;
          cx += seg.w + 1;
        }
      }
      if (Math.floor(t / 530) % 2 === 0) {
        px(59, 31 + lines.length * 3, 2, 2, C.cyan);
      }
      drawScanlines();
    };

    const drawWizard = (t) => {
      const surprised = compileTimer > 0;
      const cx = 160;
      const breathe = Math.sin(t * 0.0015);
      const by = Math.round(breathe * 0.8);
      const hatY = 2 + by;

      // Sage hat with stitched brim and arcane sigil.
      const brimY = hatY + 22;
      px(cx - 23, brimY, 46, 3, C.hat);
      px(cx - 23, brimY, 46, 1, C.robeHi);
      px(cx - 23, brimY + 2, 46, 1, C.hatDk);
      for (let s = 0; s < 8; s++) {
        px(cx - 19 + s * 5, brimY + 1, 1, 1, C.hatBand);
      }
      px(cx - 17, brimY - 1, 34, 2, C.hatBand);
      px(cx + 7, brimY - 1, 3, 2, C.brassHi);
      px(cx - 15, brimY, 18, 1, C.robePurpleHi);

      for (let i = 0; i < 22; i++) {
        const w = Math.floor(4 + i * 1.55);
        const x = cx - Math.floor(w / 2) - Math.floor(i * 0.1);
        const c = i % 5 === 0 ? C.hatDk : C.hat;
        px(x, hatY + 2 + i, w, 1, c);
      }
      px(cx - 3, hatY, 5, 2, C.hat);
      px(cx - 2, hatY - 1, 4, 2, C.hatDk);
      px(cx - 6, hatY + 2, 1, 4, C.hatBand);
      px(cx - 1, hatY + 10, 3, 1, C.brassHi);
      px(cx - 2, hatY + 11, 3, 1, C.brassHi);
      px(cx - 2, hatY + 12, 2, 1, C.brassHi);
      px(cx - 1, hatY + 13, 2, 1, C.brassHi);
      px(cx + 3, hatY + 11, 1, 1, C.robePurpleHi);
      px(cx + 4, hatY + 12, 1, 1, C.robePurpleHi);

      const headY = brimY + 4;
      px(cx - 12, headY, 24, 14, C.skin);
      px(cx - 12, headY + 8, 24, 6, C.skinSh);
      px(cx - 14, headY + 3, 2, 5, C.skin);
      px(cx - 14, headY + 5, 2, 2, C.skinSh);
      px(cx + 12, headY + 3, 2, 5, C.skin);
      px(cx + 12, headY + 5, 2, 2, C.skinSh);
      px(cx - 14, headY - 1, 4, 8, C.gray);
      px(cx + 10, headY - 1, 4, 8, C.gray);

      if (surprised) {
        px(cx - 9, headY + 3, 7, 5, '#ffffff');
        px(cx - 7, headY + 4, 3, 3, '#1a1a2a');
        px(cx - 6, headY + 5, 1, 1, '#ffffff');
        px(cx + 2, headY + 3, 7, 5, '#ffffff');
        px(cx + 4, headY + 4, 3, 3, '#1a1a2a');
        px(cx + 5, headY + 5, 1, 1, '#ffffff');
        px(cx - 10, headY + 1, 8, 1, C.gray);
        px(cx + 2, headY + 1, 8, 1, C.gray);
      } else {
        px(cx - 8, headY + 4, 5, 3, '#ffffff');
        px(cx - 7, headY + 4, 3, 3, '#1a1a2a');
        px(cx - 6, headY + 5, 1, 1, '#ffffff');
        px(cx + 3, headY + 4, 5, 3, '#ffffff');
        px(cx + 4, headY + 4, 3, 3, '#1a1a2a');
        px(cx + 5, headY + 5, 1, 1, '#ffffff');
        px(cx - 9, headY + 3, 7, 1, C.gray);
        px(cx + 2, headY + 3, 7, 1, C.gray);
      }

      px(cx - 1, headY + 7, 3, 3, C.skinSh);
      px(cx, headY + 7, 1, 3, C.skin);
      px(cx - 4, headY + 10, 8, 1, C.gray);
      px(cx - 4, headY + 11, 1, 3, C.gray);
      px(cx + 3, headY + 11, 1, 3, C.gray);
      px(cx - 4, headY + 14, 8, 1, C.gray);

      if (surprised) {
        px(cx - 2, headY + 11, 5, 3, '#1a1a2a');
        px(cx - 1, headY + 11, 3, 1, '#8a6050');
        px(cx - 2, headY + 11, 1, 3, '#8a6050');
        px(cx + 2, headY + 11, 1, 3, '#8a6050');
        px(cx - 1, headY + 13, 3, 1, '#8a6050');
      } else {
        px(cx - 2, headY + 12, 4, 1, '#8a6050');
      }

      px(cx - 5, headY + 13, 10, 3, C.skinSh);

      const beardTop = headY + 13;
      px(cx - 8, beardTop, 16, 3, C.gray);
      px(cx - 10, beardTop + 3, 20, 5, '#607080');
      px(cx - 8, beardTop + 8, 16, 4, C.gray);
      px(cx - 6, beardTop + 12, 12, 3, '#607080');
      px(cx - 4, beardTop + 15, 8, 3, C.gray);
      px(cx - 2, beardTop + 18, 4, 2, '#607080');

      const torsoY = headY + 16;
      for (let i = 0; i < 58; i++) {
        const w = Math.min(28 + i * 0.9, 66);
        const rx = cx - Math.floor(w / 2);
        px(rx, torsoY + i, Math.floor(w), 1, C.robe);

        px(rx, torsoY + i, 2, 1, C.robeDk);
        px(rx + Math.floor(w) - 2, torsoY + i, 2, 1, C.robeDk);

        const stoleWidth = Math.max(10, Math.floor(w * 0.2));
        const stoleX = cx - Math.floor(stoleWidth / 2);
        if (i > 4) {
          px(stoleX, torsoY + i, stoleWidth, 1, i % 2 === 0 ? C.robeHi : C.robePurple);
          px(stoleX - 1, torsoY + i, 1, 1, C.hatBand);
          px(stoleX + stoleWidth, torsoY + i, 1, 1, C.hatBand);
        }

        if (i > 6) {
          px(cx, torsoY + i, 1, 1, i % 3 === 0 ? C.brassHi : C.robeDk);
        }

        if (i > 9 && i < 50) {
          const leftFoldX = rx + 6 + (i % 7 === 0 ? 1 : 0);
          const rightFoldX = rx + Math.floor(w) - 8 - (i % 7 === 3 ? 1 : 0);
          px(leftFoldX, torsoY + i, 1, 1, C.robeHi);
          px(rightFoldX, torsoY + i, 1, 1, C.robeHi);
          if (i % 6 === 0) {
            px(leftFoldX + 2, torsoY + i, 1, 1, C.robeDk);
            px(rightFoldX - 2, torsoY + i, 1, 1, C.robeDk);
          }
        }

        if (i > 10 && i < 44 && i % 9 === 2) {
          px(cx, torsoY + i, 1, 1, C.brassHi);
          px(cx - 1, torsoY + i + 1, 3, 1, C.hatBand);
          px(cx, torsoY + i + 2, 1, 1, C.brassHi);
          px(cx - 2, torsoY + i + 1, 1, 1, C.robePurpleHi);
          px(cx + 2, torsoY + i + 1, 1, 1, C.robePurpleHi);
        }

        if (i > 50) {
          px(rx + 3, torsoY + i, Math.max(1, Math.floor(w) - 6), 1, i % 2 === 0 ? C.robeDk : C.robe);
          if (i % 3 === 0) {
            px(cx - 1, torsoY + i, 3, 1, C.hatBand);
          }
        }
      }

      // Rounded shoulder capes with mirrored geometry.
      for (let sy = 0; sy < 9; sy++) {
        const leftW = 18 - Math.floor(sy * 1.3);
        const rightW = 18 - Math.floor(sy * 1.3);
        const rightX = cx + 27 - rightW;
        px(cx - 26, torsoY + sy + 1, leftW, 1, sy < 4 ? C.robeHi : C.robe);
        px(rightX, torsoY + sy + 1, rightW, 1, sy < 4 ? C.robeHi : C.robe);
      }
      px(cx - 27, torsoY + 3, 1, 7, C.robeDk);
      px(cx + 27, torsoY + 3, 1, 7, C.robeDk);
      px(cx - 22, torsoY + 4, 9, 1, C.robePurpleHi);
      px(cx + 14, torsoY + 4, 9, 1, C.robePurpleHi);
      px(cx - 20, torsoY + 5, 1, 1, C.hatBand);
      px(cx - 16, torsoY + 5, 1, 1, C.hatBand);
      px(cx + 16, torsoY + 5, 1, 1, C.hatBand);
      px(cx + 20, torsoY + 5, 1, 1, C.hatBand);

      px(cx - 10, torsoY, 20, 2, C.hatBand);
      px(cx - 6, torsoY, 12, 8, C.gray);
      px(cx - 4, torsoY + 8, 8, 4, '#607080');
    };

    const drawDesk = () => {
      px(0, 96, GW, 4, C.wood);
      px(0, 96, GW, 2, C.woodHi);
      px(0, 99, GW, 1, C.brass);
      px(0, 100, GW, GH - 100, C.woodDk);
      px(0, 100, GW, 1, '#2a1a0a');
    };

    const drawKeyboard = (t) => {
      const kx = 134;
      const ky = 97;
      px(kx, ky, 52, 9, C.keyBase);
      px(kx, ky, 52, 1, C.keyHi);
      px(kx + 51, ky, 1, 9, '#3a2818');
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 12; col++) {
          const x = kx + 2 + col * 4;
          const y = ky + 1 + row * 2;
          const pressed = Math.sin(t * 0.012 + col * 3.1 + row * 7.3) > 0.75;
          if (pressed) {
            px(x, y + 1, 3, 1, C.keyBase);
          } else {
            px(x, y, 3, 1, C.keyTop);
            if ((col + row) % 3 === 0) {
              px(x, y, 3, 1, C.keyHi);
            }
          }
        }
      }
    };

    const drawFlask = (t) => {
      const fx = 10;
      const fy = 88;
      const flaskGlow = '#b6ff2b';
      const flaskLiquid = '#6fdc00';
      px(fx + 1, fy, 5, 1, '#304050');
      px(fx, fy + 1, 7, 9, '#203040');
      px(fx + 1, fy + 10, 5, 1, '#304050');
      const wobble = Math.sin(t * 0.004);
      const liqTop = fy + 3 + Math.round(wobble * 0.5);
      px(fx + 1, liqTop, 5, fy + 10 - liqTop, flaskLiquid);
      px(fx + 1, liqTop, 5, 1, flaskGlow);
      px(fx + 2, fy - 3, 3, 3, '#506070');
      px(fx + 1, fy - 4, 5, 1, C.woodHi);
      const pulse = 0.12 + 0.08 * Math.sin(t * 0.003);
      ctx.globalAlpha = pulse;
      ctx.fillStyle = flaskGlow;
      ctx.fillRect(fx * P, fy * P, 7 * P, 10 * P);
      ctx.globalAlpha = 1;
    };

    const drawHands = (t) => {
      const cx = 160;
      const frame = Math.floor(t / 180) % 4;
      px(cx - 23, 76, 11, 5, C.robe);
      px(cx - 23, 76, 11, 1, C.robeHi);
      px(cx - 20, 81, 10, 6, C.robe);
      px(cx - 20, 81, 10, 1, C.robeHi);
      px(cx - 18, 87, 9, 6, C.robe);
      px(cx - 18, 87, 9, 1, C.robeHi);
      px(cx + 12, 76, 11, 5, C.robe);
      px(cx + 12, 76, 11, 1, C.robeHi);
      px(cx + 10, 81, 10, 6, C.robe);
      px(cx + 10, 81, 10, 1, C.robeHi);
      px(cx + 9, 87, 9, 6, C.robe);
      px(cx + 9, 87, 9, 1, C.robeHi);

      const lOff = frame < 2 ? 0 : -1;
      const lhx = cx - 16;
      const lhy = 93;
      px(lhx, lhy + lOff, 8, 3, C.skin);
      px(lhx, lhy + 3 + lOff, 8, 1, C.skinSh);
      px(lhx - 1, lhy + 1 + lOff, 1, 2, C.skin);
      px(lhx + 8, lhy + 1 + lOff, 1, 2, C.skin);

      const rOff = frame === 1 || frame === 3 ? -1 : 0;
      const rhx = cx + 8;
      const rhy = 93;
      px(rhx, rhy + rOff, 8, 3, C.skin);
      px(rhx, rhy + 3 + rOff, 8, 1, C.skinSh);
      px(rhx - 1, rhy + 1 + rOff, 1, 2, C.skin);
      px(rhx + 8, rhy + 1 + rOff, 1, 2, C.skin);

      px(lhx - 2, lhy - 1 + lOff, 12, 2, C.robeHi);
      px(rhx - 2, rhy - 1 + rOff, 12, 2, C.robeHi);
    };

    const updateRunes = (t) => {
      if (Math.random() < 0.035) {
        runes.push({
          x: 140 + Math.random() * 40,
          y: 92,
          char: RUNE_CHARS[Math.floor(Math.random() * RUNE_CHARS.length)],
          life: 1.0,
          speed: 0.2 + Math.random() * 0.15,
          drift: (Math.random() - 0.5) * 0.25
        });
      }

      for (let i = runes.length - 1; i >= 0; i--) {
        const rune = runes[i];
        rune.y -= rune.speed;
        rune.x += rune.drift;
        rune.life -= 0.007;
        if (rune.life <= 0) {
          runes.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = rune.life * 0.65;
        ctx.fillStyle = C.cyan;
        ctx.font = `bold ${P * 2.5}px 'Courier New', monospace`;
        ctx.fillText(rune.char, rune.x * P, rune.y * P);
        ctx.globalAlpha = rune.life * 0.1;
        ctx.fillRect((rune.x - 1) * P, (rune.y - 3) * P, 6 * P, 4 * P);
        ctx.globalAlpha = 1;
      }
    };

    const drawTitle = (t) => {
      const glow = 0.6 + 0.4 * Math.sin(t * 0.002);
      const titleX = W * 0.5;
      const titleY = 14 * P;
      ctx.save();
      ctx.textAlign = 'center';
      ctx.globalAlpha = 1;
      ctx.fillStyle = C.green;
      ctx.font = `bold ${P * 10}px 'Courier New', monospace`;
      ctx.shadowColor = C.green;
      ctx.shadowBlur = 12 * glow;
      ctx.fillText('Lab Logs', titleX, titleY);
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const drawDust = (t) => {
      for (const dust of dustMotes) {
        dust.y += dust.speed;
        dust.x += dust.drift + Math.sin(t * 0.001 + dust.phase) * 0.02;
        if (dust.y > 94) {
          dust.y = 0;
          dust.x = Math.random() * GW;
        }
        ctx.globalAlpha = 0.15 + 0.1 * Math.sin(t * 0.002 + dust.phase);
        px(Math.floor(dust.x), Math.floor(dust.y), 1, 1, C.white);
        ctx.globalAlpha = 1;
      }
    };

    const drawAmbientLight = (t) => {
      const flicker = 0.03 + 0.015 * Math.sin(t * 0.003);
      ctx.globalAlpha = flicker;
      ctx.fillStyle = C.cyan;
      ctx.fillRect(52 * P, 90 * P, 76 * P, 10 * P);
      ctx.globalAlpha = flicker * 0.4;
      ctx.fillRect(134 * P, 46 * P, 52 * P, 50 * P);
      ctx.globalAlpha = 1;
    };

    const drawSpeechBubble = () => {
      const bx = 118;
      const byy = 14;
      const bw = 40;
      const bh = 16;
      px(bx + 2, byy, bw - 4, bh, '#ffffff');
      px(bx, byy + 2, bw, bh - 4, '#ffffff');
      px(bx + 1, byy + 1, bw - 2, bh - 2, '#ffffff');
      px(bx + 2, byy, bw - 4, 1, '#1a1a2a');
      px(bx + 2, byy + bh - 1, bw - 4, 1, '#1a1a2a');
      px(bx, byy + 2, 1, bh - 4, '#1a1a2a');
      px(bx + bw - 1, byy + 2, 1, bh - 4, '#1a1a2a');
      px(bx + 1, byy + 1, 1, 1, '#1a1a2a');
      px(bx + bw - 2, byy + 1, 1, 1, '#1a1a2a');
      px(bx + 1, byy + bh - 2, 1, 1, '#1a1a2a');
      px(bx + bw - 2, byy + bh - 2, 1, 1, '#1a1a2a');
      px(bx + bw - 10, byy + bh, 3, 1, '#ffffff');
      px(bx + bw - 9, byy + bh + 1, 2, 1, '#ffffff');
      px(bx + bw - 8, byy + bh + 2, 1, 1, '#ffffff');
      px(bx + bw - 11, byy + bh, 1, 1, '#1a1a2a');
      px(bx + bw - 10, byy + bh + 1, 1, 1, '#1a1a2a');
      px(bx + bw - 9, byy + bh + 2, 1, 1, '#1a1a2a');
      px(bx + bw - 7, byy + bh + 2, 1, 1, '#1a1a2a');
      px(bx + bw - 7, byy + bh, 1, 1, '#1a1a2a');
      px(bx + bw - 7, byy + bh + 1, 1, 1, '#1a1a2a');
      ctx.fillStyle = '#1a1a2a';
      ctx.font = `bold ${P * 4}px 'Courier New', monospace`;
      ctx.fillText('Eureka!', (bx + 4) * P, (byy + 11) * P);
    };

    const render = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const t = timestamp - startTime;

      if (!wallReady) {
        drawWall();
        wallCanvas = document.createElement('canvas');
        wallCanvas.width = W;
        wallCanvas.height = H;
        wallCanvas.getContext('2d').drawImage(canvas, 0, 0);
        wallReady = true;
      } else {
        ctx.drawImage(wallCanvas, 0, 0);
      }

      drawShelves();
      drawPotions(t);
      drawPipe();
      drawOoze(t);
      drawAmbientLight(t);
      drawMonitor();
      drawScreen(t);
      drawWizard(t);
      drawDesk();
      drawFlask(t);
      drawKeyboard(t);
      drawHands(t);
      drawDust(t);
      updateRunes(t);
      drawTitle(t);
      if (compileTimer > 0) {
        drawSpeechBubble();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      triggerCompileRef.current = () => {};
    };
  }, []);

  return (
    <div className="relative w-full bg-slate-950">
      <canvas
        ref={canvasRef}
        width={1120}
        height={630}
        className="block w-full h-auto image-rendering-pixelated"
        style={{ imageRendering: 'pixelated' }}
      />
      <button
        type="button"
        onClick={() => triggerCompileRef.current()}
        className="absolute bottom-3 left-3 md:bottom-5 md:left-5 px-3 py-2 bg-slate-950/80 hover:bg-slate-900 border border-slate-600 rounded text-slate-200 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors"
      >
        Trigger Compile
      </button>
    </div>
  );
};

export default LabLogsAnimatedHeader;