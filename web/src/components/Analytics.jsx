import { useEffect } from 'react';

/**
 * Privacy-friendly, cookie-free analytics (Umami).
 * Works with Umami Cloud free tier or any self-hosted Umami instance.
 *
 * Enable at build time:
 *   VITE_UMAMI_URL=https://cloud.umami.is   (or your own instance)
 *   VITE_UMAMI_WEBSITE_ID=xxxx-xxxx-xxxx
 *
 * Set them as repository Variables in GitHub (Settings → Variables → Actions)
 * and the Pages workflow picks them up automatically.
 * When unset the site ships with zero trackers.
 */
export default function Analytics() {
  useEffect(() => {
    const url = import.meta.env.VITE_UMAMI_URL;
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
    if (!url || !websiteId) return;
    const script = document.createElement('script');
    script.defer = true;
    script.src = `${url.replace(/\/$/, '')}/script.js`;
    script.setAttribute('data-website-id', websiteId);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return null;
}
