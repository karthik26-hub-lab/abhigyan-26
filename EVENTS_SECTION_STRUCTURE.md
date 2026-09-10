# Walkthrough: Rebuilt #events Section Matching Site-Wide Design System

The `#events` section has been completely rebuilt from the ground up to match the existing Hero and About editorial design system. All telemetry, HUD console metaphors, glow effects, gradients, backdrop blurs, capsule pills, and monospace typography have been eliminated.

---

## 1. Strict Design Token Alignment

| Element | Token / Color | Applied Implementation |
| :--- | :--- | :--- |
| **Technical Indicator** | `#00E5FF` (Teal) | Solid 4px left-edge bar on all 5 technical event rows (`.item-tech .event-color-bar`) and group header bar (`.tech-indicator`). Full opacity, zero glow. |
| **Non-Technical Indicator** | `#FF9933` (Saffron) | Solid 4px left-edge bar on all 6 non-technical event rows (`.item-nontech .event-color-bar`) and group header bar (`.nontech-indicator`). Full opacity, zero glow. |
| **Gold Elements** | `#F5C518` (Gold) | Numbers (`01`, `02`), stat row hairline divider, active filter tab underline, coordinator `tel:` links, and solid gold CTA button (`.event-btn-register`). |
| **Typography** | `'Plus Jakarta Sans'` | Pure site-wide sans-serif pairing across titles, body, data rows, numbers, and tabs. **Zero monospace font**. |
| **Visual Effects** | None | **Zero blur, zero shadows, zero gradients, zero glows** anywhere in the section. |

---

## 2. Structural Breakdown

### Overview Block
- Preserved heading (*"The Arenas"*) and subtitle.
- Stat row (`11 Events`, `5 Technical`, `6 Non-Technical`) matches the About section's fact-list typographic treatment with label above bold value and a solid gold `#F5C518` hairline divider.

### Plain Text Filter Control
- Clean text tabs: `All`, `Technical`, `Non-technical`.
- **Zero container, zero background, zero border-radius**.
- Active tab features a solid 2px gold underline (`#F5C518`) identical in style to the navbar active link indicator.
- Clicking switches active underline, filters groups, and smoothly scrolls to the target arena group.

### Single-Line Event Row
- **Left**: Solid 4px vertical color bar (Teal `#00E5FF` or Saffron `#FF9933`) + quiet gold number (`01`, `02` in `#F5C518`).
- **Center**: Line 1 displays bold event name; Line 2 displays smaller muted fee and team capacity (`#94A3B8`).
- **Right**: Clean `+` crosshair rotating 45° to `×` on open.
- **Divider**: Hairline `border-bottom: 1px solid rgba(255, 255, 255, 0.08)`.
- **Background**: Transparent (`background: transparent`), zero row fill.
- **Tap Height**: Guaranteed minimum `56px` tap target across all devices.

### Inline In-Place Expansion
- Hardware-accelerated CSS Grid transition (`grid-template-rows: 0fr → 1fr`), no height animation or modal jump.
- **Plain 3-column data row**: Fee, Team Size, and Format (no chips, no capsule backgrounds).
- **Full syllabus description text**.
- **Coordinators**: Faculty and 3rd-year student coordinator names with direct-dial `tel:` links.
- **Flat Gold CTA Button**: Solid `#F5C518` background matching the hero CTA, dark text (`#020814`), zero gradient, zero box-shadow.
- **Single Expansion Rule**: Opening one event automatically collapses any previously open event.
- **Accessibility**: `@media (prefers-reduced-motion: reduce)` disables the transition for instant show/hide.

### Responsive Mobile Verification
- Single-column layout at all viewport widths.
- Longest event name (*"Connections / Movie Mastermind"*) tested for clean, unclipped two-line wrapping at 375px.

---

## 3. Verification & Quality Assurance

- **Zero Forbidden Properties**: Ran automated script confirming 0 occurrences of `blur`, `box-shadow`, `gradient`, `text-shadow`, `drop-shadow`, or `mono` in `css/events.css`.
- **Syntax**: `node --check js/events.js` passed with 0 errors.
- **DOM Integration**: Tested row instantiation and `initEvents()` lifecycle in Node.
- **Server Endpoints**: HTTP 200 OK for `/`, `/css/events.css`, and `/js/events.js`.
