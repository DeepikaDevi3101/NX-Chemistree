import React from 'react'

interface LogoProps {
  variant?: 'icon' | 'full' | 'horizontal'
  size?: number
  className?: string
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 40,
  className = '',
}) => {
  // SVG Graphic Element
  const renderIcon = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
    >
      <defs>
        {/* Core Gradients */}
        <linearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00838F" />
        </linearGradient>

        <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2979FF" />
          <stop offset="100%" stopColor="#1565C0" />
        </linearGradient>

        <linearGradient id="navyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A237E" />
          <stop offset="100%" stopColor="#0D1137" />
        </linearGradient>

        <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#00897B" />
        </linearGradient>

        <linearGradient id="liquidGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1565C0" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1565C0" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1A237E" stopOpacity="0.2" />
        </linearGradient>

        <radialGradient id="electronGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Atomic Orbit Rings & Electrons */}
      <g className="orbits">
        {/* Left-to-Right diagonal orbit */}
        <ellipse
          cx="100"
          cy="125"
          rx="68"
          ry="22"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="2"
          transform="rotate(-25, 100, 125)"
          strokeDasharray="6 3"
          className="opacity-75"
        />
        {/* Right-to-Left diagonal orbit */}
        <ellipse
          cx="100"
          cy="125"
          rx="68"
          ry="22"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="2"
          transform="rotate(25, 100, 125)"
          strokeDasharray="6 3"
          className="opacity-75"
        />
        {/* Bottom stabilizing orbit ring */}
        <ellipse
          cx="100"
          cy="162"
          rx="32"
          ry="8"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="1.5"
          className="opacity-60"
        />

        {/* Orbit Electrons (Pulsing glowing spheres) */}
        <g className="electrons">
          {/* Electron Left */}
          <circle cx="34" cy="111" r="7" fill="url(#electronGlow)" className="animate-pulse" />
          <circle cx="34" cy="111" r="4" fill="#00E5FF" />

          {/* Electron Right */}
          <circle cx="166" cy="111" r="7" fill="url(#electronGlow)" className="animate-pulse" />
          <circle cx="166" cy="111" r="4" fill="#00E5FF" />

          {/* Electron Bottom */}
          <circle cx="100" cy="170" r="7" fill="url(#electronGlow)" className="animate-pulse" />
          <circle cx="100" cy="170" r="4" fill="#00E5FF" />
        </g>
      </g>

      {/* 2. Beaker / Flask Glass Structure */}
      <g className="beaker">
        {/* Inner Liquid with Wave */}
        <path
          d="M 64 125 C 76 120, 88 130, 100 125 C 112 120, 124 130, 136 125 C 141 129, 142 135, 142 144 C 142 155, 124 161, 100 161 C 76 161, 58 155, 58 144 C 58 135, 59 129, 64 125 Z"
          fill="url(#liquidGrad)"
        />

        {/* Floating Liquid Bubbles */}
        <circle cx="82" cy="142" r="3.5" fill="#FFF" opacity="0.6" className="animate-bubble-1" />
        <circle cx="100" cy="136" r="2.5" fill="#FFF" opacity="0.8" className="animate-bubble-2" />
        <circle cx="118" cy="144" r="3.5" fill="#FFF" opacity="0.5" className="animate-bubble-3" />

        {/* Growing Sapling/Plant inside Beaker */}
        <g className="sapling">
          {/* Main Stem */}
          <path
            d="M 100 158 Q 98 134, 100 112"
            fill="none"
            stroke="url(#emeraldGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Left Leaf */}
          <path
            d="M 100 134 C 91 132, 82 120, 84 110 C 93 110, 98 122, 100 134 Z"
            fill="url(#emeraldGrad)"
          />
          {/* Right Leaf */}
          <path
            d="M 100 122 C 109 120, 118 108, 116 98 C 107 98, 102 110, 100 122 Z"
            fill="url(#emeraldGrad)"
          />
        </g>

        {/* Glass Outer Outline */}
        <path
          d="M 88 78 L 88 100 C 88 108, 56 118, 56 142 C 56 158, 76 162, 100 162 C 124 162, 144 158, 144 142 C 144 118, 112 108, 112 100 L 112 78 Z"
          fill="none"
          stroke="url(#cyanGrad)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Top lip of the flask */}
        <rect
          x="83"
          y="72"
          width="34"
          height="6"
          rx="3"
          fill="url(#navyGrad)"
          stroke="url(#cyanGrad)"
          strokeWidth="2"
        />
      </g>

      {/* 3. Graduation Cap (Sitting on Neck) */}
      <g className="graduation-cap">
        {/* Support structure */}
        <path
          d="M 86 52 L 86 64 C 86 67, 114 67, 114 64 L 114 52 Z"
          fill="url(#navyGrad)"
          stroke="#00E5FF"
          strokeWidth="1.5"
        />

        {/* Diamond top plate */}
        <path
          d="M 100 24 L 158 44 L 100 64 L 42 44 Z"
          fill="url(#navyGrad)"
          stroke="#00E5FF"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
        />

        {/* Tassel assembly */}
        <circle cx="100" cy="44" r="4.5" fill="#00E5FF" />
        <path
          d="M 100 44 C 114 44, 136 49, 136 65"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="133" y="65" width="6" height="14" rx="1.5" fill="#00E5FF" />
      </g>
    </svg>
  )

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderIcon()}</div>
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderIcon()}
        <div className="flex flex-col">
          <div className="flex items-center text-xl font-black tracking-tighter uppercase leading-none">
            <span className="bg-gradient-to-r from-[#00E5FF] to-[#2979FF] bg-clip-text text-transparent">
              NX
            </span>
            <span className="text-slate-900 dark:text-white ml-1">
              Chemistree
            </span>
          </div>
          <span className="text-[8px] font-black tracking-widest text-slate-400 dark:text-gray-500 uppercase mt-0.5 leading-none">
            Learning Platform
          </span>
        </div>
      </div>
    )
  }

  // Variant === 'full'
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="mb-4">{renderIcon()}</div>
      <div className="text-3xl font-black tracking-tighter uppercase leading-none">
        <span className="bg-gradient-to-r from-[#00E5FF] to-[#2979FF] bg-clip-text text-transparent">
          NX
        </span>
        <span className="text-slate-900 dark:text-white ml-2">
          Chemistree
        </span>
      </div>
      <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent my-3 opacity-60" />
      <span className="text-[10px] font-bold tracking-[0.25em] text-slate-500 dark:text-gray-400 uppercase leading-normal px-4">
        Rooted in Science, Growing with Knowledge
      </span>
    </div>
  )
}
