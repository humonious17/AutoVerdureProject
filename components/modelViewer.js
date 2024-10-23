import React from 'react';
import '@google/model-viewer';

const ModelViewer = ({ src, alt }) => {
  return (
    <model-viewer
      src={src}
      alt={alt}
      auto-rotate
      camera-controls
      ar
      ar-modes="scene-viewer quick-look webxr"
      style={{ width: '100%', height: '500px' }}
    >
    </model-viewer>
  );
};

export default ModelViewer;
