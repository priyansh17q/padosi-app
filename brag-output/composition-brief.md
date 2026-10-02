# Hyperframes Composition Brief: Padosi Pro

## Objective
Create a short launch-style brag video for Padosi Pro, a hyperlocal neighborhood marketplace app.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds

## Source Material
- Project root: `C:\Users\hp\padosi-pro` (frontend/app.js, frontend/styles.css, design-reference/hyperlocal_civic_commerce/DESIGN.md)
- Primary files read: frontend/app.js (task data, screen markup), frontend/index.html, DESIGN.md
- Product name: Padosi Pro
- Tagline / strongest claim: "Your neighbor is the network."
- Key UI or visual moment to recreate: the Live Tracking screen — pulsing radar rings around a runner pin, ticking ETA, OTP handoff PIN card
- Copy that must appear verbatim:
  - "Your neighbor is the network."
  - "Pick up 4 items from Nature's Basket + Dairy milk"
  - "₹220" / "Quick Accept"
  - "Escrow Total" / "Post Task with Escrow"
  - "Rahul · 400m away" / OTP "5821"
  - "Withdraw to UPI"
  - "Padosi Pro"

## Creative Direction
- Tone preset: app-store
- Creative direction: fintech-grade trust with neighborhood warmth — clean feature-card reveals, nothing loud, product treated as real and dependable.
- Interpretation: 6 scenes, title-case labels, one feature beat per scene, clean slide/wipe transitions (0.35-0.45s), no aggression.
- Angle: everyone building gig-economy apps competes with strangers and dark stores; Padosi Pro makes the neighbor three doors down the delivery network instead — and it's a working app, not a mockup.
- Hook: dark emerald gradient, "Your neighbor" then "is the network." — straight into the real product.
- Outro / punchline: logo mark on dark gradient, "Your neighbor is the network." + "Padosi Pro" wordmark, clean hold.
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign

## Visual Identity
- Background: `#f8f9ff` (light surface for product scenes)
- Text: `#0b1c30` (on-surface)
- Accent: `#006948` (primary emerald), `#85f8c4` (primary-fixed mint), `#825100`/`#ffb95f` (amber, sparing)
- Display font: Plus Jakarta Sans, 700-800
- Body font: Plus Jakarta Sans, 400-600
- Visual references from the project: Explore feed task card, Post Task escrow tray, Live Tracking radar/map/OTP card, Wallet balance card — recreate these directly in HTML/CSS matching the real app's rounded-xl cards, hairline borders, soft shadows.

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 2.5s — "Your neighbor" / "is the network." on dark emerald gradient
2. Explore feed reveal — 3.5s — real task card (₹220, Quick Accept tap → claimed state)
3. Post Task, escrow locks in — 4s — escrow total count-up, button locks
4. Live Tracking, the alive moment — 4.5s — radar pulse, ETA countdown, OTP PIN card
5. Wallet, paid out — 3s — balance count-up, Withdraw to UPI
6. Outro — 2.5s — logo + tagline on dark gradient

## Audio
- Audio role: warm, consistent light layer — confident, not hyped
- Audio arc: fades in under the hook, steady through the feature beats, small lift into the outro, clean fade at the end
- Music: `happy-beats-business-moves-vol-11-by-ende-dot-app.mp3`
- Music treatment: starts ~0s at volume ~0.3, steady through the body, fades out over the final ~1s
- Music cue guidance: bundled preset `happy-beats-business-moves-vol-11-by-ende-dot-app.music-cues.md` (114.84 BPM). Strong cues at 1.60s, 3.70s, 5.80s/6.34s, 8.96s/9.50s, 12.65s, 17.91s. Target: hook line ~1.60s, Explore-feed reveal ~3.70s, escrow-lock ~8.96-9.50s, live-tracking reveal ~12.65s, payout ~17.91s. Hints only — never sacrifice readability for a cue.
- Audio-reactive treatment: subtle — emerald glow behind the logo and radar-ring opacity may breathe slightly with music RMS. No waveform/equalizer visuals, no strobing.
- Audio-coupled moments:
  - Scene 1 — second half of hook line lands — soft drop
  - Scene 2 — Quick Accept tap — click SFX
  - Scene 3 — escrow locks in — soft drop / bell accent
  - Scene 4 — OTP PIN card arrives — light notification ping
  - Scene 5 — wallet balance updates — bell / chip accent
  - Scene 6 — logo settles — impactBell_heavy_000
- SFX selection guidance: match the real gesture — card/drop sounds for card reveals, click for the simulated tap, a bell-family sound for the escrow lock and payout moments (trust/money beats), one bell hit under the outro logo. Keep to app-store's consistent light layer (0.65-0.75 volume); nothing aggressive or chaotic — this is a trust product.
- SFX analysis guidance: use `sfx-analysis.md` in the hyperframes-audio/creative skill assets if present; prefer low high-frequency-risk files for these repeated, polished moments.
- Exact SFX choice: Hyperframes chooses exact filenames/timestamps/density based on the implemented animation.
- Audio files: music copied into `brag-output/composition/assets/music/`.

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills — `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. This is a `/brag` workflow: do not enter the `hyperframes` entry-point intent interview and do not route into its generic promo/launch-video workflow. Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Show at least one real UI, copy, or visual element from the source project (multiple scenes recreate real screens directly).
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds (target 20s).
- Include the planned music/SFX layer.
- Treat `/brag` audio notes as guidance, not a fixed cue sheet.
- Treat music cue metadata as optional timing hints (±0.15s major, ±0.10s minor); ignore when it hurts readability/pacing.
- Run `hyperframes check` before render.
