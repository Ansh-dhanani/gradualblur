import React from 'react';
import GradualBlurEffect from './Gradualblur.jsx';

const TestApp = () => {
  return (
    <div style={{ height: '200vh', background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' }}>
      <h1 style={{ padding: '2rem', color: 'white' }}>Test Gradual Blur</h1>
      
      {/* Default blur at bottom */}
      <GradualBlurEffect />
      
      {/* Top blur with custom settings */}
      <GradualBlurEffect 
        position="top" 
        strength={3} 
        height="5rem" 
        width="50%" 
      />
    </div>
  );
};

export default TestApp;