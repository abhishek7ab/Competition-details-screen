import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function UserFeedbackBanner({ onFeedbackPress, language }) {
  return (
    <View style={styles.container}>
      {/* Hear From Our Users banner */}
      <TouchableOpacity
        style={styles.banner}
        onPress={onFeedbackPress}
        activeOpacity={0.8}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="chatbubbles" size={18} color={THEME.colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>
              {language === 'hi' ? 'प्रतिभागियों की प्रतिक्रियाएं' : 'Community Reviews'}
            </Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={10} color={THEME.colors.gold} />
              <Text style={styles.ratingText}>4.9/5</Text>
            </View>
          </View>
          <Text style={styles.subtext}>
            {language === 'hi'
              ? '1,200+ नर्तकियों द्वारा प्रशंसित मंच'
              : 'Rated 4.9 by 1,200+ dancers across India'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={THEME.colors.textMuted} />
      </TouchableOpacity>

      {/* Partner / Sponsor Spot */}
      <View style={styles.adContainer}>
        <Ionicons name="sparkles" size={14} color={THEME.colors.primary} />
        <Text style={styles.adText}>
          {language === 'hi' ? 'प्रायोजक एवं साझेदारी स्थान' : 'OFFICIAL PARTNER SPOTLIGHT'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
    backgroundColor: THEME.colors.bg,
    gap: 12,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    ...Platform.select({
      web: { boxShadow: '0 2px 14px rgba(0,0,0,0.4)' },
    }),
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: THEME.colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    gap: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: THEME.colors.goldBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.gold,
  },
  subtext: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  adContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: THEME.colors.primaryBorder,
    backgroundColor: 'rgba(0, 212, 170, 0.03)',
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
  },
  adText: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
    letterSpacing: 1,
  },
});
