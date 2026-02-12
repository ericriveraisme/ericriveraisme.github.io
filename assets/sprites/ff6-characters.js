/**
 * Final Fantasy 6 Character Sprites - 16-bit SNES Style
 * Based on actual game sprite references
 * 
 * Character References from sprite sheets:
 * - Terra: Green hair, purple top, red skirt
 * - Locke: Brown hair, colorful bandana (blue/purple/yellow/green), dark blue vest, brown pants
 * - Edgar: Blonde hair, blue/purple clothing with gold accents
 * - Celes: Blonde hair with purple highlights, white/light blue dress, green accents
 */

// ES6 Module Export (for webpack/React)
export const FF6_CHARACTER_SPRITES = {
  TERRA: {
    name: 'Terra Branford',
    palette: {
      G: '#4ade80',  // Green hair (bright)
      D: '#16a34a',  // Dark green (hair shadow)
      P: '#a855f7',  // Purple top
      Q: '#9333ea',  // Dark purple (top shadow)
      R: '#dc2626',  // Red skirt
      T: '#991b1b',  // Dark red (skirt shadow)
      S: '#fde68a',  // Skin
      W: '#ffffff',  // White (highlights)
      B: '#000000'   // Black (outline, eyes)
    },
    pixels: [
      "      GGGG      ",  // Hair top
      "     GGDGGG     ",
      "    GGDGGDGG    ",
      "   GGDGGDGGDG   ",
      "   GGSGSGSGGG   ",  // Face
      "   GGSBSSBGGG   ",  // Eyes
      "    SSSSSSSS    ",  // Neck
      "   PPPPPPPP     ",  // Purple top
      "  PPPQQQPPPPP   ",
      "  SS PPPPP SS   ",  // Arms
      "  WW PPQQPP WW  ",  // Hands, top detail
      "     RRRRRR     ",  // Red skirt waist
      "    RRRRRRRR    ",  // Skirt
      "    RRRRRRRR    ",
      "    RRRTTTRR    ",  // Skirt with shadow
      "    RR    RR    "   // Legs
    ]
  },

  LOCKE: {
    name: 'Locke Cole',
    palette: {
      U: '#3b82f6',  // Blue bandana base
      M: '#8b5cf6',  // Purple (bandana pattern)
      Y: '#eab308',  // Yellow (bandana pattern)
      E: '#22c55e',  // Green (bandana pattern)
      B: '#92400e',  // Brown hair
      D: '#78350f',  // Dark brown (hair shadow)
      V: '#1e3a8a',  // Dark blue vest
      L: '#1e40af',  // Medium blue (vest highlight)
      N: '#f3f4f6',  // Light blue (shirt sleeves)
      S: '#fde68a',  // Skin
      K: '#92400e',  // Brown pants
      X: '#78350f',  // Dark brown (pants shadow)
      O: '#000000'   // Black (outline, eyes)
    },
    pixels: [
      "      UUUU      ",  // Bandana
      "     UUMYUU     ",  // Bandana with pattern
      "    UUBBUBBUU   ",  // Hair under bandana
      "   UUBBBBBBBUU  ",
      "   UUSUSUSUUU   ",  // Face
      "   UUSOSSOUUU   ",  // Eyes
      "    SSSSSSSS    ",  // Neck
      "   VVVVVVVVVV   ",  // Dark blue vest
      "  VVVLLLLVVVV   ",  // Vest with highlights
      "  NN VVVVVV NN  ",  // Light blue sleeves, arms
      "  NN VVLLVV NN  ",  // Vest detail
      "     VVVVVV     ",  // Belt area
      "    KKKKKKKK    ",  // Brown pants
      "    KKKKKKKK    ",
      "    KKKXXXKK    ",  // Pants with shadow
      "    KK    KK    "   // Legs
    ]
  },

  EDGAR: {
    name: 'Edgar Roni Figaro',
    palette: {
      Y: '#facc15',  // Blonde hair
      D: '#ca8a04',  // Dark yellow (hair shadow)
      B: '#3b82f6',  // Blue clothing
      P: '#a855f7',  // Purple clothing
      G: '#fbbf24',  // Gold accents
      H: '#f59e0b',  // Dark gold (accent shadow)
      S: '#fde68a',  // Skin
      A: '#1e40af',  // Dark blue (clothing shadow)
      K: '#000000'   // Black (outline, eyes)
    },
    pixels: [
      "      YYYY      ",  // Hair
      "     YYDYYY     ",
      "    YYYDYYDYY   ",
      "   YYYYDYYDYYY  ",
      "   YYSYSYSYYY   ",  // Face
      "   YYSKSSKYYY   ",  // Eyes
      "    SSSSSSSS    ",  // Neck
      "   BBBBBBBBBB   ",  // Blue top
      "  BBBPPPPPBBBB  ",  // Blue/purple mix
      "  GG BBBBBB GG  ",  // Gold accents, arms
      "  GG BBAAAB GG  ",  // Clothing detail
      "     GGGGGG     ",  // Gold belt
      "    BBBBBBBB    ",  // Blue pants
      "    BBBBBBBB    ",
      "    BBBAAABB    ",  // Pants with shadow
      "    BB    BB    "   // Legs
    ]
  },

  CELES: {
    name: 'Celes Chere',
    palette: {
      Y: '#fef08a',  // Blonde hair
      P: '#c084fc',  // Purple highlights in hair
      D: '#eab308',  // Dark yellow (hair shadow)
      W: '#ffffff',  // White dress
      L: '#e0e7ff',  // Light blue (dress detail)
      G: '#22c55e',  // Green accents
      E: '#16a34a',  // Dark green (accent shadow)
      S: '#fde68a',  // Skin
      K: '#000000'   // Black (outline, eyes)
    },
    pixels: [
      "      YYYY      ",  // Hair
      "     YYPYYY     ",  // Hair with purple highlights
      "    YYYPYYDYY   ",
      "   YYYYPYYDYYY  ",
      "   YYSYSYSYYY   ",  // Face
      "   YYSKSSKYYY   ",  // Eyes
      "    SSSSSSSS    ",  // Neck
      "   WWWWWWWWWW   ",  // White dress
      "  WWWLLLLWWWW   ",  // Light blue detail
      "  GG WWWWWW GG  ",  // Green accents, arms
      "  GG WWLLWW GG  ",  // Dress detail
      "     GGGGGG     ",  // Green belt
      "    WWWWWWWW    ",  // White skirt
      "    WWWWWWWW    ",
      "    WWWEEEWW    ",  // Skirt with green shadow
      "    WW    WW    "   // Legs
    ]
  }
};

