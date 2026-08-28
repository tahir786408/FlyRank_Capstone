import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const SETTINGS_STORAGE_KEY = 'settings'

const defaultValues = {
  displayName: '',
  email: '',
  homeAirport: '',
  unit: 'miles',
  defaultSort: 'Relevance',
  emailAlerts: false,
  rankChangeAlerts: false,
  publicProfile: false,
}

const settingsSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be between 2 and 50 characters')
    .max(50, 'Display name must be between 2 and 50 characters'),
  email: z.email('Please enter a valid email'),
  homeAirport: z
    .string()
    .regex(/^[A-Z]{3}$/, 'Enter a 3-letter IATA airport code'),
  unit: z.enum(['miles', 'kilometers']),
  defaultSort: z.enum(['Relevance', 'Date', 'Rating']),
  emailAlerts: z.boolean(),
  rankChangeAlerts: z.boolean(),
  publicProfile: z.boolean(),
})

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} role="alert">
      {message}
    </p>
  )
}

export default function SettingsForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  })

  function onSubmit(data) {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>Profile</legend>

        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <div>
              <label htmlFor="displayName">Display name</label>
              <input
                {...field}
                id="displayName"
                type="text"
                required
                aria-invalid={Boolean(errors.displayName)}
                aria-describedby={errors.displayName ? 'displayName-error' : undefined}
              />
              <FieldError id="displayName-error" message={errors.displayName?.message} />
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <label htmlFor="email">Email</label>
              <input
                {...field}
                id="email"
                type="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <FieldError id="email-error" message={errors.email?.message} />
            </div>
          )}
        />

        <Controller
          name="homeAirport"
          control={control}
          render={({ field }) => (
            <div>
              <label htmlFor="homeAirport">Home airport</label>
              <input
                {...field}
                id="homeAirport"
                type="text"
                required
                maxLength={3}
                autoComplete="off"
                aria-invalid={Boolean(errors.homeAirport)}
                aria-describedby={errors.homeAirport ? 'homeAirport-error' : undefined}
                onChange={(event) => field.onChange(event.target.value.toUpperCase())}
              />
              <FieldError id="homeAirport-error" message={errors.homeAirport?.message} />
            </div>
          )}
        />
      </fieldset>

      <fieldset>
        <legend>Preferences</legend>

        <Controller
          name="unit"
          control={control}
          render={({ field }) => (
            <fieldset>
              <legend>Units</legend>
              <div>
                <input
                  id="unit-miles"
                  type="radio"
                  name={field.name}
                  value="miles"
                  checked={field.value === 'miles'}
                  onChange={() => field.onChange('miles')}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  aria-invalid={Boolean(errors.unit)}
                  aria-describedby={errors.unit ? 'unit-error' : undefined}
                />
                <label htmlFor="unit-miles">Miles</label>
              </div>
              <div>
                <input
                  id="unit-kilometers"
                  type="radio"
                  name={field.name}
                  value="kilometers"
                  checked={field.value === 'kilometers'}
                  onChange={() => field.onChange('kilometers')}
                  onBlur={field.onBlur}
                  aria-invalid={Boolean(errors.unit)}
                  aria-describedby={errors.unit ? 'unit-error' : undefined}
                />
                <label htmlFor="unit-kilometers">Kilometers</label>
              </div>
              <FieldError id="unit-error" message={errors.unit?.message} />
            </fieldset>
          )}
        />

        <Controller
          name="defaultSort"
          control={control}
          render={({ field }) => (
            <div>
              <label htmlFor="defaultSort">Default sort</label>
              <select
                {...field}
                id="defaultSort"
                aria-invalid={Boolean(errors.defaultSort)}
                aria-describedby={errors.defaultSort ? 'defaultSort-error' : undefined}
              >
                <option value="Relevance">Relevance</option>
                <option value="Date">Date</option>
                <option value="Rating">Rating</option>
              </select>
              <FieldError id="defaultSort-error" message={errors.defaultSort?.message} />
            </div>
          )}
        />
      </fieldset>

      <fieldset>
        <legend>Notifications &amp; Privacy</legend>

        <Controller
          name="emailAlerts"
          control={control}
          render={({ field }) => (
            <div>
              <input
                id="emailAlerts"
                type="checkbox"
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                aria-invalid={Boolean(errors.emailAlerts)}
                aria-describedby={errors.emailAlerts ? 'emailAlerts-error' : undefined}
              />
              <label htmlFor="emailAlerts">Email alerts</label>
              <FieldError id="emailAlerts-error" message={errors.emailAlerts?.message} />
            </div>
          )}
        />

        <Controller
          name="rankChangeAlerts"
          control={control}
          render={({ field }) => (
            <div>
              <input
                id="rankChangeAlerts"
                type="checkbox"
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                aria-invalid={Boolean(errors.rankChangeAlerts)}
                aria-describedby={
                  errors.rankChangeAlerts ? 'rankChangeAlerts-error' : undefined
                }
              />
              <label htmlFor="rankChangeAlerts">Rank change alerts</label>
              <FieldError
                id="rankChangeAlerts-error"
                message={errors.rankChangeAlerts?.message}
              />
            </div>
          )}
        />

        <Controller
          name="publicProfile"
          control={control}
          render={({ field }) => (
            <div>
              <input
                id="publicProfile"
                type="checkbox"
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                aria-invalid={Boolean(errors.publicProfile)}
                aria-describedby={errors.publicProfile ? 'publicProfile-error' : undefined}
              />
              <label htmlFor="publicProfile">Public profile</label>
              <FieldError id="publicProfile-error" message={errors.publicProfile?.message} />
            </div>
          )}
        />
      </fieldset>

      <button type="submit">Save</button>
      <button type="button" onClick={() => reset(defaultValues)}>
        Reset
      </button>
    </form>
  )
}
