# GradualBlur 2.0

🌊 **Advanced gradual blur effects** with animations, presets, responsive design, and multi-framework support. Creates smooth backdrop-filter blur transitions with professional-grade features.

## ✨ Features

- 🎨 **Multiple Frameworks**: React, Vue, Svelte, Vanilla JS
- 🎬 **Animations**: Scroll-triggered, hover effects, fade-in
- 📱 **Responsive**: Mobile-first breakpoints
- 🎯 **Presets**: Hero, navigation, modal, card styles
- 🎨 **Color Tinting**: Add color overlays
- 📐 **Advanced Curves**: Linear, bezier, ease-in-out progressions
- ⚡ **GPU Optimized**: Hardware acceleration support
- ♿ **Accessibility**: Respects `prefers-reduced-motion`
- 🎛️ **Multi-directional**: Top, bottom, left, right positioning

## 📦 Installation

```bash
# CLI tool (global)
npm install -g gradualblur

# Library (local)
npm install gradualblur
```

## 🚀 Quick Start

### CLI Usage

```bash
# Basic blur
gradual-blur

# Hero section preset
gradual-blur --preset hero

# Animated scroll trigger
gradual-blur --animated scroll --tint "rgba(0,0,0,0.2)"

# Responsive with multiple zones
gradual-blur --responsive --zones top,bottom --mobile-height 3rem
```

### React Component

```jsx
import GradualBlur from 'gradualblur';

function App() {
  return (
    <div>
      {/* Hero preset with animation */}
      <GradualBlur 
        preset="hero"
        animated="fade"
        onAnimationComplete={() => console.log('Ready!')}
      />
      
      {/* Custom responsive blur */}
      <GradualBlur 
        position="top"
        strength={2.5}
        tint="rgba(255,255,255,0.1)"
        responsive
        mobileHeight="4rem"
        desktopHeight="8rem"
        hoverIntensity={1.5}
      />
    </div>
  );
}
```

### Vue Component

```vue
<template>
  <div>
    <GradualBlur 
      preset="navigation"
      :animated="'scroll'"
      @animation-complete="onReady"
    />
  </div>
</template>

<script>
import { GradualBlurVue as GradualBlur } from 'gradualblur'

export default {
  components: { GradualBlur },
  methods: {
    onReady() {
      console.log('Blur animation complete!')
    }
  }
}
</script>
```

### Svelte Component

```svelte
<script>
  import { GradualBlurSvelte as GradualBlur } from 'gradualblur'
</script>

<GradualBlur 
  preset="modal"
  animated="fade"
  on:animationComplete={() => console.log('Done!')}
/>
```

### Vanilla JavaScript

```html
<!-- Auto-initialize with data attributes -->
<div data-gradual-blur 
     data-gradual-blur-preset="hero"
     data-gradual-blur-animated="scroll">
</div>

<!-- Or programmatically -->
<script>
import { GradualBlurJS } from 'gradualblur'

const blur = new GradualBlurJS('.my-element', {
  preset: 'navigation',
  animated: 'hover',
  hoverIntensity: 2
})
</script>
```

## 🎛️ CLI Options

### Basic Options
| Option | Description | Default |
|--------|-------------|----------|
| `-p, --position <pos>` | Position (`top`\|`bottom`\|`left`\|`right`) | `bottom` |
| `-s, --strength <num>` | Blur strength multiplier | `2` |
| `-h, --height <size>` | Height of blur area | `7rem` |
| `-w, --width <size>` | Width of blur area | `100%` |
| `-d, --divs <num>` | Number of blur layers | `5` |
| `-z, --zindex <num>` | CSS z-index value | `1000` |
| `-e, --exponential` | Use exponential progression | `false` |

### Animation Options
| Option | Description | Default |
|--------|-------------|----------|
| `--animated <type>` | Animation type (`scroll`\|`hover`\|`fade`) | `false` |
| `--duration <time>` | Animation duration | `0.3s` |
| `--easing <func>` | Easing function | `ease-out` |
| `--hover-intensity <num>` | Hover blur multiplier | - |

### Styling Options
| Option | Description | Default |
|--------|-------------|----------|
| `--tint <color>` | Color overlay (rgba/hex) | - |
| `--opacity <num>` | Blur layer opacity | `1` |
| `--curve <type>` | Progression (`linear`\|`bezier`\|`ease-in-out`) | `linear` |

### Responsive Options
| Option | Description | Default |
|--------|-------------|----------|
| `--responsive` | Enable breakpoints | `false` |
| `--mobile-height <size>` | Height on mobile (≤768px) | - |
| `--tablet-height <size>` | Height on tablet (769-1024px) | - |
| `--desktop-height <size>` | Height on desktop (≥1025px) | - |

