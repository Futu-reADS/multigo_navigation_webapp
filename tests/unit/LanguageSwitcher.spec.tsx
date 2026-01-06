import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../src/i18n'
import LanguageSwitcher from '../../src/components/LanguageSwitcher'
import LoginPage from '../../src/pages/LoginPage'

describe('LanguageSwitcher', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('ja')
  })

  it('switches between Japanese and English', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
        <LoginPage />
      </I18nextProvider>
    )

    // initial should be Japanese
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/ログイン|Login/)

    // switch to English
    await userEvent.click(screen.getByLabelText('lang-en'))
    await waitFor(() => expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Login'))

    // switch back to Japanese
    await userEvent.click(screen.getByLabelText('lang-ja'))
    await waitFor(() => expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('ログイン'))
  })
})