# Prompting Fundamentals on Real Tasks v2

**Real task:** Building a registration/signup form and debugging it for validation issues.

---

## Baseline (Naive Prompt)

**Prompt:**
> "Build a registration form and check it for bugs."

**Output:** A polished registration form. The AI proactively found and fixed 10 bugs: password-toggle accidentally submitting the form, validation firing too early, stale confirm-password checks, whitespace-only names, double submission, missing `aria-invalid`/`aria-describedby`, missing `autocomplete` attributes, a disabled-submit-button trap, no focus management on failed submit, and `prefers-reduced-motion` not respected.

---

## Version 1 — Technique: Role Assignment

**Prompt:**
> "You are a senior front-end developer who specializes in accessibility and security. Build a registration form and check it for bugs."

**What changed / what improved:** Giving the AI a specific expert role pulled in a whole layer of concerns the baseline never touched — full WCAG accessibility (skip link, error summary with focus-jump, `aria-live` password strength) and real security thinking (honeypot field, common-password blocklist, client-side lockout, CSRF placeholder, CSP meta tag, safe `textContent` usage instead of `innerHTML`).

**What it didn't fix:** The form was still generic — no sense of who it was actually for.

---

## Version 2 — Technique: Context and Motivation

**Prompt:**
> "I'm building a registration form for a student learning platform (like FlyRank) where users are software engineering students signing up to track their AI-fluency progress. Most users are on mobile, many are first-time coders, and the platform needs to feel approachable, not corporate. Build a registration form and check it for bugs, keeping this audience and context in mind."

**What changed / what improved:** This is where the design philosophy actually shifted — not just added features. The AI dropped the corporate split-screen layout for a single mobile-first card, switched to a warm palette and encouraging copy, added an optional "coding experience" field, and even dropped the confirm-password field to reduce mobile friction. It also fixed real mobile-specific bugs: iOS auto-zoom on small fonts, undersized touch targets, wrong mobile keyboard type on the email field, and safe-area padding for notched phones.

**What it didn't fix:** Tone of individual error messages was still generic/technical.

---

## Version 3 — Technique: Few-Shot Examples

**Prompt:**
> "Build a registration form for a student learning platform and check it for bugs. Follow this exact tone and style for validation messages — for example, instead of a generic error like 'Invalid email', write something like: 'Hmm, that email doesn't look quite right — mind double-checking it?' Match this friendly, conversational tone for every error message and label in the form."

**What changed / what improved:** One concrete example was enough for the AI to generalize a whole tone pattern ("Hmm, [what's off] — mind [gentle ask]?") across every single label and error message in the form, consistently. It even correctly identified one exception on its own — the honeypot field's label stayed plain and instructional, since a real user should never read it.

**What it didn't fix:** The output was just code with inline comments — no structured breakdown of what was fixed vs. what was assumed.

---

## Version 4 — Technique: Output Structure

**Prompt:**
> "Build a registration form for a student learning platform with friendly validation messages, and check it for bugs. Structure your response in this exact order: (1) the complete HTML/CSS/JS code in one code block, (2) a section titled 'Bugs Found' as a numbered list, (3) a section titled 'Accessibility Notes' as a numbered list, (4) a section titled 'What I'd Need From You' listing any decisions or missing info you assumed."

**What changed / what improved:** Forcing a structure didn't just organize the output — it changed what the AI reported. The new "What I'd Need From You" section surfaced assumptions that were invisible in every earlier version: that a single password field (not a confirm field) was chosen deliberately, that there's no real backend, that the age-minimum footnote was guessed, and that the password policy was a placeholder. Structure forced honesty about uncertainty.

**What it didn't fix:** The code was still delivered as one finished block — no visibility into the reasoning that led there.

---

## Version 5 (Final) — Technique: Step Decomposition

**Prompt:**
> "Build a registration form for a student learning platform with friendly validation messages, and check it for bugs, using this exact process: Step 1 — list the required fields and validation rules before writing any code. Step 2 — write the HTML structure only. Step 3 — write the CSS for a mobile-first, approachable design. Step 4 — write the JavaScript for validation and bug-proofing, explaining each fix as you add it. Step 5 — do a final pass listing any remaining bugs or assumptions. Show your work at each step, don't skip to the final code."

**What changed / what improved:** Breaking the task into forced steps made the AI commit to a field list and validation rules *before* touching code — which meant later steps stayed consistent with earlier decisions instead of improvising midway. Every fix in the JavaScript step came with an inline explanation of the bug it prevented, and the final step cleanly separated "can't be fixed client-side" issues from "assumptions I made."

**What it didn't fix:** Nothing major — this was the strongest version across the board (see cross-model comparison below for the one honest caveat: results shifted noticeably depending on which model ran it).

---

## Cross-Model Comparison (Version 5 prompt, run on both models)

The exact same Version 5 prompt was run on **Claude** and **ChatGPT**. Both followed the 5-step structure correctly, but made different judgment calls:

| Aspect | Claude | ChatGPT |
|---|---|---|
| Password field | Single field + show/hide (dropped confirm field) | Kept confirm-password field |
| Extra field | None added | Added a required Username field |
| Visual identity | Warm violet/coral, rounded "Baloo 2" display font | Cooler blue/indigo, standard Inter throughout |
| Security depth | Added honeypot, CSRF token placeholder, client-side rate-limit lockout | No honeypot, no CSRF placeholder, no rate-limiting — focused purely on validation logic |
| Name validation | Simple ASCII-based checks | Unicode-aware regex (`\p{L}\p{M}`) — handles accented/non-English names correctly |
| Failure/edge-case handling | Explicit `try/catch` not shown for submit failure | Added a `try/catch/finally` around the simulated submit, restoring the button even on failure |

**Honest takeaway:** This wasn't a case where "both were fine." Claude leaned security-conscious (a form that assumes it needs defenses against bots and abuse), while ChatGPT leaned traditional-and-thorough (more standard fields, better internationalization on names, cleaner error-recovery on submit). Neither model read "check it for bugs" as *only* meaning logic bugs — both added scope the naive prompt never asked for, but they added *different* scope. This is the clearest evidence in the whole exercise that a well-engineered prompt still leaves real interpretive gaps between models — the prompt reduces variance, it doesn't eliminate it.

---

## Final Reusable Template

> "Build a [thing you need] for [specific audience/context], and check it for bugs. You are a [relevant expert role] focused on [specific quality concerns, e.g. accessibility and security]. Follow this tone for user-facing text: [one concrete example]. Structure your response as: (1) the complete code, (2) a 'Bugs Found' list, (3) a '[Domain] Notes' list, (4) a 'What I'd Need From You' list of assumptions. Before writing code, walk through this process: Step 1 — list requirements. Step 2 — structure. Step 3 — styling/design. Step 4 — logic, explaining each fix as you add it. Step 5 — a final pass listing remaining issues and assumptions. Show your work at each step."

**Why this is reusable:** It's built from five separable slots — role, context, one example, an output shape, and a forced step order — none of which depend on knowing anything about *this* registration form specifically. A stranger can drop in their own [thing], [audience], [role], and [example] and get the same disciplined process applied to a completely different task.
