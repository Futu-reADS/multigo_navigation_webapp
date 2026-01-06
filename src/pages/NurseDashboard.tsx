import React from 'react'
import { useTranslation } from 'react-i18next'

export default function NurseDashboard() {
  const { t } = useTranslation()
  return (
    <div>
      <h2>{t('dashboards.nurse')}</h2>
      <p>Nurse placeholder content.</p>
    </div>
  )
}
