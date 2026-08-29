# The Prompt Ladder: Login Form Intro Animation

## Baseline (Weak Prompt)

**Prompt:**
> "Build a login form."

**Output:**
A polished, generic HTML login form — clean layout, client-side validation, password show/hide toggle, subtle entrance animation, and an SSO button placeholder. Functionally solid, but visually generic — no personality, no context, no interactivity beyond standard form behavior.

---

## Version 1 — Layer added: Example of what good looks like

**Prompt:**
> "Build a login form. Before the login form appears, show an animated intro: a character runs across the screen, and then turns into smoke that forms into the login page."

**Output:**
A stylized figure runs in from the left with a realistic running gait (swinging limbs, body bounce), then dissolves into a canvas-based smoke system that reveals the login card underneath. Included a skip-intro button and respected `prefers-reduced-motion`. Ran ~2.6 seconds.

**Notes:**
- **What changed in the prompt:** Added an example of what a good intro should look like — a character-runs-then-smoke sequence.
- **What actually improved in the output:** Went from a flat, static form to a full cinematic intro with a running figure and smoke dissolve.
- **What still failed:** Expected the character to jump top-to-bottom in slow motion over ~5 seconds, but the AI made it run left-to-right in 2.6 seconds — direction and timing weren't specified, so the AI decided on its own.
- **What I'd try next:** Add explicit constraints for entry direction and exact duration.

---

## Version 2 — Layer added: Constraints

**Prompt:**
> "Build a login form. Before the login form appears, show an animated intro: a character runs across the screen, and then turns into smoke that forms into the login page. The character must enter by jumping down from the top of the screen (not from the side), and the entire intro animation must last exactly 5 seconds, moving in slow motion."

**Output:**
Character now drops from the top in slow motion (0–2s), lands with a squash-and-stretch impact (2–2.4s), briefly runs (2.4–2.9s), dissolves into smoke (2.9–3.6s), and reveals the login form (3.6–5s). Total: exactly 5 seconds.

**Notes:**
- **What changed in the prompt:** Added hard constraints — exact entry direction (top-down) and exact duration (5 seconds, slow motion).
- **What actually improved in the output:** Direction and timing now matched exactly what was asked — a real, measurable fix.
- **What still failed:** A leftover ~0.5s running cycle appeared between the landing and the smoke dissolve — something not requested, likely inherited from the Version 1 prompt structure.
- **What I'd try next:** Explicitly state the assumption that no running/walking should happen after landing.

---

## Version 3 — Layer added: Stated assumptions

**Prompt:**
> "Build a login form. Before the login form appears, show an animated intro: a character runs across the screen, and then turns into smoke that forms into the login page. The character must enter by jumping down from the top of the screen (not from the side), and the entire intro animation must last exactly 5 seconds, moving in slow motion. Important: do not add any running or walking after the character lands — it should go straight from the landing impact into the smoke dissolve."

**Output:**
Clean 3-beat sequence: drop from top (0–2.6s), landing impact (2.6–3.1s), straight to smoke dissolve (3.1–5s). No leftover running cycle. Timing remained exactly 5 seconds.

**Notes:**
- **What changed in the prompt:** Explicitly stated the assumption that no running/walking should occur after landing.
- **What actually improved in the output:** The unwanted running cycle from Version 2 was completely eliminated — the animation now flows cleanly through exactly the intended three beats.
- **What still failed:** The character and smoke still looked basic/cartoonish rather than realistic — flat shapes, not convincingly human or smoke-like.
- **What I'd try next:** Add quality criteria for realism — a human silhouette (not blocky/stick-figure) and layered, gradient-based smoke.

---

## Version 4 — Layer added: Quality criteria

