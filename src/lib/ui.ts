import {
  bookingCard,
  emailConfig,
  photographyCard,
  siteConfig,
  socialLinks,
  type DestinationCard,
  type VibeId,
} from '../config/links.config'
import { icons } from './icons'
import { toastMarkup } from './toast'

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const esc = (value: string): string => value.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char)

const glowAttrs = (primary: string, secondary?: string): string =>
  `data-glow="${esc(primary)}"${secondary ? ` data-glow-secondary="${esc(secondary)}"` : ''}`

const external = 'target="_blank" rel="noopener noreferrer"'

function renderVibeToggle(initialVibe: VibeId): string {
  const options = Object.values(siteConfig.vibes)
    .map((mode) => {
      const active = mode.id === initialVibe
      return `
        <button
          type="button"
          class="vibe-option${active ? ' is-active' : ''}"
          data-vibe="${esc(mode.id)}"
          aria-pressed="${active}"
          style="--mode-glow: ${esc(mode.glow)}"
          ${glowAttrs(mode.glow, mode.secondaryGlow)}
        >
          <span class="vibe-icon" aria-hidden="true">${icons[mode.icon]}</span>
          <span>${esc(mode.label)}</span>
        </button>`
    })
    .join('')

  return `
    <div class="vibe-toggle" role="group" aria-label="Color mode">
      ${options}
    </div>`
}

function renderHeader(initialVibe: VibeId): string {
  return `
    <header class="site-header">
      <div class="topbar reveal" style="--delay: 0ms">
        <a class="brandline" href="${esc(siteConfig.url)}">${esc(siteConfig.domain)}</a>
        ${renderVibeToggle(initialVibe)}
      </div>

      <div class="identity-row reveal" style="--delay: 60ms">
        <h1 class="identity-name display">${esc(siteConfig.name)}</h1>
        <p class="role-badge mono">${esc(siteConfig.role)}</p>
        <p class="location-line mono">${esc(siteConfig.location)}</p>
      </div>
    </header>`
}

function renderHeroCard(): string {
  const card = photographyCard
  const quickLinks = card.quickLinks
    .map(
      (link) => `
        <a
          class="quick-link"
          href="${esc(link.url)}"
          ${external}
          style="--pill-glow: ${esc(link.glow)}"
          ${glowAttrs(link.glow, link.secondaryGlow)}
        >
          <span class="quick-link-icon" aria-hidden="true">${icons[link.icon]}</span>
          <span>${esc(link.label)}</span>
          <span class="quick-link-arrow" aria-hidden="true">${icons.arrow}</span>
        </a>`,
    )
    .join('')

  return `
    <article class="card hero-card reveal" style="--delay: 120ms" ${glowAttrs(card.glow, card.secondaryGlow)}>
      <a
        class="stretch-link"
        href="${esc(card.url)}"
        ${external}
        aria-label="Open the photography portfolio at photos.riste-gjorgjiev.dev"
      ></a>
      <div class="card-body hero-body">
        <div class="hero-copy">
          <h2 class="hero-title display">
            ${esc(card.title)}
            <span class="ink-gradient">${esc(card.accentTitle)}</span>
          </h2>
          <p class="hero-sub">${esc(card.subtitle)}</p>
          <div class="quick-links" role="group" aria-label="Quick gallery jump">
            ${quickLinks}
          </div>
          <p class="hero-cta mono">
            ${esc(card.ctaLabel)}
            <span aria-hidden="true">${icons.arrow}</span>
          </p>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="swatch swatch--night">
            <span class="swatch-label mono">${icons.moon} NIGHT</span>
            <span class="swatch-word display">01</span>
          </div>
          <div class="swatch swatch--day">
            <span class="swatch-label mono">${icons.sun} DAY</span>
            <span class="swatch-word display">02</span>
          </div>
        </div>
      </div>
    </article>`
}

