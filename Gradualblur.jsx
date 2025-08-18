import React, { useEffect, useRef, useState } from 'react';
import * as math from 'mathjs';

// Preset configurations
const PRESETS = {
  hero: { position: 'bottom', strength: 2.5, height: '8rem', divCount: 6, animated: 'fade' },
  navigation: { position: 'top', strength: 1.5, height: '4rem', divCount: 4, tint: 'rgba(255,255,255,0.1)' },
  modal: { position: 'bottom', strength: 3, height: '100vh', width: '100vw', tint: 'rgba(0,0,0,0.2)' },
  card: { position: 'bottom', strength: 1.8, height: '3rem', divCount: 4, curve: 'bezier' }
};

const GradualBlur = ({ 
  // Basic options
  position = 'bottom',
  strength = 2,
  height = '7rem',
  width = '100%',
  divCount = 5,
  exponential = false,
  zIndex = 1000,
  
  // Animation options
  animated = false,
  duration = '0.3s',
  easing = 'ease-out',
  
  // Styling options
  tint,
  opacity = 1,
  curve = 'linear',
  
  // Responsive options
  responsive = false,
  mobileHeight,
  tabletHeight,
  desktopHeight,
  
  // Advanced options
  preset,
  gpuOptimized = false,
  hoverIntensity,
  
  // Event handlers
  onAnimationComplete,
  className = '',
  style = {}
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!animated || animated !== 'scroll');
  const [isHovered, setIsHovered] = useState(false);
  
  // Apply preset if specified
  const config = preset && PRESETS[preset] ? { ...PRESETS[preset], ...arguments[0] } : arguments[0];
  
  // Use config values or fallback to props
  const finalConfig = {
    position: config.position || position,
    strength: config.strength || strength,
    height: config.height || height,
    width: config.width || width,
    divCount: config.divCount || divCount,
    exponential: config.exponential !== undefined ? config.exponential : exponential,
    zIndex: config.zIndex || zIndex,
    animated: config.animated || animated,
    duration: config.duration || duration,
    easing: config.easing || easing,
    tint: config.tint || tint,
    opacity: config.opacity !== undefined ? config.opacity : opacity,
    curve: config.curve || curve,
    hoverIntensity: config.hoverIntensity || hoverIntensity
  };
  
  // Scroll animation effect
  useEffect(() => {
    if (finalConfig.animated === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
            if (entry.isIntersecting && onAnimationComplete) {
              setTimeout(() => onAnimationComplete(), parseFloat(finalConfig.duration) * 1000);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [finalConfig.animated, finalConfig.duration, onAnimationComplete]);
  
  // Blur progression calculation
  const getBlurProgression = (i, divCount, curve, exponential, strength) => {
    let progress = i / divCount;
    
    switch (curve) {
      case 'bezier':
        progress = progress * progress * (3 - 2 * progress);
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
  };
  
  // Generate gradient direction
  const getGradientDirection = (position) => {
    const directions = {
      top: 'to top',
      bottom: 'to bottom',
      left: 'to left',
      right: 'to right'
    };
    return directions[position] || 'to bottom';
  };

  const generateBlurDivs = () => {
    const divs = [];
    const increment = 100 / finalConfig.divCount;
    const currentStrength = isHovered && finalConfig.hoverIntensity ? 
      finalConfig.strength * finalConfig.hoverIntensity : finalConfig.strength;
    
    for (let i = 1; i <= finalConfig.divCount; i++) {
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
      
      const blurValue = getBlurProgression(i, finalConfig.divCount, finalConfig.curve, finalConfig.exponential, currentStrength);
      const direction = getGradientDirection(finalConfig.position);
      
      const divStyle = {
        position: 'absolute',
        inset: '0',
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: finalConfig.opacity,
        transition: finalConfig.animated && finalConfig.animated !== 'scroll' ? 
          `backdrop-filter ${finalConfig.duration} ${finalConfig.easing}` : undefined
      };
      
      divs.push(<div key={i} style={divStyle}></div>);
    }
    
    return divs;
  };
  
  // Responsive height calculation
  const getResponsiveHeight = () => {
    if (!responsive) return finalConfig.height;
    
    const width = window.innerWidth;
    if (width <= 768 && mobileHeight) return mobileHeight;
    if (width <= 1024 && width > 768 && tabletHeight) return tabletHeight;
    if (width > 1024 && desktopHeight) return desktopHeight;
    return finalConfig.height;
  };

  const containerStyle = {
    height: responsive ? getResponsiveHeight() : finalConfig.height,
    width: finalConfig.width,
    position: 'fixed',
    [finalConfig.position]: 0,
    [finalConfig.position === 'left' || finalConfig.position === 'right' ? 'top' : 'left']: 0,
    zIndex: finalConfig.zIndex,
    pointerEvents: finalConfig.hoverIntensity ? 'auto' : 'none',
    opacity: isVisible ? 1 : 0,
    transition: finalConfig.animated ? `opacity ${finalConfig.duration} ${finalConfig.easing}` : undefined,
    background: finalConfig.tint || undefined,
    willChange: gpuOptimized ? 'transform, opacity' : undefined,
    transform: gpuOptimized ? 'translateZ(0)' : undefined,
    ...style
  };
  
  const innerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
  };
  
  const handleMouseEnter = () => {
    if (finalConfig.hoverIntensity) {
      setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (finalConfig.hoverIntensity) {
      setIsHovered(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`gradual-blur ${className}`}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="gradual-blur-inner" style={innerStyle}>
        {generateBlurDivs()}
      </div>
    </div>
  );
};

export default GradualBlur;