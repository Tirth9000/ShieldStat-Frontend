import React from 'react';

const matrixStyles = `
  .matrix-ctx-container {
    width: 100%;
    min-height: 100vh;
    position: relative;
    transition: background-color 0.3s ease;
    overflow: hidden;
    isolation: isolate;
  }

  /* Dark theme background */
  .dark .matrix-ctx-container {
    background-color: #050510;
  }

  /* Light theme background */
  .light .matrix-ctx-container {
    background-color: #f8fafc;
  }

  .matrix-ctx-grid {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: opacity 0.3s ease, background-image 0.3s ease;
  }

  /* Dark theme grid */
  .dark .matrix-ctx-grid {
    background-image: 
      linear-gradient(90deg, rgba(70, 90, 140, 0.45) 1px, transparent 1px),
      linear-gradient(rgba(70, 90, 140, 0.45) 1px, transparent 1px);
    background-size: 40px 40px; 
  }

  /* Light theme grid */
  .light .matrix-ctx-grid {
    background-image: 
      linear-gradient(90deg, rgba(15, 23, 42, 0.08) 1px, transparent 1px),
      linear-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .matrix-ctx-grid::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: background 0.3s ease;
  }

  /* Dark theme gradient overlay */
  .dark .matrix-ctx-grid::after {
    background: radial-gradient(circle at 50% 50%, transparent 30%, #000 100%);
  }

  /* Light theme gradient overlay */
  .light .matrix-ctx-grid::after {
    background: radial-gradient(circle at 50% 50%, transparent 30%, #f8fafc 100%);
  }
  
  .matrix-ctx-content {
    position: relative;
    z-index: 10;
    height: 100%;
    width: 100%;
    display: flex;
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