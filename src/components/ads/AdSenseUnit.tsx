'use client';

import { useEffect } from 'react';

const ADSENSE_CLIENT = 'ca-pub-8781821876227840';
const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_DISPLAY_SLOT || '1711490890';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSenseUnit({ className = '' }: { className?: string }) {
  useEffect(() => {
    if (!ADSENSE_SLOT) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Do not let blockers or AdSense timing errors break article rendering.
    }
  }, []);

  if (!ADSENSE_SLOT) return null;

  return (
    <div className={`my-8 w-full rounded-2xl border border-border bg-cream/40 p-4 ${className}`.trim()} aria-label="Publicidad">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
