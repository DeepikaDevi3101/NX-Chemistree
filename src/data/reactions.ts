export interface Chemical {
  id: string
  name: string
  formula: string
  state: 's' | 'l' | 'g' | 'aq'
  category: string
}

export const CHEMICAL_CATALOG: Chemical[] = [
  { id: 'hcl', name: 'Hydrochloric Acid', formula: 'HCl', state: 'aq', category: 'Acid' },
  { id: 'naoh', name: 'Sodium Hydroxide', formula: 'NaOH', state: 'aq', category: 'Base' },
  { id: 'h2o', name: 'Water', formula: 'H₂O', state: 'l', category: 'Neutral' },
  { id: 'na', name: 'Sodium Metal', formula: 'Na', state: 's', category: 'Alkali Metal' },
  { id: 'agno3', name: 'Silver Nitrate', formula: 'AgNO₃', state: 'aq', category: 'Salt' },
  { id: 'nacl', name: 'Sodium Chloride', formula: 'NaCl', state: 'aq', category: 'Salt' },
  { id: 'h2so4', name: 'Sulfuric Acid', formula: 'H₂SO₄', state: 'aq', category: 'Acid' },
  { id: 'koh', name: 'Potassium Hydroxide', formula: 'KOH', state: 'aq', category: 'Base' },
  { id: 'k', name: 'Potassium Metal', formula: 'K', state: 's', category: 'Alkali Metal' },
  { id: 'cu', name: 'Copper Metal', formula: 'Cu', state: 's', category: 'Transition Metal' },
  { id: 'hno3', name: 'Nitric Acid', formula: 'HNO₃', state: 'aq', category: 'Acid' },
  { id: 'mg', name: 'Magnesium Metal', formula: 'Mg', state: 's', category: 'Alkaline Earth Metal' },
  { id: 'cuso4', name: 'Copper(II) Sulfate', formula: 'CuSO₄', state: 'aq', category: 'Salt' },
  { id: 'fe', name: 'Iron Metal', formula: 'Fe', state: 's', category: 'Transition Metal' },
]

export interface Reaction {
  reactants: string[]
  equation: string
  type: string
  products: string[]
  effects: ('bubbling' | 'color_change' | 'smoke' | 'shake' | 'precipitate')[]
  heat: 'exothermic' | 'endothermic' | 'neutral'
  warnings: string[]
  explanation: string
  follow_up: string[]
}

export const REACTIONS_DB: Reaction[] = [
  {
    reactants: ['hcl', 'naoh'],
    equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
    type: 'Neutralization',
    products: ['Sodium Chloride', 'Water'],
    effects: ['color_change', 'shake'],
    heat: 'exothermic',
    warnings: ['Wear safety goggles', 'Reaction releases heat'],
    explanation: 'A classic acid-base neutralization forming salt and water.',
    follow_up: ['What is the pH of the resulting solution?']
  },
  {
    reactants: ['na', 'h2o'],
    equation: '2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)',
    type: 'Single Displacement',
    products: ['Sodium Hydroxide', 'Hydrogen Gas'],
    effects: ['bubbling', 'smoke', 'shake'],
    heat: 'exothermic',
    warnings: ['EXTREMELY HAZARDOUS', 'Explosion risk', 'Highly flammable hydrogen gas produced'],
    explanation: 'Sodium reacts violently with water to produce hydrogen gas and a basic solution.',
    follow_up: ['Why does the sodium float on water?']
  },
  {
    reactants: ['agno3', 'nacl'],
    equation: 'AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)',
    type: 'Double Displacement / Precipitation',
    products: ['Silver Chloride', 'Sodium Nitrate'],
    effects: ['precipitate', 'color_change'],
    heat: 'neutral',
    warnings: ['Silver compounds can stain skin'],
    explanation: 'Formation of white silver chloride precipitate.',
    follow_up: ['Is AgCl soluble in water?']
  },
  {
    reactants: ['mg', 'hcl'],
    equation: 'Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)',
    type: 'Single Displacement',
    products: ['Magnesium Chloride', 'Hydrogen Gas'],
    effects: ['bubbling', 'shake'],
    heat: 'exothermic',
    warnings: ['Hydrogen gas is flammable'],
    explanation: 'Magnesium reacts with acid to release hydrogen gas bubbles.',
    follow_up: ['How can you test for hydrogen gas?']
  },
  {
    reactants: ['fe', 'cuso4'],
    equation: 'Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)',
    type: 'Single Displacement',
    products: ['Iron(II) Sulfate', 'Copper'],
    effects: ['color_change'],
    heat: 'neutral',
    warnings: ['Handle copper sulfate with care'],
    explanation: 'Iron displaces copper from the sulfate solution, forming a reddish copper coating on the iron.',
    follow_up: ['Which metal is more reactive, Iron or Copper?']
  }
]
