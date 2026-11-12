import type { VibeId, VibeMode } from '../config/links.config'

export interface AmbientController {
  setMode: (id: VibeId) => void
  reset: () => void
  getMode: () => VibeId
}

const getTrigger = (target: EventTarget | null): HTMLElement | null =>
  target instanceof Element ? target.closest<HTMLElement>('[data-glow]') : null

/**
 * Drives the two blurred ambient orbs through CSS custom properties.
 * Hovering, focusing, or tapping anything with `data-glow` previews that
 * destination's color; leaving resets to the active vibe palette.
 */
export function createAmbientController(
  modes: Record<VibeId, VibeMode>,
  initialMode: VibeId,
): AmbientController {
  const root = document.documentElement
  let mode = initialMode

  const apply = (primary: string, secondary: string): void => {
    root.style.setProperty('--orb-a', primary)
    root.style.setProperty('--orb-b', secondary)
  }

  const reset = (): void => {
    apply(modes[mode].glow, modes[mode].secondaryGlow)
  }

  const setMode = (id: VibeId): void => {
    mode = id
    root.dataset.vibe = id
    reset()
  }

  const activate = (trigger: HTMLElement): void => {
    const glow = trigger.dataset.glow
    if (!glow) return
    apply(glow, trigger.dataset.glowSecondary || modes[mode].secondaryGlow)
  }

  setMode(initialMode)

  document.addEventListener('pointerover', (event) => {
    const trigger = getTrigger(event.target)
    if (trigger) activate(trigger)
    else reset()
  })

  document.addEventListener('pointerout', (event) => {
    const trigger = getTrigger(event.target)
    if (!trigger) return

    const next = event.relatedTarget
    if (next instanceof Node && trigger.contains(next)) return

    const nextTrigger = getTrigger(next)
    if (nextTrigger) activate(nextTrigger)
    else reset()
  })

  document.addEventListener('focusin', (event) => {
    const trigger = getTrigger(event.target)
    if (trigger) activate(trigger)
  })

  document.addEventListener('focusout', (event) => {
    const trigger = getTrigger(event.target)
    if (!trigger) return

    const next = event.relatedTarget
    if (next instanceof Node && trigger.contains(next)) return
    reset()
  })

  document.addEventListener('pointerdown', (event) => {
    const trigger = getTrigger(event.target)
    if (trigger) activate(trigger)
  })

  document.documentElement.addEventListener('mouseleave', reset)

  return {
    setMode,
    reset,
    getMode: () => mode,
  }
}
