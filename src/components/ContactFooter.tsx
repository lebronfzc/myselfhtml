import { ArrowUpRight, Phone } from "lucide-react";

export function ContactFooter() {
  return (
    <footer id="contact" className="bg-black px-6 pb-8 pt-8 md:pb-12">
      <div className="liquid-glass mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-3xl p-7 md:flex-row md:items-end md:p-10">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-white/40">联系 FZC</p>
          <h2 className="display-serif max-w-xl text-4xl leading-none text-white md:text-6xl">
            有合作想法，<em className="italic text-white/55">欢迎联系。</em>
          </h2>
        </div>
        <a href="tel:18279738367" className="liquid-glass flex items-center gap-4 rounded-full px-5 py-3 text-white">
          <Phone className="h-4 w-4" />
          <span className="text-sm">182 7973 8367</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-white/30">© 2026 FZC · AIGC Creator</p>
    </footer>
  );
}
