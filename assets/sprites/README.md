# FF6 Sprites - 16-bit SNES Style

This folder contains updated 16-bit SNES style sprites for Final Fantasy 6 characters and enemies, designed based on actual game sprite references to accurately match the original game appearance.

## Files

- **`ff6-characters.js`** - Character sprite definitions in JavaScript format
  - Contains front and back views for all 4 characters
  - Colors and designs based on actual FF6 sprite sheets
  - More accurate to the original game character designs

- **`ff6-enemies.js`** - Enemy sprite definitions in JavaScript format
  - Contains enemy sprites (Cactuar)
  - Based on actual game sprite references
  - Accurate colors and designs

- **`sprite-preview.html`** - Preview page to view all sprites
  - Open in a browser to see all character and enemy sprites
  - Shows front and back views
  - Displays color palettes

## Characters

### Terra Branford
- **Hair**: Bright green with darker green shadows
- **Top**: Purple (#a855f7) with darker purple shadows
- **Skirt**: Red (#dc2626) with dark red shadows
- **Design**: More accurate purple top and red skirt matching the game sprites

### Locke Cole
- **Hair**: Brown with darker brown shadows
- **Bandana**: Colorful pattern with blue, purple, yellow, and green
- **Vest**: Dark blue (#1e3a8a) with lighter blue highlights
- **Shirt**: Light blue sleeves visible under vest
- **Pants**: Brown with darker brown shadows
- **Design**: Matches the colorful bandana and blue vest from the game

### Edgar Roni Figaro
- **Hair**: Blonde with darker yellow shadows
- **Clothing**: Blue and purple mix with gold accents
- **Cape**: Gold (#fbbf24) with darker gold shadows
- **Design**: Regal appearance with blue/purple clothing and gold details

### Celes Chere
- **Hair**: Blonde with purple highlights and darker yellow shadows
- **Dress**: White with light blue details
- **Accents**: Green belt and accents
- **Design**: Elegant white dress with green military accents, matching the game

## Enemies

### Cactuar
- **Body**: Bright green (#22c55e) with dark green shading
- **Features**: Three black spikes on top, two small black eyes, horizontal mouth line
- **Design**: Stick-like cactus creature with stubby arms and legs in running pose
- **Based on**: Actual FF6 Cactuar sprite sheet reference

## Usage

### In JavaScript/React:

```javascript
// Import character sprites
import { FF6_CHARACTER_SPRITES, FF6_CHARACTER_SPRITES_BACK } from './assets/sprites/ff6-characters.js';

// Import enemy sprites
import { FF6_ENEMY_SPRITES } from './assets/sprites/ff6-enemies.js';

// Use Terra sprite
const terra = FF6_CHARACTER_SPRITES.TERRA;

// Use Cactuar sprite
const cactuar = FF6_ENEMY_SPRITES.CACTUAR;
```

### Direct Script Tag:

```html
<script src="assets/sprites/ff6-characters.js"></script>
<script src="assets/sprites/ff6-enemies.js"></script>
<script>
  // Access via global variables
  const terra = FF6_CHARACTER_SPRITES.TERRA;
  const cactuar = FF6_ENEMY_SPRITES.CACTUAR;
</script>
```

## Preview

To view the sprites, open `sprite-preview.html` in a web browser. The preview shows:
- Front view of each character
- Back view of each character
- Color palette for each sprite
- Pixel dimensions

## Design Notes

- Sprites are 16x16 pixels (matching SNES sprite size)
- Colors based on actual FF6 sprite sheet references
- More detailed and accurate to FF6 character designs
- Includes proper shading, highlights, and shadows
- Back views for walking animations
- Each character has unique color palette matching their game appearance

## Color Accuracy

All colors have been updated to match the actual game sprites:
- Terra's purple top and red skirt
- Locke's colorful bandana pattern
- Edgar's blue/purple clothing with gold accents
- Celes' white dress with green accents and purple hair highlights
