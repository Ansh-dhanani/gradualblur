<script>
  // INSTALLATION
  // npm install gradualblur
  
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
  export let opacity = 1
  export let curve = 'linear'
  export let preset = null
  export let gpuOptimized = false
  export let hoverIntensity = null
  export let absolute = true
  export let className = ''

  // Events
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const PRESETS = {
    top: { position: 'top', strength: 2, height: '6rem', divCount: 5 },
    bottom: { position: 'bottom', strength: 2, height: '6rem', divCount: 5 },
    left: { position: 'left', strength: 2, height: '6rem', divCount: 5 },
    right: { position: 'right', strength: 2, height: '6rem', divCount: 5 },
    subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
    intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
    smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
    sharp: { height: '5rem', curve: 'linear', divCount: 4 },
    header: { position: 'top', height: '8rem', curve: 'ease-out' },
    footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
    sidebar: { position: 'left', height: '6rem', strength: 2.5 },
    'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
    'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
  }

  let containerRef
  let isVisible = !animated || animated !== 'scroll'
  let isHovered = false
  let observer

  // Apply preset configuration
  $: presetConfig = preset && PRESETS[preset] ? PRESETS[preset] : {}
  
  $: finalConfig = {
    position: presetConfig.position || position,
    strength: presetConfig.strength || strength,
    height: presetConfig.height || height,
    width: presetConfig.width || width,
    divCount: presetConfig.divCount || divCount,
    exponential: presetConfig.exponential !== undefined ? presetConfig.exponential : exponential,
    zIndex: presetConfig.zIndex || zIndex,
    animated: presetConfig.animated || animated,
    duration: presetConfig.duration || duration,
    easing: presetConfig.easing || easing,

    opacity: presetConfig.opacity !== undefined ? presetConfig.opacity : opacity,
    curve: presetConfig.curve || curve,
    gpuOptimized: presetConfig.gpuOptimized || gpuOptimized,
    hoverIntensity: presetConfig.hoverIntensity || hoverIntensity,
    absolute: presetConfig.absolute !== undefined ? presetConfig.absolute : absolute
  }

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

  $: blurLayers = getBlurLayers(finalConfig, isHovered)
  
  function getBlurLayers(config, hovered) {
    const layers = []
    const increment = 100 / config.divCount
    const currentStrength = hovered && config.hoverIntensity ? 
      config.strength * config.hoverIntensity : config.strength

    for (let i = 1; i <= config.divCount; i++) {
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
      
      const blurValue = getBlurProgression(i, config.divCount, config.curve, config.exponential, currentStrength)
      const direction = getGradientDirection(config.position)
      
      layers.push({
        style: `position: absolute; inset: 0; mask-image: linear-gradient(${direction}, ${gradient}); -webkit-mask-image: linear-gradient(${direction}, ${gradient}); backdrop-filter: blur(${blurValue.toFixed(3)}rem); opacity: ${config.opacity}; ${config.animated && config.animated !== 'scroll' ? `transition: backdrop-filter ${config.duration} ${config.easing};` : ''}`
      })
    }
    
    return layers
  }

  $: containerStyle = [
    `height: ${finalConfig.height}`,
    `width: ${finalConfig.width}`,
    `position: ${finalConfig.absolute ? 'fixed' : 'relative'}`,
    finalConfig.absolute ? `${finalConfig.position}: 0` : '',
    finalConfig.absolute ? `${finalConfig.position === 'left' || finalConfig.position === 'right' ? 'top' : 'left'}: 0` : '',
    finalConfig.absolute ? `z-index: ${finalConfig.zIndex}` : '',
    `pointer-events: ${finalConfig.hoverIntensity ? 'auto' : 'none'}`,
    `opacity: ${isVisible ? 1 : 0}`,
    finalConfig.animated ? `transition: opacity ${finalConfig.duration} ${finalConfig.easing}` : '',

    finalConfig.gpuOptimized ? 'will-change: transform, opacity; transform: translateZ(0)' : ''
  ].filter(Boolean).join('; ')

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
  role="presentation"
>
  <div class="gradual-blur-inner" style="position: relative; width: 100%; height: 100%;">
    {#each blurLayers as layer, i}
      <div style={layer.style}></div>
    {/each}
  </div>
</div>