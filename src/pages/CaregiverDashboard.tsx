import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CaregiverDashboard() {
  const { t } = useTranslation()
  return (
    <div>
      <h2>{t('dashboards.caregiver')}</h2>
      <p>Caregiver placeholder content.</p>
    </div>
  )
}
