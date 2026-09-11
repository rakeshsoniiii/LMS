import React from 'react';

export function IsometricHeroGraphic() {
  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[480px] flex items-center justify-center select-none">
      <svg 
        viewBox="0 0 680 440" 
        className="w-full h-auto max-h-[480px] lg:max-h-[520px] xl:max-h-[580px] filter drop-shadow-2xl overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Isometric Drop Shadow */}
          <filter id="heroShadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#071a33" floodOpacity="0.22" />
          </filter>
          
          <filter id="cardFloat" x="-25%" y="-25%" width="160%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#071a33" floodOpacity="0.18" />
          </filter>

          <filter id="limeGlow" x="-30%" y="-30%" width="170%" height="170%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#c7f000" floodOpacity="0.45" />
          </filter>

          {/* Gradients */}
          <linearGradient id="slateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f2642" />
            <stop offset="100%" stopColor="#061324" />
          </linearGradient>

          <linearGradient id="limeCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d8fb28" />
            <stop offset="100%" stopColor="#b6dc05" />
          </linearGradient>

          <linearGradient id="whiteCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f7f6f1" />
          </linearGradient>
        </defs>

        {/* Ambient subtle lime haze */}
        <ellipse cx="380" cy="230" rx="270" ry="140" fill="#c7f000" fillOpacity="0.08" />

        {/* ========================================================== */}
        {/* 1. BASE DARK ISOMETRIC SLATE PLATFORM */}
        {/* ========================================================== */}
        <g filter="url(#heroShadow)">
          {/* Extrusion bottom rim / thickness */}
          <polygon points="340,115 630,245 630,265 340,400 60,250 60,230" fill="#020810" />
          
          {/* Main Slate Face */}
          <polygon points="340,95 630,230 340,380 60,235" fill="url(#slateGrad)" stroke="#1a385c" strokeWidth="1.5" />

          {/* Slate Isometric Grid Guide Lines */}
          <line x1="200" y1="165" x2="490" y2="305" stroke="#1f416c" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="270" y1="130" x2="560" y2="270" stroke="#1f416c" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="130" y1="200" x2="420" y2="340" stroke="#1f416c" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />

          <line x1="200" y1="310" x2="490" y2="165" stroke="#1f416c" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="130" y1="270" x2="420" y2="130" stroke="#1f416c" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="270" y1="345" x2="560" y2="200" stroke="#1f416c" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />

          {/* Grid Dots */}
          {[
            [170, 235], [210, 255], [250, 275], [290, 295],
            [200, 220], [240, 240], [280, 260], [320, 280],
            [230, 205], [270, 225], [310, 245], [350, 265]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.2" fill="#32669e" opacity="0.75" />
          ))}
        </g>

        {/* ========================================================== */}
        {/* 2. FLOATING WHITE CARD (TOP-LEFT): PHOTO / IMAGE FRAME */}
        {/* ========================================================== */}
        <g filter="url(#cardFloat)">
          {/* Card Extrusion */}
          <polygon points="175,86 310,148 310,158 175,96 75,138 75,128" fill="#d2d0c8" />
          {/* Card Top Face */}
          <polygon points="175,76 310,138 210,186 75,124" fill="url(#whiteCardGrad)" stroke="#ece9df" strokeWidth="1.2" />

          {/* Image Frame Canvas (Dark navy background) */}
          <polygon points="175,94 275,140 235,160 135,114" fill="#091b30" />
          {/* Sun disc inside photo */}
          <ellipse cx="205" cy="127" rx="7" ry="4.5" fill="#c7f000" />
          {/* Mountain silhouettes */}
          <polygon points="175,135 210,118 245,143 155,143" fill="#1b395c" />
          <polygon points="200,143 228,128 255,148 180,148" fill="#2d588a" />

          {/* Card text skeleton bars */}
          <polygon points="105,142 165,170 160,173 100,145" fill="#bcc1c5" />
          <polygon points="100,152 150,175 145,178 95,155" fill="#d9dcde" />
        </g>

        {/* ========================================================== */}
        {/* 3. FLOATING LIME '+' TILE (LEFT-CENTER) */}
        {/* ========================================================== */}
        <g filter="url(#limeGlow)">
          {/* 3D Thickness */}
          <polygon points="190,205 235,225 235,236 190,216 152,232 152,221" fill="#849f00" />
          {/* Face */}
          <polygon points="190,194 235,214 197,234 152,214" fill="url(#limeCardGrad)" stroke="#ecff66" strokeWidth="1.2" />
          
          {/* Dark Plus Symbol */}
          <line x1="187" y1="208" x2="200" y2="222" stroke="#071a33" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="180" y1="218" x2="207" y2="212" stroke="#071a33" strokeWidth="3.2" strokeLinecap="round" />
        </g>

        {/* ========================================================== */}
        {/* 4. FLOATING DARK ANALYTICS CARD WITH 3D BARS (CENTER-RIGHT) */}
        {/* ========================================================== */}
        <g filter="url(#cardFloat)">
          {/* Card Extrusion */}
          <polygon points="415,120 550,182 550,194 415,132 295,184 295,172" fill="#030c17" />
          {/* Card Face */}
          <polygon points="415,108 550,170 430,228 295,166" fill="#091b30" stroke="#1d4472" strokeWidth="1.5" />

          {/* Header line */}
          <line x1="330" y1="160" x2="385" y2="136" stroke="#2a588f" strokeWidth="2.5" strokeLinecap="round" />

          {/* --- 3D BAR 1: White Column --- */}
          <g>
            <polygon points="345,182 368,193 368,155 345,144" fill="#ffffff" />
            <polygon points="368,193 381,187 381,149 368,155" fill="#d0cec6" />
            <polygon points="345,144 368,155 381,149 358,138" fill="#f8f7f4" />
          </g>

          {/* --- 3D BAR 2: Lime Column (TALLEST - HIGHLIGHT) --- */}
          <g filter="url(#limeGlow)">
            {/* Front */}
            <polygon points="378,197 402,208 402,148 378,137" fill="url(#limeCardGrad)" />
            {/* Right side */}
            <polygon points="402,208 416,201 416,141 402,148" fill="#9bbd00" />
            {/* Top */}
            <polygon points="378,137 402,148 416,141 392,130" fill="#f3ff7a" />
          </g>

          {/* --- 3D BAR 3: White Column --- */}
          <g>
            <polygon points="415,214 438,225 438,180 415,169" fill="#ffffff" />
            <polygon points="438,225 451,218 451,173 438,180" fill="#d0cec6" />
            <polygon points="415,169 438,180 451,173 428,162" fill="#f8f7f4" />
          </g>
        </g>

        {/* ========================================================== */}
        {/* 5. FLOATING WHITE CARD WITH 3D DONUT CHART (BOTTOM-CENTER) */}
        {/* ========================================================== */}
        <g filter="url(#cardFloat)">
          {/* Card Extrusion */}
          <polygon points="320,240 440,296 440,307 320,251 225,293 225,282" fill="#cfcdc4" />
          {/* Card Face */}
          <polygon points="320,229 440,285 345,337 225,281" fill="url(#whiteCardGrad)" stroke="#e4e2d8" strokeWidth="1.2" />

          {/* 3D Donut Chart */}
          <g>
            {/* Outer isometric ellipse base */}
            <ellipse cx="332" cy="285" rx="36" ry="24" fill="#091b30" />
            
            {/* Slice 1: Vibrant Lime Sector */}
            <path d="M 332,261 A 36,24 0 0,1 368,285 L 344,285 A 12,8 0 0,0 332,277 Z" fill="#c7f000" />
            {/* Slice 2: Deep Navy Sector */}
            <path d="M 368,285 A 36,24 0 0,1 332,309 L 332,293 A 12,8 0 0,0 344,285 Z" fill="#071a33" />
            {/* Slice 3: Muted Grey Sector */}
            <path d="M 332,309 A 36,24 0 0,1 296,285 L 320,285 A 12,8 0 0,0 332,293 Z" fill="#d8d6cb" />
            {/* Center Cutout */}
            <ellipse cx="332" cy="285" rx="14" ry="9" fill="#ffffff" />
          </g>
        </g>

        {/* ========================================================== */}
        {/* 6. FLOATING LIME CARD WITH SPARKLINE WAVE (BOTTOM-RIGHT) */}
        {/* ========================================================== */}
        <g filter="url(#cardFloat)">
          {/* Card Extrusion */}
          <polygon points="505,240 610,288 610,298 505,250 420,288 420,278" fill="#8ca900" />
          {/* Card Face */}
          <polygon points="505,229 610,277 525,320 420,267" fill="url(#limeCardGrad)" stroke="#ecff66" strokeWidth="1.2" />

          {/* Sparkline wave */}
          <path 
            d="M 440,278 Q 465,260 485,288 T 525,278 T 565,293 T 595,282" 
            stroke="#071a33" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Sparkline nodes */}
          <circle cx="485" cy="288" r="3.2" fill="#071a33" />
          <circle cx="525" cy="278" r="3.5" fill="#071a33" />
          <circle cx="595" cy="282" r="3.2" fill="#071a33" />
        </g>

        {/* ========================================================== */}
        {/* 7. FLOATING TOP-RIGHT WIREFRAME MATRIX CARD */}
        {/* ========================================================== */}
        <g filter="url(#cardFloat)">
          {/* Top Face */}
          <polygon points="515,65 630,118 555,158 440,105" fill="#ffffff" stroke="#e0ded4" strokeWidth="1.2" opacity="0.95" />
          <line x1="465" y1="108" x2="525" y2="80" stroke="#071a33" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="480" y1="120" x2="570" y2="80" stroke="#d0cec2" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Mini matrix dots */}
          <circle cx="540" cy="115" r="2.2" fill="#071a33" opacity="0.6" />
          <circle cx="555" cy="122" r="2.2" fill="#071a33" opacity="0.6" />
          <circle cx="570" cy="129" r="2.2" fill="#071a33" opacity="0.6" />
          <circle cx="530" cy="122" r="2.2" fill="#071a33" opacity="0.6" />
          <circle cx="545" cy="129" r="2.2" fill="#071a33" opacity="0.6" />
          <circle cx="560" cy="136" r="2.2" fill="#071a33" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
