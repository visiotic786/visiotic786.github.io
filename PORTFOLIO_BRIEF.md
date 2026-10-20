# ============================================================
# MUHAMMAD ANAS — PORTFOLIO WEBSITE BRIEF
# Claude ko yeh file do as memory + instructions
# ============================================================

## 1. WHO IS THIS WEBSITE FOR?

**Name:** Muhammad Anas
**Title:** VFX Artist | 3D CGI Artist | Filmmaker | Graphic Designer
**Location:** Muzaffarabad, Azad Kashmir, Pakistan
**Email:** visiospectra786@gmail.com
**Phone/WhatsApp:** +92 317 5251823 (wa.me/923175251823)
**Experience:** 6+ years (freelance since 2020, 3 years at Softofix agency)
**Languages:** English (Fluent), Urdu (Native), Hindko (Native)
**Education:** Bachelor's Degree in progress (2022–2026, University of AJK), Pre-Engineering (2019–2021, Model Science College)
**Hobbies:** Reading Books, Designing, Video Games

---

## 2. WEBSITE DETAILS

**Live URL:** https://visiotic786.github.io
**GitHub Repo:** https://github.com/visiotic786/visiotic786.github.io.git
**Branch:** main
**Hosting:** GitHub Pages (free static hosting)
**Platform:** Windows (win32)
**Working Directory:** D:\OpenCode Projects\My Portfolio\visiotic786.github.io

### Files (kept minimal — 3 code files + 1 component):
- `index.html` — Main single-page website
- `styles.css` — All CSS (base, sections, modals, themes, enhancements)
- `script.js` — All JavaScript (nav, modals, YouTube API, particles, theme toggle, enhancements)
- `showreel.js` — Standalone `<graphic-showreel>` component (Shadow DOM isolated)
- `assets/resume.html` — Downloadable HTML resume
- `assets/resume.pdf` — Downloadable PDF resume
- `assets/profile.png` — Profile photo
- `assets/My Designs/` — 38 design images for the Designs section

> NOTE: The old `enhancements.css` and `enhancements.js` were **merged into `styles.css` / `script.js`**. Do not recreate them as separate files.

### Design System:
- **Font:** Inter (body) + Space Grotesk (headings) — Google Fonts
- **Icons:** Font Awesome 6.5.0 (CDN)
- **Primary Accent (dark):** #7c3aed (purple)
- **Primary Accent (light):** #d97706 (amber / yellow) with #f59e0b highlights
- **Style:** Two themes — dark purple theme + light warm-yellow theme
- **Theme Toggle:** Sun/moon button in the nav (`#themeToggle`). Theme stored in `localStorage` key `portfolio-theme`; falls back to `prefers-color-scheme`. `data-theme="light|dark"` is set on `<html>` before first paint (inline script in `<head>`).
- **Animations:** Custom cursor, particle canvas (theme-aware colors), typed text, scroll reveal, counter animation
- **Layout:** Single page with sections: Hero → About → Skills → Experience → Portfolio → Education → Languages/Hobbies → CV Download → Contact → Footer

---

## 3. SKILLS (with proficiency levels)

| Skill | Level | Percent |
|-------|-------|---------|
| Blender 3D | Expert | 95% |
| Adobe Photoshop | Expert | 95% |
| Adobe Illustrator | Expert | 92% |
| After Effects | Advanced | 88% |
| Premiere Pro | Advanced | 85% |
| Figma | Advanced | 85% |
| DaVinci Resolve | Advanced | 82% |
| EmberGen | Intermediate | 70% |

### Core Skills (from resume):
- **3D CGI** — Modeling, lighting, rendering in Blender
- **Visual Effects** — Compositing & simulation with After Effects and EmberGen
- **Filmmaking** — Video editing, color grading in Premiere Pro & DaVinci Resolve
- **Motion Graphics** — Titles, animated branding, social video content
- **Branding & Visual Identity** — Logos, identity systems, digital design
- **UI & Web Design** — Interface and website design with Adobe XD and Figma

