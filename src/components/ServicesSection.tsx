import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const directions = [
  {
    tag: "影像创作",
    title: "生成式动态影像",
    description: "从概念、视觉风格到动态表达，利用生成式工具构建具有情绪和叙事感的影像作品。",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  },
  {
    tag: "视觉实验",
    title: "AIGC 视觉探索",
    description: "融合摄影、设计与生成艺术，在不同模型与媒介之间持续探索个人视觉语言。",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="direction" className="relative overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.025)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-12 flex items-end justify-between md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl tracking-tight text-white md:text-5xl">我的创作方向</h2>
          <p className="hidden text-sm text-white/40 md:block">Selected directions</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {directions.map((direction, index) => (
            <motion.article
              key={direction.title}
              className="liquid-glass group rounded-3xl"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-video overflow-hidden">
                <video
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={direction.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/40">{direction.tag}</p>
                  <span className="liquid-glass rounded-full p-2 text-white/80">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl">{direction.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{direction.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
