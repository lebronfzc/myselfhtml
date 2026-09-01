import { Reveal } from "./Reveal";

export function PhilosophySection() {
  return (
    <section className="experience-section relative overflow-hidden bg-black px-6 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl">
        <Reveal variant="title">
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-semibold uppercase leading-none tracking-normal text-white md:text-5xl lg:text-6xl">
                Work Experience
              </h2>
              <span className="text-3xl leading-none text-[#caff33]">↘</span>
            </div>
            <p className="mt-3 text-base text-white/55">个人经历</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[0.9fr_1.6fr] lg:gap-10">
          <Reveal variant="image" x={-70} y={0}>
            <div className="experience-avatar-card overflow-hidden rounded-3xl">
              <img className="h-full w-full object-cover object-top" src="./assets/fzc-ip-hello.jpeg" alt="FZC 个人 IP 头像" />
            </div>
          </Reveal>

          <Reveal variant="card" x={70} y={0} delay={0.18} className="flex flex-col justify-center">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-normal text-[#caff33]">About Me</p>
            <h3 className="mb-5 text-4xl font-semibold leading-none tracking-normal text-white md:text-5xl">
              Hi! I AM FZC!
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
              我持续探索人工智能参与创作的更多可能，让抽象的概念转化为具有情绪、节奏与叙事感的视觉作品。在技术与想象力之间寻找新的表达方式，记录不断生长中的创作实验、工作方法与个人视觉语言。
            </p>

            <div className="mt-8 grid gap-5 border-y border-white/10 py-6 md:grid-cols-3">
              <div>
                <p className="mb-2 text-[10px] uppercase text-[#caff33]">Role</p>
                <p className="text-sm font-semibold text-white">AIGC Designer</p>
              </div>
              <div>
                <p className="mb-2 text-[10px] uppercase text-[#caff33]">Company</p>
                <p className="text-sm font-semibold text-white">鲸海拾贝科技有限公司</p>
              </div>
              <div>
                <p className="mb-2 text-[10px] uppercase text-[#caff33]">Since</p>
                <p className="text-sm font-semibold text-white">2025.09 - 至今</p>
              </div>
            </div>

            <div className="mt-14">
              <p className="mb-7 text-[10px] font-semibold uppercase tracking-normal text-white/35">Career Path</p>
              <div className="experience-timeline-line" />
              <div className="experience-job-card pt-6">
                <p className="mb-2 text-xs font-semibold text-[#caff33]">2025年 9 月 - 至今</p>
                <h4 className="text-lg font-semibold text-white">鲸海拾贝科技有限公司</h4>
                <p className="mt-2 inline-flex rounded-full border border-[#caff33]/35 px-3 py-1 text-xs text-[#caff33]">
                  AIGC设计师
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
                  负责 AIGC 前沿领域探索，参与图片/视频视觉类作品创作，使用前沿 AI 工具创作涉及知名科技UP 主互联网传播内容，商业品牌项目。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