---

## 4. WORK EXPERIENCE

1. **Web Designer & VFX Artist** — Softofix, Creative Agency (2022–2025)
   - VFX, 3D CGI, motion graphics for international clients (3 years)
   - Web interfaces in Adobe XD and Photoshop
   - Creative brief to final delivery

2. **Graphic Designer** — Freelance, Independent (2020–Present)
   - Branding, visual identity, digital design, VFX for international clients
   - Full workflow from concept to delivery

3. **Client Dealer** — Softofix, Creative Agency (2022–2025)
   - Managed national & international client relationships
   - Main point of contact between clients and creative team

---

## 5. PROJECTS (Portfolio Section — ONLY 2 real projects)

### Project 1: Kashmir's First Fantasy Film — VFX & CGI Glimpses
- **YouTube Video ID:** `zpDXjtl4hls`
- **Card data-category:** `3d`
- **Description:** A 5-year journey of creating Kashmir's first fantasy film using professional 3D CGI, VFX compositing, motion graphics, and cinematic color grading.
- **Tools used:** Blender 3D, After Effects, Premiere Pro, DaVinci Resolve, EmberGen, Photoshop, Illustrator
- **Detail modal:** Full 5-year case study with 8 sections covering all tools
- **Title wording CRITICAL:** Must be "Glimpses" — NOT "showreel", NOT "breakdown"
- **Thumbnail:** https://img.youtube.com/vi/zpDXjtl4hls/maxresdefault.jpg (fallback to hqdefault on error)

### Project 2: Madiotic — YouTube Channel
- **Channel ID:** `UCmCXdyQ-zh-mJEQcpq3d4Xg`
- **Card data-category:** `youtube`
- **Channel URL:** https://www.youtube.com/channel/UCmCXdyQ-zh-mJEQcpq3d4Xg?sub_confirmation=1
- **Channel Avatar:** https://yt3.googleusercontent.com/ytc/AIdro_mSYwn7SoRGrjr2NAUoVu17xOhA4g_9XmU1xywDzG5fbm0=s900-c-k-c0x00ffffff-no-rj
- **Live Stats:** 3.37K Subscribers, 57 Videos, 92.2K Views (via YouTube Data API)
- **RSS Feed for videos:** https://www.youtube.com/feeds/videos.xml?channel_id=UCmCXdyQ-zh-mJEQcpq3d4Xg
- **YouTube Data API Key:** AIzaSyAQWXYjD40-l-9LqQaYm-6Mde6AhwcMDCw
- **Tools in detail page:** Premiere Pro (editing), DaVinci Resolve (color grading), Photoshop (thumbnails), Illustrator (branding), After Effects (motion graphics)
- **Structure:** Channel header (gradient banner + circular avatar + subs + description + subscribe button) → 12 full videos grid (NO shorts) → inline video player → "View More" card linking to YouTube
- **Video thumbnails:** click → plays in inline embedded player (ytInlineFrame) with autoplay + scroll to player
- **Active video highlight:** `.yt-video-active` class on clicked thumbnail

#### Madiotic Videos (12 full videos, NO shorts):
| Video ID | Title | Views |
|----------|-------|-------|
| heXCfJPTP-k | The Mighty 12 HAZARI \| Leepa Valley | 1,857 |
| I6pTnEHmsb4 | 12 Hazari \| Leepa Valley \| Episode 02 | 760 |
| m816D5fWD3c | 12 Hazari \| Leepa Valley \| Episode 01 | 639 |
| 0d_PKDYAL3c | Neelum Valley \| Sharda \| Arangkel | 603 |
| WhzCzCUHerk | Sultan Almaas \| Exclusive Interview | 481 |
| s64fmaaEsuk | Cycling in Kashmir \| Sudhan Gali to Chakaar | 353 |
| uXNTX-8D8ek | Till My Heart Goes LA LA LA \| Ganga Choti | 343 |
| 6Ivq1PqWZTg | Cycling in Downhill Traffic \| Ganga Choti | 317 |
| ZFRMVdnZnsM | Taking Game Slow \| Paragliding | 297 |
| 25RSC7vhYkU | Dubai Tour Highlights \| UAE, KSA, BAH | 262 |
| w7InWvI-0i0 | Relaxing & Cycling \| Chakaar to Dhani | 258 |
| RFLsCGqXbK4 | Relaxing & Cycling Around Village | 181 |

