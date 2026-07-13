const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const multer = require("multer");

const app = express();
const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const dataPath = path.join(dataDir, "site.json");
const videoDir = path.join(rootDir, "assets", "videos");
const port = Number(process.env.PORT || 3000);

const defaultWorks = [
  {
    title: "梦境视频",
    year: "2026",
    type: "Video",
    description: "已上传的第一支代表作品。",
    media: "assets/videos/dream-video.mov",
    link: ""
  }
];

const defaultConfig = {
  site: {
    title: "FZC Personal Home",
    description: "FZC personal homepage and 2026 portfolio."
  },
  home: {
    name: "FZC",
    portfolioTitle: "2026 年作品集",
    portfolioSubtitle: "点击展开以往作品",
    backgroundImage: "https://freight.cargo.site/original/i/D3007205125060386413698112470986/8a9f72eb-313c-4f4e-b6df-657d2efac876-1.png"
  },
  video: {
    title: "梦境视频",
    note: "等待上传",
    publishedNote: "已发布",
    localPreviewNote: "本地预览",
    src: "assets/videos/dream-video.mov"
  },
  works: defaultWorks,
  labels: {
    uploadButton: "上传梦境视频",
    back: "返回"
  }
};

const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    try {
      await fs.mkdir(videoDir, { recursive: true });
      callback(null, videoDir);
    } catch (error) {
      callback(error);
    }
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".mp4";
    callback(null, `dream-video-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (/^video\/(mp4|webm|quicktime|x-m4v)$/.test(file.mimetype)) {
      callback(null, true);
      return;
    }
    callback(new Error("Only mp4, webm, mov, and m4v videos are supported."));
  }
});

function cleanText(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeWork(work = {}) {
  return {
    title: cleanText(work.title, "未命名作品"),
    year: cleanText(work.year, "2026"),
    type: cleanText(work.type, "Work"),
    description: cleanText(work.description, ""),
    media: cleanText(work.media, ""),
    link: cleanText(work.link, "")
  };
}

function normalizeConfig(input) {
  const source = input && typeof input === "object" ? input : {};
  const works = Array.isArray(source.works) && source.works.length
    ? source.works.map(normalizeWork)
    : defaultWorks;

  return {
    site: {
      title: cleanText(source.site?.title, defaultConfig.site.title),
      description: cleanText(source.site?.description, defaultConfig.site.description)
    },
    home: {
      name: cleanText(source.home?.name, defaultConfig.home.name),
      portfolioTitle: cleanText(source.home?.portfolioTitle, defaultConfig.home.portfolioTitle),
      portfolioSubtitle: cleanText(source.home?.portfolioSubtitle, defaultConfig.home.portfolioSubtitle),
      backgroundImage: cleanText(source.home?.backgroundImage, defaultConfig.home.backgroundImage)
    },
    video: {
      title: cleanText(source.video?.title, defaultConfig.video.title),
      note: cleanText(source.video?.note, defaultConfig.video.note),
      publishedNote: cleanText(source.video?.publishedNote, defaultConfig.video.publishedNote),
      localPreviewNote: cleanText(source.video?.localPreviewNote, defaultConfig.video.localPreviewNote),
      src: cleanText(source.video?.src, defaultConfig.video.src)
    },
    works,
    labels: {
      uploadButton: cleanText(source.labels?.uploadButton, defaultConfig.labels.uploadButton),
      back: cleanText(source.labels?.back, defaultConfig.labels.back)
    }
  };
}

async function readConfig() {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    return normalizeConfig(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await writeConfig(defaultConfig);
    return defaultConfig;
  }
}

async function writeConfig(config) {
  const normalized = normalizeConfig(config);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  return normalized;
}

app.use(express.json({ limit: "1mb" }));
app.use(express.static(rootDir));

app.get("/api/site", async (req, res, next) => {
  try {
    res.json(await readConfig());
  } catch (error) {
    next(error);
  }
});

app.put("/api/site", async (req, res, next) => {
  try {
    res.json(await writeConfig(req.body));
  } catch (error) {
    next(error);
  }
});

app.post("/api/video", upload.single("video"), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No video file uploaded." });
      return;
    }

    const config = await readConfig();
    const videoSrc = `assets/videos/${req.file.filename}`;
    const works = Array.isArray(config.works) && config.works.length
      ? [...config.works]
      : [...defaultWorks];
    works[0] = {
      ...works[0],
      title: req.body.title || config.video.title,
      type: "Video",
      media: videoSrc,
      description: req.body.note || config.video.publishedNote
    };

    const nextConfig = {
      ...config,
      video: {
        ...config.video,
        src: videoSrc,
        title: req.body.title || config.video.title,
        note: req.body.note || config.video.publishedNote
      },
      works
    };
    res.json(await writeConfig(nextConfig));
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: error.message || "Server error" });
});

app.listen(port, () => {
  console.log(`FZC admin service running at http://localhost:${port}`);
  console.log(`Admin panel: http://localhost:${port}/admin/`);
});
