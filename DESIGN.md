---
name: Football Academy Operations
description: An Arabic operations ledger styled as an official football match sheet.
colors:
  pitch-ink: "#10241d"
  pitch-ink-soft: "#244238"
  warm-paper: "#f4f2ea"
  clean-sheet: "#fffefa"
  ruled-line: "#dcded4"
  ledger-muted: "#53625b"
  pitch-green: "#087a52"
  pitch-green-dark: "#075b40"
  pitch-green-soft: "#dff1e8"
  decision-orange: "#e98b2a"
  decision-orange-soft: "#fff0dc"
  exception-red: "#c84d3e"
  information-blue: "#367a9d"
typography:
  display:
    fontFamily: 'Tahoma, "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(3rem, 6vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: 'Tahoma, "Segoe UI", Arial, sans-serif'
    fontSize: "clamp(27px, 3.3vw, 42px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontFamily: 'Tahoma, "Segoe UI", Arial, sans-serif'
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.55
  body:
    fontFamily: 'Tahoma, "Segoe UI", Arial, sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: 'Tahoma, "Segoe UI", Arial, sans-serif'
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.55
rounded:
  compact: "8px"
  control: "10px"
  panel: "14px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  panel: "24px"
components:
  button-primary:
    backgroundColor: "{colors.pitch-green}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "{colors.pitch-green-dark}"
    textColor: "#ffffff"
  button-secondary:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.pitch-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "42px"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.pitch-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 13px"
    height: "46px"
  panel:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.pitch-ink}"
    rounded: "{rounded.panel}"
    padding: "24px"
  status-present:
    backgroundColor: "{colors.pitch-green-soft}"
    textColor: "{colors.pitch-green-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 8px"
  status-attention:
    backgroundColor: "{colors.decision-orange-soft}"
    textColor: "#8a551d"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 8px"
---

# Design System: Football Academy Operations

## Overview

**Creative North Star: "The Official Match Sheet"**

This system turns a multi-branch academy dashboard into a warm paper operations ledger: authoritative, dense, and calm enough to scan under daily administrative pressure. Deep pitch ink supplies the structure, ruled separators keep records legible, and clean sheet surfaces sit on a warm paper field.

Pitch green communicates the academy's live operational state; decision orange is reserved for attention, capacity pressure, and next actions. The interface is Arabic-first and right-to-left, using the platform-safe Arabic system stack so the static HTML, CSS, and JavaScript prototype remains dependency-free.

**Key Characteristics:**

- Warm paper material with crisp, ruled ledger surfaces.
- Dense, scan-friendly Arabic RTL hierarchy.
- Deep pitch ink structure with controlled green and orange signals.
- Branch context remains visible before operational and financial action.
- Football geometry appears as a restrained structural cue, not fabricated brand artwork.

## Colors

The palette reads like ink and decisions printed on an official match sheet: neutral paper carries the records while green, orange, red, and blue communicate state sparingly.

### Primary

- **Pitch Green:** The operational accent for primary actions, live indicators, selected data, positive money, and capacity tracks.
- **Deep Pitch Green:** The stronger hover and readable foreground partner for green-tinted status surfaces.
- **Soft Pitch Green:** The confirmation wash for present, active, recommended, and administrative states.

### Secondary

- **Decision Orange:** The deliberate attention color for alerts, notification counts, near-capacity conditions, and text selection.
- **Soft Decision Orange:** The low-intensity surface behind late, pending, and finance-role states.

### Tertiary

- **Exception Red:** Reserved for outgoing money and true exception dots; it is not a general decorative accent.
- **Information Blue:** A quiet informational signal used alongside attention states.

### Neutral

- **Pitch Ink:** The dark structural color for main text, sidebar, financial ledger, and strong rules.
- **Soft Pitch Ink:** Secondary dark copy inside attention and supporting records.
- **Warm Paper:** The application canvas and sticky top bar material.
- **Clean Sheet:** The primary panel, card, and control surface.
- **Ruled Line:** The repeated separator for tables, grids, fields, and ledger rows.
- **Ledger Muted:** Supporting labels, descriptions, and secondary values.

**The Decision Ink Rule.** Use green for routine operational truth and orange for decisions or attention; neither color is decorative fill.

**The Paper Rule.** Keep warm paper behind the workspace and clean sheet on record-bearing surfaces so boundaries remain readable without excessive chrome.

## Typography

**Display Font:** Tahoma (with "Segoe UI", Arial, and sans-serif fallbacks)  
**Body Font:** Tahoma (with "Segoe UI", Arial, and sans-serif fallbacks)  
**Label Font:** Tahoma (with "Segoe UI", Arial, and sans-serif fallbacks)

**Character:** One dependency-free Arabic system stack serves every role. Scale, weight, tabular numerals, and ruled alignment create hierarchy without importing a display face that could compromise Arabic coverage or the HTML/CSS/JavaScript-only constraint.

### Hierarchy

- **Display:** Bold and tightly tracked for the login statement only; its responsive scale creates the one expressive typographic moment.
- **Headline:** Bold, compact page titles that establish the active operational view.
- **Title:** Bold panel and section headings that remain subordinate to page headlines.
- **Body:** Regular interface copy and values, set for dense reading at the established base line height.
- **Label:** Bold compact metadata, table headers, statuses, and controls; the accessibility floor keeps dense operational labels at a readable size.

**The Arabic System Stack Rule.** Preserve Tahoma, "Segoe UI", Arial, sans-serif in that order and do not add a web-font dependency.

**The Number Scan Rule.** Use tabular numerals for scoreboards and financial totals where columns or repeated values must compare at a glance.

