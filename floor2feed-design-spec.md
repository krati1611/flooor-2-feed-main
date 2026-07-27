# Floor2Feed — Website Design Specification

Pairs with `floor2feed-lean-copy.md`. Palette base: Coastal Retreat, extended with two derived neutrals. Type: Fraunces + Manrope.

---

## 1. Colour tokens

### Core palette

| Token | Hex | Origin |
|---|---|---|
| `--deep` | `#1E3640` | Derived — darkened Harbour |
| `--harbour` | `#335765` | Palette |
| `--sage` | `#74A8A4` | Palette |
| `--mist` | `#B6D9E0` | Palette |
| `--shell` | `#DBE2DC` | Palette |
| `--umber` | `#7F543D` | Palette |
| `--paper` | `#F7F9F8` | Derived — page ground |

### Derived working shades

| Token | Hex | Purpose |
|---|---|---|
| `--umber-hover` | `#6B4632` | Primary button hover |
| `--umber-active` | `#5C3B2A` | Primary button pressed |
| `--umber-tint` | `#F0E4DC` | Badge / highlight fill |
| `--umber-on-tint` | `#5C3B2A` | Text on `--umber-tint` |
| `--sage-dark` | `#3E6B67` | Eyebrow labels, small text in sage family |
| `--mist-dark` | `#24505C` | Text on `--mist` fills |
| `--mist-hover` | `#A9D1DA` | Upload zone hover |
| `--tint` | `#EDF2F0` | Soft section fill, between paper and shell |
| `--border` | `#DDE4E2` | Default hairline |
| `--border-strong` | `#B9CCC9` | Emphasised divider |
| `--danger` | `#A6503F` | Form errors |

### Semantic assignments

| Token | Value | Use |
|---|---|---|
| `--bg-page` | `#F7F9F8` | Default page ground |
| `--bg-tint` | `#EDF2F0` | Alternating light section |
| `--bg-shell` | `#DBE2DC` | Stronger alternating section, stat bars |
| `--bg-dark` | `#1E3640` | Footer, Track 2 section, dark full-bleed |
| `--bg-dark-alt` | `#335765` | Secondary dark panel inside a dark section |
| `--bg-technical` | `#B6D9E0` | Upload zone, plan viewer, processing states |
| `--bg-surface` | `#FFFFFF` | Cards, inputs |
| `--text-primary` | `#1E3640` | Headings, body emphasis |
| `--text-secondary` | `#46707C` | Body copy, descriptions |
| `--text-muted` | `#5F8189` | Captions, metadata, placeholders |
| `--text-inverse` | `#F7F9F8` | Any text on dark or umber |
| `--accent` | `#7F543D` | CTAs, one emphasis per screen |

### Contrast reference (against `--paper`)

| Colour | Ratio | Verdict |
|---|---|---|
| Deep `#1E3640` | ~12.6:1 | All sizes |
| Harbour `#335765` | ~7.7:1 | All sizes |
| Text secondary `#46707C` | ~5.6:1 | All sizes |
| Text muted `#5F8189` | ~4.5:1 | Body size and above only |
| Umber `#7F543D` | ~5.6:1 | All sizes |
| Sage `#74A8A4` | ~2.4:1 | **Never text.** Hairlines and fills only |
| Mist `#B6D9E0` | ~1.4:1 | **Never text.** Fill only |
| Shell `#DBE2DC` | ~1.2:1 | **Never text.** Fill only |

Text on `--mist` uses `--mist-dark`. Text on `--umber` and all dark grounds uses `--text-inverse`.

---

## 2. Backgrounds

**Page ground** — `--bg-page` `#F7F9F8`. Never pure white; white is reserved for cards and inputs so they lift off the page without shadows.

**Section rhythm** — alternate in this order, never two identical grounds adjacent:

| Section | Ground |
|---|---|
| Hero | Video, full-bleed, `--deep` scrim |
| How it works | `--bg-tint` |
| Track 1 | `--bg-page` |
| Track 2 | `--bg-dark` |
| Who it's for | `--bg-page` |
| Why it's different | `--bg-tint` |
| Proof | `--bg-shell` |
| Pricing | `--bg-page` |
| FAQ | `--bg-page` |
| Final CTA | `--bg-dark` |
| Footer | `--bg-dark` |

Final CTA and footer share `--deep`; separate them with a `1px` rule in `rgba(247,249,248,0.14)`, not a colour change.

**Hero scrim** — over the video:
```
linear-gradient(180deg, rgba(30,54,64,0.55) 0%, rgba(30,54,64,0.15) 40%, rgba(30,54,64,0.78) 100%)
```
Top band keeps nav legible, bottom band carries the headline. Never a flat overlay — it kills the footage.

