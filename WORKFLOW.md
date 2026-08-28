# WORKFLOW.md

**Feature built twice:** A settings form (Profile, Preferences, Notifications & Privacy sections) for the FlyRank capstone app.

## Round 1 — Vague Prompt

**Prompt used:** `Make a settings form`

**What happened:** Cursor produced a working settings form with Profile, Preferences, and Notifications sections on the first pass — better than expected for a one-line prompt, because the AI filled in reasonable defaults on its own. However, during generation it initially wrote the component using `useState` + `useEffect` to sync form state from saved values, which is a well-known React anti-pattern (syncing state via effects instead of computing it directly or using a form library's built-in initial-values support). The AI caught this itself mid-session during a lint pass and refactored to `useState(loadSettings)`, but this rework only happened because I got lucky that a lint check ran — it was not something I asked for or verified myself.

There was no accessibility spec, no validation spec beyond "it validates name and email" in vague terms, and no tests. I had to manually open the browser and click through the form to see whether it actually worked.

**Time:** ~5 minutes for the AI to generate, plus about 10 minutes of me reading the code and manually testing in the browser to figure out what it actually did, since nothing was specified up front to verify against.

## Round 2 — Precise Prompt

**Prompt used:** A detailed prompt specifying the exact file (`src/components/SettingsForm.jsx`), all three sections field-by-field with types and validation rules, explicit constraints (react-hook-form + zod, controlled inputs only, labelled fields with `aria-describedby` on errors, no `useEffect` for syncing initial state), two example behaviors (invalid email message, auto-uppercase airport code), and a verification step requiring unit tests to be written and run before finishing.

**What happened:** The component was built using `react-hook-form` with `Controller` and Zod validation exactly as specified, with no `useEffect` anti-pattern this time because the prompt explicitly forbade it. Three Vitest + React Testing Library tests were written and run automatically, all passing (rendering, invalid-email error message, and localStorage save). The one gap: the AI wrote the component and its tests but forgot to actually wire `SettingsForm` into `App.jsx`, so the browser still showed the default Vite starter page until I caught this by checking the browser myself and asked for a follow-up fix. This is the one AI mistake I caught in this round — a working, tested component that was never actually rendered anywhere.

**Time:** The initial generation plus test-writing took about the same wall-clock time as Round 1 (~5–6 minutes), but my review time was much shorter — about 3 minutes to skim the diff and confirm the tests covered what I cared about, plus 2 minutes to catch and fix the missing `App.jsx` wiring. Total end-to-end time was faster than Round 1 despite the extra fix, because I wasn't guessing what the code did — the tests told me.

## Comparison

| | Round 1 (vague) | Round 2 (precise) |
|---|---|---|
| Correctness | Worked, but only after an unplanned self-correction | Worked as specified, verified by 3 passing tests |
| Accessibility | Not addressed at all | Explicit labels + `aria-describedby` on every error |
| Edge cases | Not specified; unclear what "validates" meant | Explicit: invalid email, lowercase airport code |
| Review effort | High — had to read all the code to know what it did | Low — tests told me what was verified, only needed to check the one thing tests couldn't catch (that it was actually rendered) |
| AI mistake caught | `useEffect` anti-pattern (self-corrected, not by my review) | Component never wired into `App.jsx` (I caught this) |

**The whole lesson, in one line:** Round 2 felt slower going in because the prompt took longer to write, but it was faster end-to-end — the vague round produced code I had to manually verify line-by-line, while the precise round produced code with tests that verified themselves, leaving me with exactly one real gap to catch instead of an unknown number of them.

## Rules Learned (added to `.cursorrules`)

1. Never use `useEffect` to sync form state from initial/saved values — use a form library's `defaultValues` (or compute derived state directly) instead.
2. Every form field must have a visible `<label>` linked via `htmlFor`/`id`, with validation errors shown inline via `aria-describedby` — accessibility is not optional and must be stated as a constraint, not assumed.
3. When a prompt asks for a new component, explicitly require it to be imported and rendered somewhere reachable in the app (e.g. in `App.jsx`) — "build X" does not imply "wire X up," and this is an easy thing for both a vague and a precise prompt to skip if not stated.