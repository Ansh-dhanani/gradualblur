const math = require('mathjs');

// Preset configurations
const PRESETS = {
  hero: { position: 'bottom', strength: 2.5, height: '8rem', divCount: 6, animated: 'fade' },
  navigation: { position: 'top', strength: 1.5, height: '4rem', divCount: 4, tint: 'rgba(255,255,255,0.1)' },
  modal: { position: 'bottom', strength: 3, height: '100vh', width: '100vw', tint: 'rgba(0,0,0,0.2)' },
  card: { position: 'bottom', strength: 1.8, height: '3rem', divCount: 4, curve: 'bezier' }
};

function applyPreset(config) {
  if (config.preset && PRESETS[config.preset]) {
    return { ...PRESETS[config.preset], ...config };
  }
  return config;
}

function getBlurProgression(i, divCount, curve, exponential, strength) {
  let progress = i / divCount;
  
  switch (curve) {
    case 'bezier':
      progress = progress * progress * (3 - 2 * progress); // Smooth step
      break;
    case 'ease-in-out':
      progress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      break;
    default:
      break;
  }
  
  if (exponential) {
    return math.pow(2, progress * 4) * 0.0625 * strength;
  }
  return 0.0625 * (progress * divCount + 1) * strength;
}

function getGradientDirection(position) {
  const directions = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  };
  return directions[position] || 'to bottom';
}

