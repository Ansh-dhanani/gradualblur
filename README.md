# GradualBlur

![GradualBlur Demo](https://raw.githubusercontent.com/Ansh-dhanani/gradualblur/main/gradualblur.gif)

Create beautiful gradual blur effects that fade smoothly from clear to blurred. Perfect for hero sections, navigation overlays, and modern UI designs.

## Installation

```bash
# For command line usage
npm install -g gradualblur

# For React/Vue/Svelte projects
npm install gradualblur
```

## Quick Start

### Command Line

```bash
# Basic blur at bottom of screen
gradual-blur

# Hero section style
gradual-blur --preset hero

# Navigation bar style
gradual-blur --preset navigation
```

### React

```jsx
import GradualBlur from 'gradualblur';

function App() {
  return (
    <div>
      {/* Simple bottom blur */}
      <GradualBlur />
      
      {/* Hero section with animation */}
      <GradualBlur 
        preset="hero"
        animated="fade"
      />
      
      {/* Custom blur with hover effect */}
      <GradualBlur 
        position="top"
        strength={3}
        hoverIntensity={2}
      />
    </div>
  );
}
```

## Common Options

| Option | What it does | Example |
|--------|-------------|----------|
| `--preset hero` | Ready-made hero section style | `gradual-blur --preset hero` |
| `--preset navigation` | Perfect for nav bars | `gradual-blur --preset navigation` |
| `--position top` | Blur from top instead of bottom | `gradual-blur --position top` |
| `--strength 3` | Make blur stronger | `gradual-blur --strength 3` |
| `--height 10rem` | Change blur area height | `gradual-blur --height 10rem` |
| `--animated scroll` | Blur appears when scrolling | `gradual-blur --animated scroll` |
| `--tint "rgba(0,0,0,0.2)"` | Add dark overlay | `gradual-blur --tint "rgba(0,0,0,0.2)"` |

## Presets

We've created some ready-to-use styles:

**Hero Section**
```bash
gradual-blur --preset hero
```
Perfect for landing pages. Creates a smooth fade at the bottom.

**Navigation Bar**
```bash
gradual-blur --preset navigation
```
Great for floating nav bars. Blurs content behind the navigation.

**Modal Background**
```bash
gradual-blur --preset modal
```
Full-screen blur with dark tint for modal dialogs.

**Card Effect**
```bash
gradual-blur --preset card
```
Subtle blur for card components and overlays.

## Animations

**Scroll Animation**
```bash
gradual-blur --animated scroll
```
Blur appears when element comes into view.

**Hover Effect**
```bash
gradual-blur --animated hover --hover-intensity 2
```
Blur gets stronger when you hover over it.

**Fade In**
```bash
gradual-blur --animated fade
```
Blur fades in smoothly when page loads.

## Responsive Design

```bash
# Different heights for different screen sizes
gradual-blur --responsive --mobile-height 3rem --desktop-height 8rem
```

## Color Tinting

Add color overlays to your blur:

```bash
# Dark overlay
gradual-blur --tint "rgba(0,0,0,0.3)"

# Light overlay
gradual-blur --tint "rgba(255,255,255,0.2)"

# Blue tint
gradual-blur --tint "rgba(59,130,246,0.1)"
```

## Framework Usage

### Vue.js

```vue
<template>
  <GradualBlur preset="navigation" animated="scroll" />
</template>

<script>
import { GradualBlurVue as GradualBlur } from 'gradualblur'
export default {
  components: { GradualBlur }
}
</script>
```

### Svelte

```svelte
<script>
  import { GradualBlurSvelte as GradualBlur } from 'gradualblur'
</script>

<GradualBlur preset="hero" animated="fade" />
```

### Vanilla JavaScript

```html
<!-- Simple HTML setup -->
<div data-gradual-blur data-gradual-blur-preset="hero"></div>

<!-- Or with JavaScript -->
<script>
import { GradualBlurJS } from 'gradualblur'

const blur = new GradualBlurJS('.my-element', {
  preset: 'navigation',
  animated: 'scroll'
})
</script>
```

## Real-World Examples

**Landing Page Hero**
```bash
gradual-blur --preset hero --animated fade --tint "rgba(0,0,0,0.1)"
```

**Floating Navigation**
```bash
gradual-blur --preset navigation --animated scroll
```

**Image Overlay**
```bash
gradual-blur --position bottom --height 5rem --strength 2 --tint "rgba(0,0,0,0.4)"
```

**Modal Dialog**
```bash
gradual-blur --preset modal --animated fade
```

## Browser Support

Works in all modern browsers that support `backdrop-filter`:
- Chrome 76+
- Firefox 103+
- Safari 9+
- Edge 79+

## Tips

- Start with presets, then customize as needed
- Use `--strength 1-3` for most cases (higher = more blur)
- Add `--animated scroll` for modern feel
- Use `--tint` to improve text readability
- Test on mobile with `--responsive`

## License

MIT © Ansh Dhanani