// Back-facing versions for walking away
export const FF6_CHARACTER_SPRITES_BACK = {
  TERRA_BACK: {
    name: 'Terra Branford (Back)',
    palette: FF6_CHARACTER_SPRITES.TERRA.palette,
    pixels: [
      "      GGGG      ",  // Hair from behind
      "     GGDGGG     ",
      "    GGDGGDGG    ",
      "   GGDGGDGGDG   ",
      "   GGDGGDGGDG   ",
      "   GGDGGDGGDG   ",
      "    GGDGGDGG    ",
      "   PPPPPPPP     ",  // Purple top back
      "  PPPQQQPPPPP   ",
      "  PPPQQQPPPPP   ",
      "  PPPQQQPPPPP   ",
      "     RRRRRR     ",  // Red skirt waist
      "    RRRRRRRR    ",  // Skirt
      "    RRRRRRRR    ",
      "    RRRTTTRR    ",  // Skirt with shadow
      "    RR    RR    "   // Legs
    ]
  },

  LOCKE_BACK: {
    name: 'Locke Cole (Back)',
    palette: FF6_CHARACTER_SPRITES.LOCKE.palette,
    pixels: [
      "      UUUU      ",  // Bandana
      "     UUMYUU     ",  // Bandana pattern
      "    UUBBUBBUU   ",  // Hair
      "   UUBBBBBBBUU  ",
      "   UUBBBBBBBUU  ",
      "   UUBBBBBBBUU  ",
      "    UUBBBBUU    ",
      "   VVVVVVVVVV   ",  // Vest back
      "  VVVLLLLVVVV   ",
      "  VVVLLLLVVVV   ",
      "  VVVLLLLVVVV   ",
      "     VVVVVV     ",  // Belt
      "    KKKKKKKK    ",  // Brown pants
      "    KKKKKKKK    ",
      "    KKKXXXKK    ",  // Pants with shadow
      "    KK    KK    "   // Legs
    ]
  },

  EDGAR_BACK: {
    name: 'Edgar Roni Figaro (Back)',
    palette: FF6_CHARACTER_SPRITES.EDGAR.palette,
    pixels: [
      "      YYYY      ",  // Hair
      "     YYDYYY     ",
      "    YYYDYYDYY   ",
      "   YYYYDYYDYYY  ",
      "   YYYYDYYDYYY  ",
      "   YYYYDYYDYYY  ",
      "    YYYDYYY     ",
      "   BBBBBBBBBB   ",  // Blue top back
      "  BBBPPPPPBBBB  ",
      "  GG BBBBBB GG  ",  // Gold cape
      "  GG BBBBBB GG  ",
      "     GGGGGG     ",  // Gold belt
      "    BBBBBBBB    ",  // Blue pants
      "    BBBBBBBB    ",
      "    BBBAAABB    ",  // Pants with shadow
      "    BB    BB    "   // Legs
    ]
  },

  CELES_BACK: {
    name: 'Celes Chere (Back)',
    palette: FF6_CHARACTER_SPRITES.CELES.palette,
    pixels: [
      "      YYYY      ",  // Hair
      "     YYPYYY     ",  // Hair with purple highlights
      "    YYYPYYDYY   ",
      "   YYYYPYYDYYY  ",
      "   YYYYPYYDYYY  ",
      "   YYYYPYYDYYY  ",
      "    YYYPYYY     ",
      "   WWWWWWWWWW   ",  // White dress back
      "  WWWLLLLWWWW   ",
      "  WWWLLLLWWWW   ",
      "  WWWLLLLWWWW   ",
      "     GGGGGG     ",  // Green belt
      "    WWWWWWWW    ",  // White skirt
      "    WWWWWWWW    ",
      "    WWWEEEWW    ",  // Skirt with green shadow
      "    WW    WW    "   // Legs
    ]
  }
};

// CommonJS export for Node.js compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FF6_CHARACTER_SPRITES, FF6_CHARACTER_SPRITES_BACK };
}

// Global export for direct script tag usage (for preview.html)
if (typeof window !== 'undefined') {
    window.FF6_CHARACTER_SPRITES = FF6_CHARACTER_SPRITES;
    window.FF6_CHARACTER_SPRITES_BACK = FF6_CHARACTER_SPRITES_BACK;
}
