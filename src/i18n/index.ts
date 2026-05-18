import { useCallback } from 'react'
import { useStore } from '../store/useStore'
import { en } from './translations/en.ts'
import { ta } from './translations/ta.ts'
import { hi } from './translations/hi.ts'
import { te } from './translations/te.ts'
import { ml } from './translations/ml.ts'
import { kn } from './translations/kn.ts'
import { mr } from './translations/mr.ts'
import { gu } from './translations/gu.ts'
import { bn } from './translations/bn.ts'
import type { TranslationKeys } from './translations/en.ts'
import { LANGUAGE_OPTIONS } from './types'
import type { LanguageCode } from './types'

export { LANGUAGE_OPTIONS }
export type { LanguageCode }

const translations: Record<string, TranslationKeys> = { en, ta, hi, te, ml, kn, mr, gu, bn }

/**
 * Access a nested key like "nav.home" from a translation object
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path // fallback: return the key itself
    }
  }
  return typeof current === 'string' ? current : path
}

/**
 * useTranslation hook — returns a `t(key)` function
 * that resolves the current language's translation.
 * Falls back to English if key is missing.
 */
export function useTranslation() {
  const language = useStore(state => state.language) as LanguageCode

  const t = useCallback((key: string): string => {
    const lang = translations[language] || translations.en
    const value = getNestedValue(lang as unknown as Record<string, unknown>, key)
    if (value !== key) return value
    // Fallback to English
    return getNestedValue(en as unknown as Record<string, unknown>, key)
  }, [language])

  return { t, language }
}
