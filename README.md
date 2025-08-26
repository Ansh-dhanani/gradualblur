# GradualBlur

<img src="gradualblur.gif" alt="GradualBlur Demo" width="800">

Create beautiful gradual blur effects that fade smoothly from clear to blurred. Perfect for hero sections, navigation overlays, and modern UI designs. Now with enhanced presets, target-aware positioning, and improved responsive design.

## 🚀 Installation

```bash
# For React projects
npm install gradualblur

# For Vue projects
npm install gradualblur

# For Svelte projects  
npm install gradualblur
```

## 📦 Framework Integration

### React Usage

```jsx
import GradualBlur from 'gradualblur';

function App() {
  return (
    <div>
      {/* Simple bottom blur */}
      <GradualBlur />
      
      {/* Custom blur with target positioning */}
      <GradualBlur 
        position="bottom"
        height="10vh"
        target="parent" // or {"page" (with respect to whole page)}
        strength={3}
      />
      
      {/* Using presets */}
      <GradualBlur preset="page-header" />
    </div>
  );
}
```

### Vue.js Usage

```vue
<template>
  <GradualBlurVue preset="top" animated="scroll" target="page" />
</template>

<script>
import { GradualBlurVue } from 'gradualblur'
export default {
  components: { GradualBlurVue }
}
</script>
```

### Svelte Usage

```svelte
<script>
  import { GradualBlurSvelte } from 'gradualblur'
</script>

<GradualBlurSvelte preset="bottom" animated="fade" target="parent" />
```

## 🎯 Core Features

### Target-Aware Positioning

Choose between parent-relative or page-fixed positioning:

```jsx
// Page-level blur (fixed to viewport)
<GradualBlur target="page" position="top" />

// Parent-level blur (relative to container)  
<GradualBlur target="parent" position="bottom" />
```

### Enhanced Presets

```jsx
// Basic positions
<GradualBlur preset="top" />
<GradualBlur preset="bottom" />
<GradualBlur preset="left" />
<GradualBlur preset="right" />

// Intensity variations
<GradualBlur preset="subtle" />
<GradualBlur preset="intense" />

// Style variations
<GradualBlur preset="smooth" />
<GradualBlur preset="sharp" />

// Common use cases
<GradualBlur preset="header" />
<GradualBlur preset="footer" />
<GradualBlur preset="sidebar" />

// Page-level presets
<GradualBlur preset="page-header" />
<GradualBlur preset="page-footer" />
```

## ⚙️ Complete Props Reference

### Basic Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | string | `'bottom'` | Position: `'top'`, `'bottom'`, `'left'`, `'right'` |
| `strength` | number | `2` | Blur intensity (1-5 recommended) |
| `height` | string | `'6rem'` | Blur area height/width |
| `divCount` | number | `5` | Number of gradient divisions |
| `exponential` | boolean | `false` | Use exponential blur progression |
| `zIndex` | number | `1000` | Base z-index (higher for page target) |
| `opacity` | number | `1` | Overall opacity (0-1) |
| `curve` | string | `'linear'` | Curve function: `'linear'`, `'bezier'`, `'ease-in'`, `'ease-out'`, `'ease-in-out'` |

### Animation & Effects

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animated` | string/boolean | `false` | Animation type: `false`, `'scroll'`, `'fade'`, `true` |
| `duration` | string | `'0.3s'` | Animation duration |
| `easing` | string | `'ease-out'` | Animation easing function |
| `hoverIntensity` | number | `null` | Multiplier for hover effect (e.g., 1.5, 2) |

### Responsive Design

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `responsive` | boolean | `false` | Enable responsive behavior |
| `mobileHeight` | string | `null` | Height for mobile screens |
| `tabletHeight` | string | `null` | Height for tablet screens |
| `desktopHeight` | string | `null` | Height for desktop screens |
| `mobileWidth` | string | `null` | Width for mobile screens |
| `tabletWidth` | string | `null` | Width for tablet screens |
| `desktopWidth` | string | `null` | Width for desktop screens |

### Target Positioning

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `target` | string | `'parent'` | Positioning target: `'parent'` or `'page'` |
| `className` | string | `''` | Additional CSS classes |
| `style` | object | `{}` | Custom style object |

### Advanced Features

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preset` | string | `null` | Use predefined preset configuration |
| `onAnimationComplete` | function | `null` | Callback when scroll animation completes |

