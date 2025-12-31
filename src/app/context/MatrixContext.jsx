import React from 'react';

const matrixStyles = `
  .matrix-ctx-container {
    width: 100%;
    min-height: 100vh; /* <--- THIS FIXES THE CUT-OFF ISSUE */
    position: relative;
    background-color: #050510;
    overflow: hidden;
    isolation: isolate;
  }

  .matrix-ctx-grid {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    
    background-image: 
      linear-gradient(90deg, rgba(70, 90, 140, 0.45) 1px, transparent 1px),
      linear-gradient(rgba(70, 90, 140, 0.45) 1px, transparent 1px);
      
    background-size: 40px 40px; 
  }

  .matrix-ctx-grid::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, transparent 30%, #000 100%);
    pointer-events: none;
  }
  
  .matrix-ctx-content {
    position: relative;
    z-index: 10;
    height: 100%;
    width: 100%;
    display: flex;       /* Added to help center content */
    flex-direction: column; 
  }
`;

export const MatrixContext = ({ children, style, className = "" }) => {
  return (
    <>
      <style>{matrixStyles}</style>
      <div className={`matrix-ctx-container ${className}`} style={style}>
        <div className="matrix-ctx-grid" />
        <div className="matrix-ctx-content">
            {children}
        </div>
      </div>
    </>
  );
};