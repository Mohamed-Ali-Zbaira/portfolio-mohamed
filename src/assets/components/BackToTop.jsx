import React, { useEffect, useState } from 'react';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [useImage, setUseImage] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut"
      title="Retour en haut"
      className={`fixed z-50 bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-opacity duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* ping / flash derrière le bouton */}
      <span className="absolute inline-flex w-12 h-12 rounded-full bg-blue-400 opacity-30 animate-ping"></span>
      <span className="absolute inline-flex w-12 h-12 rounded-full bg-blue-400 opacity-60"></span>

      {/* bouton principal: try image first, fallback to svg */}
      <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-400 hover:bg-blue-500 overflow-hidden">
        <img
          src="/images/back-to-top.png"
          alt="Retour en haut"
          className="w-6 h-6 object-contain z-10"
          onError={(e) => {
            e.target.style.display = 'none';
            setUseImage(false);
          }}
        />

        {!useImage && (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white z-10" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M3.293 9.293a1 1 0 011.414 0L10 14.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default BackToTop;
