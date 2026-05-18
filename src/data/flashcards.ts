export type Category = 'Elements' | 'Chemical Reactions' | 'Acids & Bases' | 'Organic Chemistry' | 'Periodic Table' | 'Lab Safety'
export type Difficulty = 'Basic' | 'Moderate' | 'Advanced'

export interface Flashcard {
  id: string
  category: Category
  difficulty: Difficulty
  question: string // Chemical name or Question
  answer: string
  formula: string
  classification: string
  realWorldUse: string
  funFact: string
  safetyWarning?: string
}

export const FLASHCARDS_DATA: Flashcard[] = [
  // Elements
  {
    id: 'el-1',
    category: 'Elements',
    difficulty: 'Basic',
    question: 'Hydrogen',
    answer: 'The lightest element in the universe.',
    formula: 'H₂',
    classification: 'Non-metal',
    realWorldUse: 'Rocket fuel and ammonia production.',
    funFact: 'Hydrogen makes up about 75% of the baryonic mass of the universe.',
  },
  {
    id: 'el-2',
    category: 'Elements',
    difficulty: 'Moderate',
    question: 'Mercury',
    answer: 'A heavy, silvery d-block element.',
    formula: 'Hg',
    classification: 'Transition Metal',
    realWorldUse: 'Thermometers and barometers.',
    funFact: 'It is the only metal that is liquid at standard conditions for temperature and pressure.',
    safetyWarning: 'Highly toxic; can cause mercury poisoning if inhaled or touched.'
  },

  // Chemical Reactions
  {
    id: 'cr-1',
    category: 'Chemical Reactions',
    difficulty: 'Basic',
    question: 'Combustion',
    answer: 'Reaction of a substance with oxygen to produce heat and light.',
    formula: 'Fuel + O₂ → CO₂ + H₂O',
    classification: 'Exothermic',
    realWorldUse: 'Engine combustion and heating systems.',
    funFact: 'Fire is a form of rapid combustion.',
    safetyWarning: 'Always ensure proper ventilation to avoid carbon monoxide buildup.'
  },

  // Acids & Bases
  {
    id: 'ab-1',
    category: 'Acids & Bases',
    difficulty: 'Basic',
    question: 'Sulfuric Acid',
    answer: 'A highly corrosive strong mineral acid.',
    formula: 'H₂SO₄',
    classification: 'Strong Acid',
    realWorldUse: 'Car batteries and fertilizer manufacturing.',
    funFact: 'Known as the "King of Chemicals" due to its industrial importance.',
    safetyWarning: 'Causes severe skin burns and eye damage.'
  },

  // Organic Chemistry
  {
    id: 'oc-1',
    category: 'Organic Chemistry',
    difficulty: 'Moderate',
    question: 'Ethanol',
    answer: 'A volatile, flammable, colorless liquid.',
    formula: 'C₂H₅OH',
    classification: 'Alcohol',
    realWorldUse: 'Disinfectants, fuel, and alcoholic beverages.',
    funFact: 'Ethanol is produced by the fermentation of sugars by yeast.',
  },

  // Periodic Table
  {
    id: 'pt-1',
    category: 'Periodic Table',
    difficulty: 'Basic',
    question: 'Noble Gases',
    answer: 'Group 18 elements that are highly unreactive.',
    formula: 'Group 18 (He, Ne, Ar, etc.)',
    classification: 'Inert Gases',
    realWorldUse: 'Lighting (Neon) and atmosphere for welding (Argon).',
    funFact: 'Helium was discovered on the Sun before it was found on Earth.',
  },

  // Lab Safety
  {
    id: 'ls-1',
    category: 'Lab Safety',
    difficulty: 'Basic',
    question: 'Fume Hood',
    answer: 'A ventilated enclosure to limit exposure to hazardous fumes.',
    formula: 'N/A',
    classification: 'Safety Equipment',
    realWorldUse: 'Protecting chemists from toxic gases.',
    funFact: 'The first fume hoods were large wooden structures with chimneys.',
    safetyWarning: 'Never stick your head inside a fume hood while in use.'
  }
]