**Prompt:**
> "Build a login form. Before the login form appears, show an animated intro: a character runs across the screen, and then turns into smoke that forms into the login page. The character must enter by jumping down from the top of the screen (not from the side), and the entire intro animation must last exactly 5 seconds, moving in slow motion. Important: do not add any running or walking after the character lands — it should go straight from the landing impact into the smoke dissolve. Quality requirement: the character's silhouette must look like a real, anatomically-proportioned human figure (not a stick figure or blocky shape), and the smoke must look realistic — layered, semi-transparent particles with soft gradients and blur, not flat cartoon puffs."

*(Note: this version was run in ChatGPT rather than Claude, after hitting Claude's usage limit mid-task. Worth flagging honestly — the underlying model changed for this one step.)*

**Output:**
The character silhouette switched from blocky rectangles to tapered, curved shapes (built with clip-path) for a more anatomical look. The smoke system upgraded to 5 layered, blurred cloud shapes plus 12 fine particles with radial gradients — a noticeably more realistic look than the flat shapes in Version 3.

**Notes:**
- **What changed in the prompt:** Added quality criteria — anatomically-proportioned human silhouette, realistic layered/gradient smoke.
- **What actually improved in the output:** Both the character and the smoke visibly upgraded — curved tapered limbs instead of rectangles, and multi-layer blurred smoke instead of flat puffs.
- **What still failed:** No major issues at this stage — the visuals matched the intent well.
- **What I'd try next:** Add real context — tie the visual design to the actual project it's for, rather than a generic dark-theme login.

---

## Version 5 (Final) — Layer added: Real context

**Prompt:**
> "Build a login form. Before the login form appears, show an animated intro: a character runs across the screen, and then turns into smoke that forms into the login page. The character must enter by jumping down from the top of the screen (not from the side), and the entire intro animation must last exactly 5 seconds, moving in slow motion. Important: do not add any running or walking after the character lands — it should go straight from the landing impact into the smoke dissolve. Quality requirement: the character's silhouette must look like a real, anatomically-proportioned human figure (not a stick figure or blocky shape), and the smoke must look realistic — layered, semi-transparent particles with soft gradients and blur, not flat cartoon puffs. Context: this is for a tech portfolio/capstone project called FlyRank, aimed at software engineering students and recruiters — the design should feel professional and modern, using a dark ink-navy and warm amber/orange color palette."

**Output:**
A fully FlyRank-branded login experience — dark ink-navy background, amber/orange accent color, a custom brand mark, refined typography ("Welcome back. Sign in to continue building your engineering journey."), and the same clean 5-second character-fall-to-smoke intro from Version 4, now rendered in the project's actual visual identity.

**Notes:**
- **What changed in the prompt:** Added real context — named the actual project (FlyRank), its audience, and its color palette.
- **What actually improved in the output:** Went from a generic (if polished) dark-theme login to something that specifically looks like it belongs to FlyRank — brand mark, on-brand color use, copy tailored to the audience (engineering students/recruiters).
- **What still failed:** No major issues.
- **What I'd try next:** This is the final version — good enough to reuse as-is for future prompts.

---

## Final Reusable Prompt

> "Build a login form. Before the login form appears, show an animated intro: a character runs across the screen, and then turns into smoke that forms into the login page. The character must enter by jumping down from the top of the screen (not from the side), and the entire intro animation must last exactly 5 seconds, moving in slow motion. Important: do not add any running or walking after the character lands — it should go straight from the landing impact into the smoke dissolve. Quality requirement: the character's silhouette must look like a real, anatomically-proportioned human figure (not a stick figure or blocky shape), and the smoke must look realistic — layered, semi-transparent particles with soft gradients and blur, not flat cartoon puffs. Context: this is for [your project name], aimed at [your audience] — the design should feel professional and modern, using [your color palette]."

**Reusable because:** it separates the fixed structural requirements (timing, direction, no leftover motion, realism) from a single placeholder block ([project name] / [audience] / [color palette]) — so anyone on the track can drop in their own project details and get a working, on-brand result without touching the rest of the prompt.