### Advanced Options
| Option | Description | Default |
|--------|-------------|----------|
| `--preset <name>` | Use preset (`hero`\|`navigation`\|`modal`\|`card`) | - |
| `--zones <positions>` | Multiple zones (comma-separated) | - |
| `--gpu-optimized` | Add GPU acceleration hints | `false` |
| `--reduced-motion` | Respect accessibility preferences | `false` |

## 🎨 Presets

### Hero Section
```bash
gradual-blur --preset hero
# → Bottom blur, 8rem height, 6 layers, fade animation
```

### Navigation Overlay
```bash
gradual-blur --preset navigation  
# → Top blur, 4rem height, white tint, 4 layers
```

### Modal Background
```bash
gradual-blur --preset modal
# → Full screen, dark tint, strong blur
```

### Card Effect
```bash
gradual-blur --preset card
# → Small bottom blur, bezier curve, 4 layers
```

## 🎬 Animation Examples

### Scroll-Triggered Blur
```bash
gradual-blur --animated scroll --duration 0.5s
```

### Hover Intensity
```bash
gradual-blur --animated hover --hover-intensity 2.5
```

### Fade-In Effect
```bash
gradual-blur --animated fade --easing ease-out
```

### Multiple Zones
```bash
gradual-blur --zones top,bottom --animated scroll
```

## 📱 Responsive Design

```bash
# Mobile-first approach
gradual-blur --responsive \
  --mobile-height 3rem \
  --tablet-height 5rem \
  --desktop-height 8rem
```

## 🎨 Color Tinting

```bash
# Dark overlay
gradual-blur --tint "rgba(0,0,0,0.3)"

# Light overlay  
gradual-blur --tint "rgba(255,255,255,0.2)"

# Colored overlay
gradual-blur --tint "rgba(59,130,246,0.1)"
```

## ⚡ Performance

```bash
# GPU optimization
gradual-blur --gpu-optimized

# Reduced motion support
gradual-blur --reduced-motion

# Fewer layers for better performance
gradual-blur --divs 3 --strength 3
```

## 🔧 Advanced Usage

### Custom Curves
```bash
# Smooth bezier progression
gradual-blur --curve bezier

# Ease-in-out progression  
gradual-blur --curve ease-in-out

# Exponential with bezier
gradual-blur --exponential --curve bezier
```

### Multi-directional
```bash
# Left side blur
gradual-blur --position left --width 5rem

# Right side blur
gradual-blur --position right --width 8rem
```

## 🌐 Framework Integration

### React Props
```jsx
<GradualBlur
  preset="hero"              // Preset configuration
  position="bottom"          // Position
  strength={2.5}             // Blur strength
  height="8rem"              // Container height
  animated="scroll"          // Animation type
  tint="rgba(0,0,0,0.2)"     // Color overlay
  responsive                 // Enable breakpoints
  mobileHeight="4rem"        // Mobile height
  hoverIntensity={1.5}       // Hover multiplier
  gpuOptimized               // GPU acceleration
  onAnimationComplete={fn}   // Callback
/>
```

### Vue Props
```vue
<GradualBlur
  :preset="'navigation'"
  :strength="2"
  :animated="'fade'"
  :responsive="true"
  @animation-complete="handleComplete"
/>
```

### Vanilla JS Options
```javascript
const blur = new GradualBlurJS('.element', {
  preset: 'modal',
  animated: 'scroll',
  tint: 'rgba(0,0,0,0.3)',
  responsive: true,
  onAnimationComplete: () => console.log('Done!')
})

// Update configuration
blur.updateConfig({ strength: 3 })

// Control visibility
blur.show()
blur.hide()

// Cleanup
blur.destroy()
```

## 🎯 Use Cases

- **🏠 Hero Sections**: Fade content into blurred edges
- **🧭 Navigation**: Blur content behind floating nav bars
- **📱 Modals**: Create depth with blurred backgrounds  
- **🖼️ Image Overlays**: Improve text readability
- **📜 Scroll Effects**: Dynamic blur on scroll
- **🎴 Cards**: Subtle blur effects on hover
- **🎬 Video Players**: Blur controls overlay
- **📊 Dashboards**: Section separators

## 🌍 Browser Support

Requires `backdrop-filter` support:
- ✅ Chrome 76+
- ✅ Firefox 103+  
- ✅ Safari 9+
- ✅ Edge 79+

## 📄 License

MIT © Ansh Dhanani