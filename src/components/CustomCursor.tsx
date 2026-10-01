import { useEffect, useState, useRef, type FC } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

export const CustomCursor: FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'play' | 'explore' | 'drag'>('default');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mousePosRef = useRef({ x: -100, y: -100 });
  const followerPosRef = useRef({ x: -100, y: -100 });
  const lastMousePosRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device or reduced motion
    const touchCheck = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const reducedMotionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck || reducedMotionCheck) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mousePosRef.current = { x: clientX, y: clientY };
      setCursorPos({ x: clientX, y: clientY });

      if (!isVisible) setIsVisible(true);

      // Check element under cursor for special cursor modes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr === 'view') {
        setCursorType('view');
      } else if (cursorAttr === 'play') {
        setCursorType('play');
      } else if (cursorAttr === 'explore') {
        setCursorType('explore');
      } else if (cursorAttr === 'drag') {
        setCursorType('drag');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[data-magnetic]')
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }

      // Spawn golden dust trail on mouse velocity
      const dx = clientX - lastMousePosRef.current.x;
      const dy = clientY - lastMousePosRef.current.y;
      const speed = Math.hypot(dx, dy);

      if (speed > 6 && particlesRef.current.length < 24) {
        particlesRef.current.push({
          x: clientX + (Math.random() - 0.5) * 6,
          y: clientY + (Math.random() - 0.5) * 6,
          size: Math.random() * 2 + 1,
          opacity: 0.55,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8
        });
      }

      lastMousePosRef.current = { x: clientX, y: clientY };
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth Lerp animation loop for the trailing ring & particle trail canvas
    const animateFollower = () => {
      const lerpFactor = 0.18;
      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;

      followerPosRef.current.x += (targetX - followerPosRef.current.x) * lerpFactor;
      followerPosRef.current.y += (targetY - followerPosRef.current.y) * lerpFactor;

      setFollowerPos({
        x: Math.round(followerPosRef.current.x * 10) / 10,
        y: Math.round(followerPosRef.current.y * 10) / 10
      });

      // Render particle trail on canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particlesRef.current.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;
            p.opacity *= 0.88;
            p.size *= 0.94;

            if (p.opacity > 0.04) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(165, 138, 98, ${p.opacity.toFixed(2)})`;
              ctx.shadowColor = '#C2AB88';
              ctx.shadowBlur = 4;
              ctx.fill();
            } else {
              particlesRef.current.splice(idx, 1);
            }
          });
        }
      }

      rafId.current = requestAnimationFrame(animateFollower);
    };

    rafId.current = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Canvas size sync
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isTouchDevice || !isVisible) return null;

  // Determine ring size and styling based on active mode
  let ringSize = 36;
  let ringLabel = '';
  let ringClasses = 'border-[#A58A62]/60 bg-transparent';

  if (cursorType === 'pointer') {
    ringSize = 48;
    ringClasses = 'border-[#A58A62] bg-[#A58A62]/15 backdrop-blur-[1px]';
  } else if (cursorType === 'view') {
    ringSize = 72;
    ringLabel = 'VIEW';
    ringClasses = 'border-[#A58A62] bg-[#171717]/90 text-white shadow-lg';
  } else if (cursorType === 'play') {
    ringSize = 72;
    ringLabel = 'PLAY';
    ringClasses = 'border-[#A58A62] bg-[#171717]/90 text-white shadow-lg';
  } else if (cursorType === 'explore') {
    ringSize = 74;
    ringLabel = 'EXPLORE';
    ringClasses = 'border-[#A58A62] bg-[#171717]/90 text-white shadow-lg';
  } else if (cursorType === 'drag') {
    ringSize = 74;
    ringLabel = 'DRAG';
    ringClasses = 'border-[#A58A62] bg-[#171717]/90 text-white shadow-lg';
  }

  const scale = isMouseDown ? 0.85 : 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Golden Dust Wake Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
      />

      {/* Outer Follower Ring with lerped spring physics */}
      <div
        className={`absolute rounded-full border flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ease-out ${ringClasses}`}
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          transform: `translate3d(${followerPos.x - ringSize / 2}px, ${followerPos.y - ringSize / 2}px, 0) scale(${scale})`,
          willChange: 'transform, width, height'
        }}
      >
        {ringLabel && (
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#EAE7DF] uppercase font-bold pl-0.5">
            {ringLabel}
          </span>
        )}
      </div>

      {/* Center Precise Dot */}
      {cursorType === 'default' && (
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#A58A62] transition-transform duration-75 ease-out shadow-sm"
          style={{
            transform: `translate3d(${cursorPos.x - 3}px, ${cursorPos.y - 3}px, 0)`,
            willChange: 'transform'
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;
