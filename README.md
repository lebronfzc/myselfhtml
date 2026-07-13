# FZC Personal Home

Static personal homepage for FZC, inspired by the dynamic visual style of yoita.cn/home.

Open `index.html` directly or publish the repository with GitHub Pages.

## Backend admin system

This repository now includes a small Node.js backend for editing homepage content.

### Start locally

```bash
npm install
npm start
```

Then open:

- Homepage: http://localhost:3000/
- Admin panel: http://localhost:3000/admin/

### Editable content

The admin panel saves content into `data/site.json`, including:

- page title
- homepage main name
- portfolio button title and subtitle
- background image URL
- video title, note, and video path
- previous works shown after clicking the portfolio button
- upload/back button labels

Video uploads are saved under `assets/videos/` and the homepage config is updated automatically.

GitHub Pages can still serve the static homepage. The backend admin service needs to run locally or on a Node.js server when you want to edit content through the admin panel.
