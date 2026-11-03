# cringe-and-racket-website
The web site for Cringe and racket

A static website (plain HTML/CSS, no build step) with Home, About Us, Events, Electronic Press Kit and Blog pages.
The repository root is published to GitHub Pages; no build step is required.

## Deployment (GitHub Pages)

The workflow `.github/workflows/pages.yml` publishes the site on every push to `main`. It can also be started manually from the repository's **Actions** tab.

### 1. Enable GitHub Pages

1. In the repository, open **Settings > Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Ensure Actions are enabled under **Settings > Actions > General**.

No deployment secrets are required. The workflow uses the automatically provided `GITHUB_TOKEN` with Pages deployment permissions.

### 2. Deploy

Push to `main` or run **Deploy to GitHub Pages** from the **Actions** tab. After the first successful deployment, the site URL appears under **Settings > Pages** and in the workflow run summary. For this repository, the default URL is `https://sebastianrogers.github.io/cringe-and-racket-website/`.
