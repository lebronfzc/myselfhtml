import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const featuredVideos = [
  {
    title: "AI视频",
    description:
      "FZC 的 AIGC 动态影像作品。通过生成式视觉、节奏与叙事，将抽象的想法转化为可感知的梦境片段。",
    src: "./assets/videos/dream-video.mp4",
    poster: undefined,
  },
  {
    title: "3D跑鞋",
    description:
      "以 3D 建模与动态视觉呈现跑鞋的结构、材质与运动感，探索 AI 与产品影像结合的表达方式。",
    src: "./assets/videos/3d-running-shoe.mp4",
    poster: "./assets/work-3d-running-shoe.jpg",
  },
  {
    title: "一半一半",
    description:
      "通过AI 视频的影像语言，讲述一个人如何在回忆与现实的交错中，重新审视一段不再完整的关系。男主 Top 同时担任主唱与男主角，对镜演唱是他的内心独白，剧情则呈现他正在经历的现实，两条叙事线在同一时间与空间中相互映照。",
    src: "./assets/videos/half-and-half-ai-video.mp4",
    poster: undefined,
  },
] as const;

export function FeaturedVideoSection() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = featuredVideos[activeIndex];

  const showNextVideo = useCallback(() => {
    setActiveIndex((index) => (index + 1) % featuredVideos.length);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.load();
    void video.play().catch(() => undefined);
  }, [activeVideo.src]);

  return (
    <section ref={ref} id="work" className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10">
      <div className="mx-auto mb-10 max-w-6xl md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 110, scaleY: 0.84, filter: "blur(10px)", clipPath: "inset(0 0 100% 0)" }}
          animate={isInView ? { opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)" } : undefined}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "50% 100%" }}
        >
          <p className="mb-3 text-sm text-white/45">精选作品</p>
          <h2 className="text-5xl font-semibold uppercase leading-none tracking-normal text-white md:text-7xl">
            Featured Work
          </h2>
        </motion.div>
      </div>
      <motion.div
        className="relative mx-auto h-[420px] max-w-6xl overflow-hidden rounded-3xl bg-neutral-950 sm:h-auto sm:aspect-video"
        initial={{ opacity: 0, y: 92, scale: 0.96, filter: "blur(10px)", clipPath: "inset(12% 0 12% 0 round 28px)" }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", clipPath: "inset(0% 0 0% 0 round 28px)" } : undefined}
        transition={{ duration: 1.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.video
          ref={videoRef}
          key={activeVideo.src}
          className="h-full w-full object-cover"
          src={activeVideo.src}
          muted
          autoPlay
          playsInline
          preload="metadata"
          poster={activeVideo.poster}
          onLoadedData={(event) => {
            void event.currentTarget.play().catch(() => undefined);
          }}
          onEnded={showNextVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute left-5 top-5 z-20 flex items-center gap-2" aria-label="精选视频轮播">
          {featuredVideos.map((video, index) => (
            <button
              key={video.title}
              type="button"
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/45 hover:bg-white/70"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`播放第 ${index + 1} 个视频：${video.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="liquid-glass absolute right-4 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:h-14 sm:w-14"
          onClick={showNextVideo}
          aria-label="播放下一个视频"
        >
          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>

        <motion.div
          className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-5 p-5 sm:p-6 md:flex-row md:items-end md:p-10"
          initial={{ opacity: 0, y: 46 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="liquid-glass max-w-md rounded-2xl p-5 md:p-8"
            aria-live="polite"
            initial={{ opacity: 0, y: 38, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 1, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.26em] text-white/50">精选作品 · 2026</p>
            <h3 className="display-serif mb-3 text-3xl text-white md:text-4xl">{activeVideo.title}</h3>
            <p className="text-sm leading-relaxed text-white/75 md:text-base">{activeVideo.description}</p>
          </motion.div>
          <motion.a
            className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white"
            href="#direction"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            探索更多
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
