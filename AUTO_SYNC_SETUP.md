# Auto-Syncing New Instagram & TikTok Videos

Your portfolio is wired to load videos dynamically from `public/data/videos.json` (plus an optional real-time feed URL `VITE_LIVE_FEED_URL`) and automatically categorize every new post under the matching brand medallion using hashtags/mentions in the caption (e.g. `#abib`, `#celimax`, `#medicube`, `@arencia`, etc.).

Choose whichever sync workflow fits you best:

---

## Option 1 — Fully Automatic Every 6 Hours (Official APIs + GitHub Actions)

1. Push this repo to GitHub and deploy on Vercel, Netlify, or Cloudflare Pages.
2. In GitHub → **Settings → Secrets and variables → Actions**, add:
   - **Instagram (Meta Graph API for Creator/Business accounts):**
     - `IG_ACCESS_TOKEN` — Long-lived Instagram Graph API token
     - `IG_USER_ID` — Puja's Instagram Creator User ID (or `me`)
   - **TikTok (Official TikTok Display API v2):**
     - `TIKTOK_ACCESS_TOKEN` — TikTok Display API token
3. `.github/workflows/sync-social.yml` automatically runs every **6 hours** (and can be triggered manually anytime via **Actions → Auto-Sync Instagram & TikTok Videos → Run workflow**).
4. Whenever Puja posts a new brand Reel or TikTok, the bot:
   - Pulls the new video metadata
   - Downloads the cover image locally into `public/images/puja/` (so links never expire!)
   - Auto-categorizes it to the matching brand
   - Updates `public/data/videos.json` and commits → your host auto-redeploys!

---

## Option 2 — Zero-Code Real-Time Instagram Updates (Behold.so)

If you want new Instagram Reels to appear **live without any API token setup or rebuild**:
1. Connect `@ugcbypujatamang` to a free [Behold.so](https://behold.so/) JSON feed.
2. Add your feed URL to `.env` (or your Vercel/Netlify/Cloudflare environment variables):
   ```bash
   VITE_LIVE_FEED_URL=https://feeds.behold.so/YOUR_FEED_ID
   ```
3. The site will fetch new Instagram posts directly on load and auto-file them under the matching brand!

---

## Option 3 — Instant 1-Command Add (Zero Tokens Needed!)

To add any newly posted TikTok or Instagram URL immediately from your terminal:

```bash
# Auto-detects brand, title & downloads cover via official TikTok oEmbed API:
npm run add-video -- https://www.tiktok.com/@pooza946/video/YOUR_VIDEO_ID

# Or specify the brand explicitly for Instagram Reels:
npm run add-video -- https://www.instagram.com/ugcbypujatamang/reel/SHORTCODE/ abib
```

