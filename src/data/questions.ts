export interface Question {
  id: string
  text: string
  options: string[]
  correctIndex: number
  difficulty: number // 1-5
  topic: 'Organic' | 'Inorganic' | 'Physical' | 'Acids & Bases'
  explanation: string
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'What is the functional group of an alcohol?',
    options: ['-CHO', '-OH', '-COOH', '-CO'],
    correctIndex: 1,
    difficulty: 1,
    topic: 'Organic',
    explanation: 'The hydroxyl group (-OH) is the characteristic functional group of alcohols.'
  },
  {
    id: 'q2',
    text: 'Which of these is a strong acid?',
    options: ['CH₃COOH', 'H₂CO₃', 'HCl', 'NH₃'],
    correctIndex: 2,
    difficulty: 1,
    topic: 'Acids & Bases',
    explanation: 'Hydrochloric acid (HCl) completely dissociates in water, making it a strong acid.'
  },
  {
    id: 'q3',
    text: 'In an exothermic reaction, heat is:',
    options: ['Absorbed', 'Released', 'Not involved', 'Stored as potential energy'],
    correctIndex: 1,
    difficulty: 2,
    topic: 'Physical',
    explanation: 'Exothermic reactions release energy, usually in the form of heat, to the surroundings.'
  },
  {
    id: 'q4',
    text: 'What is the oxidation state of Oxygen in most compounds?',
    options: ['0', '+1', '-1', '-2'],
    correctIndex: 3,
    difficulty: 2,
    topic: 'Inorganic',
    explanation: 'Oxygen typically gains two electrons to achieve a stable octet, resulting in a -2 oxidation state.'
  },
  {
    id: 'q5',
    text: 'Which element has the highest electronegativity?',
    options: ['Oxygen', 'Chlorine', 'Fluorine', 'Nitrogen'],
    correctIndex: 2,
    difficulty: 3,
    topic: 'Inorganic',
    explanation: 'Fluorine is the most electronegative element on the periodic table.'
  },
  {
    id: 'q6',
    text: 'What is the hybridization of carbon in methane (CH₄)?',
    options: ['sp', 'sp²', 'sp³', 'dsp²'],
    correctIndex: 2,
    difficulty: 3,
    topic: 'Organic',
    explanation: 'Carbon in methane forms four single bonds, requiring sp³ hybridization for a tetrahedral geometry.'
  },
  {
    id: 'q7',
    text: 'According to Le Chatelier’s principle, increasing pressure on a gaseous system will shift the equilibrium towards:',
    options: ['The side with more moles of gas', 'The side with fewer moles of gas', 'The reactants', 'The products'],
    correctIndex: 1,
    difficulty: 4,
    topic: 'Physical',
    explanation: 'Increasing pressure favors the side with a lower volume (fewer moles of gas) to relieve the stress.'
  },
  {
    id: 'q8',
    text: 'What is the pH of a 0.001 M solution of NaOH?',
    options: ['3', '11', '7', '14'],
    correctIndex: 1,
    difficulty: 4,
    topic: 'Acids & Bases',
    explanation: '[OH-] = 10⁻³, so pOH = 3. Since pH + pOH = 14, pH = 11.'
  },
  {
    id: 'q9',
    text: 'Which of the following is an intensive property?',
    options: ['Mass', 'Volume', 'Density', 'Heat capacity'],
    correctIndex: 2,
    difficulty: 2,
    topic: 'Physical',
    explanation: 'Intensive properties, like density, do not depend on the amount of matter present.'
  },
  {
    id: 'q10',
    text: 'Benzene undergoes which type of reaction most readily?',
    options: ['Nucleophilic addition', 'Electrophilic substitution', 'Free radical addition', 'Elimination'],
    correctIndex: 1,
    difficulty: 5,
    topic: 'Organic',
    explanation: 'Due to its stable aromatic ring, benzene prefers electrophilic aromatic substitution over addition reactions.'
  }
]
