import { Reveal } from "./Reveal";

export function PhilosophySection() {
  return (
    <section className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-16 text-5xl tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl">
            创意 <span className="display-serif italic text-white/40">×</span> 技术
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <Reveal x={-40} y={0}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-950">
              <video
                className="h-full w-full object-cover"
                src="./assets/videos/dream-video.mp4"
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                poster="./assets/work-11.png"
              />
            </div>
          </Reveal>

          <Reveal x={40} y={0} className="flex flex-col justify-center">
            <div className="py-6 md:py-8">
              <p className="mb-4 text-xs uppercase tracking-[0.26em] text-white/40">生成式影像</p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                我持续探索人工智能参与创作的更多可能，让抽象的概念转化为具有情绪、节奏与叙事感的视觉作品。
              </p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div className="py-6 md:py-8">
              <p className="mb-4 text-xs uppercase tracking-[0.26em] text-white/40">视觉实验</p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                在技术与想象力之间寻找新的表达方式，记录不断生长中的创作实验、工作方法与个人视觉语言。
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
