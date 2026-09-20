// lib/animations.ts
// Motion Design System — La Vid Verdadera
// Follows the same motion language as Linear, Stripe, and Vercel.
// All existing exports are preserved and backward-compatible.

import type { Variants, Transition, TargetAndTransition } from 'framer-motion'

// ─── Durations ────────────────────────────────────────────────────────────────
// Single source of truth. Changing NORMAL here updates every variant globally.

export const DURATION = {
  instant: 0.12,
  fast:    0.25,
  normal:  0.55,
  slow:    0.70,  // was 0.75 — trimmed; nothing on this site needs >700ms
} as const

export type Duration = typeof DURATION[keyof typeof DURATION]

// ─── Easings ──────────────────────────────────────────────────────────────────
// Three curves cover 95% of cases. More than three = visual inconsistency.

export const EASE = {
  // Sharp start, smooth settle — default for most entrances (iOS/macOS standard)
  out:     [0.25, 0.1,  0.25, 1] as const,
  // Symmetric, editorial — state transitions, overlays
  inOut:   [0.4,  0,    0.2,  1] as const,
  // Fast exit, ultra-soft landing — hero, page-level reveals (Apple spring equivalent)
  express: [0.22, 1,    0.36, 1] as const,
} as const

export type Ease = typeof EASE[keyof typeof EASE]

// ─── Shared base transition ────────────────────────────────────────────────────

const base: Transition = {
  duration: DURATION.normal,
  ease:     EASE.out,
}

const fast: Transition = {
  duration: DURATION.fast,
  ease:     EASE.out,
}

// ─── Viewport preset ─────────────────────────────────────────────────────────
// Spread onto every whileInView element: viewport={viewport}
// -64px fires the reveal slightly before the element reaches the fold.

export const viewport = {
  once:   true,
  margin: '-64px',
} as const

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — FADE ENTRANCES
// All use GPU-composited properties only (opacity + transform).
// No width/height/top/left — never triggers layout reflow.
// ═══════════════════════════════════════════════════════════════════════════════

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: base },
}

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0,   transition: base },
}

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0,   transition: base },
}

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0,  transition: base },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: base },
}

export const fadeScale: Variants = {
  hidden:  { opacity: 0, scale: 0.97 },  // was 0.96 — more subtle
  visible: {
    opacity: 1,
    scale:   1,
    transition: { duration: DURATION.normal, ease: EASE.express },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — STAGGER CONTAINERS
// Only control timing. Children declare their own enter animation.
// ═══════════════════════════════════════════════════════════════════════════════

export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
}

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.0  } },
}

export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1  } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — SECTION & PAGE LEVEL
// ═══════════════════════════════════════════════════════════════════════════════

// Canonical reveal for top-level section wrappers.
export const sectionReveal: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: DURATION.slow, ease: EASE.express },
  },
}

// Soft page-in/out — use in layout.tsx or route segments with AnimatePresence.
// exit is intentionally faster than enter (pages leave quicker than they arrive).
export const pageTransition: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE.inOut },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — HERO
// ═══════════════════════════════════════════════════════════════════════════════

export const heroStagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
}

export const heroItem: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: DURATION.normal, ease: EASE.express },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — NAVBAR
// ═══════════════════════════════════════════════════════════════════════════════

export const navbarEntry: Variants = {
  hidden:  { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: DURATION.normal, ease: EASE.express },
  },
}

