import { useState, useRef, type ReactNode, type FC, type MouseEvent } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number; // How far the element pulls toward cursor (0.1 - 0.6)
  radius?: number; // Active trigger distance in pixels
  className?: string;
  disabled?: boolean;
}

export const Magnetic: FC<MagneticProps> = ({
  children,
  strength = 0.35,
  radius = 100,
  className = '',
  disabled = false
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !elementRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = elementRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < radius) {
      setIsHovered(true);
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength
      });
    } else {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
      data-cursor="pointer"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