**Dark section inner panels** — `--bg-dark-alt` `#335765` on `--bg-dark`. No borders needed; the value step is enough.

---

## 3. Typography

### Families

```
Display: 'Fraunces', Georgia, 'Times New Roman', serif                  — 400, 500
Sans:    'Manrope', -apple-system, 'Segoe UI', sans-serif               — 400, 500
Mono:    'IBM Plex Mono', ui-monospace, monospace                       — 400, 500
```

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Manrope:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Fraunces is variable — set the axes or you lose the point of it.** Display headings should run `font-variation-settings: 'opsz' 144, 'SOFT' 0, 'WONK' 1;`. The WONK axis switches in the angled, characterful terminals that give Fraunces its warmth; at high optical size it reads confident rather than quirky. For the pull quote and anything under 32px, drop to `'opsz' 36, 'WONK' 0` — the wonky forms get noisy at text sizes.

**Fraunces takes tight tracking.** At display sizes it needs −0.02em, more than a conventional serif. Without it the hero looks loose and unresolved.

**Manrope has no italic.** There is no true italic cut and the browser will synthesise a slanted version, which looks broken. Any italic in the system — the pull quote, emphasis in body copy — uses Fraunces italic instead. If a word inside a Manrope paragraph needs emphasis, use weight 500, not italic.

**Manrope has a generous x-height**, so unlike a geometric sans it needs no size bump. 17px at 1.7 is comfortable.

### Scale

| Level | Family | Desktop | Mobile | Weight | Line height | Letter spacing | Colour |
|---|---|---|---|---|---|---|---|
| Hero H1 | Display | 76px | 42px | 400 | 1.02 | −0.02em | `--text-inverse` on video |
| Hero H1 line 2 | Display | 76px | 42px | 400 | 1.02 | −0.02em | `--umber` |
| Section H2 | Display | 50px | 33px | 400 | 1.08 | −0.015em | `--text-primary` |
| Subsection H3 | Display | 32px | 25px | 400 | 1.15 | −0.01em | `--harbour` |
| Feature title H4 | Sans | 18px | 17px | 500 | 1.35 | 0 | `--text-primary` |
| Eyebrow / section label | Mono | 11px | 11px | 500 | 1.2 | 0.12em, uppercase | `--sage-dark` |
| Lead paragraph | Sans | 20px | 18px | 400 | 1.6 | 0 | `--text-secondary` |
| Body | Sans | 17px | 16px | 400 | 1.7 | 0 | `--text-secondary` |
| Small / caption | Sans | 14px | 14px | 400 | 1.55 | 0 | `--text-muted` |
| Stat number | Mono | 44px | 32px | 500 | 1.0 | −0.02em | `--text-primary` |
| Stat label | Mono | 11px | 11px | 400 | 1.2 | 0.1em, uppercase | `--text-muted` |
| Button label | Sans | 15px | 15px | 500 | 1.0 | 0.01em | contextual |
| Nav link | Sans | 15px | 16px | 400 | 1.0 | 0 | contextual |
| Form label | Mono | 11px | 11px | 400 | 1.2 | 0.1em, uppercase | `--text-muted` |
| Input text | Sans | 16px | 16px | 400 | 1.4 | 0 | `--text-primary` |
| FAQ question | Sans | 18px | 17px | 500 | 1.4 | 0 | `--text-primary` |
| Pull quote | Display *italic* | 28px | 23px | 400 | 1.4 | 0 | `--harbour` |
| Footer text | Sans | 14px | 14px | 400 | 1.6 | 0 | `rgba(247,249,248,0.72)` |

Input text stays at 16px on mobile — anything smaller triggers iOS auto-zoom on focus.

### Rules

- **Labels are Mono.** IBM Plex Mono is warm enough to sit beside Fraunces without the clash a colder monospace creates. Use it for eyebrows, form labels, stat labels, plan metadata and file types.
- Sentence case everywhere except tracked uppercase mono labels.
- Body copy maxes at 62 characters per line. On a 17px Manrope base that's roughly 640px.
- Never centre body copy. Centre H2 and eyebrow only, and only in full-width sections.
- Two sans weights only. If something needs more emphasis than Manrope 500, it needs to be Display instead.
- Fraunces never below 24px and never in UI. Set `opsz` to match the size you're using it at.
- No synthetic italics anywhere. Italic means Fraunces.
- Enable `font-feature-settings: 'tnum'` on anything tabular — pricing rows, unit schedules, stat bars.

---

## 4. Spacing and layout

**Scale** — `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160`. Nothing off-scale.

