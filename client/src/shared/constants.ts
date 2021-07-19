export const COLORS = {
    primary: 'var(--color-primary)',
    primaryDark: 'var(--color-primary-dark)',
    primaryGrey: 'var(--color-primary-grey)',
    primaryLight: 'var(--color-primary-light)',
    outline: 'var(--color-outline)',
    error: 'var(--color-error)',
    errorHover: 'var(--color-error-hover)',
    errorLight: 'var(--color-error-light)',
    warning: 'var(--color-warning)',
    success: 'var(--color-success)',
    backgroundLight: 'var(--color-background-light)',
    restingOutline: 'var(--color-resting-outline)',
    buttonHover: 'var(--color-button-hover)',
    buttonOutlineResting: 'var(--color-button-outline-resting)',
    background: 'var(--color-background)',
    borderLight: 'var(--color-border-light)',
}

export const BREAKPOINTS = {
    mobile: 325,
    mobileLg: 475,
    tablet: 768,
    tabletLg: 976,
    laptop: 1180,
    desktop: 1440,
    desktopLg: 1920
}

export const isMobileWidth = window.innerWidth <= BREAKPOINTS.mobile