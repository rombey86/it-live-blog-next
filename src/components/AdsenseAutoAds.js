// components/AdsenseAutoAds.js
import { useEffect } from 'react';

const AdsenseAutoAds = () => {
  useEffect(() => {
    // Prüfen, ob das AdSense-Skript bereits geladen wurde
    const isAdsenseLoaded = window.adsbygoogle && window.adsbygoogle.loaded;
    if (!isAdsenseLoaded) {
      const adsenseScript = document.createElement('script');
      adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      adsenseScript.async = true;
      adsenseScript.setAttribute('data-ad-client', process.env.NEXT_PUBLIC_ADSENSE_ID);
      document.body.appendChild(adsenseScript);
    }
  }, []);

  return null; // Da Auto-Anzeigen keine spezifischen Elemente benötigen, geben wir null zurück
};

export default AdsenseAutoAds;