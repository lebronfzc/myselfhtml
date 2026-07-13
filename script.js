const marqueeImages = [
  "assets/work-01.png",
  "assets/work-02.png",
  "assets/work-03.png",
  "assets/work-04.png",
  "assets/work-05.png",
  "assets/work-06.png",
  "assets/work-07.png",
  "assets/work-08.png",
  "assets/work-09.png",
  "assets/work-10.png",
  "assets/work-11.png",
  "assets/work-12.png",
  "assets/work-13.png",
  "assets/work-14.png",
  "assets/work-15.png",
  "assets/work-16.png",
  "assets/work-17.png",
  "assets/work-18.png",
  "assets/work-19.png",
  "assets/work-20.png",
];

const projects = [
  {
    number: "01",
    category: "Client",
    name: "AIGC Collection",
    url: "https://www.zcool.com.cn/work/ZNzEyODc1MTI=.html",
    images: ["assets/work-01.png", "assets/work-04.png", "assets/work-19.png"],
  },
  {
    number: "02",
    category: "Personal",
    name: "AI Motion Lab",
    url: "https://www.zcool.com.cn/article/ZMTY4NDEyOA==.html",
    images: ["assets/work-09.png", "assets/work-11.png", "assets/work-12.png"],
  },
  {
    number: "03",
    category: "Case Study",
    name: "Creator Workflow",
    url: "https://www.zcool.com.cn/article/ZMTc2Nzg0NA==.html",
    images: ["assets/work-02.png", "assets/work-03.png", "assets/work-08.png"],
  },
];

const rows = document.querySelectorAll(".marquee-row");
const projectStack = document.querySelector("#project-stack");
const animatedText = document.querySelector("[data-animated-text]");
const fadeItems = document.querySelectorAll(".fade-in");
const magnets = document.querySelectorAll(".magnet");

function buildMarquee() {
  rows.forEach((row, rowIndex) => {
    const set = rowIndex === 0 ? marqueeImages.slice(0, 11) : marqueeImages.slice(10);
    row.innerHTML = [...set, ...set, ...set]
      .map(
        (src, index) => `
          <figure class="marquee-tile">
            <img src="${src}" alt="Portfolio preview ${index + 1}" loading="lazy" />
          </figure>
        `,
      )
      .join("");
  });
}

function buildProjects() {
  projectStack.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card-wrap">
          <div class="project-card" style="top: calc(clamp(84px, 9vw, 128px) + ${index * 28}px)">
            <div class="project-top">
              <span class="project-number">${project.number}</span>
              <span class="project-kicker">${project.category}</span>
              <h3 class="project-name">${project.name}</h3>
              <a class="live-button" href="${project.url}" target="_blank" rel="noreferrer">Live Project</a>
            </div>
            <div class="project-images">
              <div class="project-column">
                <figure class="project-image">
                  <img src="${project.images[0]}" alt="${project.name} detail 1" loading="lazy" />
                </figure>
                <figure class="project-image">
                  <img src="${project.images[1]}" alt="${project.name} detail 2" loading="lazy" />
                </figure>
              </div>
              <figure class="project-image">
                <img src="${project.images[2]}" alt="${project.name} hero" loading="lazy" />
              </figure>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function hydrateAnimatedText() {
  if (!animatedText) return;

  const text = animatedText.textContent.replace(/\s+/g, " ").trim();
  animatedText.innerHTML = [...text]
    .map((character) => `<span>${character === " " ? "&nbsp;" : character}</span>`)
    .join("");
}

function updateMarquee() {
  const section = document.querySelector(".marquee-section");
  if (!section) return;

  const offset = (window.scrollY - section.offsetTop + window.innerHeight) * 0.3;
  rows.forEach((row) => {
    const direction = row.dataset.direction;
    const translate = direction === "right" ? offset - 200 : -(offset - 200);
    row.style.transform = `translate3d(${translate}px, 0, 0)`;
  });
}

function updateAnimatedText() {
  if (!animatedText) return;

  const chars = animatedText.querySelectorAll("span");
  const rect = animatedText.getBoundingClientRect();
  const start = window.innerHeight * 0.8;
  const end = window.innerHeight * 0.2;
  const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height)));

  chars.forEach((char, index) => {
    const localStart = index / chars.length;
    const localEnd = (index + 12) / chars.length;
    const opacity = Math.min(1, Math.max(0.2, (progress - localStart) / (localEnd - localStart)));
    char.style.opacity = opacity.toFixed(3);
  });
}

function updateProjectScale() {
  const cards = document.querySelectorAll(".project-card");
  const total = cards.length;

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const targetScale = 1 - (total - 1 - index) * 0.03;
    const progress = Math.min(1, Math.max(0, (128 - rect.top) / 420));
    const scale = 1 - (1 - targetScale) * progress;
    card.style.transform = `scale(${scale.toFixed(3)})`;
  });
}

function updateScrollEffects() {
  updateMarquee();
  updateAnimatedText();
  updateProjectScale();
}

function setupFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "50px", threshold: 0 },
  );

  fadeItems.forEach((item) => observer.observe(item));
}

function setupMagnets() {
  magnets.forEach((magnet) => {
    const padding = Number(magnet.dataset.magnetPadding || 150);
    const strength = Number(magnet.dataset.magnetStrength || 3);
    const baseTransform = getComputedStyle(magnet).transform === "none" ? "" : getComputedStyle(magnet).transform;

    magnet.addEventListener("pointermove", (event) => {
      const rect = magnet.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding &&
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (!inside) return;

      const x = (event.clientX - (rect.left + rect.width / 2)) / strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) / strength;
      magnet.style.transition = "transform 0.3s ease-out";
      magnet.style.transform = `${baseTransform} translate3d(${x}px, ${y}px, 0)`;
    });

    magnet.addEventListener("pointerleave", () => {
      magnet.style.transition = "transform 0.6s ease-in-out";
      magnet.style.transform = baseTransform;
    });
  });
}

buildMarquee();
buildProjects();
hydrateAnimatedText();
setupFadeIn();
setupMagnets();
updateScrollEffects();

window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);
