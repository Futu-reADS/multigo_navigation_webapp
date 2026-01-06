import { useCallback } from 'react'

const STORAGE_KEY = 'multigo_user_role'

type Role = 'admin' | 'nurse' | 'caregiver' | null

export function getRole(): Role {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return (raw as Role) || null
  } catch {
    return null
  }
}

export function selectRole(role: Exclude<Role, null>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, role)
  } catch {
    // ignore
  }
}

export function clearRole() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function useUser() {
  const setRole = useCallback((role: Exclude<Role, null>) => {
    selectRole(role)
  }, [])

  return { setRole, getRole }
}
