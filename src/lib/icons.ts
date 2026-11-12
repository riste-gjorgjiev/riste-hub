import type { SocialIcon, UiIcon } from '../config/links.config'

export type IconName = SocialIcon | UiIcon | 'arrow' | 'copy' | 'check' | 'mail'

const stroke = (body: string, extra = ''): string =>
  `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${body}</svg>`

const solid = (body: string): string =>
  `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${body}</svg>`

export const icons: Record<IconName, string> = {
  instagram: stroke(
    '<rect x="3" y="3" width="18" height="18" rx="5.2"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none"/>',
  ),
  github: solid(
    '<path d="M12 .7C5.7.7.7 5.7.7 12c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2c-3.1.7-3.8-1.4-3.8-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3.1 1.2a10.8 10.8 0 0 1 5.7 0C18.1 4.5 19 4.8 19 4.8c.6 1.6.2 2.7.1 3 .8.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.3 5.7 18.3.7 12 .7Z"/>',
  ),
  linkedin: solid(
    '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.79 13.02H3.54V9h3.59v11.45Z"/>',
  ),
  strava: solid(
    '<path d="M15.387 17.395v-5.34l2.14 4.135 2.137-4.135v5.34h1.983V9.35h-2.32l-1.8 3.508-1.803-3.508h-2.32v8.045zM8.62 9.35H5.02l4.727 9.09 4.72-9.09h-3.594l-1.126 2.17z"/>',
  ),
  moon: stroke('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
  sun: stroke(
    '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
  ),
  leaf: stroke(
    '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  ),
  calendar: stroke(
    '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>',
  ),
  mail: stroke(
    '<rect x="2.8" y="4.8" width="18.4" height="14.4" rx="3"/><path d="m4.5 7.2 6.4 5.1a1.8 1.8 0 0 0 2.2 0l6.4-5.1"/>',
  ),
  arrow: stroke('<path d="M6.5 17.5 17.5 6.5M8 6.5h9.5V16"/>'),
  copy: stroke(
    '<rect x="8.8" y="8.8" width="11.2" height="11.2" rx="2.4"/><path d="M5.2 15.2H4.8A1.8 1.8 0 0 1 3 13.4V4.8A1.8 1.8 0 0 1 4.8 3h8.6a1.8 1.8 0 0 1 1.8 1.8v.4"/>',
  ),
  check: stroke('<path d="m4.5 12.5 4.7 4.7L19.7 6.7"/>'),
}
