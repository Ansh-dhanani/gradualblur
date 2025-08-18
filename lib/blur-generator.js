const math = require('mathjs');

function generateBlurCSS(config) {
  const {
    position = 'bottom',
    strength = 2,
    height = '7rem',
    width = '100%',
    divCount = 5,
    zIndex = 1000,
    exponential = false
  } = config;

  const increment = 100 / divCount;
  let css = '';
  
  // Generate container CSS
  css += `.gradual-blur {\n`;
  css += `  height: ${height};\n`;
  css += `  left: 0;\n`;
  css += `  pointer-events: none;\n`;
  css += `  position: fixed;\n`;
  css += `  ${position}: 0;\n`;
  css += `  width: ${width};\n`;
  css += `  z-index: ${zIndex};\n`;
  css += `}\n\n`;

  css += `.gradual-blur-inner {\n`;
  css += `  position: relative;\n`;
  css += `  width: 100%;\n`;
  css += `  height: 100%;\n`;
  css += `}\n\n`;

  // Generate blur divs
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
    
    let blurValue;
    if (exponential) {
      blurValue = math.pow(2, i - 1) * 0.0625 * strength;
    } else {
      blurValue = 0.0625 * i * strength;
    }
    
    const direction = position === 'top' ? 'to top' : 'to bottom';
    
    css += `.gradual-blur-layer-${i} {\n`;
    css += `  position: absolute;\n`;
    css += `  inset: 0;\n`;
    css += `  mask-image: linear-gradient(${direction}, ${gradient});\n`;
    css += `  -webkit-mask-image: linear-gradient(${direction}, ${gradient});\n`;
    css += `  backdrop-filter: blur(${blurValue}rem);\n`;
    css += `}\n\n`;
  }

  // Generate HTML structure comment
  css += `/*\nHTML Structure:\n<div class="gradual-blur">\n  <div class="gradual-blur-inner">\n`;
  for (let i = 1; i <= divCount; i++) {
    css += `    <div class="gradual-blur-layer-${i}"></div>\n`;
  }
  css += `  </div>\n</div>\n*/`;

  return css;
}

function generateBlurHTML(config) {
  const { divCount = 5 } = config;
  
  let html = '<div class="gradual-blur">\n  <div class="gradual-blur-inner">\n';
  for (let i = 1; i <= divCount; i++) {
    html += `    <div class="gradual-blur-layer-${i}"></div>\n`;
  }
  html += '  </div>\n</div>';
  
  return html;
}

module.exports = { generateBlurCSS, generateBlurHTML };