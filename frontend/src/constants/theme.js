export const THEME = {
  colors: {
    // Official Feedants Brand Teal (from the authentic design reference)
    primary: '#0A7075',          // Authentic Feedants Deep Sea Teal
    primaryDark: '#075054',      // Hover / active dark teal
    primaryLight: '#E8F6F6',     // Soft teal tint for pills & countdown banner
    primaryBg: '#E8F6F6',        // Soft mint/teal background for badges
    primaryBorder: '#B2E2E4',    // Subtle teal border
    primaryGlow: 'rgba(10, 112, 117, 0.15)',

    // Real-world clean background & surfaces
    bg: '#F5F7FA',               // Soft neutral canvas (like Airbnb / Feedants)
    surface: '#FFFFFF',          // Clean white card surface
    surfaceElevated: '#FFFFFF',  // Elevated card
    surfaceMuted: '#F8FAFC',     // Muted surface
    surfaceGlass: 'rgba(255, 255, 255, 0.95)',

    // Borders & Hairlines
    border: '#E2E8F0',           // Crisp hairline border (Slate 200)
    borderStrong: '#CBD5E1',     // Active card border (Slate 300)
    borderGlow: '#0A7075',

    // Accents (Real, restrained)
    gold: '#D97706',             // Warm amber gold
    goldBg: '#FEF3C7',
    teal: '#0A7075',
    tealBg: '#E8F6F6',
    rose: '#DC2626',
    roseBg: '#FEE2E2',
    amber: '#D97706',
    amberBg: '#FEF3C7',
    green: '#16A34A',
    greenBg: '#DCFCE7',

    // Typography
    textPrimary: '#0F172A',      // Crisp dark slate (Slate 900)
    textSecondary: '#475569',    // Neutral gray (Slate 600)
    textMuted: '#94A3B8',        // Subtle caption gray (Slate 400)
    textAccent: '#0A7075',
    white: '#FFFFFF',

    // Status
    success: '#16A34A',
    successBg: '#DCFCE7',
    warning: '#D97706',
    warningBg: '#FEF3C7',
    danger: '#DC2626',
    dangerBg: '#FEE2E2',
  },

  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    displayFont: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    sizes: {
      xs: 11,
      sm: 12,
      md: 14,
      base: 15,
      lg: 16,
      xl: 18,
      xxl: 22,
      huge: 26,
      display: 32,
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
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    subtle: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 2,
      elevation: 1,
    },
  },

  borderRadius: {
    xs: 4,
    sm: 6,
    md: 10,
    lg: 14,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
};
