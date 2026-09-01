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
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 110, scaleY: 0.84, filter: "blur(10px)", clipPath: "inset(0 0 100% 0)" }}
          animate={isInView ? { opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)" } : undefined}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "50% 100%" }}
        >
          <p className="mb-3 text-sm text-white/45">我的创作方向</p>
          <h2 className="text-5xl font-semibold uppercase leading-none tracking-normal text-white md:text-7xl">
            Creative Direction
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {directions.map((direction, index) => (
            <motion.article
              key={direction.title}
              className="liquid-glass group rounded-3xl"
              initial={{ opacity: 0, y: 92, scale: 0.96, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
              transition={{ duration: 1.15, delay: 0.22 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="relative aspect-video overflow-hidden"
                initial={{ clipPath: "inset(18% 0 18% 0 round 24px)" }}
                animate={isInView ? { clipPath: "inset(0% 0 0% 0 round 24px)" } : undefined}
                transition={{ duration: 1.1, delay: 0.42 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.video
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={direction.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  initial={{ scale: 1.12 }}
                  animate={isInView ? { scale: 1 } : undefined}
                  transition={{ duration: 1.4, delay: 0.34 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              </motion.div>
              <motion.div
                className="p-6 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.9, delay: 0.55 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/40">{direction.tag}</p>
                  <span className="liquid-glass rounded-full p-2 text-white/80">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl">{direction.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{direction.description}</p>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
