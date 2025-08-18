# GradualBlur

🌊 Generate beautiful gradual blur effects for your web projects. Creates smooth backdrop-filter blur transitions that fade from transparent to blurred.

## Installation

```bash
# Install globally for CLI usage
npm install -g gradualblur

# Or install locally for React projects
npm install gradualblur
```

## CLI Usage

### Basic Command
```bash
gradual-blur
```

This generates CSS for a gradual blur effect at the bottom of the screen.

### Options

| Option | Description | Default |
|--------|-------------|----------|
| `-p, --position <position>` | Position (`top` or `bottom`) | `bottom` |
| `-s, --strength <number>` | Blur strength multiplier | `2` |
| `-h, --height <height>` | Height of blur area | `7rem` |
| `-w, --width <width>` | Width of blur area | `100%` |
| `-d, --divs <number>` | Number of blur layers | `5` |
| `-z, --zindex <number>` | CSS z-index value | `1000` |
| `-e, --exponential` | Use exponential blur progression | `false` |
| `-o, --output <file>` | Save CSS to file | stdout |
| `--html` | Generate HTML structure | `false` |

### Examples

```bash
# Basic bottom blur
gradual-blur

# Top blur with custom strength
gradual-blur --position top --strength 3

# Save to file with exponential progression
gradual-blur --exponential --output blur.css

# Custom dimensions and z-index
gradual-blur --height 10rem --width 50% --zindex 999

# Get HTML structure
gradual-blur --html
```

## How It Works

The tool generates CSS using `backdrop-filter: blur()` with multiple layers and mask gradients to create a smooth transition from no blur to full blur.

### Generated CSS Structure

```css
.gradual-blur {
  /* Fixed positioned container */
  position: fixed;
  height: 7rem;
  width: 100%;
  bottom: 0; /* or top: 0 */
  z-index: 1000;
  pointer-events: none;
}

.gradual-blur-layer-1,
.gradual-blur-layer-2,
/* ... more layers */ {
  position: absolute;
  backdrop-filter: blur(0.125rem); /* increasing blur */
  mask-image: linear-gradient(/* smooth transitions */);
}
```

### HTML Usage

1. Generate the CSS:
```bash
gradual-blur --output blur.css
```

2. Include in your HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="blur.css">
</head>
<body>
  <!-- Your content -->
  
  <!-- Add blur overlay -->
  <div class="gradual-blur">
    <div class="gradual-blur-inner">
      <div class="gradual-blur-layer-1"></div>
      <div class="gradual-blur-layer-2"></div>
      <div class="gradual-blur-layer-3"></div>
      <div class="gradual-blur-layer-4"></div>
      <div class="gradual-blur-layer-5"></div>
    </div>
  </div>
</body>
</html>
```

## React Component

```jsx
import GradualBlur from 'gradualblur';

function App() {
  return (
    <div>
      {/* Your content */}
      
      {/* Default bottom blur */}
      <GradualBlur />
      
      {/* Custom top blur */}
      <GradualBlur 
        position="top" 
        strength={3} 
        height="10rem" 
      />
    </div>
  );
}
```

## Use Cases

- **Navigation overlays** - Blur content behind floating navigation
- **Modal backgrounds** - Create depth with blurred backgrounds
- **Hero sections** - Fade content into blurred edges
- **Scroll effects** - Blur content as it approaches screen edges
- **Image overlays** - Add text readability over images

## Browser Support

Requires `backdrop-filter` support:
- Chrome 76+
- Firefox 103+
- Safari 9+
- Edge 79+

## License

MIT © Ansh Dhanani