function renderBookingCard(card: DestinationCard): string {
  return `
    <article
      class="card destination-card card--accent reveal"
      style="--delay: 180ms; --accent-a: ${esc(card.glow)}; --accent-b: ${esc(card.secondaryGlow ?? card.glow)}"
      ${glowAttrs(card.glow, card.secondaryGlow)}
    >
      <a
        class="stretch-link"
        href="${esc(card.url)}"
        ${external}
        aria-label="${esc(card.title)} (opens the booking form in a new tab)"
      ></a>
      <div class="card-body booking-body">
        <span class="destination-icon" style="--icon-glow: ${esc(card.glow)}" aria-hidden="true">${icons[card.icon]}</span>
        <div class="booking-main">
          <h3 class="card-title display">${esc(card.title)}</h3>
          <p class="booking-cta mono">${esc(card.ctaLabel)}</p>
        </div>
        <span class="card-footer-arrow" aria-hidden="true">${icons.arrow}</span>
      </div>
    </article>`
}

function renderSocialLinks(): string {
  return socialLinks
    .map(
      (link) => `
        <a
          class="social-row"
          href="${esc(link.url)}"
          ${external}
          style="--brand: ${esc(link.glow)}"
          ${glowAttrs(link.glow)}
          aria-label="${esc(link.label)} (opens in a new tab)"
        >
          <span class="social-icon" aria-hidden="true">${icons[link.icon]}</span>
          <span class="social-label">${esc(link.label)}</span>
          <span class="social-handle mono">${esc(link.handle ?? '')}</span>
          <span class="social-arrow" aria-hidden="true">${icons.arrow}</span>
        </a>`,
    )
    .join('')
}

function renderEmailCard(): string {
  return `
    <div
      class="email-card"
      style="--email-glow: ${esc(emailConfig.glow)}"
      ${glowAttrs(emailConfig.glow, emailConfig.secondaryGlow)}
    >
      <a
        class="stretch-link"
        href="mailto:${esc(emailConfig.address)}"
        aria-label="Email ${esc(siteConfig.name)} at ${esc(emailConfig.address)}"
      ></a>
      <div class="email-content">
        <div class="email-top">
          <span class="email-icon" aria-hidden="true">${icons.mail}</span>
          <span class="email-labels">
            <span class="email-label mono">${esc(emailConfig.label)}</span>
            <span class="email-address">${esc(emailConfig.address)}</span>
          </span>
        </div>
        <button
          type="button"
          class="copy-btn"
          data-copy="${esc(emailConfig.address)}"
          aria-label="Copy email address ${esc(emailConfig.address)} to the clipboard"
        >
          <span class="copy-icon-stack" aria-hidden="true">
            <span class="copy-icon copy-icon--copy">${icons.copy}</span>
            <span class="copy-icon copy-icon--check">${icons.check}</span>
          </span>
          <span data-copy-label>Copy Email</span>
        </button>
      </div>
    </div>`
}

function renderLinkPortal(): string {
  return `
    <aside class="link-column reveal" style="--delay: 240ms">
      <div class="connect-panel">
        <h2 class="panel-title display">Direct links</h2>

        <nav class="social-list" aria-label="Social and engineering links">
          ${renderSocialLinks()}
        </nav>

        <div class="panel-divider">
          <span class="mono">OR EMAIL DIRECTLY</span>
          <span class="panel-divider-line" aria-hidden="true"></span>
        </div>

        ${renderEmailCard()}
      </div>
    </aside>`
}

function renderFooter(): string {
  const year = new Date().getFullYear()
  return `
    <footer class="site-footer reveal" style="--delay: 300ms">
      <p class="footer-brand mono">© ${year} ${esc(siteConfig.name)}</p>
    </footer>`
}

export function renderPortal(initialVibe: VibeId): string {
  return `
    <div class="ambient" aria-hidden="true">
      <span class="ambient-orb ambient-orb--a"></span>
      <span class="ambient-orb ambient-orb--b"></span>
      <span class="ambient-grid"></span>
      <span class="ambient-vignette"></span>
      <span class="ambient-noise"></span>
    </div>

    <div class="shell">
      <a class="skip-link" href="#main">Skip to content</a>
      ${renderHeader(initialVibe)}

      <main id="main">
        <div class="portal-grid">
          <section class="bento" aria-label="Featured destinations">
            ${renderHeroCard()}
            ${renderBookingCard(bookingCard)}
          </section>

          ${renderLinkPortal()}
        </div>
      </main>

      ${renderFooter()}
    </div>

    ${toastMarkup()}`
}