function generateBlurCSS(config) {
  config = applyPreset(config);
  
  const {
    position = 'bottom',
    strength = 2,
    height = '7rem',
    width = '100%',
    divCount = 5,
    zIndex = 1000,
    exponential = false,
    animated = false,
    duration = '0.3s',
    easing = 'ease-out',
    tint,
    opacity = 1,
    curve = 'linear',
    responsive = false,
    mobileHeight,
    tabletHeight,
    desktopHeight,
    zones,
    gpuOptimized = false,
    reducedMotion = false,
    hoverIntensity
  } = config;

  let css = '';
  
  // Handle multiple zones
  const positions = zones || [position];
  
  positions.forEach((pos, zoneIndex) => {
    const suffix = zones ? `-${pos}` : '';
    const increment = 100 / divCount;
    
    // Generate container CSS
    css += `.gradual-blur${suffix} {\n`;
    css += `  height: ${height};\n`;
    css += `  width: ${width};\n`;
    css += `  position: fixed;\n`;
    css += `  ${pos}: 0;\n`;
    css += `  ${pos === 'left' || pos === 'right' ? 'top' : 'left'}: 0;\n`;
    css += `  z-index: ${zIndex + zoneIndex};\n`;
    css += `  pointer-events: none;\n`;
    
    if (gpuOptimized) {
      css += `  will-change: transform, opacity;\n`;
      css += `  transform: translateZ(0);\n`;
    }
    
    if (animated) {
      css += `  transition: opacity ${duration} ${easing};\n`;
      if (animated === 'scroll') {
        css += `  opacity: 0;\n`;
      }
    }
    
    if (tint) {
      css += `  background: ${tint};\n`;
    }
    
    css += `}\n\n`;

    // Responsive breakpoints
    if (responsive) {
      if (mobileHeight) {
        css += `@media (max-width: 768px) {\n`;
        css += `  .gradual-blur${suffix} { height: ${mobileHeight}; }\n`;
        css += `}\n\n`;
      }
      if (tabletHeight) {
        css += `@media (min-width: 769px) and (max-width: 1024px) {\n`;
        css += `  .gradual-blur${suffix} { height: ${tabletHeight}; }\n`;
        css += `}\n\n`;
      }
      if (desktopHeight) {
        css += `@media (min-width: 1025px) {\n`;
        css += `  .gradual-blur${suffix} { height: ${desktopHeight}; }\n`;
        css += `}\n\n`;
      }
    }

    css += `.gradual-blur-inner${suffix} {\n`;
    css += `  position: relative;\n`;
    css += `  width: 100%;\n`;
    css += `  height: 100%;\n`;
    css += `}\n\n`;

    // Generate blur layers
    for (let i = 1; i <= divCount; i++) {
      const c1 = 'transparent';
      const c2 = 'black';
      
      const p1 = math.round((increment * i - increment) * 10) / 10;
      const p2 = math.round((increment * i) * 10) / 10;
      const p3 = math.round((increment * i + increment) * 10) / 10;
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;
      
      let gradient = `${c1} ${p1}%, ${c2} ${p2}%`;
      
      if (p3 <= 100) {
        gradient = `${c1} ${p1}%, ${c2} ${p2}%, ${c2} ${p3}%`;
      }
      
      if (p4 <= 100) {
        gradient = `${c1} ${p1}%, ${c2} ${p2}%, ${c2} ${p3}%, ${c1} ${p4}%`;
      }
      
      const blurValue = getBlurProgression(i, divCount, curve, exponential, strength);
      const direction = getGradientDirection(pos);
      
      css += `.gradual-blur-layer-${i}${suffix} {\n`;
      css += `  position: absolute;\n`;
      css += `  inset: 0;\n`;
      css += `  mask-image: linear-gradient(${direction}, ${gradient});\n`;
      css += `  -webkit-mask-image: linear-gradient(${direction}, ${gradient});\n`;
      css += `  backdrop-filter: blur(${blurValue.toFixed(3)}rem);\n`;
      css += `  opacity: ${opacity};\n`;
      
      if (animated && animated !== 'scroll') {
        css += `  transition: backdrop-filter ${duration} ${easing};\n`;
      }
      
      css += `}\n\n`;
    }

    // Hover effects
    if (hoverIntensity && animated === 'hover') {
      css += `.gradual-blur${suffix}:hover .gradual-blur-layer-1${suffix},\n`;
      for (let i = 2; i <= divCount; i++) {
        css += `.gradual-blur${suffix}:hover .gradual-blur-layer-${i}${suffix}${i === divCount ? '' : ','}\n`;
      }
      css += ` {\n`;
      for (let i = 1; i <= divCount; i++) {
        const blurValue = getBlurProgression(i, divCount, curve, exponential, strength * hoverIntensity);
        css += `}\n.gradual-blur${suffix}:hover .gradual-blur-layer-${i}${suffix} {\n`;
        css += `  backdrop-filter: blur(${blurValue.toFixed(3)}rem);\n`;
      }
      css += `}\n\n`;
    }
  });

  // Animation keyframes
  if (animated === 'fade') {
    css += `@keyframes gradual-blur-fade-in {\n`;
    css += `  from { opacity: 0; }\n`;
    css += `  to { opacity: 1; }\n`;
    css += `}\n\n`;
    
    css += `.gradual-blur-animated {\n`;
    css += `  animation: gradual-blur-fade-in ${duration} ${easing};\n`;
    css += `}\n\n`;
  }

  // Scroll trigger CSS
  if (animated === 'scroll') {
    css += `.gradual-blur-visible {\n`;
    css += `  opacity: 1 !important;\n`;
    css += `}\n\n`;
  }

  // Reduced motion support
  if (reducedMotion) {
    css += `@media (prefers-reduced-motion: reduce) {\n`;
    css += `  .gradual-blur, .gradual-blur * {\n`;
    css += `    animation-duration: 0.01ms !important;\n`;
    css += `    animation-iteration-count: 1 !important;\n`;
    css += `    transition-duration: 0.01ms !important;\n`;
    css += `  }\n`;
    css += `}\n\n`;
  }

  // Generate HTML structure comment
  css += `/*\nHTML Structure:\n`;
  positions.forEach(pos => {
    const suffix = zones ? `-${pos}` : '';
    css += `<div class="gradual-blur${suffix}${animated === 'fade' ? ' gradual-blur-animated' : ''}">\n`;
    css += `  <div class="gradual-blur-inner${suffix}">\n`;
    for (let i = 1; i <= divCount; i++) {
      css += `    <div class="gradual-blur-layer-${i}${suffix}"></div>\n`;
    }
    css += `  </div>\n</div>\n\n`;
  });
  
  if (animated === 'scroll') {
    css += `JavaScript for scroll trigger:\nconst observer = new IntersectionObserver(entries => {\n`;
    css += `  entries.forEach(entry => {\n`;
    css += `    entry.target.classList.toggle('gradual-blur-visible', entry.isIntersecting);\n`;
    css += `  });\n});\n`;
    css += `document.querySelectorAll('.gradual-blur').forEach(el => observer.observe(el));\n`;
  }
  
  css += `*/`;

  return css;
}

function generateBlurHTML(config) {
  config = applyPreset(config);
  const { divCount = 5, zones, animated } = config;
  const positions = zones || [config.position || 'bottom'];
  
  let html = '';
  
  positions.forEach(pos => {
    const suffix = zones ? `-${pos}` : '';
    html += `<div class="gradual-blur${suffix}${animated === 'fade' ? ' gradual-blur-animated' : ''}">${zones ? '' : '\n'}  <div class="gradual-blur-inner${suffix}">\n`;
    for (let i = 1; i <= divCount; i++) {
      html += `    <div class="gradual-blur-layer-${i}${suffix}"></div>\n`;
    }
    html += `  </div>\n</div>${zones && pos !== positions[positions.length - 1] ? '\n\n' : ''}`;
  });
  
  return html;
}

module.exports = { generateBlurCSS, generateBlurHTML };