## Layout

The desktop workspace uses a fixed 244px right sidebar, a sticky 72px top bar, and a centered content area capped at 1500px. Workspace padding responds between 20px and 44px; recurring panels use 20px to 24px gaps and internal padding. Dense record groups share borders and separators instead of floating as isolated cards.

At 1100px, four-up scoreboards become two columns and complex dashboard, subscription, coach, bus, and role layouts collapse progressively. At 760px, the sidebar becomes an off-canvas menu, the content margin disappears, grids become single-column where needed, tables retain horizontal overflow, and workspace padding tightens to 14px. Arabic reading order and right alignment remain intact throughout.

**The Branch-First Rule.** Keep branch context visible in the sticky operating frame before users read or change branch-scoped records.

**The Ledger Density Rule.** Prefer shared ruled containers and compact 12px operational metadata over a loose field of individually floating cards.

## Elevation & Depth

Depth is restrained and structural. Most separation comes from paper tone, ruled borders, and pitch-ink blocks; the standard ambient shadow lifts reusable panels and bus cards, while lighter shadows distinguish scoreboards and tables. Dialogs alone receive a deep overlay shadow and blurred backdrop because they interrupt the operating context.

### Shadow Vocabulary

- **Ledger Panel:** A broad, quiet green-black shadow for panels, bus cards, and toasts.
- **Scoreboard Lift:** A lighter medium shadow for the framed top-level metrics strip.
- **Table Lift:** The shallowest shadow for scrollable data ledgers.
- **Dialog Lift:** A deep, concentrated shadow paired with a dark blurred backdrop.

**The Ruled-Before-Raised Rule.** Use border and tonal separation first; reserve shadows for grouped operating surfaces, overlays, and the highest-value summaries.

## Shapes

The dominant silhouette is a gently rounded 14px ledger panel. Controls use tighter 8px to 10px corners, while statuses, capacity tracks, live dots, and avatars are fully rounded. One-pixel rules are fundamental: they partition scoreboards, tables, summaries, and financial cells. Football pitch circles and cross-lines are permitted as quiet geometry on the login view; they are not a logo substitute.

**The Tight-Control Rule.** Controls stay tighter than panels so actions and fields read as tools placed on the sheet, not as nested cards.

## Components

### Buttons

- **Shape:** Compact control corners with a 42px minimum height; the login submit expands to 52px.
- **Primary:** Pitch green, white text, bold label, and 16px inline padding.
- **Hover / Focus:** Darken to deep pitch green and lift by 1px on hover; retain the global 3px orange focus-visible outline.
- **Secondary / Quiet:** Clean sheet with a ruled border, or a quiet gray-green fill; both shift to a slightly darker neutral on hover.

### Chips

- **Style:** Fully rounded compact labels. Present and active use soft pitch green with deep green text; late and pending use soft decision orange with brown-orange text.
- **State:** Color communicates operational status, while text always states the status explicitly.

### Cards / Containers

- **Corner Style:** Gently rounded ledger panels; compact subcards may use a 12px radius.
- **Background:** Clean sheet over warm paper, with pitch ink used for high-authority financial summaries.
- **Shadow Strategy:** Ambient shadow only for reusable grouped surfaces; ruled containers can remain flat.
- **Border:** Use the ruled line for dense internal partitions and pitch ink for top-level framed summaries.
- **Internal Padding:** Usually 20px to 24px.

### Inputs / Fields

- **Style:** White fill, ruled one-pixel stroke, compact control corners, 46px minimum height, and 13px inline padding.
- **Focus:** Shift the border to pitch green and add a soft 3px green ring; the global orange outline remains available for keyboard focus visibility.
- **Error / Disabled:** Errors use the implemented pale red surface and dark red text; do not rely on color without the accompanying message.

### Navigation

The fixed pitch-ink sidebar uses muted light labels at rest, a subtle translucent hover, and a clean sheet active row with pitch-ink bold text. Notification counts use decision orange. On small screens the same sidebar slides in from the right; the menu button reveals it without changing the navigation hierarchy.

### Data Ledgers

Tables, scoreboards, attendance summaries, and financial ledgers are the signature family. Keep cells right-aligned, values compact, dividers continuous, headers neutral, hover feedback quiet, and numeric comparison easy. Horizontal scrolling is preferable to compressing or hiding columns on narrow screens.

### Attention Strip

The attention strip is a ruled sequence, not a promotional banner. Its orange title cell announces that a decision is required; each following row pairs a small semantic dot with concise Arabic copy and a directional affordance.

## Do's and Don'ts

### Do:

- **Do** preserve the warm paper, clean sheet, and ruled-line hierarchy across new operational screens.
- **Do** keep Arabic RTL reading order, right-aligned records, readable 12px minimum operational labels, and keyboard-visible focus.
- **Do** use pitch green for live and positive operations, decision orange for attention, and explicit text for every status.
- **Do** reuse the fixed branch context, dense ledger rows, 14px panels, and 8px to 10px controls.
- **Do** keep the product dependency-free: static HTML, CSS, and JavaScript with the system Arabic font stack.

### Don't:

- **Don't** introduce external fonts, icon packages, frameworks, or fabricated academy assets.
- **Don't** scatter every datum into a floating card or replace continuous table rules with excessive whitespace.
- **Don't** use orange or green as broad decoration; their operational meaning depends on restraint.
- **Don't** hide branch scope, bus capacity, overdue status, or financial exceptions behind secondary navigation.
- **Don't** use football imagery as generic decoration; the implemented pitch geometry is the only established concept seed.
