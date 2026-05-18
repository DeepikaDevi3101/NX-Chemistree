import { REACTIONS_DB } from '../data/reactions'

export interface ReactionResult {
  is_valid: boolean
  equation?: string
  type?: string
  products?: string[]
  effects?: ('bubbling' | 'color_change' | 'smoke' | 'shake' | 'precipitate')[]
  heat?: 'exothermic' | 'endothermic' | 'neutral'
  warnings?: string[]
  explanation?: string
  follow_up?: string[]
}

export const simulateReaction = async (chem1: string, chem2: string): Promise<ReactionResult> => {
  // Simulate network latency for Gemma 4 processing
  await new Promise(resolve => setTimeout(resolve, 1500))

  const reaction = REACTIONS_DB.find(r => 
    (r.reactants[0] === chem1 && r.reactants[1] === chem2) ||
    (r.reactants[0] === chem2 && r.reactants[1] === chem1)
  )

  if (reaction) {
    return {
      is_valid: true,
      ...reaction
    }
  }

  return {
    is_valid: false,
    explanation: 'No significant reaction occurs under standard laboratory conditions between these two chemicals.',
  }
}
