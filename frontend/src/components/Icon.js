import React from 'react';
import { View, Platform } from 'react-native';

/**
 * Universal Icon Component
 * Renders pure inline SVG on Web (zero font-loading dependency, 100% reliable)
 * and falls back cleanly on native platforms.
 */
export default function Icon({ name, size = 20, color = '#0A7075', style }) {
  if (Platform.OS === 'web') {
    return (
      <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
        {renderSvgIcon(name, size, color)}
      </View>
    );
  }

  // On native fallback
  try {
    const { Ionicons, Feather } = require('@expo/vector-icons');
    if (name === 'plus') return <Feather name="plus" size={size} color={color} style={style} />;
    return <Ionicons name={name} size={size} color={color} style={style} />;
  } catch (e) {
    return <View style={[{ width: size, height: size }, style]} />;
  }
}

function renderSvgIcon(name, size, color) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (name) {
    // ── Navigation Icons ──
    case 'home':
      return (
        <svg {...commonProps} fill={color} stroke="none">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      );
    case 'home-outline':
      return (
        <svg {...commonProps}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'search':
    case 'search-outline':
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 'compass':
    case 'compass-outline':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={name === 'compass' ? color : 'none'} />
        </svg>
      );
    case 'plus':
      return (
        <svg {...commonProps} strokeWidth={2.5}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case 'trophy':
      return (
        <svg {...commonProps} fill={color}>
          <path d="M6 9V2h12v7c0 3.31-2.69 6-6 6s-6-2.69-6-6z" />
          <path d="M18 4h3a2 2 0 0 1 2 2v1c0 2.21-1.79 4-4 4h-1" fill="none" />
          <path d="M6 4H3a2 2 0 0 0-2 2v1c0 2.21 1.79 4 4 4h1" fill="none" />
          <path d="M12 15v4" fill="none" />
          <path d="M8 22h8" fill="none" />
        </svg>
      );
    case 'trophy-outline':
      return (
        <svg {...commonProps}>
          <path d="M6 9V2h12v7c0 3.31-2.69 6-6 6s-6-2.69-6-6z" />
          <path d="M18 4h3a2 2 0 0 1 2 2v1c0 2.21-1.79 4-4 4h-1" />
          <path d="M6 4H3a2 2 0 0 0-2 2v1c0 2.21 1.79 4 4 4h1" />
          <path d="M12 15v4" />
          <path d="M8 22h8" />
        </svg>
      );
    case 'person':
    case 'person-outline':
      return (
        <svg {...commonProps}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );

    // ── Header & Action Icons ──
    case 'arrow-back':
      return (
        <svg {...commonProps} strokeWidth={2.5}>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      );
    case 'moon':
    case 'moon-outline':
      return (
        <svg {...commonProps}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    case 'sunny':
    case 'sunny-outline':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    case 'hardware-chip':
    case 'hardware-chip-outline':
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      );
    case 'close':
      return (
        <svg {...commonProps} strokeWidth={2.5}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case 'close-circle':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case 'lock-closed':
      return (
        <svg {...commonProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );

    // ── Media & Play Icons ──
    case 'play':
      return (
        <svg {...commonProps} fill={color} stroke="none">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      );
    case 'play-circle':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill={color} stroke="none" />
        </svg>
      );

    // ── Status & Notification Icons ──
    case 'checkmark-circle':
      return (
        <svg {...commonProps}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case 'hourglass-outline':
      return (
        <svg {...commonProps}>
          <path d="M5 22h14" />
          <path d="M5 2h14" />
          <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
          <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
        </svg>
      );
    case 'stopwatch-outline':
    case 'time':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="14" r="8" />
          <line x1="12" y1="10" x2="12" y2="14" />
          <line x1="12" y1="14" x2="15" y2="14" />
          <line x1="12" y1="2" x2="12" y2="4" />
        </svg>
      );
    case 'calendar':
    case 'calendar-outline':
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'send':
      return (
        <svg {...commonProps}>
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" fill={color} />
        </svg>
      );
    case 'upload':
      return (
        <svg {...commonProps}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      );
    case 'people':
    case 'people-outline':
      return (
        <svg {...commonProps}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'star':
      return (
        <svg {...commonProps} fill={color}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'star-outline':
      return (
        <svg {...commonProps}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'medal':
    case 'medal-outline':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="14" r="6" />
          <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11" />
          <path d="M12 2v6" />
        </svg>
      );
    case 'information-circle-outline':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    case 'shield-checkmark':
    case 'shield-checkmark-outline':
      return (
        <svg {...commonProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case 'megaphone':
    case 'megaphone-outline':
      return (
        <svg {...commonProps}>
          <path d="M3 11l19-9-9 19-2-8-8-2z" />
        </svg>
      );
    case 'chatbubble-ellipses':
    case 'chatbubble-ellipses-outline':
      return (
        <svg {...commonProps}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          <circle cx="8" cy="12" r="1" fill={color} />
          <circle cx="12" cy="12" r="1" fill={color} />
          <circle cx="16" cy="12" r="1" fill={color} />
        </svg>
      );
    case 'chevron-forward':
    case 'chevron-right':
      return (
        <svg {...commonProps} strokeWidth={2.5}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...commonProps} strokeWidth={2.5}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      );
    case 'chevron-up':
      return (
        <svg {...commonProps} strokeWidth={2.5}>
          <polyline points="18 15 12 9 6 15" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...commonProps} fill={color} stroke="none">
          <path d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-2-1.5-3.5-2.5-4.5C12 9 12 7 13 5c-3 1-5 4-5 6.5 0 1 .5 2 .5 3z" />
        </svg>
      );
    case 'flash':
      return (
        <svg {...commonProps} fill={color} stroke="none">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...commonProps}>
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg {...commonProps} fill={color} stroke="none">
          <polygon points="12 2 14 8 20 10 14 12 12 18 10 12 4 10 10 8 12 2" />
        </svg>
      );
    case 'grid':
    case 'grid-outline':
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
    case 'musical-notes':
    case 'musical-note':
      return (
        <svg {...commonProps}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 'mic':
      return (
        <svg {...commonProps}>
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      );
    case 'color-palette':
      return (
        <svg {...commonProps}>
          <circle cx="13.5" cy="6.5" r=".5" fill={color} />
          <circle cx="17.5" cy="10.5" r=".5" fill={color} />
          <circle cx="8.5" cy="7.5" r=".5" fill={color} />
          <circle cx="6.5" cy="12.5" r=".5" fill={color} />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    case 'gift-outline':
      return (
        <svg {...commonProps}>
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      );
    case 'ticket-outline':
      return (
        <svg {...commonProps}>
          <path d="M2 9a3 3 0 0 1 0 6v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a3 3 0 0 1 0-6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v5z" />
          <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="3 3" />
        </svg>
      );
    case 'trending-up':
      return (
        <svg {...commonProps}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case 'cloud-offline-outline':
      return (
        <svg {...commonProps}>
          <path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0-4 7h1.26a5 5 0 0 0 9.05 4.95" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}
