# Cringe & Racket website

A static website built with [Eleventy](https://www.11ty.dev/) with Home, About, Music, Gigs, Gallery, Contact and Ramblings pages.

## Structure

- `src/` – site source. Each page is HTML with a small front matter block (`title`, `description`) and only its `<main>` content.
- `src/_includes/base.njk` – shared page layout (head, script); `src/_includes/header.njk` – shared header.
- `src/_data/nav.json` – navigation links; add a page here to list it in the menu. The current page is highlighted automatically.
- `_site/` – build output (git-ignored), published to GitHub Pages.

Use `{{ '/path' | url }}` for links and assets so they work under any base path.

## Local development

```
npm install
npm start      # serve with live reload
npm run build  # build into _site/
```

## Deployment (GitHub Pages)

The workflow `.github/workflows/pages.yml` publishes the site on every push to `main`. It can also be started manually from the repository's **Actions** tab.

### 1. Enable GitHub Pages

1. In the repository, open **Settings > Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Ensure Actions are enabled under **Settings > Actions > General**.

No deployment secrets are required. The workflow uses the automatically provided `GITHUB_TOKEN` with Pages deployment permissions.

### 2. Deploy

Push to `main` or run **Deploy to GitHub Pages** from the **Actions** tab. After the first successful deployment, the site URL appears under **Settings > Pages** and in the workflow run summary. For this repository, the default URL is `https://sebastianrogers.github.io/cringe-and-racket-website/`.

## Custom domain (Reg 123 / GitHub Pages)

These steps point a domain registered or hosted with Reg 123 (e.g. `example.com`) at the GitHub Pages site. Replace `example.com` with your real domain.

### 1. Edit DNS records at Reg 123

1. Log in to Reg 123 and open **My Account > Domains**, then choose the domain and open **DNS Management** (the DNS/zone editor).
2. Remove any existing parking or conflicting `A`, `AAAA` or `CNAME` records for `@` and `www`.
3. Add these records for the apex domain (`example.com`):

   | Type | Host / Name | Value |
   |------|-------------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |

   Optionally add matching `AAAA` records for IPv6: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
4. Add a `www` record:

   | Type | Host / Name | Value |
   |------|-------------|-------|
   | CNAME | `www` | `sebastianrogers.github.io` |

5. Save the changes. Keep any existing `MX`/`TXT` records so email keeps working.

If the domain uses Reg 123's default nameservers, edit the records there. If it points at other nameservers, make the changes with whichever provider hosts the DNS.

### 2. Add the domain in GitHub

1. Open **Settings > Pages** in the repository.
2. Under **Custom domain**, enter the domain (use `www.example.com` if you want `www` as the main address) and click **Save**.
3. Optionally tick **Enforce HTTPS** once it becomes available (see step 4).

Because the site is deployed with GitHub Actions, no `CNAME` file is needed in the repository.

### Making both `yourdomain.com` and `www.yourdomain.com` work

Two things are needed, and both are required:

1. **Two sets of DNS records at Reg 123** (step 1 above). Each name needs its own record:
   - `yourdomain.com` (the "apex" or "root", Host `@`) uses the four `A` records.
   - `www.yourdomain.com` (Host `www`) uses the `CNAME` to `sebastianrogers.github.io`.
2. **One custom domain in GitHub** (step 2 above). In **Settings > Pages**, enter just one name, whichever you want as the main address:
   - Enter `yourdomain.com`: visitors to `www.yourdomain.com` are redirected to `yourdomain.com`.
   - Or enter `www.yourdomain.com`: visitors to `yourdomain.com` are redirected to `www.yourdomain.com`.

Do not enter both names in GitHub; it only accepts one. GitHub creates the redirect for the other name itself, provided its DNS record exists. Without the `www` `CNAME`, `www.yourdomain.com` fails to load; without the `A` records, `yourdomain.com` fails to load.

Example (main address `yourdomain.com`):

| Reg 123 record | Host | Value |
|----------------|------|-------|
| A (x4) | `@` | the four GitHub IPs listed above |
| CNAME | `www` | `sebastianrogers.github.io` |

GitHub Pages custom domain: `yourdomain.com`

### How GitHub knows which project to serve

The `CNAME` value (`sebastianrogers.github.io`) only sends traffic to GitHub's Pages servers; it doesn't name a project. GitHub picks the site by matching the requested hostname (`example.com` / `www.example.com`) against the **Custom domain** saved in a repository's **Settings > Pages**. That is why step 2 matters: this repository is the one that has claimed the domain, so it is served at the domain's root (without the `/cringe-and-racket-website/` path). A domain can be claimed by only one repository, and the `www` target must always be your account's `github.io` host, never include the repository name.

### TTL (time to live)

Use the default TTL Reg 123 offers, or `3600` (1 hour), for the `A`, `AAAA` and `CNAME` records. Use the same value for all of them. If you want changes to take effect quickly while setting up, drop it to `300` (5 minutes) beforehand, then raise it back to `3600` or higher (e.g. `86400`) once everything works. The old TTL must expire before a lowered value applies, so lower it well ahead of any planned change.

### 3. Wait for DNS to propagate

Changes can take from a few minutes to 24-48 hours. Check progress with `dig example.com +short` and `dig www.example.com +short`, or in **Settings > Pages**, which shows "DNS check successful" when ready.

### 4. Enable HTTPS

When the DNS check passes, GitHub provisions a certificate automatically (this can take up to an hour). Then tick **Enforce HTTPS** in **Settings > Pages**.

### "Enforce HTTPS is unavailable because a certificate has not yet been issued"

This message in **Settings > Pages** (e.g. for `cringeandracket.co.uk`) is normal straight after setting up a domain. GitHub issues the certificate (from Let's Encrypt) only once DNS resolves to GitHub Pages, and this can take from a few minutes up to 24 hours. To resolve it:

1. Confirm DNS is correct and has propagated: `dig cringeandracket.co.uk +short` should return the four GitHub IPs, and `dig www.cringeandracket.co.uk +short` should return `sebastianrogers.github.io` and GitHub IPs. Remove any extra `A`/`AAAA` records pointing elsewhere (a stray `AAAA` record is a common cause), and any `CAA` records that don't allow `letsencrypt.org`.
2. Wait, then refresh the Pages settings page. Once the DNS check succeeds, the certificate is requested automatically.
3. If it is still unavailable after 24 hours, force a retry: click **Remove** next to the custom domain, wait a minute, re-enter the domain, and **Save**. Re-check DNS afterwards.
4. When **Enforce HTTPS** becomes clickable, tick it.

Both `cringeandracket.co.uk` and `www.cringeandracket.co.uk` need correct DNS for the certificate to cover both.

### Troubleshooting

- "Domain is not properly configured": recheck the records above for typos and stray conflicting records.
- Site shows a Reg 123 parking page: old parking records are still present or DNS hasn't propagated yet.
- Reg 123 menu names may differ slightly; look for the DNS or zone editor for the domain.
