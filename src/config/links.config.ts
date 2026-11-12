/**
 * ---------------------------------------------------------------------------
 * RISTE.DEV — PORTAL CONFIGURATION
 * ---------------------------------------------------------------------------
 * Everything visitors see is configured here. Edit this one file to update
 * destinations, copy, handles, and per-link ambient glow colors.
 * ---------------------------------------------------------------------------
 */

export type VibeId = 'night' | 'day'

export type SocialIcon = 'instagram' | 'github' | 'linkedin' | 'strava'

export type UiIcon = 'moon' | 'sun' | 'leaf' | 'calendar'

export interface VibeMode {
  id: VibeId
  icon: UiIcon
  label: string
  glow: string
  secondaryGlow: string
}

export interface QuickLink {
  label: string
  icon: UiIcon
  url: string
  glow: string
  secondaryGlow?: string
}

export interface DestinationCard {
  icon: UiIcon
  title: string
  subtitle?: string
  url: string
  ctaLabel: string
  glow: string
  secondaryGlow?: string
}

export interface SocialLink {
  id: string
  label: string
  handle?: string
  url: string
  glow: string
  icon: SocialIcon
}

export const siteConfig = {
  name: 'Riste Gjorgjiev',
  role: 'COMPUTER SCIENCE STUDENT · EVENT & WILDLIFE PHOTOGRAPHER',
  location: 'Skopje, MK',
  domain: 'riste-gjorgjiev.dev',
  url: 'https://riste-gjorgjiev.dev',
  title: 'Riste Gjorgjiev — Computer Science Student & Photographer',
  description:
    'The personal portal of Riste Gjorgjiev — computer science engineer, event and wildlife photographer based in Skopje. Explore the photography portfolio, featured software work, and direct links.',
  defaultVibe: 'night' as VibeId,
  vibes: {
    night: {
      id: 'night',
      icon: 'moon',
      label: 'Night',
      glow: '#FF007F',
      secondaryGlow: '#7928CA',
    },
    day: {
      id: 'day',
      icon: 'sun',
      label: 'Day',
      glow: '#2D5A27',
      secondaryGlow: '#9BC46A',
    },
  } satisfies Record<VibeId, VibeMode>,
} as const

/* -------------------------------------------------------------------------- */
/* Photography destination                                                    */
/* -------------------------------------------------------------------------- */

export const photographyCard = {
  title: 'Photography Portfolio',
  accentTitle: '— By Night & By Day',
  subtitle: 'Nightclubs, Raves, Festivals, Wildlife & 24K Alpine Panoramas',
  url: 'https://photos.riste-gjorgjiev.dev',
  ctaLabel: 'Open the full portfolio',
  glow: '#FF007F',
  secondaryGlow: '#9BC46A',
  quickLinks: [
    {
      label: 'Enter Night Gallery',
      icon: 'moon',
      url: 'https://photos.riste-gjorgjiev.dev/explore?mode=NIGHT',
      glow: '#FF007F',
      secondaryGlow: '#7928CA',
    },
    {
      label: 'Enter Day Gallery',
      icon: 'leaf',
      url: 'https://photos.riste-gjorgjiev.dev/explore?mode=DAY',
      glow: '#2D5A27',
      secondaryGlow: '#9BC46A',
    },
  ],
} satisfies {
  title: string
  accentTitle: string
  subtitle: string
  url: string
  ctaLabel: string
  glow: string
  secondaryGlow: string
  quickLinks: QuickLink[]
}

/* -------------------------------------------------------------------------- */
/* Booking                                                                    */
/* -------------------------------------------------------------------------- */

export const bookingCard = {
  icon: 'calendar',
  title: 'Book Me for an Event / Shoot Inquiry',
  url: 'https://photos.riste-gjorgjiev.dev/booking',
  ctaLabel: 'Open booking form',
  glow: '#7928CA',
  secondaryGlow: '#00E5FF',
} satisfies DestinationCard

/* -------------------------------------------------------------------------- */
/* Social + engineering links                                                 */
/* -------------------------------------------------------------------------- */

export const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@riste_gjorgjiev',
    url: 'https://www.instagram.com/riste_gjorgjiev',
    glow: '#E1306C',
    icon: 'instagram',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'riste-gjorgjiev',
    url: 'https://github.com/riste-gjorgjiev',
    glow: '#00E5FF',
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/riste-gjorgjiev',
    url: 'https://www.linkedin.com/in/riste-gjorgjiev-55213622b',
    glow: '#3B82F6',
    icon: 'linkedin',
  },
  {
    id: 'strava',
    label: 'Strava',
    handle: 'Rides & routes',
    url: 'https://www.strava.com/athletes/203997099',
    glow: '#FC4C02',
    icon: 'strava',
  },
]

/* -------------------------------------------------------------------------- */
/* Direct email                                                               */
/* -------------------------------------------------------------------------- */

export const emailConfig = {
  label: 'Direct Email',
  address: 'ristegorgiev80@gmail.com',
  glow: '#FFB86B',
  secondaryGlow: '#7928CA',
}
