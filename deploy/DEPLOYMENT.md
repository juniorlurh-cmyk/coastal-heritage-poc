# Deployment guide — free VPS + domain + routing

This site is a static React SPA: it builds to plain HTML/CSS/JS in `web/dist/`.
It can be hosted for **R0/month** on Oracle Cloud's Always Free tier, with a free
subdomain, free HTTPS, and self-hosted analytics. The only thing that can never be
free is a `.co.za` domain (~R99–R199/year) — see the domain section for free
alternatives.

---

## 1. Free VPS — Oracle Cloud Always Free

Oracle Cloud is the only major provider with a *permanent* free VPS tier (not a
trial). Two shapes are free forever:

| Shape | CPU | RAM | Notes |
|---|---|---|---|
| `VM.Standard.E2.1.Micro` | 1 AMD | 1 GB | Always available. Plenty for nginx + a static site. |
| `VM.Standard.A1.Flex` | up to 4 ARM | up to 24 GB | More power, but often "out of capacity" in busy regions — retry or pick E2.1.Micro. |

### Provision — automated (recommended)

See `deploy/iac/` — the whole stack is codified two ways:

- **`deploy/iac/cloudshell.sh`** — paste into OCI Cloud Shell (pre-authenticated
  browser CLI). Creates the VCN, security rules and VM with nginx installed.
- **`deploy/iac/terraform/`** — upload to OCI Resource Manager (Oracle's
  CloudFormation equivalent) and Apply.

Both tag every resource `Project=coastal-heritage, Tier=AlwaysFree` and print
the public IP + free `sslip.io` hostname when done.

### Provision — manual (alternative)

1. Sign up at `cloud.oracle.com` → Always Free account (a card is required for
   identity verification but is **not charged**).
2. **Create VM instance** → Image: *Ubuntu 24.04 (Minimal)* → Shape:
   `VM.Standard.E2.1.Micro` → upload your SSH public key.
3. In the VCN → Security List → add **Ingress Rules** for TCP `80` and `443`
   (source `0.0.0.0/0`). The free tier only allows traffic you explicitly open.
4. SSH in: `ssh ubuntu@<public-ip>`

### Harden & install nginx

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx ufw

sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

sudo mkdir -p /var/www/coastal-heritage
sudo chown -R ubuntu:ubuntu /var/www/coastal-heritage
```

Copy `deploy/nginx/coastal-heritage.conf` to
`/etc/nginx/sites-available/coastal-heritage`, edit `server_name`, then:

```bash
sudo ln -s /etc/nginx/sites-available/coastal-heritage /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

> **SPA routing:** the `try_files $uri $uri/ /index.html;` line in that config is
> what makes `/about`, `/services`, `/projects`, `/contact` work as real URLs.
> Without it, refreshing on any route other than `/` returns nginx 404.

## 2. Domain — honest options

There is **no legitimately free `.co.za` domain**. Pick one of these:

| Option | Cost | Notes |
|---|---|---|
| `coastal-heritage.co.za` | ~R99–R199/yr | domains.co.za, Afrihost, HostAfrica. **Recommended** — a real local domain sells the pitch. |
| `coastalheritage.com` | ~R200–R350/yr | Namecheap, Cloudflare Registrar. |
| `yourname.eu.org` | Free | eu.org gives real delegated subdomains; approval can take days–weeks. |
| `*.pp.ua` | Free | nic.ua free Ukrainian subdomains, quick registration. |
| `freedns.afraid.org` | Free | Shared subdomains (e.g. `coastalheritage.mooo.com`) — fine for a demo, less professional. |
| `*.sslip.io` / `*.nip.io` | Free, instant | `coastal-heritage.<your-ip>.sslip.io` resolves to your IP automatically. Works with certbot. Good for staging. |

### DNS records

At your DNS provider, create:

```
A     @         <vps-public-ip>
A     www       <vps-public-ip>
A     analytics <vps-public-ip>   # for Umami (section 4)
```

## 3. Deploy the site

On your machine (Git Bash works):

```bash
cd web
npm ci
npm run build           # outputs web/dist/

# one-time or scripted upload (see deploy.sh):
scp -r -i ~/.ssh/your-key dist/* ubuntu@<vps-ip>:/var/www/coastal-heritage/
```

Then issue free HTTPS (requires the domain to be pointing at the VPS first):

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d coastalheritage.co.za -d www.coastalheritage.co.za
sudo certbot renew --dry-run   # auto-renewal is already scheduled
```

Certbot rewrites the nginx config to listen on 443 and redirect HTTP→HTTPS
automatically.

## 4. Analytics — self-hosted Umami (free, POPIA-friendly)

Umami is open-source, cookie-free analytics. Self-hosting it on the same VPS
means the site has **real analytics with zero trackers and zero monthly cost**
— and the data never leaves your server.

```bash
# install docker
sudo apt install -y docker.io docker-compose-v2 || sudo snap install docker
sudo usermod -aG docker ubuntu && newgrp docker

cd ~
mkdir umami && cd umami
# copy deploy/umami/docker-compose.yml here, create .env from .env.example
docker compose up -d
```

Then:

1. Copy `deploy/nginx/analytics.conf` to `sites-available/analytics`, set
   `server_name analytics.yourdomain`, enable it, and run
   `sudo certbot --nginx -d analytics.yourdomain`.
2. Log into `https://analytics.yourdomain` (default `admin` / `umami` — change
   immediately), create the website, copy the **website ID**.
3. Rebuild with tracking enabled:

```bash
cd web
VITE_UMAMI_URL=https://analytics.yourdomain.co.za \
VITE_UMAMI_WEBSITE_ID=<your-website-id> \
npm run build
```

The tracking script is only injected when both env vars are set — until then the
site ships with zero trackers (`src/components/Analytics.jsx`).

## 5. Pre-go-live checklist

The site is currently a **preview for the owner**. Before publishing:

- [ ] Owner approves the site (trading name, address, services, hours, email)
- [ ] Replace representative photos with real job photos
- [ ] Confirm the real email address (currently `info@coastalheritage.co.za`)
- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from `web/index.html`
- [ ] Change `web/public/robots.txt` to `Allow: /`
- [ ] Remove the preview footnote in `src/components/Layout.jsx` footer
- [ ] Point the Google Business Profile website field at the new domain
- [ ] Submit sitemap in Google Search Console

## 6. Updating later

```bash
cd web && npm run build
scp -r -i ~/.ssh/your-key dist/* ubuntu@<vps-ip>:/var/www/coastal-heritage/
```

That's it — static files, no restart needed. `deploy/deploy.sh` automates this.
