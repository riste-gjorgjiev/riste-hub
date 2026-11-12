import './styles.css'
import { siteConfig, type VibeId } from './config/links.config'
import { createAmbientController } from './lib/ambient'
import { showToast } from './lib/toast'
import { renderPortal } from './lib/ui'

const STORAGE_KEY = 'riste-portal-vibe'
const copyTimers = new WeakMap<HTMLButtonElement, number>()

function getInitialVibe(): VibeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'night' || stored === 'day') return stored
  } catch {
    // Storage can be unavailable in private browsing contexts.
  }
  return siteConfig.defaultVibe
}

function persistVibe(vibe: VibeId): void {
  try {
    localStorage.setItem(STORAGE_KEY, vibe)
  } catch {
    // Non-critical: the portal still works without persistence.
  }
}

function isVibeId(value: string | undefined): value is VibeId {
  return value === 'night' || value === 'day'
}

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  const copied = document.execCommand('copy')
  textarea.remove()

  if (!copied) throw new Error('Clipboard copy failed')
}

function markCopied(button: HTMLButtonElement): void {
  const label = button.querySelector<HTMLElement>('[data-copy-label]')
  const originalLabel = label?.textContent ?? 'Copy Email'
  const previousTimer = copyTimers.get(button)

  if (previousTimer !== undefined) window.clearTimeout(previousTimer)

  button.classList.add('is-copied')
  if (label) label.textContent = 'Copied!'

  const timer = window.setTimeout(() => {
    button.classList.remove('is-copied')
    if (label) label.textContent = originalLabel
    copyTimers.delete(button)
  }, 2200)

  copyTimers.set(button, timer)
}

function initCopyButtons(): void {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return

    const button = event.target.closest<HTMLButtonElement>('[data-copy]')
    if (!button) return

    event.preventDefault()
    event.stopPropagation()

    const value = button.dataset.copy
    if (!value) return

    void copyText(value)
      .then(() => {
        markCopied(button)
        showToast('Copied!', 'Email address copied to your clipboard.')
      })
      .catch(() => {
        showToast('Copy failed', 'Select the email address and copy it manually.')
      })
  })
}

function initVibeToggle(
  ambient: ReturnType<typeof createAmbientController>,
): void {
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('button[data-vibe]'),
  )

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextVibe = button.dataset.vibe
      if (!isVibeId(nextVibe)) return

      ambient.setMode(nextVibe)
      persistVibe(nextVibe)

      buttons.forEach((candidate) => {
        const active = candidate === button
        candidate.classList.toggle('is-active', active)
        candidate.setAttribute('aria-pressed', String(active))
      })
    })
  })
}

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Portal root element #app was not found')

const initialVibe = getInitialVibe()
app.innerHTML = renderPortal(initialVibe)

const ambient = createAmbientController(siteConfig.vibes, initialVibe)
initVibeToggle(ambient)
initCopyButtons()
