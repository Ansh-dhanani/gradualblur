#!/usr/bin/env node

const { Command } = require('commander');
const { generateBlurCSS, generateBlurHTML } = require('../lib/blur-generator');

const program = new Command();

program
  .name('gradual-blur')
  .description('Generate CSS for advanced gradual blur effects')
  .version('2.0.0')
  .addHelpText('after', `
Examples:
  $ gradual-blur                                    # Basic usage
  $ gradual-blur --preset hero                     # Hero section preset
  $ gradual-blur --animated scroll                 # Scroll-triggered animation
  $ gradual-blur --tint "rgba(0,0,0,0.3)"          # With color tint
  $ gradual-blur --responsive --mobile-height 3rem # Responsive design
  $ gradual-blur --curve bezier --zones top,bottom # Advanced options`);

program
  .option('-p, --position <position>', 'Position of blur (top|bottom|left|right)', 'bottom')
  .option('-s, --strength <number>', 'Blur strength multiplier', '2')
  .option('-h, --height <height>', 'Height of blur effect', '7rem')
  .option('-w, --width <width>', 'Width of blur effect', '100%')
  .option('-d, --divs <number>', 'Number of blur divisions', '5')
  .option('-z, --zindex <number>', 'Z-index value', '1000')
  .option('-e, --exponential', 'Use exponential blur progression', false)
  .option('-o, --output <file>', 'Output CSS to file')
  .option('--html', 'Generate HTML structure instead of CSS')
  
  // Animation options
  .option('--animated [trigger]', 'Add animations (scroll|hover|fade)', false)
  .option('--duration <time>', 'Animation duration', '0.3s')
  .option('--easing <function>', 'Animation easing function', 'ease-out')
  
  // Color and styling
  .option('--tint <color>', 'Add color tint overlay')
  .option('--opacity <number>', 'Blur layer opacity', '1')
  .option('--curve <type>', 'Blur progression curve (linear|bezier|ease-in-out)', 'linear')
  
  // Responsive options
  .option('--responsive', 'Enable responsive breakpoints', false)
  .option('--mobile-height <height>', 'Height on mobile devices', '4rem')
  .option('--tablet-height <height>', 'Height on tablet devices', '6rem')
  .option('--desktop-height <height>', 'Height on desktop devices')
  
  // Advanced features
  .option('--preset <name>', 'Use preset configuration (hero|navigation|modal|card)')
  .option('--zones <positions>', 'Multiple blur zones (comma-separated)')
  .option('--gpu-optimized', 'Add GPU optimization hints', false)
  .option('--reduced-motion', 'Respect prefers-reduced-motion', false)
  .option('--hover-intensity <number>', 'Blur intensity on hover', '1.5')
  
  .action((options) => {
    const config = {
      position: options.position,
      strength: parseFloat(options.strength),
      height: options.height,
      width: options.width,
      divCount: parseInt(options.divs),
      zIndex: parseInt(options.zindex) || 1000,
      exponential: options.exponential,
      
      // Animation
      animated: options.animated,
      duration: options.duration,
      easing: options.easing,
      
      // Styling
      tint: options.tint,
      opacity: parseFloat(options.opacity),
      curve: options.curve,
      
      // Responsive
      responsive: options.responsive,
      mobileHeight: options.mobileHeight,
      tabletHeight: options.tabletHeight,
      desktopHeight: options.desktopHeight,
      
      // Advanced
      preset: options.preset,
      zones: options.zones ? options.zones.split(',') : null,
      gpuOptimized: options.gpuOptimized,
      reducedMotion: options.reducedMotion,
      hoverIntensity: parseFloat(options.hoverIntensity)
    };

    const output = options.html ? generateBlurHTML(config) : generateBlurCSS(config);
    
    if (options.output) {
      const fs = require('fs');
      fs.writeFileSync(options.output, output);
      console.log(`${options.html ? 'HTML' : 'CSS'} written to ${options.output}`);
    } else {
      console.log(output);
    }
  });

program.parse();