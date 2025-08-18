// React Component (default export)
export { default } from './Gradualblur.jsx';

// Vanilla JS Class
export { default as GradualBlurJS } from './gradual-blur.js';

// Generator Functions
export { generateBlurCSS, generateBlurHTML } from './lib/blur-generator.js';

// Framework Components (import separately to avoid bundler issues)
// Vue: import GradualBlur from 'gradualblur/GradualBlur.vue'
// Svelte: import GradualBlur from 'gradualblur/GradualBlur.svelte'