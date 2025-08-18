#!/usr/bin/env node

const { Command } = require('commander');
const { generateBlurCSS, generateBlurHTML } = require('../lib/blur-generator');

const program = new Command();

program
  .name('gradual-blur')
  .description('Generate CSS for gradual blur effects')
  .version('1.0.0')
  .addHelpText('after', `
Examples:
  $ gradual-blur                                    # Basic usage
  $ gradual-blur --position top --strength 3       # Top blur with custom strength
  $ gradual-blur --width 50% --zindex 999         # Custom width and z-index
  $ gradual-blur --exponential --output blur.css   # Exponential blur to file
  $ gradual-blur --html                            # Generate HTML structure`);

program
  .option('-p, --position <position>', 'Position of blur (top|bottom)', 'bottom')
  .option('-s, --strength <number>', 'Blur strength multiplier', '2')
  .option('-h, --height <height>', 'Height of blur effect', '7rem')
  .option('-w, --width <width>', 'Width of blur effect', '100%')
  .option('-d, --divs <number>', 'Number of blur divisions', '5')
  .option('-z, --zindex <number>', 'Z-index value', '1000')
  .option('-e, --exponential', 'Use exponential blur progression', false)
  .option('-o, --output <file>', 'Output CSS to file')
  .option('--html', 'Generate HTML structure instead of CSS')
  .action((options) => {
    const config = {
      position: options.position,
      strength: parseFloat(options.strength),
      height: options.height,
      width: options.width,
      divCount: parseInt(options.divs),
      zIndex: parseInt(options.zindex) || 1000,
      exponential: options.exponential
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