## 🎨 Preset Details

### Basic Position Presets

```js
{
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' }
}
```

### Intensity Presets

```js
{
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true }
}
```

### Style Presets

```js
{
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 }
}
```

### Common Use Case Presets

```js
{
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 }
}
```

### Page-Level Presets

```js
{
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
}
```

## 🔧 Advanced Usage

### Custom Curve Functions

```jsx
import { CURVE_FUNCTIONS } from 'gradualblur';

// Add custom curve function
CURVE_FUNCTIONS.myCustomCurve = (progress) => {
  return progress * progress * (3 - 2 * progress);
};

<GradualBlur curve="myCustomCurve" />
```

### Factory Functions

```jsx
import { createPageBlur, createParentBlur } from 'gradualblur';

// Create page-level blur instance
const PageBlur = createPageBlur({ position: 'top', strength: 3 });

// Create parent-level blur instance  
const ParentBlur = createParentBlur({ position: 'bottom', height: '8rem' });
```

### Responsive Configuration

```jsx
<GradualBlur
  responsive={true}
  height="8rem"
  mobileHeight="4rem"
  tabletHeight="6rem" 
  desktopHeight="10rem"
  position="bottom"
/>
```

## 🎯 Real-World Examples

### Hero Section Blur

```jsx
<GradualBlur
  preset="page-header"
  animated="scroll"
  onAnimationComplete={() => console.log('Hero blur visible')}
/>
```

### Navigation Bar

```jsx
<GradualBlur
  position="top"
  height="6rem"
  target="page"
  strength={2}
  animated="scroll"
  zIndex={2000}
/>
```

### Sidebar Overlay

```jsx
<GradualBlur
  position="left"
  height="100%"
  width="4rem"
  target="parent"
  strength={2.5}
  responsive={true}
  mobileWidth="3rem"
  desktopWidth="5rem"
/>
```

### Footer Gradient

```jsx
<GradualBlur
  preset="footer"
  target="parent"
  animated="fade"
  duration="0.5s"
/>
```

## 🚀 Performance Tips

1. **Use presets** when possible for optimized configurations
2. **Enable responsive** only when needed for mobile/tablet variations
3. **Limit divCount** to 5-8 for most use cases (higher = more performance cost)
4. **Use exponential=false** for simpler blur calculations
5. **Avoid excessive strength** values (1-3 is usually sufficient)

## 🌐 Browser Support

- ✅ Chrome 76+ (full support)
- ✅ Firefox 103+ (full support)  
- ✅ Safari 9+ (full support)
- ✅ Edge 79+ (full support)
- ⚠️ Older browsers fallback to basic opacity effects

## 🔍 Troubleshooting

### Blur not visible?
- Check if parent container has `position: relative`
- Ensure backdrop-filter is supported in browser
- Verify z-index doesn't conflict with other elements

### Animation not working?
- Make sure `animated` prop is set correctly
- Check Intersection Observer support
- Verify container is in viewport for scroll animations

### Responsive issues?
- Ensure `responsive={true}` is set
- Check mobile/tablet/desktop height/width props

## 📝 Changelog

### v2.3.0
- Enhanced target-aware positioning system
- Improved responsive design capabilities
- Added comprehensive preset system
- Fixed React compatibility issues
- Optimized performance and memory usage

### v2.2.0
- Initial release with basic blur functionality
- Support for multiple frameworks
- Basic animation system

## 📄 License

MIT © Ansh Dhanani

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

## 🐛 Bug Reports

Found an issue? Please report it on our GitHub issues page with:
- Browser version
- Framework version
- Steps to reproduce
- Screenshots if possible

## 💡 Examples & Demos

Check out our examples directory for live demos and code samples for different use cases.

---

**GradualBlur** - Beautiful, performant blur effects for modern web applications.
