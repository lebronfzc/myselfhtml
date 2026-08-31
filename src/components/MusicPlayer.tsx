import { ChevronDown, Music2 } from "lucide-react";
import { useState } from "react";

const NETEASE_EMBED_URL =
  "https://music.163.com/outchain/player?type=2&id=426881503&auto=0&height=66";

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6" aria-label="背景音乐">
      <div
        id="netease-bgm-panel"
        className={`absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-3xl border border-white/15 bg-black/80 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl transition duration-300 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="mb-3 flex items-center justify-between px-2 pt-1">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">Now playing</p>
            <p className="mt-1 text-sm text-white">Sparkle - movie ver.</p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setIsOpen(false)}
            aria-label="收起背景音乐播放器"
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <iframe
          className="block w-full rounded-2xl border-0 bg-white/95"
          src={NETEASE_EMBED_URL}
          width="100%"
          height="86"
          allow="autoplay; encrypted-media"
          loading="lazy"
          title="网易云音乐播放器：RADWIMPS《スパークル (movie ver.)》"
          tabIndex={isOpen ? 0 : -1}
        />
      </div>

      <button
        type="button"
        className="liquid-glass flex h-12 w-12 items-center justify-center gap-2 rounded-full px-0 text-sm font-medium text-white shadow-xl shadow-black/30 transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-14 sm:w-auto sm:px-5"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="netease-bgm-panel"
        aria-label={isOpen ? "收起背景音乐播放器" : "打开背景音乐播放器"}
      >
        <Music2 className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">BGM</span>
        <ChevronDown
          className={`hidden h-3.5 w-3.5 text-white/55 transition-transform sm:block ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
    </aside>
  );
}