export const navLinkHover: Variants = {
  rest:  { x: 0,  opacity: 0.6 },
  hover: {
    x:       1,
    opacity: 1,
    transition: fast,
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — CARD INTERACTIONS
// Typed as TargetAndTransition (not Variants) — used in whileHover/animate props.
// ═══════════════════════════════════════════════════════════════════════════════

export const cardHover: TargetAndTransition = {
  y:          -4,
  boxShadow:  '0 20px 40px -12px rgb(0 0 0 / 0.14)',
  transition: fast,
}

export const cardRest: TargetAndTransition = {
  y:          0,
  boxShadow:  '0 1px 3px 0 rgb(0 0 0 / 0.07)',
  transition: fast,
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — IMAGE INTERACTIONS
// Always apply to an inner wrapper inside overflow-hidden.
// Prevents the scale from showing content outside the rounded container.
// ═══════════════════════════════════════════════════════════════════════════════

export const imageHover: TargetAndTransition = {
  scale:      1.05,
  transition: { duration: DURATION.slow, ease: EASE.out },
}

export const imageRest: TargetAndTransition = {
  scale:      1,
  transition: { duration: DURATION.slow, ease: EASE.out },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8 — BUTTON & MICRO INTERACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const buttonHover: TargetAndTransition = {
  scale:      1.02,
  transition: fast,
}

export const buttonTap: TargetAndTransition = {
  scale:      0.97,
  transition: { duration: DURATION.instant, ease: EASE.inOut },
}

// Arrow nudge — use with initial="rest" whileHover="hover" on the parent.
export const arrowNudge: Variants = {
  rest:  { x: 0 },
  hover: { x: 4, transition: fast },
}

// Icon micro-rotation — decorative, very subtle.
export const iconRotate: Variants = {
  rest:  { rotate: 0 },
  hover: { rotate: 8, transition: fast },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9 — OVERLAY & MODAL
// ═══════════════════════════════════════════════════════════════════════════════

// Backdrop — use with AnimatePresence wrapping the modal.
export const backdropReveal: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast,   ease: EASE.out   } },
  exit:    { opacity: 0, transition: { duration: DURATION.fast,   ease: EASE.inOut } },
}

// Modal panel — slides up from center, slightly scaled.
export const modalReveal: Variants = {
  hidden:  { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale:   1,
    y:       0,
    transition: { duration: DURATION.normal, ease: EASE.express },
  },
  exit: {
    opacity: 0,
    scale:   0.97,
    y:       8,
    transition: { duration: DURATION.fast, ease: EASE.inOut },
  },
}

// Drawer — slides in from the right (change x to -'100%' for left drawer).
export const drawerReveal: Variants = {
  hidden:  { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x:       '0%',
    transition: { duration: DURATION.normal, ease: EASE.express },
  },
  exit: {
    opacity: 0,
    x:       '100%',
    transition: { duration: DURATION.fast, ease: EASE.inOut },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10 — DROPDOWN & TOOLTIP
// ═══════════════════════════════════════════════════════════════════════════════

export const dropdownReveal: Variants = {
  hidden:  { opacity: 0, scale: 0.97, y: -6 },
  visible: {
    opacity: 1,
    scale:   1,
    y:       0,
    transition: { duration: DURATION.fast, ease: EASE.express },
  },
  exit: {
    opacity: 0,
    scale:   0.97,
    y:       -4,
    transition: { duration: DURATION.instant, ease: EASE.inOut },
  },
}

export const tooltipReveal: Variants = {
  hidden:  { opacity: 0, scale: 0.95, y: 4 },
  visible: {
    opacity: 1,
    scale:   1,
    y:       0,
    transition: { duration: DURATION.instant, ease: EASE.express },
  },
  exit: {
    opacity: 0,
    scale:   0.95,
    transition: { duration: DURATION.instant, ease: EASE.inOut },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 11 — ACCORDION
// Animate height via layout + opacity. Never animate height directly.
// Usage: wrap content in <motion.div layout> and fade via variants.
// ═══════════════════════════════════════════════════════════════════════════════

export const accordionContent: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.fast, ease: EASE.out, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.instant, ease: EASE.inOut },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 12 — SKELETON LOADING
// ═══════════════════════════════════════════════════════════════════════════════

// Use on a shimmer overlay inside a skeleton container.
export const skeletonShimmer: Variants = {
  initial: { x: '-100%' },
  animate: {
    x:          '100%',
    transition: {
      duration:   1.4,
      ease:       'linear',
      repeat:     Infinity,
      repeatType: 'loop',
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 13 — DECORATIVE / AMBIENT
// Only for non-content elements. Respects reduced motion via the hook.
// ═══════════════════════════════════════════════════════════════════════════════

// Slow float for decorative background shapes.
export const floating: Variants = {
  initial: { y: 0 },
  animate: {
    y:          [-6, 6, -6],
    transition: {
      duration:   5,
      ease:       'easeInOut',
      repeat:     Infinity,
      repeatType: 'loop',
    },
  },
}

// Subtle pulse for "live" indicators (e.g. a green dot showing an active service).
export const pulse: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale:      [1, 1.15, 1],
    opacity:    [1, 0.6,  1],
    transition: {
      duration:   2,
      ease:       'easeInOut',
      repeat:     Infinity,
      repeatType: 'loop',
    },
  },
}