import React from 'react'

interface MoleculeVisualizerProps {
  formula: string
  className?: string
}

const MOLECULE_SVGS: Record<string, React.ReactNode> = {
  'H₂O': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="20" fill="#FF1744" /> {/* Oxygen */}
      <circle cx="20" cy="80" r="12" fill="#FFFFFF" /> {/* Hydrogen */}
      <circle cx="80" cy="80" r="12" fill="#FFFFFF" /> {/* Hydrogen */}
      <line x1="50" y1="50" x2="20" y2="80" stroke="white" strokeWidth="4" />
      <line x1="50" y1="50" x2="80" y2="80" stroke="white" strokeWidth="4" />
      <text x="50" y="55" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">O</text>
      <text x="20" y="85" fontSize="8" textAnchor="middle" fill="black" fontWeight="bold">H</text>
      <text x="80" y="85" fontSize="8" textAnchor="middle" fill="black" fontWeight="bold">H</text>
    </svg>
  ),
  'HCl': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="70" cy="50" r="25" fill="#00E676" /> {/* Chlorine */}
      <circle cx="30" cy="50" r="12" fill="#FFFFFF" /> {/* Hydrogen */}
      <line x1="30" y1="50" x2="70" y2="50" stroke="white" strokeWidth="4" />
      <text x="70" y="55" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">Cl</text>
      <text x="30" y="55" fontSize="8" textAnchor="middle" fill="black" fontWeight="bold">H</text>
    </svg>
  ),
  'NaCl': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="40" cy="50" r="18" fill="#7C4DFF" /> {/* Sodium */}
      <circle cx="70" cy="50" r="22" fill="#00E676" /> {/* Chlorine */}
      <text x="40" y="55" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">Na+</text>
      <text x="70" y="55" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">Cl-</text>
    </svg>
  ),
  'NaOH': (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="30" cy="50" r="18" fill="#7C4DFF" /> {/* Sodium */}
      <circle cx="60" cy="50" r="18" fill="#FF1744" /> {/* Oxygen */}
      <circle cx="85" cy="50" r="10" fill="#FFFFFF" /> {/* Hydrogen */}
      <line x1="60" y1="50" x2="85" y2="50" stroke="white" strokeWidth="3" />
      <text x="30" y="55" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">Na+</text>
      <text x="60" y="55" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">O</text>
      <text x="85" y="55" fontSize="6" textAnchor="middle" fill="black" fontWeight="bold">H</text>
    </svg>
  ),
}

export const MoleculeVisualizer: React.FC<MoleculeVisualizerProps> = ({ formula, className }) => {
  const visual = MOLECULE_SVGS[formula] || (
    <div className="flex items-center justify-center w-full h-full bg-white/5 rounded-lg border border-white/10">
      <span className="text-white font-bold text-xl">{formula}</span>
    </div>
  )

  return (
    <div className={`w-32 h-32 ${className}`}>
      {visual}
    </div>
  )
}
