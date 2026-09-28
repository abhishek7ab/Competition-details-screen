import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function Header({
  activeTab = 'contests',
  onBackPress,
  language,
  setLanguage,
  onToggleDevToolbar,
  isDevToolbarOpen,
  isDarkMode = false,
  onToggleDarkMode,
}) {
  const colors = getThemeColors(isDarkMode);

  const titles = {
    contests: { en: 'Go back', hi: 'वापस जाएं' },
    home: { en: 'Go back', hi: 'वापस जाएं' },
    browse: { en: 'Go back', hi: 'वापस जाएं' },
    profile: { en: 'Go back', hi: 'वापस जाएं' },
  };

  const currentTitle = titles[activeTab] || titles.contests;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      <View style={styles.innerRow}>
        {/* Left: Authentic Go Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Icon name="arrow-back" size={20} color={colors.textPrimary} />
          <Text style={[styles.backTitleText, { color: colors.textPrimary }]}>
            {language === 'hi' ? currentTitle.hi : currentTitle.en}
          </Text>
        </TouchableOpacity>

        {/* Right Actions */}
        <View style={styles.rightActions}>
          {/* Dark Mode Toggle */}
          {onToggleDarkMode && (
            <TouchableOpacity
              style={[
                styles.iconBtn,
                { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9', borderColor: colors.border },
              ]}
              onPress={onToggleDarkMode}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <Icon
                name={isDarkMode ? 'sunny' : 'moon-outline'}
                size={16}
                color={isDarkMode ? '#FBBF24' : '#0F172A'}
              />
            </TouchableOpacity>
          )}

          {/* Evaluator Dev Tools Toggle */}
          {onToggleDevToolbar && (
            <TouchableOpacity
              style={[
                styles.iconBtn,
                isDevToolbarOpen
                  ? { backgroundColor: colors.primary, borderColor: colors.primary }
                  : { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6', borderColor: colors.primary },
              ]}
              onPress={onToggleDevToolbar}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Evaluator Dev Tools"
            >
              <Icon
                name="hardware-chip-outline"
                size={16}
                color={isDevToolbarOpen ? '#FFFFFF' : colors.primary}
              />
            </TouchableOpacity>
          )}

          {/* Language Switcher */}
          <View
            style={[
              styles.langPillContainer,
              { backgroundColor: isDarkMode ? '#0F172A' : '#F1F5F9', borderColor: colors.border },
            ]}
          >
            <TouchableOpacity
              style={[styles.langPill, language === 'en' && { backgroundColor: colors.primary }]}
              onPress={() => setLanguage('en')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langText,
                  language === 'en' ? styles.langTextActive : { color: colors.textSecondary },
                ]}
              >
                ENG
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.langPill, language === 'hi' && { backgroundColor: colors.primary }]}
              onPress={() => setLanguage('hi')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langText,
                  language === 'hi' ? styles.langTextActive : { color: colors.textSecondary },
                ]}
              >
                हिंदी
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.03)', userSelect: 'none' },
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
    gap: 8,
    paddingVertical: 4,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  backTitleText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  langPillContainer: {
    flexDirection: 'row',
    borderRadius: 9999,
    padding: 2,
    borderWidth: 1,
    gap: 2,
  },
  langPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  langText: {
    fontSize: 11,
    fontWeight: '700',
  },
  langTextActive: {
    color: '#FFFFFF',
  },
});
