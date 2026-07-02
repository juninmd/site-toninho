# AGENTS.md - site-toninho

## Tech Stack
- **Language:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Vanilla CSS (custom.css)
- **Build:** Static files, No bundler
- **CI/CD:** GitHub Actions + ArgoCD
- **Infra:** Docker (Nginx) + K3s

## Project Structure
```
├── index.html          # Main page
├── custom.css          # Styles
├── script.js           # JavaScript
├── fotoAntonio.jpg     # Profile photo
├── video.mp4           # Background video
├── Dockerfile          # Nginx container
├── netlify.toml        # Netlify config
├── _headers            # Security headers
├── _redirects          # URL redirects
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Crawler rules
├── package.json        # html-validate dep
└── SEO_KEYWORDS.md     # SEO keywords
```

## Commands
```bash
npm run build     # Copy files to dist/
npm test          # html-validate index.html
```

## URL
Production: https://site-toninho.antonio-code.duckdns.org
