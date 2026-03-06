# **Concept 2: The Alchemist's Terminal \- Technical & Visual Specification**

**Objective:** Create an 8-bit, pixel-art style interactive header animation for a "Lab Logs" portfolio page, built as a React Component using Tailwind CSS.

**Vibe:** "Tech Meets Magic." A wizard coding at a retro-magical terminal in a dimly lit laboratory.

**Color Palette:** Dark navy background (matching the site body \~\#0f1626), vibrant cyan (\#68d3ee or similar) for magical glow and terminal text, muted brass/wood tones for the desk, and glowing neon green for the ambient ooze.

## **1\. Scene Composition & Perspective**

**Perspective:** Over-the-shoulder (angled from the right rear).

We are looking over the right shoulder of the wizard. We see the back and left side of the wizard's pointed hat and robes, their hands resting on an archaic keyboard, and a clear, slightly angled view of the glowing monitor screen in front of them.

**DOM Structure & Z-Index Layering (Back to Front):**

To achieve this in React/Tailwind, the scene must be broken down into absolute-positioned div layers inside a relative container (e.g., relative aspect-\[21/9\] overflow-hidden).

* **Layer 1 (Background):** z-0 Dark stone wall of the lab. On the left side, a brass pipe protruding from the wall, ending over a floor grate.  
* **Layer 2 (The Monitor/Terminal):** z-10 Sits on the desk. A bulky, steampunk-style CRT monitor framed in wood and brass. The screen is dark, ready to display cyan text.  
* **Layer 3 (The Wizard & Chair):** z-20 The wizard's body, hat, and the back of an ornate wooden chair.  
* **Layer 4 (The Desk & Foreground):** z-30 A heavy wooden desk edge spanning the bottom of the frame. Cluttered with a glowing potion flask (left) and the mechanical keyboard (center-right).  
* **Layer 5 (Wizard's Hands & Arms):** z-40 Positioned over the keyboard.  
* **Layer 6 (Particle Effects):** z-50 Floating magical code runes and the dripping ooze.

## **2\. Animation States & Cycles**

These should be implemented using CSS @keyframes with animation-timing-function: steps(X) to maintain the choppy, retro 8-bit feel.

### **A. The "Typing" Loop (Default State)**

* **Wizard's Hands:** A 3-frame CSS animation where the hands quickly shift up and down over the keyboard, simulating rapid typing.  
* **The Monitor:** A blinking cyan cursor \_ at the top left of the terminal screen.  
* **Floating Runes (React State):** Every 0.5 to 1 second, a tiny pixelated cyan rune (e.g., {, }, /\>, \*) is added to a React state array, rendered just above the keyboard, floats slowly upward via Tailwind transitions, and is removed from state after the transition ends.

### **B. The "Ambient Lab" Loop (Continuous)**

* **The Ooze:** A drop of bright green pixelated ooze forms at the lip of the background pipe, stretches, falls, and splashes on the grate. This should be a 5-6 frame sprite animation that loops every 4 seconds.  
* **The Potion Flask:** The liquid inside the flask on the desk pulses softly (opacity shifting via Tailwind animate-pulse or custom keyframe).

### **C. The "Compile / Eureka" Moment (Triggered Event)**

*Managed via a React state boolean, e.g., isCompiling.*

1. **Stop Typing:** The wizard's hands freeze on the keyboard (conditional rendering of CSS classes).  
2. **Screen Flash:** The terminal screen briefly flashes bright cyan, then quickly renders a block of "code" or the word SUCCESS in pixel font.  
3. **The Lean:** The wizard sprite swaps to a "leaning back" frame as if relieved or satisfied.  
4. **Reset:** After 2 seconds, isCompiling reverts to false, the screen clears (back to the blinking cursor), and the typing loop resumes.

## **3\. React & Tailwind Implementation Guide**

### **Tailwind Configuration**

To keep the React component clean, add your steps() animations to your tailwind.config.js:

module.exports \= {  
  theme: {  
    extend: {  
      keyframes: {  
        'typing-hands': {  
          '0%, 100%': { transform: 'translateY(0)' },  
          '50%': { transform: 'translateY(-2px)' },  
        },  
        'float-up': {  
          '0%': { transform: 'translateY(0)', opacity: '1' },  
          '100%': { transform: 'translateY(-20px)', opacity: '0' },  
        }  
      },  
      animation: {  
        'typing': 'typing-hands 0.3s steps(2, end) infinite',  
        'rune-float': 'float-up 1.5s linear forwards',  
      }  
    }  
  }  
}

### **Visual Integrity**

* Always apply \[image-rendering:pixelated\] to the parent container or image assets so browser scaling does not blur the pixel art.

## **4\. Developer Instructions for Copilot / AI**

**Prompting Advice when generating the React prototype:**

* **"Create a functional React component using Tailwind CSS for layout"**: Instruct the AI to use relative and absolute Tailwind classes to stack the scene layers defined in Section 1\.  
* **"Use React State for the floating runes"**: Explicitly tell the AI **not** to manipulate the DOM directly. Tell it to use useState to maintain an array of active runes, and a useEffect with setInterval to add new runes.  
* **"Ensure proper useEffect cleanup"**: Remind the AI to return a cleanup function (clearInterval, clearTimeout) in its hooks to prevent memory leaks when the header unmounts.  
* **"Use arbitrary values for pixelated rendering"**: Instruct it to add the \[image-rendering:pixelated\] Tailwind utility to ensure crisp 8-bit scaling.  
* **"Simulate the wizard states using a boolean"**: Tell it to use const \[isCompiling, setIsCompiling\] \= useState(false) to toggle between the default typing animation and the "Eureka" flash.