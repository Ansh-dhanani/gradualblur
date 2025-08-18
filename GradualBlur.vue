<template>
  <div 
    ref="containerRef"
    :class="['gradual-blur', className]"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="gradual-blur-inner" :style="innerStyle">
      <div 
        v-for="(layer, index) in blurLayers" 
        :key="index"
        :style="layer.style"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const PRESETS = {
  hero: { position: 'bottom', strength: 2.5, height: '8rem', divCount: 6, animated: 'fade' },
  navigation: { position: 'top', strength: 1.5, height: '4rem', divCount: 4 },
  modal: { position: 'bottom', strength: 3, height: '100vh', width: '100vw' },
  card: { position: 'bottom', strength: 1.8, height: '3rem', divCount: 4, curve: 'bezier' }
}

export default {
  name: 'GradualBlur',
  props: {
    position: { type: String, default: 'bottom' },
    strength: { type: Number, default: 2 },
    height: { type: String, default: '7rem' },
    width: { type: String, default: '100%' },
    divCount: { type: Number, default: 5 },
    exponential: { type: Boolean, default: false },
    zIndex: { type: Number, default: 1000 },
    animated: { type: [String, Boolean], default: false },
    duration: { type: String, default: '0.3s' },
    easing: { type: String, default: 'ease-out' },
    opacity: { type: Number, default: 1 },
    curve: { type: String, default: 'linear' },
    preset: { type: String, default: null },
    gpuOptimized: { type: Boolean, default: false },
    hoverIntensity: { type: Number, default: null },
    absolute: { type: Boolean, default: true },
    className: { type: String, default: '' }
  },
  emits: ['animationComplete'],
  setup(props, { emit }) {
    const containerRef = ref(null)
    const isVisible = ref(!props.animated || props.animated !== 'scroll')
    const isHovered = ref(false)
    let observer = null

    const finalConfig = computed(() => {
      const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {}
      return {
        position: presetConfig.position || props.position,
        strength: presetConfig.strength || props.strength,
        height: presetConfig.height || props.height,
        width: presetConfig.width || props.width,
        divCount: presetConfig.divCount || props.divCount,
        exponential: presetConfig.exponential !== undefined ? presetConfig.exponential : props.exponential,
        zIndex: presetConfig.zIndex || props.zIndex,
        animated: presetConfig.animated || props.animated,
        duration: presetConfig.duration || props.duration,
        easing: presetConfig.easing || props.easing,

        opacity: presetConfig.opacity !== undefined ? presetConfig.opacity : props.opacity,
        curve: presetConfig.curve || props.curve,
        gpuOptimized: presetConfig.gpuOptimized || props.gpuOptimized,
        hoverIntensity: presetConfig.hoverIntensity || props.hoverIntensity,
        absolute: presetConfig.absolute !== undefined ? presetConfig.absolute : props.absolute
      }
    })

    const getBlurProgression = (i, divCount, curve, exponential, strength) => {
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

    const getGradientDirection = (position) => {
      const directions = {
        top: 'to top',
        bottom: 'to bottom',
        left: 'to left',
        right: 'to right'
      }
      return directions[position] || 'to bottom'
    }

    const blurLayers = computed(() => {
      const layers = []
      const increment = 100 / finalConfig.value.divCount
      const currentStrength = isHovered.value && finalConfig.value.hoverIntensity ? 
        finalConfig.value.strength * finalConfig.value.hoverIntensity : finalConfig.value.strength

      for (let i = 1; i <= finalConfig.value.divCount; i++) {
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
        
        const blurValue = getBlurProgression(i, finalConfig.value.divCount, finalConfig.value.curve, finalConfig.value.exponential, currentStrength)
        const direction = getGradientDirection(finalConfig.value.position)
        
        layers.push({
          style: {
            position: 'absolute',
            inset: '0',
            maskImage: `linear-gradient(${direction}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity: finalConfig.value.opacity,
            transition: finalConfig.value.animated && finalConfig.value.animated !== 'scroll' ? 
              `backdrop-filter ${finalConfig.value.duration} ${finalConfig.value.easing}` : undefined
          }
        })
      }
      
      return layers
    })

    const containerStyle = computed(() => {
      const style = {
        height: finalConfig.value.height,
        width: finalConfig.value.width,
        position: finalConfig.value.absolute ? 'fixed' : 'relative',
        pointerEvents: finalConfig.value.hoverIntensity ? 'auto' : 'none',
        opacity: isVisible.value ? 1 : 0
      }
      
      if (finalConfig.value.absolute) {
        style[finalConfig.value.position] = '0'
        style[finalConfig.value.position === 'left' || finalConfig.value.position === 'right' ? 'top' : 'left'] = '0'
        style.zIndex = finalConfig.value.zIndex
      }
      
      if (finalConfig.value.animated) {
        style.transition = `opacity ${finalConfig.value.duration} ${finalConfig.value.easing}`
      }
      

      
      if (finalConfig.value.gpuOptimized) {
        style.willChange = 'transform, opacity'
        style.transform = 'translateZ(0)'
      }
      
      return style
    })

    const innerStyle = computed(() => ({
      position: 'relative',
      width: '100%',
      height: '100%'
    }))

    const handleMouseEnter = () => {
      if (finalConfig.value.hoverIntensity) {
        isHovered.value = true
      }
    }

    const handleMouseLeave = () => {
      if (finalConfig.value.hoverIntensity) {
        isHovered.value = false
      }
    }

    onMounted(() => {
      if (finalConfig.value.animated === 'scroll' && containerRef.value) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isVisible.value = entry.isIntersecting
              if (entry.isIntersecting) {
                setTimeout(() => emit('animationComplete'), parseFloat(finalConfig.value.duration) * 1000)
              }
            })
          },
          { threshold: 0.1 }
        )
        
        observer.observe(containerRef.value)
      }
    })

    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
    })

    return {
      containerRef,
      blurLayers,
      containerStyle,
      innerStyle,
      handleMouseEnter,
      handleMouseLeave
    }
  }
}
</script>