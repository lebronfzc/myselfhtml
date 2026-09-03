import { ArrowDownRight, Mail, MessageCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BorderGlow from "./BorderGlow";

const contactEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactFooter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <footer ref={ref} id="contact" className="relative overflow-hidden bg-black px-6 py-20 md:py-28">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.35fr_0.65fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 110, scaleY: 0.86, filter: "blur(10px)", clipPath: "inset(0 0 100% 0)" }}
          animate={isInView ? { opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)" } : undefined}
          transition={{ duration: 1.25, ease: contactEase }}
          style={{ transformOrigin: "50% 100%" }}
        >
          <p className="mb-5 text-sm text-white/60">联系方式</p>
          <h2 className="max-w-4xl text-5xl font-semibold uppercase leading-[0.94] tracking-normal text-white sm:text-6xl md:text-7xl lg:text-8xl">
            LET&apos;S BUILD
            <br />
            BETTER <span className="contact-lime-text">VISUAL</span>
            <br />
            SYSTEMS <ArrowDownRight className="inline h-[0.72em] w-[0.72em] translate-y-[0.06em] stroke-[2.4]" aria-hidden="true" />
          </h2>
          <a
            href="mailto:3107967008@qq.com"
            className="contact-pill mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-black"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            联系我
          </a>
        </motion.div>

        <motion.div
          className="w-full max-w-sm justify-self-start md:justify-self-end"
          initial={{ opacity: 0, x: 80, y: 40, scale: 0.94, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
          transition={{ duration: 1.1, delay: 0.28, ease: contactEase }}
        >
          <BorderGlow className="contact-card w-full">
            <div className="p-7 md:p-8">
            <p className="mb-6 text-xs font-semibold uppercase text-[#caff33]">Contact</p>
            <motion.div
              className="space-y-4 text-sm text-white/70"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.16, delayChildren: 0.52 } },
              }}
            >
              <motion.a
                className="contact-row"
                href="mailto:3107967008@qq.com"
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: contactEase }}
              >
                <span>邮箱：3107967008@qq.com</span>
                <Mail className="h-4 w-4 text-white/45" aria-hidden="true" />
              </motion.a>
              <motion.div
                className="contact-row"
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: contactEase }}
              >
                <span>微信号：fzcxz04</span>
                <MessageCircle className="h-4 w-4 text-white/45" aria-hidden="true" />
              </motion.div>
            </motion.div>
            <p className="mt-8 text-[10px] font-medium text-white/35">Visual, Brand & AI Design</p>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
      <p className="relative mx-auto mt-16 max-w-6xl text-xs text-white/30">© 2026 FZC · AIGC Creator</p>
    </footer>
  );
}
