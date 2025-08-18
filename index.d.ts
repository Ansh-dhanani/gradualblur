import React from 'react';

interface GradualBlurProps {
  position?: 'top' | 'bottom';
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
}

declare const GradualBlur: React.FC<GradualBlurProps>;

export default GradualBlur;