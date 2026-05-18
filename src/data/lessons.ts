export type Branch = 'Organic' | 'Inorganic' | 'Physical'
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Question {
  level: Difficulty
  question: string
  answer: string
  explanation: string
}

export interface PracticeProblem {
  problem: string
  solution: string
}

export interface RevisionCard {
  term: string
  definition: string
}

export interface VisualSupport {
  type: 'table' | 'flowchart' | 'diagram'
  data: {
    headers: string[]
    rows: string[][]
  }
}

export interface LessonContent {
  conceptLesson: string
  smartSummary: string[]
  visualSupport: VisualSupport[]
  qa: Question[]
  practiceProblems: PracticeProblem[]
  revisionCards: RevisionCard[]
  keyPoints: string[]
}

export interface LessonTopic {
  id: string
  title: string
  branch: Branch
  difficulty: Difficulty
  description: string
  content: LessonContent
}

export const LESSONS_SYLLABUS: LessonTopic[] = [
  {
    id: 'org-goc',
    title: 'General Organic Chemistry (GOC)',
    branch: 'Organic',
    difficulty: 'Beginner',
    description: 'Master the fundamental electronic effects and stability of intermediates.',
    content: {
      conceptLesson: `General Organic Chemistry (GOC) is the foundation of all organic reactions. It focuses on the electronic effects that dictate the reactivity and stability of molecules.

### 1. Inductive Effect (I-Effect)
The permanent displacement of sigma (σ) electrons along a saturated carbon chain due to the presence of an electronegative or electropositive group.
- **+I Effect:** Groups like alkyl (-CH₃, -C₂H₅) push electrons away.
- **-I Effect:** Groups like halogens (-Cl, -Br), nitro (-NO₂), and cyano (-CN) pull electrons toward them.

### 2. Resonance and Mesomeric Effect
Resonance involves the delocalization of pi (π) electrons or lone pairs. The Mesomeric Effect (M) is a permanent effect in a conjugated system.
- **+M Effect:** Groups that donate electrons to the system (e.g., -NH₂, -OH).
- **-M Effect:** Groups that withdraw electrons from the system (e.g., -NO₂, -CHO).

### 3. Hyperconjugation
Also known as the "No-bond resonance", it involve the delocalization of σ-electrons of a C-H bond with an adjacent empty p-orbital or π-system.`,
      smartSummary: [
        'Inductive effect is distance-dependent and decreases along the chain.',
        'Resonance provides greater stability than inductive effects.',
        'Carbocation stability: Tertiary > Secondary > Primary.',
        'Acid strength increases with -I and -M groups.'
      ],
      visualSupport: [
        {
          type: 'table',
          data: {
            headers: ['Electronic Effect', 'Nature', 'Electrons Involved'],
            rows: [
              ['Inductive', 'Permanent', 'Sigma (σ)'],
              ['Electromeric', 'Temporary', 'Pi (π)'],
              ['Resonance', 'Permanent', 'Pi (π) or Lone Pairs']
            ]
          }
        }
      ],
      qa: [
        {
          level: 'Beginner',
          question: 'Which effect is temporary and occurs only in the presence of a reagent?',
          answer: 'Electromeric Effect',
          explanation: 'The electromeric effect is a temporary displacement of pi electrons in a multiple bond toward one of the atoms when a reagent approaches.'
        },
        {
          level: 'Intermediate',
          question: 'Compare the stability of (CH₃)₃C⁺ and CH₃CH₂⁺.',
          answer: '(CH₃)₃C⁺ is more stable.',
          explanation: 'The tertiary carbocation has 9 alpha-hydrogens for hyperconjugation and more +I effect from three methyl groups compared to the primary carbocation.'
        }
      ],
      practiceProblems: [
        {
          problem: 'Arrange the following in increasing order of acid strength: CH₃COOH, ClCH₂COOH, Cl₂CHCOOH.',
          solution: 'CH₃COOH < ClCH₂COOH < Cl₂CHCOOH. The -I effect of chlorine atoms increases the stability of the carboxylate ion by dispersing the negative charge.'
        }
      ],
      revisionCards: [
        { term: 'Electrophile', definition: 'An electron-deficient species seeking a pair of electrons.' },
        { term: 'Nucleophile', definition: 'An electron-rich species seeking a positive center.' }
      ],
      keyPoints: ['Resonance > Hyperconjugation > Inductive Effect for stability.', 'Acid strength ∝ Stability of Conjugate Base.']
    }
  },
  {
    id: 'phy-thermo',
    title: 'Thermodynamics',
    branch: 'Physical',
    difficulty: 'Intermediate',
    description: 'Study energy changes, spontaneity, and the laws governing chemical reactions.',
    content: {
      conceptLesson: `Thermodynamics deals with the interrelation of heat and other forms of energy. In chemistry, we focus on enthalpy, entropy, and Gibbs free energy.

### First Law of Thermodynamics
Energy cannot be created or destroyed, only transformed. The mathematical expression is:
**ΔU = q + w**
where ΔU is the change in internal energy, q is heat added to the system, and w is work done on the system.

### Enthalpy (H)
The total heat content of a system at constant pressure. 
**ΔH = ΔU + PΔV**

### Second Law and Entropy (S)
The total entropy of an isolated system always increases over time. Spontaneity is determined by the Gibbs Free Energy.`,
      smartSummary: [
        'ΔG < 0: Spontaneous reaction.',
        'ΔG > 0: Non-spontaneous reaction.',
        'ΔG = 0: Equilibrium.',
        'Hess’s Law: Total enthalpy change is independent of the pathway.'
      ],
      visualSupport: [
        {
          type: 'table',
          data: {
            headers: ['Condition', 'Spontaneity'],
            rows: [
              ['ΔH < 0, ΔS > 0', 'Always Spontaneous'],
              ['ΔH > 0, ΔS < 0', 'Never Spontaneous'],
              ['ΔH < 0, ΔS < 0', 'Spontaneous at Low Temp'],
              ['ΔH > 0, ΔS > 0', 'Spontaneous at High Temp']
            ]
          }
        }
      ],
      qa: [
        {
          level: 'Beginner',
          question: 'What is an isolated system?',
          answer: 'A system that cannot exchange energy or matter with its surroundings.',
          explanation: 'In an isolated system, the boundary prevents any transfer of heat, work, or matter.'
        }
      ],
      practiceProblems: [
        {
          problem: 'Calculate ΔG for a reaction where ΔH = -100 kJ and ΔS = -200 J/K at 298K.',
          solution: 'ΔG = ΔH - TΔS. ΔG = -100,000 - (298 * -200) = -100,000 + 59,600 = -40,400 J or -40.4 kJ.'
        }
      ],
      revisionCards: [
        { term: 'Isothermal', definition: 'A process occurring at constant temperature (ΔT = 0).' },
        { term: 'Adiabatic', definition: 'A process where no heat is exchanged (q = 0).' }
      ],
      keyPoints: ['ΔG = ΔH - TΔS', 'For spontaneous processes, ΔS_total > 0.']
    }
  },
  {
    id: 'org-isomerism',
    title: 'Isomerism',
    branch: 'Organic',
    difficulty: 'Intermediate',
    description: 'Explore structural and stereoisomerism in organic molecules.',
    content: {
      conceptLesson: 'Isomerism is the phenomenon where compounds have the same molecular formula but different arrangements of atoms...',
      smartSummary: ['Structural isomers have different bonding connectivity.', 'Stereoisomers have the same connectivity but different spatial arrangements.'],
      visualSupport: [{ type: 'table', data: { headers: ['Type', 'Feature'], rows: [['Chain', 'Different skeleton'], ['Position', 'Different substituent position']] } }],
      qa: [],
      practiceProblems: [],
      revisionCards: [],
      keyPoints: ['Chiral centers lead to optical activity.']
    }
  },
  { id: 'org-mechanisms', title: 'Reaction Mechanisms', branch: 'Organic', difficulty: 'Advanced', description: 'Deep dive into polar and radical reaction pathways.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'org-hydrocarbons', title: 'Hydrocarbons', branch: 'Organic', difficulty: 'Beginner', description: 'Study of Alkanes, Alkenes, and Alkynes.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'org-alcohols', title: 'Alcohols, Phenols, Ethers', branch: 'Organic', difficulty: 'Intermediate', description: 'Oxygen-containing organic compounds.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'org-carbonyls', title: 'Aldehydes & Ketones', branch: 'Organic', difficulty: 'Intermediate', description: 'Carbonyl group chemistry.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'org-acids', title: 'Carboxylic Acids', branch: 'Organic', difficulty: 'Advanced', description: 'Acidic organic compounds.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'org-amines', title: 'Amines', branch: 'Organic', difficulty: 'Intermediate', description: 'Nitrogen-containing organic compounds.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'org-biomolecules', title: 'Biomolecules', branch: 'Organic', difficulty: 'Beginner', description: 'Carbohydrates, Proteins, and Nucleic Acids.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'org-polymers', title: 'Polymers', branch: 'Organic', difficulty: 'Beginner', description: 'Macromolecules and their industrial applications.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  
  // Inorganic
  { id: 'ino-atomic', title: 'Atomic Structure', branch: 'Inorganic', difficulty: 'Beginner', description: 'Quantum numbers and electronic configurations.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'ino-periodic', title: 'Periodic Table & Trends', branch: 'Inorganic', difficulty: 'Beginner', description: 'Classification of elements and recurring properties.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'ino-bonding', title: 'Chemical Bonding', branch: 'Inorganic', difficulty: 'Intermediate', description: 'Ionic, Covalent, and Metallic bonding models.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'ino-coordination', title: 'Coordination Compounds', branch: 'Inorganic', difficulty: 'Advanced', description: 'Complex salts and ligand field theory.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'ino-df-block', title: 'd-block & f-block Elements', branch: 'Inorganic', difficulty: 'Advanced', description: 'Transition and Inner-transition elements.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'ino-metallurgy', title: 'Metallurgy', branch: 'Inorganic', difficulty: 'Intermediate', description: 'Extraction and purification of metals.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'ino-analysis', title: 'Qualitative Analysis', branch: 'Inorganic', difficulty: 'Advanced', description: 'Salt analysis and ion identification.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },

  // Physical
  { id: 'phy-mole', title: 'Mole Concept', branch: 'Physical', difficulty: 'Beginner', description: 'Stoichiometry and concentration terms.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'phy-chem-eq', title: 'Chemical Equilibrium', branch: 'Physical', difficulty: 'Intermediate', description: 'Reversible reactions and Le Chatelier’s principle.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'phy-ionic-eq', title: 'Ionic Equilibrium', branch: 'Physical', difficulty: 'Advanced', description: 'pH, buffers, and solubility product.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'phy-electro', title: 'Electrochemistry', branch: 'Physical', difficulty: 'Advanced', description: 'Galvanic cells and Nernst equation.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'phy-kinetics', title: 'Chemical Kinetics', branch: 'Physical', difficulty: 'Advanced', description: 'Rate laws and activation energy.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } },
  { id: 'phy-solutions', title: 'Solutions & Colligative Properties', branch: 'Physical', difficulty: 'Intermediate', description: 'Ideal and non-ideal solutions.', content: { conceptLesson: '', smartSummary: [], visualSupport: [], qa: [], practiceProblems: [], revisionCards: [], keyPoints: [] } }
]
