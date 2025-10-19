import React, { useState, useEffect, useRef } from 'react';

interface ImageSliderProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, autoPlay = true, interval = 4000 }) => {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!autoPlay) return;
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [autoPlay, interval, images.length]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative rounded-lg shadow-lg overflow-hidden">
      <div className="w-full h-80 md:h-96 bg-gray-100 flex items-center justify-center">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={`w-full h-full object-contain transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'}`}
          />
        ))}
      </div>

      <button onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md">
        ‹
      </button>
      <button onClick={next} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md">
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full ${i === index ? 'bg-primary' : 'bg-white/60'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;