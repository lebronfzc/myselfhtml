# Featured Video Carousel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and deploy a two-video, auto-advancing featured carousel with an accessible right-arrow control.

**Architecture:** Store slide metadata in the featured-section component and render one keyed video at a time. Advance state from both the video's `ended` event and user controls. Keep media as optimized static assets served by Vite and GitHub Pages.

**Tech Stack:** React 18, TypeScript, Framer Motion, Tailwind CSS, FFmpeg, Vite, GitHub Pages

---

### Task 1: Prepare the uploaded media

**Files:**
- Create: `public/assets/videos/3d-running-shoe.mp4`
- Create: `public/assets/work-3d-running-shoe.jpg`

**Steps:**
1. Transcode the uploaded 4K source to silent 1080p H.264 with `faststart` metadata.
2. Extract a representative poster at 2 seconds.
3. Run `ffprobe` and confirm 1920×1080 H.264 output below GitHub's 100 MB file limit.

### Task 2: Implement carousel behavior

**Files:**
- Modify: `src/components/FeaturedVideoSection.tsx`

**Steps:**
1. Add typed metadata for the two featured slides.
2. Add active-index state and a reusable next-slide handler.
3. Replace the looping video with a keyed video that advances on `ended`.
4. Add the right-arrow control and direct-selection indicators.
5. Render each slide's title, description, source, and poster.

### Task 3: Verify and deploy

**Files:**
- Test: `src/components/FeaturedVideoSection.tsx`

**Steps:**
1. Run `npm run check` and expect a zero exit code.
2. Run `npm run build` and expect a successful Vite production build.
3. Preview desktop and mobile layouts; verify manual and end-of-video transitions.
4. Commit the carousel and optimized assets.
5. Push `main`, wait for GitHub Pages, and verify the production bundle contains `3D跑鞋`.

