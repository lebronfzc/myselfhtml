import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
};

export function Reveal({ children, className = "", delay = 0, x = 0, y = 40 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
