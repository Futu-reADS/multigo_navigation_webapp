import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUser } from '../hooks/useUser'

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setRole } = useUser()

  const [role, setLocalRole] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function proceed() {
    if (!role) {
      setError(t('login.validation.required'))
      return
    }
    setRole(role as 'admin' | 'nurse' | 'caregiver')
    navigate(`/${role}`)
  }

  return (
    <div>
      <h2>{t('login.title')}</h2>
      <label>
        {t('login.selectRoleLabel')}
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setLocalRole('admin')}
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="nurse"
              checked={role === 'nurse'}
              onChange={() => setLocalRole('nurse')}
            />
            Nurse
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="caregiver"
              checked={role === 'caregiver'}
              onChange={() => setLocalRole('caregiver')}
            />
            Caregiver
          </label>
        </div>
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={proceed}>{t('login.proceed')}</button>
    </div>
  )
}
