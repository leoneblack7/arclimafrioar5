import { useEffect } from 'react';

export const SecurityHeaders = () => {
  useEffect(() => {
    // Only apply security measures in production
    if (process.env.NODE_ENV === 'production') {
      // Add security headers via meta tags
      const metaCSP = document.createElement('meta');
      metaCSP.httpEquiv = 'Content-Security-Policy';
      metaCSP.content = "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval';";
      document.head.appendChild(metaCSP);

      const metaXFrame = document.createElement('meta');
      metaXFrame.httpEquiv = 'X-Frame-Options';
      metaXFrame.content = 'SAMEORIGIN';
      document.head.appendChild(metaXFrame);

      const metaXContent = document.createElement('meta');
      metaXContent.httpEquiv = 'X-Content-Type-Options';
      metaXContent.content = 'nosniff';
      document.head.appendChild(metaXContent);

      // Check for HTTPS
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        console.warn('This site should be accessed over HTTPS for better security');
      }

      return () => {
        // Cleanup meta tags on unmount
        document.head.removeChild(metaCSP);
        document.head.removeChild(metaXFrame);
        document.head.removeChild(metaXContent);
      };
    }
  }, []);

  return null;
};