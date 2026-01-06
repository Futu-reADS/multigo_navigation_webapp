import React from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' }
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language || 'ja'

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {languages.map((l) => (
        <button
          key={l.code}
          aria-label={`lang-${l.code}`}
          onClick={() => i18n.changeLanguage(l.code)}
          disabled={current.startsWith(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
