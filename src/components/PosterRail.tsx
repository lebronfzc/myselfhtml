import { X } from "lucide-react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

const posterOrder = [1, 8, 4, 16, 10, 2, 18, 6, 17, 20, 7, 3, 9, 19, 5];
const posters = posterOrder.map((number) => `./assets/posters/poster-${String(number).padStart(2, "0")}.jpg`);

const posterStep = 178;
const posterGap = 14;
const step = posterStep + posterGap;
const cycle = posters.length * step;

function normalizeOffset(value: number) {
  if (value < cycle * 0.35 || value > cycle * 1.65) return cycle;
  return value;
}

export function PosterRail() {
  const [offset, setOffset] = useState(posters.length * step);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, offset: 0 });

  useEffect(() => {
    let frameId = 0;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const elapsed = Math.min(time - lastTime, 40);
      lastTime = time;
      if (!isDraggingRef.current) setOffset((current) => normalizeOffset(current + elapsed * 0.035));
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!selectedPoster) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPoster(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPoster]);

  const moveBy = (distance: number) => {
    setOffset((current) => normalizeOffset(current + distance));
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    moveBy((Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX) * 0.85);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: event.clientX, offset };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    setOffset(dragStartRef.current.offset - (event.clientX - dragStartRef.current.x));
  };

  return (
    <div
      className="poster-rail relative z-10 mt-auto overflow-hidden pb-5 pt-8"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => { isDraggingRef.current = false; }}
      onPointerCancel={() => { isDraggingRef.current = false; }}
      onPointerLeave={() => { isDraggingRef.current = false; }}
      aria-label="AI 海报作品集"
    >
      <div
        className="poster-rail-track flex w-max items-center gap-3.5"
        style={{
          transform: `translate3d(-${offset}px, 0, 0)`,
          transition: "none",
        }}
      >
        {[...posters, ...posters, ...posters].map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className="poster-rail-card shrink-0 overflow-hidden rounded-2xl bg-white/10"
            style={{ width: posterStep, height: 188 }}
            onClick={() => setSelectedPoster(src)}
            aria-label={`放大查看 AI 海报作品 ${index % posters.length + 1}`}
          >
            <img className="h-full w-full select-none object-cover" src={src} alt={`AI 海报作品 ${index % posters.length + 1}`} loading="lazy" decoding="async" draggable={false} />
          </button>
        ))}
      </div>

      {selectedPoster && typeof document !== "undefined"
        ? createPortal(
          <div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-5 backdrop-blur-md"
            role="presentation"
            onClick={() => setSelectedPoster(null)}
          >
            <motion.div
              className="relative flex max-h-[92vh] max-w-[92vw] items-center justify-center"
              role="dialog"
              aria-modal="true"
              aria-label="放大查看海报"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <img className="block max-h-[92vh] max-w-[92vw] h-auto w-auto rounded-2xl object-contain shadow-2xl" src={selectedPoster} alt="放大查看中的 AI 海报" />
              <button
                type="button"
                className="liquid-glass absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/15"
                onClick={() => setSelectedPoster(null)}
                aria-label="关闭海报预览"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </motion.div>
          </div>,
          document.body,
        )
        : null}
    </div>
  );
}
