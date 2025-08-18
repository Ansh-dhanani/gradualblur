/**
 * GradualBlur - Vanilla JavaScript Plugin
 * Creates beautiful gradual blur effects with advanced features
 */

class GradualBlur {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element
    if (!this.element) {
      throw new Error('GradualBlur: Element not found')
    }

    // Default configuration
    this.defaults = {
      position: 'bottom',
      strength: 2,
      height: '7rem',
      width: '100%',
      divCount: 5,
      exponential: false,
      zIndex: 1000,
      animated: false,
      duration: '0.3s',
      easing: 'ease-out',
      tint: null,
      opacity: 1,
      curve: 'linear',
      preset: null,
      gpuOptimized: false,
      hoverIntensity: null,
      responsive: false,
      mobileHeight: null,
      tabletHeight: null,
      desktopHeight: null,
      reducedMotion: false
    }

    // Presets
    this.presets = {
      hero: { position: 'bottom', strength: 2.5, height: '8rem', divCount: 6, animated: 'fade' },
      navigation: { position: 'top', strength: 1.5, height: '4rem', divCount: 4, tint: 'rgba(255,255,255,0.1)' },
      modal: { position: 'bottom', strength: 3, height: '100vh', width: '100vw', tint: 'rgba(0,0,0,0.2)' },
      card: { position: 'bottom', strength: 1.8, height: '3rem', divCount: 4, curve: 'bezier' }
    }

    // Apply preset if specified
    const presetConfig = options.preset && this.presets[options.preset] ? this.presets[options.preset] : {}
    this.config = { ...this.defaults, ...presetConfig, ...options }

    this.isVisible = !this.config.animated || this.config.animated !== 'scroll'
    this.isHovered = false
    this.observer = null

    this.init()
  }

  init() {
    this.createStructure()
    this.applyStyles()
    this.setupEventListeners()
    this.setupAnimations()
  }

  createStructure() {
    // Clear existing content
    this.element.innerHTML = ''
    
    // Create inner container
    this.innerContainer = document.createElement('div')
    this.innerContainer.className = 'gradual-blur-inner'
    this.innerContainer.style.cssText = 'position: relative; width: 100%; height: 100%;'
    
    // Create blur layers
    this.layers = []
    for (let i = 1; i <= this.config.divCount; i++) {
      const layer = document.createElement('div')
      layer.className = `gradual-blur-layer-${i}`
      this.layers.push(layer)
      this.innerContainer.appendChild(layer)
    }
    
    this.element.appendChild(this.innerContainer)
  }

  applyStyles() {
    // Container styles
    const containerStyles = {
      height: this.getResponsiveHeight(),
      width: this.config.width,
      position: 'fixed',
      [this.config.position]: '0',
      [this.config.position === 'left' || this.config.position === 'right' ? 'top' : 'left']: '0',
      zIndex: this.config.zIndex,
      pointerEvents: this.config.hoverIntensity ? 'auto' : 'none',
      opacity: this.isVisible ? 1 : 0,
      transition: this.config.animated ? `opacity ${this.config.duration} ${this.config.easing}` : '',
      background: this.config.tint || '',
      willChange: this.config.gpuOptimized ? 'transform, opacity' : '',
      transform: this.config.gpuOptimized ? 'translateZ(0)' : ''
    }

    Object.assign(this.element.style, containerStyles)
    this.element.className = 'gradual-blur'

    // Layer styles
    this.updateLayerStyles()
  }

  updateLayerStyles() {
    const increment = 100 / this.config.divCount
    const currentStrength = this.isHovered && this.config.hoverIntensity ? 
      this.config.strength * this.config.hoverIntensity : this.config.strength

    this.layers.forEach((layer, index) => {
      const i = index + 1
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
      
      const blurValue = this.getBlurProgression(i, this.config.divCount, this.config.curve, this.config.exponential, currentStrength)
      const direction = this.getGradientDirection(this.config.position)
      
      const layerStyles = {
        position: 'absolute',
        inset: '0',
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: this.config.opacity,
        transition: this.config.animated && this.config.animated !== 'scroll' ? 
          `backdrop-filter ${this.config.duration} ${this.config.easing}` : ''
      }
      
      Object.assign(layer.style, layerStyles)
    })
  }

  getBlurProgression(i, divCount, curve, exponential, strength) {
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

  getGradientDirection(position) {
    const directions = {
      top: 'to top',
      bottom: 'to bottom',
      left: 'to left',
      right: 'to right'
    }
    return directions[position] || 'to bottom'
  }

  getResponsiveHeight() {
    if (!this.config.responsive) return this.config.height
    
    const width = window.innerWidth
    if (width <= 768 && this.config.mobileHeight) return this.config.mobileHeight
    if (width <= 1024 && width > 768 && this.config.tabletHeight) return this.config.tabletHeight
    if (width > 1024 && this.config.desktopHeight) return this.config.desktopHeight
    return this.config.height
  }

  setupEventListeners() {
    if (this.config.hoverIntensity) {
      this.element.addEventListener('mouseenter', () => {
        this.isHovered = true
        this.updateLayerStyles()
      })
      
      this.element.addEventListener('mouseleave', () => {
        this.isHovered = false
        this.updateLayerStyles()
      })
    }

    if (this.config.responsive) {
      window.addEventListener('resize', () => {
        this.element.style.height = this.getResponsiveHeight()
      })
    }
  }

  setupAnimations() {
    if (this.config.animated === 'scroll') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.isVisible = entry.isIntersecting
            this.element.style.opacity = this.isVisible ? 1 : 0
            
            if (entry.isIntersecting && this.config.onAnimationComplete) {
              setTimeout(() => this.config.onAnimationComplete(), parseFloat(this.config.duration) * 1000)
            }
          })
        },
        { threshold: 0.1 }
      )
      
      this.observer.observe(this.element)
    }

    if (this.config.animated === 'fade') {
      this.element.style.animation = `gradual-blur-fade-in ${this.config.duration} ${this.config.easing}`
    }
  }

  // Public methods
  show() {
    this.isVisible = true
    this.element.style.opacity = 1
  }

  hide() {
    this.isVisible = false
    this.element.style.opacity = 0
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig }
    this.applyStyles()
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
    this.element.innerHTML = ''
    this.element.className = ''
    this.element.style.cssText = ''
  }

  // Static method for easy initialization
  static init(selector, options) {
    const elements = document.querySelectorAll(selector)
    const instances = []
    
    elements.forEach(element => {
      instances.push(new GradualBlur(element, options))
    })
    
    return instances.length === 1 ? instances[0] : instances
  }
}

// Auto-initialize from data attributes
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-gradual-blur]')
  
  elements.forEach(element => {
    const config = {}
    const dataset = element.dataset
    
    // Parse data attributes
    Object.keys(dataset).forEach(key => {
      if (key.startsWith('gradualBlur')) {
        const configKey = key.replace('gradualBlur', '').toLowerCase()
        let value = dataset[key]
        
        // Parse boolean and number values
        if (value === 'true') value = true
        else if (value === 'false') value = false
        else if (!isNaN(value) && value !== '') value = Number(value)
        
        config[configKey] = value
      }
    })
    
    new GradualBlur(element, config)
  })
})

// Add CSS keyframes if not already present
if (!document.querySelector('#gradual-blur-styles')) {
  const style = document.createElement('style')
  style.id = 'gradual-blur-styles'
  style.textContent = `
    @keyframes gradual-blur-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .gradual-blur, .gradual-blur * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `
  document.head.appendChild(style)
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GradualBlur
}

if (typeof window !== 'undefined') {
  window.GradualBlur = GradualBlur
}