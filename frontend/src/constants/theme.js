export const THEME = {
  colors: {
    // Core Brand — Deep space dark with electric teal glow
    primary: '#00D4AA',          // Electric teal/mint — the hero accent
    primaryDark: '#00A887',      // Deeper teal for press states
    primaryGlow: 'rgba(0, 212, 170, 0.25)',
    primaryBg: 'rgba(0, 212, 170, 0.1)',
    primaryBorder: 'rgba(0, 212, 170, 0.25)',

    // Deep dark backgrounds
    bg: '#080C14',               // True darkest layer
    surface: '#0F1623',          // Card background
    surfaceElevated: '#161F2E',  // Elevated card / modal
    surfaceGlass: 'rgba(255,255,255,0.04)', // Glassmorphic surface

    // Borders & Dividers
    border: 'rgba(255,255,255,0.08)',
    borderStrong: 'rgba(255,255,255,0.14)',

    // Accent palette
    gold: '#FFB800',             // Prize / trophy gold
    goldBg: 'rgba(255,184,0,0.12)',
    rose: '#FF4D6A',             // Danger / sold out
    roseBg: 'rgba(255,77,106,0.12)',
    violet: '#9747FF',           // Special / premium
    violetBg: 'rgba(151,71,255,0.12)',
    amber: '#FF8C42',            // Warning / deadline
    amberBg: 'rgba(255,140,66,0.12)',

    // Text
    textPrimary: '#F0F4FF',
    textSecondary: '#94A3C4',
    textMuted: '#4F607A',
    textAccent: '#00D4AA',
    white: '#FFFFFF',

    // Status
    success: '#00D4AA',
    successBg: 'rgba(0, 212, 170, 0.1)',
    warning: '#FF8C42',
    warningBg: 'rgba(255,140,66,0.1)',
    danger: '#FF4D6A',
    dangerBg: 'rgba(255,77,106,0.1)',
  },

  gradients: {
    hero: ['#080C14', '#0D1928', '#0F2035'],
    card: ['#0F1623', '#161F2E'],
    accent: ['#00D4AA', '#0096D6'],
    gold: ['#FFB800', '#FF8C00'],
  },

  typography: {
    fontFamily: 'System',
    sizes: {
      xs: 11,
      sm: 12,
      md: 14,
      base: 15,
      lg: 16,
      xl: 18,
      xxl: 22,
      huge: 28,
      display: 34,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extraBold: '800',
      black: '900',
    },
  },

  shadows: {
    glow: {
      shadowColor: '#00D4AA',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 12,
    },
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    },
    subtle: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 4,
    },
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 18,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
};