#### REMOVED Shorts (do NOT add back):
- `--uKnQr2xRo` — 13 December 2023 (short)
- `iJVkdHtHD5k` — Golden Beach Bahrain (short)
- `BLjOraEefbU` — Downhill 12,000 ft (short)

---

## 6. IMPORTANT RULES & INSTRUCTIONS

### DO:
- ✅ Only include REAL, personal projects (no placeholder/fake projects)
- ✅ Keep the light/dark theme toggle working (`#themeToggle`, `data-theme` on `<html>`, localStorage key `portfolio-theme`). Light theme = cream + yellow/amber accent; dark theme = purple.
- ✅ Every change must be committed and pushed to GitHub after completion
- ✅ Push command: `git add . && git commit -m "message" && git -c http.version=HTTP/1.1 push origin main`
- ✅ Email links → `mailto:visiospectra786@gmail.com`
- ✅ Phone links → `https://wa.me/923175251823` (WhatsApp, opens WhatsApp)
- ✅ Video thumbnail click → inline embedded player (not separate modal for channel videos)
- ✅ Detail pages use modal (`projectModal`) with content injected from `projectDetails` object in script.js
- ✅ Real subscriber count via YouTube Data API (live update)
- ✅ Fallback static stats if API fails: 3.37K Subs, 57 Videos, 92.2K Views
- ✅ Responsive design for mobile

### DO NOT:
- ❌ NO Fiverr section (was added then removed by user request — do NOT re-add)
- ❌ NO fake/placeholder projects
- ❌ NO showreel or breakdown wording — use "Glimpses" for the fantasy film
- ❌ NO short videos in channel grid
- ❌ NO portfolio filter buttons (removed)
- ❌ NO breaking existing sections or layout

### Git Push Note:
- On slow networks, push may timeout — use `git -c http.version=HTTP/1.1 push origin main` and increase timeout

---

## 7. PENDING / FUTURE WORK

1. **Design Images Gallery** — User has thousands of real graphics/logo design images. Plan:
   - Select best 15–20 images
   - Place in `assets/gallery/` folder
   - Build gallery section with lightbox, categories, lazy loading
   - Show which tools were used for each design (Photoshop, Illustrator, etc.)
   - Show how each design was made (short description)

2. **Social media links** — Currently placeholder `#` links for Facebook, Instagram, LinkedIn, Behance, Dribbble — need real URLs

---

## 8. CONTACT FORM

- Uses **Web3Forms** for email delivery
- Form action: `https://api.web3forms.com/submit`
- Access Key: `433bc392-239a-4c3d-bd81-01cb31ee3b65`
- Fields: Name, Email, Subject, Message

---

## 9. TECH STACK SUMMARY

```
- HTML5 (semantic, single page)
- CSS3 (custom properties, grid, flexbox, animations, responsive)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Inter + Space Grotesk)
- Font Awesome 6.5.0
- YouTube Data API v3 (live channel stats)
- YouTube RSS Feed (video list)
- Web3Forms (contact form)
- GitHub Pages (hosting)
```

---

## 10. WHAT THE USER SPEAKS

- **Language:** Roman Urdu (write responses in Roman Urdu)
- **Tone:** Friendly, casual ("bhai" style)
- Always respond in Roman Urdu when communicating with this user
