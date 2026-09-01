import { motion, useInView } from "framer-motion";
import { type ReactNode, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "title" | "card" | "image" | "text";
  x?: number;
  y?: number;
};

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const revealStyles = {
  title: {
    initial: { opacity: 0, y: 118, scaleY: 0.82, filter: "blur(10px)", clipPath: "inset(0 0 100% 0)" },
    animate: { opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)" },
    duration: 1.25,
  },
  card: {
    initial: { opacity: 0, y: 76, scale: 0.96, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    duration: 1.05,
  },
  image: {
    initial: { opacity: 0, y: 70, scale: 1.08, filter: "blur(12px)", clipPath: "inset(14% 0 14% 0 round 28px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", clipPath: "inset(0% 0 0% 0 round 28px)" },
    duration: 1.35,
  },
  text: {
    initial: { opacity: 0, y: 38, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    duration: 0.95,
  },
};

export function Reveal({ children, className = "", delay = 0, variant = "card", x = 0, y = 40 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const preset = revealStyles[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ ...preset.initial, x, y }}
      animate={isInView ? { ...preset.animate, x: 0, y: 0 } : undefined}
      transition={{ duration: preset.duration, delay, ease: smoothEase }}
      style={{ transformOrigin: "50% 100%" }}
    >
      {children}
    </motion.div>
  );
}
