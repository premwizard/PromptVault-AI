import { useState, useRef, RefObject } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export function useTilt(): [RefObject<HTMLDivElement>, TiltValues] {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTilt({
      rotateX,
      rotateY,
      scale: 1.02,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  if (ref.current) {
    ref.current.addEventListener('mousemove', handleMouseMove as any);
    ref.current.addEventListener('mouseleave', handleMouseLeave);
  }

  return [ref, tilt];
}
