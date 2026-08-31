# Featured Video Carousel Design

## Goal

Turn the featured video card into a two-item carousel using the existing AI video and the uploaded 3D running-shoe video.

## Selected interaction

- Each slide starts automatically, muted and inline.
- When the active video ends, the carousel advances to the next slide on the right.
- A visible right-arrow button lets visitors advance immediately.
- Two compact indicators show which slide is active and allow direct selection.
- Changing slides remounts the video so the selected clip restarts reliably.

## Content

1. `AI视频` — the current `dream-video.mp4` presentation.
2. `3D跑鞋` — the uploaded video, compressed to a web-ready 1080p H.264 MP4 with its own poster frame.

## Performance and accessibility

The uploaded 4K file is about 325 MB, so it will be downscaled and compressed before entering the repository. Audio is removed because the carousel is intentionally muted and the page already has a separate BGM control. The next button and indicators receive explicit accessible labels, and the selected indicator exposes its current state.

