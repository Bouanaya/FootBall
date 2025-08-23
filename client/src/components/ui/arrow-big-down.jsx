'use client';;
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

const pathVariants = {
  normal: { d: 'M15 6v6h4l-7 7-7-7h4V6h6z', translateY: 0 },
  animate: {
    d: 'M15 6v6h4l-7 7-7-7h4V6h6z',
    translateY: [0, +3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const ArrowBigDownIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback((e) => {
    if (!isControlledRef.current) {
      controls.start('animate');
    } else {
      onMouseEnter?.(e);
    }
  }, [controls, onMouseEnter]);

  const handleMouseLeave = useCallback((e) => {
    if (!isControlledRef.current) {
      controls.start('normal');
    } else {
      onMouseLeave?.(e);
    }
  }, [controls, onMouseLeave]);

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <motion.path d="M15 6v6h4l-7 7-7-7h4V6h6z" variants={pathVariants} animate={controls} />
      </svg>
    </div>
  );
});

ArrowBigDownIcon.displayName = 'ArrowBigDownIcon';

export { ArrowBigDownIcon };
