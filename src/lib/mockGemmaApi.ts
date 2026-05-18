// @ts-ignore
import { askGemma } from '../services/gemmaService'
// @ts-ignore
import CHEMISTRY_LESSONS from '../data/chemistryLessons'
import { useStore } from '../store/useStore'
import { LANGUAGE_OPTIONS } from '../i18n/types'

export const simulateGemmaStream = async (
  prompt: string,
  onChunk: (chunk: string) => void,
  onComplete: () => void
) => {
  // Get active lesson from the store, or default to a prominent one if none are active
  const state = useStore.getState()
  const recentLessonId = state.recentLessons[0]
  
  let lessonTitle = "General Chemistry"
  let lessonOverview = "General chemistry principles and concepts."
  
  const allChapters = Object.values(CHEMISTRY_LESSONS).flat() as any[]
  const activeChapter = allChapters.find(c => c.id === recentLessonId) || allChapters[0]
  
  if (activeChapter) {
    lessonTitle = activeChapter.title
    lessonOverview = activeChapter.content?.overview || activeChapter.overview || ""
  }

  // Inject the language requirement into the prompt
  const selectedLang = LANGUAGE_OPTIONS.find(l => l.code === state.language)?.name || 'English'
  const promptWithLanguage = `[IMPORTANT INSTRUCTION: You MUST respond in ${selectedLang} language only. Ignore all other languages for your output.]\n\nUser Query: ${prompt}`

  // Call the actual AI Tutor service (which handles Ollama, Google API, or rich simulation fallback)
  const result = await askGemma(promptWithLanguage, lessonTitle, lessonOverview)
  const responseText = result.answer || "I'm sorry, I couldn't generate a reply. 🧪"

  // Simulate token/word-by-word streaming of the dynamic response
  const tokens = responseText.split(" ")
  let currentText = ""

  for (let i = 0; i < tokens.length; i++) {
    currentText += (i === 0 ? "" : " ") + tokens[i]
    onChunk(currentText)
    // Dynamic delay between 15ms and 45ms per token for a smooth and realistic experience
    await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 15))
  }

  onComplete()
}
