import React, { useState } from 'react';
import { DEFAULT_IMAGES } from '../../data/projects';

export function useImg(k) {
  const [src] = useState(() => {
    try {
      const stored = localStorage.getItem('img:' + k);
      return stored || DEFAULT_IMAGES[k] || '';
    } catch (e) {
      return DEFAULT_IMAGES[k] || '';
    }
  });
  return [src];
}

export default function ImageSlot({ k, src: directSrc, label, className, children }) {
  const [hookSrc] = useImg(k);
  const imageSrc = directSrc || hookSrc || DEFAULT_IMAGES[k] || '';

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {imageSrc ? (
        <img src={imageSrc} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          {children || <span className="text-mute text-sm">{label}</span>}
        </div>
      )}
    </div>
  );
}
