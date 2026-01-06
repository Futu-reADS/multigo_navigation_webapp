import React from 'react'
import { useTranslation } from 'react-i18next'

export default function AdminDashboard() {
  const { t } = useTranslation()
  return (
    <div>
      <h2>{t('dashboards.admin')}</h2>
      <p>Admin placeholder content.</p>
    </div>
  )
}
