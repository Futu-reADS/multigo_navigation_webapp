import { vi } from 'vitest'
const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock
  }
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '../../src/pages/LoginPage'

describe('LoginPage', () => {
  beforeEach(() => {
    sessionStorage.clear()
    navigateMock.mockClear()
  })

  it('navigates to /admin when admin selected', async () => {
    render(<LoginPage />)

    await userEvent.click(screen.getByLabelText(/Admin/i) || screen.getByDisplayValue('admin'))
    await userEvent.click(screen.getByRole('button', { name: /進む|proceed/i }))

    expect(navigateMock).toHaveBeenCalledWith('/admin')
  })

  it('shows validation error when no role selected', async () => {
    render(<LoginPage />)
    await userEvent.click(screen.getByRole('button', { name: /進む|proceed/i }))
    expect(screen.getByText(/少なくとも1つのロールを選択してください|login\.validation\.required/)).toBeInTheDocument()
  })
})
