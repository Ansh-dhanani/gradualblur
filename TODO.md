# Circle Position Implementation TODO

## Tasks to Complete:

- [x] 1. Update TypeScript definitions (index.d.ts) - Add 'circle' to Position type
- [x] 2. Update React component (Gradualblur.jsx) - Add circle gradient logic
- [x] 3. Update Vue component (GradualBlur.vue) - Add circle gradient logic  
- [x] 4. Update Svelte component (GradualBlur.svelte) - Add circle gradient logic
- [x] 5. Update Vanilla JS (gradual-blur.js) - Add circle gradient logic
- [ ] 6. Update blur generator (lib/blur-generator.js) - Add circle CSS generation
- [ ] 7. Add circle preset to all components
- [ ] 8. Test implementation

## Circle Implementation Details:
- Use radial gradients instead of linear gradients
- Gradient should be: `radial-gradient(circle, transparent X%, black Y%)`
- Center the gradient at 50% 50%
- Blur should radiate outward from center in all directions
