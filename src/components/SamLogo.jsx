import React, { useState } from 'react';

/**
 * SAM Perfumes brand logo.
 * Uses the real logo image (/logo.png) with an SVG fallback.
 * Save your logo image as `public/logo.png` to enable it.
 */
export default function SamLogo({ size = 52, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <img
        src="/logo.png"
        alt="Sam Perfumes Logo"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain', borderRadius: '50%' }}
        onError={() => setImgFailed(true)}
      />
    );
  }

  // SVG fallback — mirrors the circular gold brand emblem
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sam Perfumes Logo"
    >
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a1500"/>
          <stop offset="100%" stopColor="#0d0d0d"/>
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d87a"/>
          <stop offset="40%" stopColor="#d4af37"/>
          <stop offset="100%" stopColor="#b8860b"/>
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="110" cy="125" r="100" fill="url(#bgGrad)" stroke="url(#goldGrad)" strokeWidth="2.5"/>

      {/* Bottle neck / cap */}
      <rect x="97" y="14" width="26" height="7" rx="3.5" fill="url(#goldGrad)"/>
      <rect x="100" y="21" width="20" height="32" rx="3" fill="url(#goldGrad)"/>
      <rect x="104" y="24" width="5" height="25" rx="2.5" fill="rgba(255,255,255,0.15)"/>

      {/* SAM on cap */}
      <text x="110" y="38" textAnchor="middle" fontFamily="Georgia,serif"
        fontSize="9" fontWeight="bold" fill="#0d0d0d" letterSpacing="1.5">SAM</text>

      {/* Main calligraphy body — large sweeping Arabic-style flame shapes */}
      {/* Left sweeping petal */}
      <path d="M110 62 C88 78 66 105 70 135 C74 160 94 178 110 186
               C96 175 80 158 78 135 C76 108 96 80 110 62Z"
        fill="url(#goldGrad)" opacity="0.9"/>

      {/* Right sweeping petal */}
      <path d="M110 62 C132 78 154 105 150 135 C146 160 126 178 110 186
               C124 175 140 158 142 135 C144 108 124 80 110 62Z"
        fill="url(#goldGrad)" opacity="0.9"/>

      {/* Central bold stroke — the ا (alif) form */}
      <path d="M110 58 C104 80 102 105 104 130 C106 152 110 170 110 186
               C110 170 114 152 116 130 C118 105 116 80 110 58Z"
        fill="url(#goldGrad)"/>

      {/* Inner shadow on central stroke */}
      <path d="M110 70 C106 90 105 112 107 133 C108 150 110 165 110 180
               C110 165 112 150 113 133 C115 112 114 90 110 70Z"
        fill="#0d0d0d" opacity="0.25"/>

      {/* Small decorative diacritics — left side */}
      <path d="M78 108 Q74 113 77 118" stroke="url(#goldGrad)" strokeWidth="1.8"
        fill="none" strokeLinecap="round"/>
      <path d="M72 130 Q69 136 73 140" stroke="url(#goldGrad)" strokeWidth="1.5"
        fill="none" strokeLinecap="round" opacity="0.7"/>
      <circle cx="82" cy="98" r="2.2" fill="url(#goldGrad)" opacity="0.7"/>

      {/* Small decorative diacritics — right side */}
      <path d="M142 108 Q146 113 143 118" stroke="url(#goldGrad)" strokeWidth="1.8"
        fill="none" strokeLinecap="round"/>
      <path d="M148 130 Q151 136 147 140" stroke="url(#goldGrad)" strokeWidth="1.5"
        fill="none" strokeLinecap="round" opacity="0.7"/>
      <circle cx="138" cy="98" r="2.2" fill="url(#goldGrad)" opacity="0.7"/>

      {/* Bottom curl */}
      <path d="M102 186 Q110 192 118 186" stroke="url(#goldGrad)" strokeWidth="2"
        fill="none" strokeLinecap="round"/>
    </svg>
  );
}
