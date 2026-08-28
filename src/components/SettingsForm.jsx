import { useState } from 'react'

const STORAGE_KEY = 'flyrank-settings'

const DEFAULTS = {
  displayName: '',
  email: '',
  homeAirport: '',
  distanceUnit: 'mi',
  defaultSort: 'rank',
  emailAlerts: true,
  rankChangeAlerts: true,
  publicProfile: false,
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULTS }
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function SettingsForm() {
  const [form, setForm] = useState(loadSettings)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus('')
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function validate(values) {
    const next = {}
    if (!values.displayName.trim()) {
      next.displayName = 'Display name is required.'
    }
    if (!values.email.trim()) {
      next.email = 'Email is required.'
    } else if (!isValidEmail(values.email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    return next
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('')
      return
    }

    const payload = {
      ...form,
      displayName: form.displayName.trim(),
      email: form.email.trim(),
      homeAirport: form.homeAirport.trim().toUpperCase(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setForm(payload)
    setStatus('Settings saved.')
  }

  function handleReset() {
    setForm({ ...DEFAULTS })
    setErrors({})
    setStatus('')
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Profile</legend>
        <div className="field">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            autoComplete="name"
            value={form.displayName}
            onChange={(e) => updateField('displayName', e.target.value)}
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={errors.displayName ? 'displayName-error' : undefined}
          />
          {errors.displayName ? (
            <p id="displayName-error" className="field-error" role="alert">
              {errors.displayName}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="field-error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="homeAirport">Home airport (IATA)</label>
          <input
            id="homeAirport"
            name="homeAirport"
            type="text"
            maxLength={3}
            placeholder="JFK"
            value={form.homeAirport}
            onChange={(e) =>
              updateField('homeAirport', e.target.value.replace(/[^a-zA-Z]/g, ''))
            }
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Preferences</legend>
        <div className="field">
          <label htmlFor="distanceUnit">Distance unit</label>
          <select
            id="distanceUnit"
            name="distanceUnit"
            value={form.distanceUnit}
            onChange={(e) => updateField('distanceUnit', e.target.value)}
          >
            <option value="mi">Miles</option>
            <option value="km">Kilometers</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="defaultSort">Default ranking sort</label>
          <select
            id="defaultSort"
            name="defaultSort"
            value={form.defaultSort}
            onChange={(e) => updateField('defaultSort', e.target.value)}
          >
            <option value="rank">Rank</option>
            <option value="price">Price</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend>Notifications & privacy</legend>
        <label className="check">
          <input
            type="checkbox"
            checked={form.emailAlerts}
            onChange={(e) => updateField('emailAlerts', e.target.checked)}
          />
          Email alerts for new rankings
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={form.rankChangeAlerts}
            onChange={(e) => updateField('rankChangeAlerts', e.target.checked)}
          />
          Notify me when a flight’s rank changes
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={form.publicProfile}
            onChange={(e) => updateField('publicProfile', e.target.checked)}
          />
          Make my ranking profile public
        </label>
      </fieldset>

      {status ? (
        <p className="form-status" role="status">
          {status}
        </p>
      ) : null}

      <div className="form-actions">
        <button type="submit">Save settings</button>
        <button type="button" className="secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  )
}