| Measure | Desktop | Mobile |
|---|---|---|
| Section padding (vertical) | 128px | 72px |
| Page gutter | 48px | 20px |
| Max container | 1320px | — |
| Text column max | 680px | — |
| Grid | 12 col, 24px gutter | 4 col, 16px gutter |
| Heading → body gap | 28px | 18px |
| Eyebrow → heading gap | 20px | 14px |
| Body → CTA gap | 40px | 28px |
| Card padding | 32px | 24px |

Imagery breaks the container and runs edge to edge. Text never does.

---

## 5. Components

### Primary button

```
background: #7F543D
color: #F7F9F8
font: 500 15px Manrope; letter-spacing: 0.01em
padding: 16px 32px
border-radius: 2px
border: none
transition: background 200ms
```
Hover `#6B4632` · Active `#5C3B2A` · Disabled `#C6BAB1` with `#F7F9F8` text
Focus: `outline: 2px solid #335765; outline-offset: 2px`
On dark grounds: unchanged. Umber holds against `--deep`.

### Secondary button

```
background: transparent
color: #335765
border: 1px solid #74A8A4
font: 500 15px Manrope; letter-spacing: 0.01em
padding: 16px 32px
border-radius: 2px
```
Hover: `border-color: #335765; background: rgba(116,168,164,0.10)`
On dark grounds: `color: #F7F9F8; border-color: rgba(247,249,248,0.35)`, hover border `#B6D9E0`

### Text link

Manrope 400, `color: #335765`, `text-decoration: underline`, `text-underline-offset: 4px`, `text-decoration-thickness: 1px`, decoration colour `#74A8A4`. Hover: colour and decoration both `#7F543D`.

### Input / textarea

```
background: #FFFFFF
border: 1px solid #DDE4E2
border-radius: 2px
padding: 14px 16px
font: 400 16px Manrope
color: #1E3640
```
Placeholder `#5F8189` · Hover border `#B9CCC9`
Focus: `border-color: #335765; box-shadow: 0 0 0 3px rgba(51,87,101,0.12)`
Error: `border-color: #A6503F`, message below at 14px Manrope in `#A6503F`

### Upload zone

```
background: #B6D9E0
border: 1px dashed #4E8494
border-radius: 2px
padding: 48px 32px
```
Title: Manrope 500 16px `#1E3640` · File types: IBM Plex Mono 11px `#24505C`
Icon: 20px, `#24505C`
Hover `background: #A9D1DA` · Drag active: `border: 1px solid #335765`

### Card

```
background: #FFFFFF
border: 1px solid #DDE4E2
border-radius: 2px
padding: 32px
box-shadow: none
```
Clickable variant hover: `border-color: #74A8A4`. Never add shadow — depth comes from the value step against the tinted section ground.

### Pricing card (featured)

Same as card, plus `border: 1px solid #7F543D`. Tier name in Fraunces 400 at 26px. Price in IBM Plex Mono 500 at 24px. Badge above the title: `background: #F0E4DC`, `color: #5C3B2A`, IBM Plex Mono 500 11px uppercase, tracking 0.1em, padding `5px 12px`, radius 2px.

### Navigation

Height 72px desktop / 60px mobile. Links Manrope 400 15px, tracking 0.
Over hero: transparent, links `#F7F9F8`, logo `#F7F9F8`.
On scroll past hero: `background: #F7F9F8`, `border-bottom: 1px solid #DDE4E2`, links `#335765`, logo `#1E3640`. Transition 300ms.
Active/hover link: `#7F543D`.

### Stat bar

Ground `--bg-shell`. Columns divided by `1px solid #B9CCC9`, no outer border. Number IBM Plex Mono 500 44px `--text-primary`; the single most persuasive figure uses `--umber`. Label IBM Plex Mono 400 11px uppercase tracking 0.1em `--text-muted`, sits above the number.

### FAQ accordion

Row separated by `border-top: 1px solid #DDE4E2`, last row gets a bottom border. Padding `24px 0`. Question Manrope 500 18px `--text-primary`. Chevron 20px `#74A8A4`, rotates 180° over 200ms. Answer Manrope 400 17px `--text-secondary`, max-width 640px, top margin 12px.

### Testimonial

`border-left: 2px solid #7F543D`, `border-radius: 0`, `padding-left: 28px`. Quote in Fraunces *italic* 400 at 28px with `'opsz' 36, 'WONK' 0`, colour `--harbour`. Attribution IBM Plex Mono 400 11px uppercase tracking 0.1em `--text-muted`, 20px below.

### Footer

