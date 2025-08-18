# Gradual Blur CLI

A command-line tool to generate CSS for beautiful gradual blur effects.

## Installation

```bash
# For CLI usage
npm install -g gradual-blur-cli

# For React/TypeScript projects
npm install gradual-blur-cli
```

## Usage

### React/TypeScript Component

```jsx
import GradualBlur from 'gradual-blur-cli';

function App() {
  return (
    <div>
      {/* Default blur at bottom */}
      <GradualBlur />
      
      {/* Custom blur at top */}
      <GradualBlur 
        position="top" 
        strength={3} 
        height="10rem" 
      />
    </div>
  );
}
```

### CLI Tool

```bash
gradual-blur [options]
```

### Options

- `-p, --position <position>` - Position of blur effect (`top` or `bottom`, default: `bottom`)
- `-s, --strength <number>` - Blur strength multiplier (default: `2`)
- `-h, --height <height>` - Height of blur effect (default: `7rem`)
- `-d, --divs <number>` - Number of blur divisions (default: `5`)
- `-e, --exponential` - Use exponential blur progression (default: linear)
- `-o, --output <file>` - Output CSS to file (default: stdout)

### Examples

```bash
# Basic usage - outputs CSS to console
gradual-blur

# Generate top blur with custom strength
gradual-blur --position top --strength 3

# Generate blur with exponential progression and save to file
gradual-blur --exponential --output blur.css

# Custom height and divisions
gradual-blur --height 10rem --divs 8 --strength 1.5
```

### Output

The tool generates CSS classes that you can use in your HTML:

```html
<div class="gradual-blur">
  <div class="gradual-blur-inner">
    <div class="gradual-blur-layer-1"></div>
    <div class="gradual-blur-layer-2"></div>
    <div class="gradual-blur-layer-3"></div>
    <div class="gradual-blur-layer-4"></div>
    <div class="gradual-blur-layer-5"></div>
  </div>
</div>
```

## Parameters Explained

- **Position**: `top` places blur at top of screen, `bottom` at bottom
- **Strength**: Multiplier for blur intensity (higher = more blur)
- **Height**: CSS height value for the blur container
- **Divs**: Number of blur layers (more = smoother gradient)
- **Exponential**: Creates more dramatic blur progression

## License

MIT