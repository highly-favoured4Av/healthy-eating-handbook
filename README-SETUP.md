# Healthy Eating Handbook: landing page setup

1. **Connect checkout.** Open `js/config.js`, paste your Selar product link between the quotes of `CHECKOUT_URL`, and save. All "Get your copy" buttons will then use it. Until then, they show a "checkout is not connected yet" notice.
2. **Check the price.** `PRICE_DISPLAY` in `js/config.js` must match the price you set on Selar (currently ₦7,500).
3. **Upload the folder** to a host (Netlify, Vercel, GitHub Pages or your own hosting). `index.html` is the home page.
4. **Set the social image.** In `index.html`, replace the relative `og:image` path with the full https:// address of `assets/og-image.jpg`.
5. **Optional analytics.** Add your analytics snippet. The page already pushes these events to `window.dataLayer`: `checkout_click`, `sample_download`, `faq_open`, `community_click`, each with `hero_variant`.
6. **A/B test the hero.** Share `index.html?hero=a` and `index.html?hero=b`. Preview the navy theme with `?theme=navy`.
7. **Do not upload the paid files here.** The site hosts only the free sample chapter. Paid files are delivered by Selar.

A single-file copy (`Healthy-Eating-Landing-Page-Standalone.html`) is also provided. It has all styles, images and scripts built in; only the free sample PDF link points to a separate file.