Ground `--deep`. Column headings IBM Plex Mono 500 11px uppercase tracking 0.12em `#74A8A4`. Links Manrope 400 14px `rgba(247,249,248,0.72)`, hover `#B6D9E0`. Dividers `rgba(247,249,248,0.14)`. Bottom line Manrope 400 13px `rgba(247,249,248,0.5)`. Wordmark in Fraunces 400 at 24px, `#F7F9F8`.

---

## 6. Imagery

- Full-bleed imagery: no border radius, no border, no shadow.
- Inset imagery inside cards or grids: `border-radius: 2px`.
- Never apply colour overlays or duotones to generated interiors. The imagery is the product — show it untreated.
- Scrims only where text sits on top, and only as a vertical gradient.
- Aspect ratios: hero `21:9` desktop / `4:5` mobile · room stills `3:2` · plan drawings `1:1` on a `--bg-technical` ground · walkthrough video `16:9`.
- Plan drawings and DWG previews always sit on Mist. That's the visual cue that the user is looking at input rather than output.

---

## 7. Motion

| Type | Duration | Easing |
|---|---|---|
| Micro (hover, focus) | 200ms | `cubic-bezier(0.2, 0.6, 0.2, 1)` |
| Standard (nav, accordion) | 300ms | `cubic-bezier(0.2, 0.6, 0.2, 1)` |
| Reveal (scroll-in) | 700ms | `cubic-bezier(0.16, 1, 0.3, 1)` |

Scroll reveals: opacity `0 → 1` with `translateY(24px → 0)`, staggered 80ms across siblings. Once only, never on scroll-back.

Hero video: `autoplay muted loop playsinline`, poster frame set to the first frame, `object-fit: cover`.

Wrap everything in `@media (prefers-reduced-motion: reduce)` — reveals become instant, video shows the poster frame with a play control.

---

## 8. Breakpoints

```
480px   small mobile → mobile
768px   mobile → tablet
1024px  tablet → desktop
1320px  container max, gutters grow beyond
```

Minimum tap target 44×44px. Buttons go full width below 480px.

---

## 9. CSS custom properties

```css
:root {
  --deep: #1E3640;
  --harbour: #335765;
  --sage: #74A8A4;
  --mist: #B6D9E0;
  --shell: #DBE2DC;
  --umber: #7F543D;
  --paper: #F7F9F8;

  --umber-hover: #6B4632;
  --umber-active: #5C3B2A;
  --umber-tint: #F0E4DC;
  --umber-on-tint: #5C3B2A;
  --sage-dark: #3E6B67;
  --mist-dark: #24505C;
  --mist-hover: #A9D1DA;
  --tint: #EDF2F0;
  --border: #DDE4E2;
  --border-strong: #B9CCC9;
  --danger: #A6503F;

  --bg-page: var(--paper);
  --bg-tint: var(--tint);
  --bg-shell: var(--shell);
  --bg-dark: var(--deep);
  --bg-dark-alt: var(--harbour);
  --bg-technical: var(--mist);
  --bg-surface: #FFFFFF;

  --text-primary: var(--deep);
  --text-secondary: #46707C;
  --text-muted: #5F8189;
  --text-inverse: var(--paper);
  --accent: var(--umber);

  --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-sans: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;

  --display-axes: 'opsz' 144, 'SOFT' 0, 'WONK' 1;
  --display-axes-text: 'opsz' 36, 'WONK' 0;

  --track-label: 0.16em;
  --track-btn: 0.03em;

  --radius: 2px;
  --container: 1320px;
  --measure: 680px;

  --dur-micro: 200ms;
  --dur-base: 300ms;
  --dur-reveal: 700ms;
  --ease: cubic-bezier(0.2, 0.6, 0.2, 1);
  --ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 10. Standing rules

1. One Umber element per screen. If two CTAs are visible at once, the second is secondary.
2. Mist appears only where the user is looking at plan data, never in marketing sections.
3. No shadows anywhere. Separation comes from hairlines and section grounds.
4. Corners never exceed 2px.
5. Sage and Mist never carry text.
6. Fraunces never below 24px, never in UI. Always set the `opsz` axis to match the size in use.
7. All labels are tracked IBM Plex Mono caps. No synthetic italics — Manrope has no italic cut, so italic always means Fraunces.
8. Imagery is never tinted, filtered, or overlaid except by a text scrim.

---

## 11. Dubai variant

If a Dubai-specific landing page ships, keep the type system and tokens identical and change only the ground mix: `--bg-dark` becomes the dominant section ground, Umber usage roughly doubles, and Mist and Shell drop out of marketing sections entirely (Mist stays in the product UI). Cool coastal reads residential and suburban; Dubai prime expects warm, dark and high contrast. Fraunces at weight 400 on `--deep`, with `WONK` on and tight tracking, is the most premium combination in this system — the Dubai hero should use it.