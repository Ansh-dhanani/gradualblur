import React from 'react';

type Position = 'top' | 'bottom' | 'left' | 'right';
type AnimationType = 'scroll' | 'hover' | 'fade' | false;
type CurveType = 'linear' | 'bezier' | 'ease-in-out';
type PresetType = 'top' | 'bottom';

interface GradualBlurProps {
  // Basic options
  position?: Position;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  
  // Animation options
  animated?: AnimationType;
  duration?: string;
  easing?: string;
  
  // Styling options
  opacity?: number;
  curve?: CurveType;
  
  // Responsive options
  responsive?: boolean;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  
  // Advanced options
  preset?: PresetType;
  gpuOptimized?: boolean;
  hoverIntensity?: number;
  absolute?: boolean;
  
  // Event handlers
  onAnimationComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// CLI Configuration Interface
interface CLIConfig {
  position?: Position;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  zIndex?: number;
  exponential?: boolean;
  animated?: AnimationType;
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: CurveType;
  responsive?: boolean;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  preset?: PresetType;
  zones?: Position[];
  gpuOptimized?: boolean;
  reducedMotion?: boolean;
  hoverIntensity?: number;
  absolute?: boolean;
}

// Vanilla JS Class Interface
declare class GradualBlurJS {
  constructor(element: string | HTMLElement, options?: CLIConfig);
  show(): void;
  hide(): void;
  updateConfig(config: Partial<CLIConfig>): void;
  destroy(): void;
  static init(selector: string, options?: CLIConfig): GradualBlurJS | GradualBlurJS[];
}

// Generator Functions
declare function generateBlurCSS(config: CLIConfig): string;
declare function generateBlurHTML(config: CLIConfig): string;

// React Component
declare const GradualBlur: React.FC<GradualBlurProps>;

export default GradualBlur;
export { GradualBlurJS, generateBlurCSS, generateBlurHTML };
export type { GradualBlurProps, CLIConfig, Position, AnimationType, CurveType, PresetType };