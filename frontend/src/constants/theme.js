export const LIGHT_COLORS = {
  primary: '#0A7075',          // Authentic Feedants Deep Sea Teal
  primaryDark: '#075054',      // Hover / active dark teal
  primaryLight: '#E8F6F6',     // Soft teal tint for countdown banner & badges
  primaryBg: '#E8F6F6',
  primaryBorder: '#B2E2E4',
  bg: '#F5F7FA',               // Clean app canvas
  canvas: '#E2E8F0',           // Desktop backdrop
  surface: '#FFFFFF',          // Card surface
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#F8FAFC',
  border: '#E2E8F0',           // Hairline border
  borderStrong: '#CBD5E1',
  textPrimary: '#0F172A',      // Dark slate title
  textSecondary: '#475569',    // Body text
  textMuted: '#94A3B8',        // Captions
  white: '#FFFFFF',
  gold: '#D97706',
  rose: '#DC2626',
  green: '#16A34A',
};

export const DARK_COLORS = {
  primary: '#14B8A6',          // Luminous mint teal for dark mode
  primaryDark: '#0D9488',
  primaryLight: '#132E35',
  primaryBg: '#132E35',
  primaryBorder: '#1A4D54',
  bg: '#0F172A',               // Deep slate canvas
  canvas: '#020617',           // Ultra deep desktop backdrop
  surface: '#1E293B',          // Elevated dark card surface
  surfaceElevated: '#243347',
  surfaceMuted: '#172234',
  border: '#334155',           // Dark subtle border
  borderStrong: '#475569',
  textPrimary: '#F8FAFC',      // Crisp white titles
  textSecondary: '#94A3B8',    // Soft slate body text
  textMuted: '#64748B',        // Muted captions
  white: '#FFFFFF',
  gold: '#FBBF24',
  rose: '#F43F5E',
  green: '#22C55E',
};

export const getThemeColors = (isDarkMode) => (isDarkMode ? DARK_COLORS : LIGHT_COLORS);

export const THEME = {
  colors: LIGHT_COLORS,
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
