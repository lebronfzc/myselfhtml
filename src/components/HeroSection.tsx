import { ArrowRight, Github, Globe2, Instagram, Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";
const HERO_TITLE_PREFIX = "Create with ";
const HERO_TITLE_ACCENT = "AI";
const HERO_TITLE = `${HERO_TITLE_PREFIX}${HERO_TITLE_ACCENT}`;

function animateOpacity(video: HTMLVideoElement, target: number, duration: number) {
  const startOpacity = Number(video.style.opacity || 0);
  const startTime = performance.now();

  const frame = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    video.style.opacity = String(startOpacity + (target - startOpacity) * eased);
    if (progress < 1) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

function useTypingLoop(text: string) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedText(text);
      return undefined;
    }

    let letterCount = 0;
    let isDeleting = false;
    let timeoutId = window.setTimeout(tick, 500);

    function tick() {
      setTypedText(text.slice(0, letterCount));

      if (!isDeleting && letterCount === text.length) {
        isDeleting = true;
        timeoutId = window.setTimeout(tick, 1300);
        return;
      }

      if (isDeleting && letterCount === 0) {
        isDeleting = false;
        timeoutId = window.setTimeout(tick, 420);
        return;
      }

      letterCount += isDeleting ? -1 : 1;
      timeoutId = window.setTimeout(tick, isDeleting ? 55 : 105);
    }

    return () => window.clearTimeout(timeoutId);
  }, [text]);

  return typedText;
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const typedTitle = useTypingLoop(HERO_TITLE);
  const typedPrefix = typedTitle.slice(0, HERO_TITLE_PREFIX.length);
  const typedAccent = typedTitle.slice(HERO_TITLE_PREFIX.length);

  const handleCanPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().then(() => animateOpacity(video, 1, 500)).catch(() => undefined);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    if (video.duration - video.currentTime <= 0.55 && !fadingOutRef.current) {
      fadingOutRef.current = true;
      animateOpacity(video, 0, 500);
    }
  }, []);

  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = "0";
    window.setTimeout(() => {
      video.currentTime = 0;
      fadingOutRef.current = false;
      void video.play().then(() => animateOpacity(video, 1, 500)).catch(() => undefined);
    }, 100);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        src={HERO_VIDEO}
        muted
        autoPlay
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="fine-noise pointer-events-none absolute inset-0 opacity-40" />

      <header className="relative z-20 px-4 py-5 sm:px-6 sm:py-6">
        <nav className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-3 sm:px-6" aria-label="主要导航">
          <div className="flex items-center gap-3">
            <Globe2 className="h-6 w-6 text-white" aria-hidden="true" />
            <a href="#home" className="text-lg font-semibold text-white">FZC</a>
            <div className="ml-8 hidden gap-8 md:flex">
              <a className="text-sm font-medium text-white/80 transition-colors hover:text-white" href="#about">关于我</a>
              <a className="text-sm font-medium text-white/80 transition-colors hover:text-white" href="#work">作品</a>
              <a className="text-sm font-medium text-white/80 transition-colors hover:text-white" href="#direction">创作方向</a>
              <a className="text-sm font-medium text-white/80 transition-colors hover:text-white" href="https://my.feishu.cn/wiki/RBfCwreqliwPzbk0s27c9IpQnHd?fromScene=spaceOverview" target="_blank" rel="noreferrer">个人知识库</a>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a className="hidden text-sm font-medium text-white sm:inline" href="tel:18279738367">18279738367</a>
            <a className="liquid-glass rounded-full px-4 py-2 text-sm font-medium text-white sm:px-6" href="#contact">联系我</a>
          </div>
        </nav>
      </header>

      <div className="relative z-10 flex flex-1 -translate-y-[10%] flex-col items-center justify-center px-6 py-12 text-center md:-translate-y-[18%]">
        <p className="mb-4 text-xs uppercase tracking-[0.32em] text-white/55">AIGC Creator · FZC</p>
        <h1 className="display-serif hero-typing-title whitespace-nowrap text-[16vw] leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl" aria-label={HERO_TITLE}>
          <span aria-hidden="true">
            {typedPrefix}
            {typedAccent ? <em className="italic">{typedAccent}</em> : null}
            <span className="typing-caret" />
          </span>
        </h1>
        <a
          href="#work"
          className="liquid-glass mt-8 flex w-full max-w-xl items-center gap-3 rounded-full py-2 pl-6 pr-2 text-left sm:mt-10"
        >
          <span className="flex-1 text-sm text-white/70 sm:text-base">浏览 FZC 的个人作品</span>
          <span className="grid rounded-full bg-white p-3 text-black" aria-hidden="true">
            <ArrowRight className="h-5 w-5" />
          </span>
        </a>
        <p className="mt-5 max-w-xl px-4 text-sm leading-relaxed text-white/80">
          FZC 是一名 AIGC 创作者，专注于生成式影像、视觉实验与数字叙事，在技术与想象力之间寻找新的表达方式。
        </p>
        <a href="#about" className="liquid-glass mt-6 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5">
          了解我的创作
        </a>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-8 sm:pb-12">
        <a className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white" href="https://github.com/lebronfzc/myselfhtml" target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github className="h-5 w-5" />
        </a>
        <a className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white" href="#work" aria-label="作品集">
          <Instagram className="h-5 w-5" />
        </a>
        <a className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white" href="tel:18279738367" aria-label="拨打电话">
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
