export const THEME = {
  colors: {
    // Core Brand — Deep space dark with electric teal/mint glow
    primary: '#00F5B8',          // Luminous electric mint
    primaryDark: '#00D4AA',      // Rich teal
    primaryGlow: 'rgba(0, 245, 184, 0.35)',
    primaryBg: 'rgba(0, 245, 184, 0.08)',
    primaryBorder: 'rgba(0, 245, 184, 0.28)',

    // Deep dark backgrounds
    bg: '#080C14',               // True darkest background
    surface: '#0E1522',          // Card surface
    surfaceElevated: '#151F32',  // Elevated card / modal
    surfaceGlass: 'rgba(14, 21, 34, 0.75)', // Glassmorphic surface

    // Borders & Dividers
    border: 'rgba(255, 255, 255, 0.07)',
    borderStrong: 'rgba(255, 255, 255, 0.15)',
    borderGlow: 'rgba(0, 245, 184, 0.4)',

    // Luxury Accent palette
    gold: '#FFB800',             // Pure trophy gold
    goldBright: '#FFD700',       // Glowing gold
    goldGlow: 'rgba(255, 184, 0, 0.3)',
    goldBg: 'rgba(255, 184, 0, 0.1)',
    rose: '#FF416C',             // Electric coral/rose
    roseBg: 'rgba(255, 65, 108, 0.12)',
    violet: '#8B5CF6',           // Royal violet
    violetBg: 'rgba(139, 92, 246, 0.12)',
    amber: '#FF9F1C',            // Solar amber
    amberBg: 'rgba(255, 159, 28, 0.12)',
    cyan: '#00C2FF',             // Neon cyan
    cyanBg: 'rgba(0, 194, 255, 0.1)',

    // Text
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#52617A',
    textAccent: '#00F5B8',
    white: '#FFFFFF',

    // Status
    success: '#00F5B8',
    successBg: 'rgba(0, 245, 184, 0.1)',
    warning: '#FF9F1C',
    warningBg: 'rgba(255, 159, 28, 0.1)',
    danger: '#FF416C',
    dangerBg: 'rgba(255, 65, 108, 0.1)',
  },

  gradients: {
    hero: ['#080C14', '#0E1726', '#121F33'],
    card: ['#0E1522', '#151F32'],
    mint: ['#00F5B8', '#00D4AA'],
    gold: ['#FFE066', '#FFB800', '#FF8C00'],
    aurora: ['#00F5B8', '#00C2FF', '#8B5CF6'],
    darkGlass: ['rgba(21, 31, 50, 0.85)', 'rgba(14, 21, 34, 0.85)'],
  },

  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    displayFont: "'Outfit', 'Plus Jakarta Sans', sans-serif",
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
      shadowColor: '#00F5B8',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.45,
      shadowRadius: 18,
      elevation: 12,
    },
    goldGlow: {
      shadowColor: '#FFB800',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.35,
      shadowRadius: 14,
      elevation: 10,
    },
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.45,
      shadowRadius: 14,
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
    lg: 16,
    xl: 20,
    xxl: 28,
    full: 9999,
  },
};

