/**
 * Final Fantasy 6 Enemy Sprites - 16-bit SNES Style
 * Based on actual game sprite references
 * 
 * Enemy References:
 * - Cactuar: Green cactus-like creature with three spikes on top, two eyes, and a mouth
 */

// ES6 Module Export (for webpack/React)
export const FF6_ENEMY_SPRITES = {
  CACTUAR: {
    name: 'Cactuar',
    palette: {
      G: '#22c55e',  // Light green (body)
      D: '#16a34a',  // Dark green (shading/needles)
      B: '#000000',  // Black (eyes, mouth, spines)
      W: '#ffffff'   // White (eye highlights, optional)
    },
    pixels: [
      "     B      ",  // Top spine (center)
      "    BBB     ",  // Three spines on top
      "     B      ",  // Center spine
      "   GGGG     ",  // Square head top
      "  GGGDGG    ",  // Head with dark green shading on right
      "  GGBBGG    ",  // Head with eyes (two black dots)
      "  GGGDGG    ",  // Head with shading
      "  GGGDGG    ",  // Head/upper body (no distinct neck, shading)
      " GGGGDGGG   ",  // Body (arms sticking out, shading on right)
      "GGGGGDGGGG  ",  // Body with arms, darker line on right
      "GGGGGDGGGG  ",  // Body continuation with shading
      " GGGGDGGG   ",  // Body with shading
      "  GGGDGG    ",  // Body with darker green line on right
      "  GG  GG    ",  // Legs (short, stubby)
      "  B    B    "   // Legs/feet (black dots or separation)
    ]
  }
};

// CommonJS export for Node.js compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FF6_ENEMY_SPRITES };
}

// Global export for direct script tag usage
if (typeof window !== 'undefined') {
    window.FF6_ENEMY_SPRITES = FF6_ENEMY_SPRITES;
}

