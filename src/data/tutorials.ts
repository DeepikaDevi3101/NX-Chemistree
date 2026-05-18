export interface Tutorial {
  id: string
  title: string
  description: string
  category: 'Organic' | 'Inorganic' | 'Physical' | 'Lab Skills'
  thumbnail: string
  duration: string
  videoUrl: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export const TUTORIALS: Tutorial[] = [
  {
    id: 't1',
    title: 'Difference Between Organic and Inorganic Compounds',
    description: 'Learn the essential differences between organic (carbon-based) and inorganic compounds with real-world examples.',
    category: 'Organic',
    thumbnail: '/tutorial_organic_inorganic.jpg',
    duration: '10:10',
    videoUrl: 'https://www.youtube.com/embed/lC57cJzM8OA',
    difficulty: 'Beginner'
  },
  {
    id: 't2',
    title: 'Acids VS Bases',
    description: 'A fun chemistry showdown explaining the properties of acidic and basic substances, and how the pH scale works.',
    category: 'Inorganic',
    thumbnail: '/tutorial_acids_bases.jpg',
    duration: '2:16',
    videoUrl: 'https://www.youtube.com/embed/1rj1oNl7hgU',
    difficulty: 'Beginner'
  },
  {
    id: 't3',
    title: 'The States of Matter',
    description: 'Explore the three classical states of matter - solids, liquids, and gases - and how molecules behave in each state.',
    category: 'Physical',
    thumbnail: '/tutorial_states_matter.jpg',
    duration: '2:16',
    videoUrl: 'https://www.youtube.com/embed/0QEfmelvnx0',
    difficulty: 'Beginner'
  },
  {
    id: 't4',
    title: 'Mixtures VS Solutions',
    description: 'Discover the difference between heterogeneous mixtures and homogeneous solutions in this fun chemistry lesson.',
    category: 'Physical',
    thumbnail: '/tutorial_mixtures_solutions.jpg',
    duration: '2:33',
    videoUrl: 'https://www.youtube.com/embed/c4sRpTQeyrQ',
    difficulty: 'Beginner'
  },
  {
    id: 't5',
    title: 'The pH Scale Explained',
    description: 'A simple guide to understanding pH levels, what makes solutions acidic or basic, and how to measure them.',
    category: 'Lab Skills',
    thumbnail: '/tutorial_ph_scale.png',
    duration: '2:25',
    videoUrl: 'https://www.youtube.com/embed/uz4BOhbyCSg',
    difficulty: 'Intermediate'
  }
]
