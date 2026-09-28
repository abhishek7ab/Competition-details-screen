import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function SidebarNav({
  activeTab,
  onSelectTab,
  activeUser,
  onCreatePress,
  language,
  setLanguage,
  isDarkMode = false,
  onToggleDarkMode,
}) {
  const colors = getThemeColors(isDarkMode);

  const navItems = [
    { key: 'contests', icon: 'trophy-outline', iconActive: 'trophy', label: 'Competition Details', labelHi: 'प्रतियोगिता विवरण' },
    { key: 'home', icon: 'home-outline', iconActive: 'home', label: 'Discover & Feed', labelHi: 'मुख्य फ़ीड' },
    { key: 'browse', icon: 'compass-outline', iconActive: 'compass', label: 'Browse Categories', labelHi: 'श्रेणियां खोजें' },
    { key: 'profile', icon: 'person-outline', iconActive: 'person', label: 'Performer Profile', labelHi: 'कलाकार प्रोफ़ाइल' },
  ];

  return (
    <View
      style={[
        styles.sidebar,
        {
          backgroundColor: colors.surface,
          borderRightColor: colors.border,
        },
      ]}
    >
      {/* Brand Header */}
      <View style={[styles.brandContainer, { borderBottomColor: colors.border }]}>
        <View style={styles.brandRow}>
          <View style={[styles.logoIcon, { backgroundColor: colors.primary }]}>
            <Icon name="sparkles" size={17} color="#FFFFFF" />
          </View>
          <View>
            <View style={styles.brandTitleRow}>
              <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>FEEDANTS</Text>
              <View style={[styles.proBadge, { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' }]}>
                <Text style={[styles.proBadgeText, { color: colors.primary }]}>PRO</Text>
              </View>
            </View>
            <Text style={[styles.brandTagline, { color: colors.textMuted }]}>
              Full-Stack Competition Platform
            </Text>
          </View>
        </View>
      </View>

      {/* Host Competition CTA */}
      <TouchableOpacity
        style={[styles.hostBtn, { backgroundColor: colors.primary }]}
        onPress={onCreatePress}
        activeOpacity={0.85}
        accessibilityRole="button"
      >
        <Icon name="plus" size={16} color="#FFFFFF" />
        <Text style={styles.hostBtnText}>
          {language === 'hi' ? 'प्रतियोगिता आयोजित करें' : 'Host Competition'}
        </Text>
      </TouchableOpacity>

      {/* Navigation Links */}
      <View style={styles.navSection}>
        <Text style={[styles.navSectionTitle, { color: colors.textMuted }]}>NAVIGATION</Text>
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.navLink,
                isActive && [
                  styles.navLinkActive,
                  { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' },
                ],
              ]}
              onPress={() => onSelectTab(item.key)}
              activeOpacity={0.8}
              accessibilityRole="button"
            >
              <Icon
                name={isActive ? item.iconActive : item.icon}
                size={18}
                color={isActive ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.navLinkText,
                  { color: isActive ? colors.primary : colors.textSecondary },
                  isActive && { fontWeight: '700' },
                ]}
              >
                {language === 'hi' ? item.labelHi : item.label}
              </Text>
              {isActive && <View style={[styles.activePill, { backgroundColor: colors.primary }]} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Dark Mode & Language Toggles */}
      <View style={[styles.settingsRow, { borderTopColor: colors.border }]}>
        {onToggleDarkMode && (
          <TouchableOpacity
            style={[styles.themeBtn, { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9', borderColor: colors.border }]}
            onPress={onToggleDarkMode}
            activeOpacity={0.7}
          >
            <Icon name={isDarkMode ? 'sunny' : 'moon-outline'} size={15} color={isDarkMode ? '#FBBF24' : '#0F172A'} />
            <Text style={[styles.themeBtnText, { color: colors.textPrimary }]}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={[styles.langToggleWrap, { backgroundColor: isDarkMode ? '#0F172A' : '#F1F5F9', borderColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.langBtn, language === 'en' && { backgroundColor: colors.primary }]}
            onPress={() => setLanguage('en')}
          >
            <Text style={[styles.langBtnText, language === 'en' ? styles.langBtnTextActive : { color: colors.textSecondary }]}>
              EN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, language === 'hi' && { backgroundColor: colors.primary }]}
            onPress={() => setLanguage('hi')}
          >
            <Text style={[styles.langBtnText, language === 'hi' ? styles.langBtnTextActive : { color: colors.textSecondary }]}>
              हिं
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Active User Persona Card */}
      <TouchableOpacity
        style={[styles.userCard, { backgroundColor: isDarkMode ? '#172234' : '#F8FAFC', borderColor: colors.border }]}
        onPress={() => onSelectTab('profile')}
        activeOpacity={0.8}
      >
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri: activeUser?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
            }}
            style={styles.avatar}
          />
          <View style={styles.onlineDot} />
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.textPrimary }]} numberOfLines={1}>
            {activeUser?.name || 'Pooja Sharma'}
          </Text>
          <Text style={[styles.userRole, { color: colors.textMuted }]}>
            {activeUser?.name === 'Pooja Sharma' ? 'Enrolled Performer ✓' : 'Artist Member'}
          </Text>
        </View>
        <Icon name="chevron-forward" size={14} color={colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    borderRightWidth: 1,
    padding: 18,
    gap: 14,
    height: '100vh',
    position: 'sticky',
    top: 0,
    ...Platform.select({
      web: {
        boxShadow: '1px 0 6px rgba(0, 0, 0, 0.03)',
        userSelect: 'none',
      },
    }),
  },
  brandContainer: {
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  proBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  proBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  brandTagline: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  hostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 11,
    borderRadius: 10,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  hostBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  navSection: {
    gap: 4,
    marginTop: 6,
  },
  navSectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 6,
    paddingLeft: 8,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    position: 'relative',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  navLinkActive: {},
  navLinkText: {
    fontSize: 13,
    fontWeight: '600',
  },
  navLinkTextActive: {
    fontWeight: '700',
  },
  activePill: {
    position: 'absolute',
    right: 0,
    top: 8,
    bottom: 8,
    width: 3,
    borderRadius: 2,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  themeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  themeBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  langToggleWrap: {
    flexDirection: 'row',
    borderRadius: 9999,
    padding: 2,
    borderWidth: 1,
    gap: 2,
  },
  langBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  langBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  langBtnTextActive: {
    color: '#FFFFFF',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
    gap: 1,
  },
  userName: {
    fontSize: 12,
    fontWeight: '700',
  },
  userRole: {
    fontSize: 10,
  },
});
