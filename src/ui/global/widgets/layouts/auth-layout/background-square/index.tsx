import { motion } from "framer-motion";

type BackgroundSquareProps = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  color: string;
  opacity?: number;
  rotation: number;
  animate?: boolean;
  delay?: number;
};

export function BackgroundSquare({
  left,
  right,
  top,
  bottom,
  color,
  rotation,
  opacity = 0.2,
  animate = false,
  delay = 0,
}: BackgroundSquareProps) {
  const style = {
    left,
    right,
    top,
    bottom,
    backgroundColor: color,
  };

  const combinedAnimation = animate
    ? {
        scale: [1, 1.05, 1],
        opacity: [opacity, opacity + 0.08, opacity],
        y: [0, -10, 0],
        x: [0, 5, 0],
        rotate: rotation,
        transition: {
          scale: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay,
          },
          opacity: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay,
          },
          y: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: delay + 0.5,
          },
          x: {
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            delay: delay + 1,
          },
          rotate: {
            duration: 0,
          },
        },
      }
    : { rotate: rotation };

  return (
    <motion.div
      className="absolute w-[580px] h-[580px] rounded-xl"
      style={style}
      animate={combinedAnimation}
      initial={{ rotate: rotation, opacity: opacity, x: 0, y: 0 }}
    />
  );
}
