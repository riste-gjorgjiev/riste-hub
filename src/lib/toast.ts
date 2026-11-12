import { icons } from './icons'

let hideTimer: number | undefined

export const toastMarkup = (): string => `
  <div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true">
    <span class="toast-icon" aria-hidden="true">${icons.check}</span>
    <span class="toast-copy">
      <strong data-toast-title></strong>
      <span data-toast-message></span>
    </span>
  </div>
`

export function showToast(title: string, message: string): void {
  const toast = document.querySelector<HTMLElement>('#toast')
  if (!toast) return

  const titleEl = toast.querySelector<HTMLElement>('[data-toast-title]')
  const messageEl = toast.querySelector<HTMLElement>('[data-toast-message]')
  if (titleEl) titleEl.textContent = title
  if (messageEl) messageEl.textContent = message

  toast.classList.add('is-visible')
  if (hideTimer !== undefined) window.clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible')
  }, 2600)
}
