import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import SettingsForm, { SETTINGS_STORAGE_KEY } from './SettingsForm.jsx'

describe('SettingsForm', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders all fields', () => {
    render(<SettingsForm />)

    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/home airport/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^miles$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^kilometers$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/default sort/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email alerts/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rank change alerts/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/public profile/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('shows an error message for an invalid email', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/^email$/i), 'not-an-email')
    await user.click(screen.getByRole('button', { name: /save/i }))

    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
    expect(localStorage.getItem(SETTINGS_STORAGE_KEY)).toBeNull()
  })

  it('saves valid data to localStorage on submit', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/display name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/^email$/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/home airport/i), 'jfk')
    await user.click(screen.getByLabelText(/^kilometers$/i))
    await user.selectOptions(screen.getByLabelText(/default sort/i), 'Date')
    await user.click(screen.getByLabelText(/email alerts/i))
    await user.click(screen.getByLabelText(/rank change alerts/i))
    await user.click(screen.getByLabelText(/public profile/i))
    await user.click(screen.getByRole('button', { name: /save/i }))

    expect(screen.queryByText('Please enter a valid email')).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY))).toEqual({
      displayName: 'Jane Doe',
      email: 'jane@example.com',
      homeAirport: 'JFK',
      unit: 'kilometers',
      defaultSort: 'Date',
      emailAlerts: true,
      rankChangeAlerts: true,
      publicProfile: true,
    })
  })
})
