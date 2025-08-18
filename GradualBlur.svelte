<script>
  import { onMount, onDestroy } from 'svelte'

  // Props
  export let position = 'bottom'
  export let strength = 2
  export let height = '7rem'
  export let width = '100%'
  export let divCount = 5
  export let exponential = false
  export let zIndex = 1000
  export let animated = false
  export let duration = '0.3s'
  export let easing = 'ease-out'
  export let tint = null
  export let opacity = 1
  export let curve = 'linear'
  export let preset = null
  export let gpuOptimized = false
  export let hoverIntensity = null
  export let className = ''

  // Events
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const PRESETS = {
    hero: { position: 'bottom', strength: 2.5, height: '8rem', divCount: 6, animated: 'fade' },
    navigation: { position: 'top', strength: 1.5, height: '4rem', divCount: 4, tint: 'rgba(255,255,255,0.1)' },
    modal: { position: 'bottom', strength: 3, height: '100vh', width: '100vw', tint: 'rgba(0,0,0,0.2)' },
    card: { position: 'bottom', strength: 1.8, height: '3rem', divCount: 4, curve: 'bezier' }
  }

  let containerRef
  let isVisible = !animated || animated !== 'scroll'
  let isHovered = false
  let observer

  // Apply preset configuration
  $: finalConfig = preset && PRESETS[preset] ? { ...PRESETS[preset], position, strength, height, width, divCount, exponential, zIndex, animated, duration, easing, tint, opacity, curve, gpuOptimized, hoverIntensity } : { position, strength, height, width, divCount, exponential, zIndex, animated, duration, easing, tint, opacity, curve, gpuOptimized, hoverIntensity }

  function getBlurProgression(i, divCount, curve, exponential, strength) {
    let progress = i / divCount
    
    switch (curve) {
      case 'bezier':
        progress = progress * progress * (3 - 2 * progress)
        break
      case 'ease-in-out':
        progress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
        break
    }
    
    if (exponential) {
      return Math.pow(2, progress * 4) * 0.0625 * strength
    }
    return 0.0625 * (progress * divCount + 1) * strength
  }

  function getGradientDirection(position) {
    const directions = {
      top: 'to top',
      bottom: 'to bottom',
      left: 'to left',
      right: 'to right'
    }
    return directions[position] || 'to bottom'
  }

  $: blurLayers = (() => {
    const layers = []
    const increment = 100 / finalConfig.divCount
    const currentStrength = isHovered && finalConfig.hoverIntensity ? 
      finalConfig.strength * finalConfig.hoverIntensity : finalConfig.strength

    for (let i = 1; i <= finalConfig.divCount; i++) {
      const c1 = 'transparent'
      const c2 = 'black'
      
      const p1 = Math.round((increment * i - increment) * 10) / 10
      const p2 = Math.round((increment * i) * 10) / 10
      const p3 = Math.round((increment * i + increment) * 10) / 10
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10
      
      let gradient = `${c1} ${p1}%, ${c2} ${p2}%`
      
      if (p3 <= 100) {
        gradient = `${c1} ${p1}%, ${c2} ${p2}%, ${c2} ${p3}%`
      }
      
      if (p4 <= 100) {
        gradient = `${c1} ${p1}%, ${c2} ${p2}%, ${c2} ${p3}%, ${c1} ${p4}%`
      }
      
      const blurValue = getBlurProgression(i, finalConfig.divCount, finalConfig.curve, finalConfig.exponential, currentStrength)
      const direction = getGradientDirection(finalConfig.position)
      
      layers.push({
        style: `
          position: absolute;
          inset: 0;
          mask-image: linear-gradient(${direction}, ${gradient});
          -webkit-mask-image: linear-gradient(${direction}, ${gradient});
          backdrop-filter: blur(${blurValue.toFixed(3)}rem);
          opacity: ${finalConfig.opacity};
          ${finalConfig.animated && finalConfig.animated !== 'scroll' ? 
            `transition: backdrop-filter ${finalConfig.duration} ${finalConfig.easing};` : ''}
        `
      })
    }
    
    return layers
  })()

  $: containerStyle = `
    height: ${finalConfig.height};
    width: ${finalConfig.width};
    position: fixed;
    ${finalConfig.position}: 0;
    ${finalConfig.position === 'left' || finalConfig.position === 'right' ? 'top' : 'left'}: 0;
    z-index: ${finalConfig.zIndex};
    pointer-events: ${finalConfig.hoverIntensity ? 'auto' : 'none'};
    opacity: ${isVisible ? 1 : 0};
    ${finalConfig.animated ? `transition: opacity ${finalConfig.duration} ${finalConfig.easing};` : ''}
    ${finalConfig.tint ? `background: ${finalConfig.tint};` : ''}
    ${finalConfig.gpuOptimized ? 'will-change: transform, opacity; transform: translateZ(0);' : ''}
  `

  function handleMouseEnter() {
    if (finalConfig.hoverIntensity) {
      isHovered = true
    }
  }

  function handleMouseLeave() {
    if (finalConfig.hoverIntensity) {
      isHovered = false
    }
  }

  onMount(() => {
    if (finalConfig.animated === 'scroll' && containerRef) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting
            if (entry.isIntersecting) {
              setTimeout(() => dispatch('animationComplete'), parseFloat(finalConfig.duration) * 1000)
            }
          })
        },
        { threshold: 0.1 }
      )
      
      observer.observe(containerRef)
    }
  })

  onDestroy(() => {
    if (observer) {
      observer.disconnect()
    }
  })
</script>

<div 
  bind:this={containerRef}
  class="gradual-blur {className}"
  style={containerStyle}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <div class="gradual-blur-inner" style="position: relative; width: 100%; height: 100%;">
    {#each blurLayers as layer, i}
      <div style={layer.style}></div>
    {/each}
  </div>
</div>