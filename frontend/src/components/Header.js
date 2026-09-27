import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function Header({ language, setLanguage, onToggleDevBar }) {
  return (
    <View style={styles.container}>
      {/* Accent line at top */}
      <View style={styles.accentLine} />

      <View style={styles.innerRow}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <View style={styles.backIconWrap}>
            <Ionicons name="arrow-back" size={18} color={THEME.colors.textPrimary} />
          </View>
          <View>
            <Text style={styles.brandName}>FEEDANTS</Text>
            <Text style={styles.backLabel}>Competition Details</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.rightActions}>
          {/* Language Switcher */}
          <View style={styles.langPillContainer}>
            <TouchableOpacity
              style={[styles.langPill, language === 'en' && styles.langPillActive]}
              onPress={() => setLanguage('en')}
              activeOpacity={0.8}
            >
              <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>
                EN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.langPill, language === 'hi' && styles.langPillActive]}
              onPress={() => setLanguage('hi')}
              activeOpacity={0.8}
            >
              <Text style={[styles.langText, language === 'hi' && styles.langTextActive]}>
                हि
              </Text>
            </TouchableOpacity>
          </View>

          {/* Dev Controls Toggle */}
          <TouchableOpacity
            style={styles.devButton}
            onPress={onToggleDevBar}
            activeOpacity={0.7}
          >
            <Ionicons name="options-outline" size={18} color={THEME.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    ...Platform.select({
      web: { boxShadow: '0 2px 12px rgba(0,0,0,0.4)' },
    }),
  },
  accentLine: {
    height: 2,
    backgroundColor: THEME.colors.primary,
    ...Platform.select({
      web: { boxShadow: `0 0 12px ${THEME.colors.primaryGlow}` },
    }),
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: THEME.colors.surfaceGlass,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.primary,
    letterSpacing: 2,
    lineHeight: 16,
  },
  backLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.medium,
    letterSpacing: 0.3,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  langPillContainer: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceGlass,
    borderRadius: THEME.borderRadius.full,
    padding: 2,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 2,
  },
  langPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.full,
  },
  langPillActive: {
    backgroundColor: THEME.colors.primary,
  },
  langText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textMuted,
  },
  langTextActive: {
    color: THEME.colors.bg,
  },
  devButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: THEME.colors.primaryBg,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
