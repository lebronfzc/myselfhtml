import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function FeaturedVideoSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="work" className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10">
      <motion.div
        className="relative mx-auto aspect-video max-w-6xl overflow-hidden rounded-3xl bg-neutral-950"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          className="h-full w-full object-cover"
          src="./assets/videos/dream-video.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster="./assets/work-19.png"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-5 p-5 sm:p-6 md:flex-row md:items-end md:p-10">
          <div className="liquid-glass max-w-md rounded-2xl p-5 md:p-8">
            <p className="mb-3 text-xs uppercase tracking-[0.26em] text-white/50">精选作品 · 2026</p>
            <h3 className="display-serif mb-3 text-3xl text-white md:text-4xl">梦境视频</h3>
            <p className="text-sm leading-relaxed text-white/75 md:text-base">
              FZC 的 AIGC 动态影像作品。通过生成式视觉、节奏与叙事，将抽象的想法转化为可感知的梦境片段。
            </p>
          </div>
          <motion.a
            className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white"
            href="#direction"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            探索更多
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
