import React from 'react';
import * as math from 'mathjs';

const GradualBlur = ({ 
  position = 'bottom',
  strength = 2,
  height = '7rem',
  width = '100%',
  divCount = 5,
  exponential = true,
  zIndex = 1000
}) => {

  const generateBlurDivs = () => {
    const divs = [];
    const increment = 100 / divCount;
    
    for (let i = 1; i <= divCount; i++) {
      // Color values on the gradient
      const c1 = '#0000';
      const c2 = '#000';
      
      // Stops (%) along the gradient (rounded to 1 decimal)
      const p1 = math.round((increment * i - increment) * 10) / 10;
      const p2 = math.round((increment * i) * 10) / 10;
      const p3 = math.round((increment * i + increment) * 10) / 10;
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;
      
      // The linear-gradient values + points (default: 2 points)
      let gradient = `${c1} ${p1}%, ${c2} ${p2}%`;
      
      // If gradient has 3 points
      if (p3 <= 100) {
        gradient = `${c1} ${p1}%, ${c2} ${p2}%, ${c2} ${p3}%`;
      }
      
      // If gradient has all 4 points
      if (p4 <= 100) {
        gradient = `${c1} ${p1}%, ${c2} ${p2}%, ${c2} ${p3}%, ${c1} ${p4}%`;
      }
      
      // Blur calculation
      let blurValue;
      if (exponential) {
        blurValue = math.pow(2, i - 1) * 0.0625 * strength;
      } else {
        blurValue = 0.0625 * i * strength;
      }
      
      const direction = position === 'top' ? 'to top' : 'to bottom';
      
      const divStyle = {
        position: 'absolute',
        inset: '0',
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue}rem)`
      };
      
      divs.push(<div key={i} style={divStyle}></div>);
    }
    
    return divs;
  };

  const styles = {
    nav: {
      height,
      left: 0,
      pointerEvents: 'none',
      position: 'fixed',
      [position]: 0,
      width,
      zIndex
    },
    topBlur: {
      position: 'relative',
      width: '100%',
      height: '100%'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.topBlur}>
        {generateBlurDivs()}
      </div>
    </nav>
  );
};

export default GradualBlur;