import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function SidebarNav({
  activeTab,
  onSelectTab,
  activeUser,
  onToggleDevBar,
  onCreatePress,
  language,
  setLanguage,
}) {
  const navItems = [
    { key: 'contests', icon: 'trophy-outline', iconActive: 'trophy', label: 'Competition Details', labelHi: 'प्रतियोगिता विवरण' },
    { key: 'home', icon: 'home-outline', iconActive: 'home', label: 'Discover & Feed', labelHi: 'मुख्य फ़ीड' },
    { key: 'browse', icon: 'compass-outline', iconActive: 'compass', label: 'Browse Categories', labelHi: 'श्रेणियां खोजें' },
    { key: 'profile', icon: 'person-outline', iconActive: 'person', label: 'Performer Profile', labelHi: 'कलाकार प्रोफ़ाइल' },
  ];

  return (
    <View style={styles.sidebar}>
      {/* Brand Header */}
      <View style={styles.brandContainer}>
        <View style={styles.brandRow}>
          <View style={styles.logoIcon}>
            <Ionicons name="sparkles" size={16} color={THEME.colors.bg} />
          </View>
          <Text style={styles.brandTitle}>FEEDANTS</Text>
        </View>
        <Text style={styles.brandTagline}>Full-Stack Competition Platform</Text>
      </View>

      {/* Host Competition CTA */}
      <TouchableOpacity style={styles.hostBtn} onPress={onCreatePress} activeOpacity={0.85}>
        <Feather name="plus-circle" size={17} color={THEME.colors.bg} />
        <Text style={styles.hostBtnText}>
          {language === 'hi' ? 'प्रतियोगिता आयोजित करें' : 'Host Competition'}
        </Text>
      </TouchableOpacity>

      {/* Navigation Links */}
      <View style={styles.navSection}>
        <Text style={styles.navSectionTitle}>NAVIGATION</Text>
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.navLink, isActive && styles.navLinkActive]}
              onPress={() => onSelectTab(item.key)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isActive ? item.iconActive : item.icon}
                size={20}
                color={isActive ? THEME.colors.primary : THEME.colors.textSecondary}
              />
              <Text style={[styles.navLinkText, isActive && styles.navLinkTextActive]}>
                {language === 'hi' ? item.labelHi : item.label}
              </Text>
              {isActive && <View style={styles.activePill} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Evaluator HUD Shortcut */}
      <View style={styles.evaluatorSection}>
        <TouchableOpacity style={styles.evaluatorBtn} onPress={onToggleDevBar} activeOpacity={0.8}>
          <Ionicons name="hardware-chip-outline" size={16} color={THEME.colors.primary} />
          <Text style={styles.evaluatorBtnText}>Evaluator Dev Panel</Text>
        </TouchableOpacity>
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Language Switcher */}
      <View style={styles.langRow}>
        <Text style={styles.langLabel}>Language</Text>
        <View style={styles.langToggleWrap}>
          <TouchableOpacity
            style={[styles.langBtn, language === 'en' && styles.langBtnActive]}
            onPress={() => setLanguage('en')}
          >
            <Text style={[styles.langBtnText, language === 'en' && styles.langBtnTextActive]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, language === 'hi' && styles.langBtnActive]}
            onPress={() => setLanguage('hi')}
          >
            <Text style={[styles.langBtnText, language === 'hi' && styles.langBtnTextActive]}>हिं</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Active User Persona Card */}
      <TouchableOpacity
        style={styles.userCard}
        onPress={() => onSelectTab('profile')}
        activeOpacity={0.8}
      >
        <Image
          source={{
            uri: activeUser?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
          }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName} numberOfLines={1}>{activeUser?.name || 'Pooja Sharma'}</Text>
          <Text style={styles.userRole}>
            {activeUser?.name === 'Pooja Sharma' ? 'Registered Performer ✓' : 'New Participant'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={THEME.colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    backgroundColor: THEME.colors.surfaceElevated,
    borderRightWidth: 1,
    borderRightColor: THEME.colors.border,
    padding: 20,
    gap: 16,
    height: '100vh',
    position: 'sticky',
    top: 0,
    ...Platform.select({
      web: {
        boxShadow: '4px 0 24px rgba(0,0,0,0.5)',
      },
    }),
  },
  brandContainer: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: `0 0 14px ${THEME.colors.primaryGlow}` },
    }),
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textPrimary,
    letterSpacing: 2,
  },
  brandTagline: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 4,
    fontWeight: THEME.typography.weights.medium,
  },
  hostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: THEME.colors.primary,
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
    ...Platform.select({
      web: { boxShadow: `0 2px 14px ${THEME.colors.primaryGlow}` },
    }),
  },
  hostBtnText: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.bg,
  },
  navSection: {
    gap: 6,
    marginTop: 6,
  },
  navSectionTitle: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: THEME.borderRadius.md,
  },
  navLinkActive: {
    backgroundColor: THEME.colors.primaryBg,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
  },
  navLinkText: {
    flex: 1,
    fontSize: 13,
    fontWeight: THEME.typography.weights.semibold,
    color: THEME.colors.textSecondary,
  },
  navLinkTextActive: {
    color: THEME.colors.primary,
    fontWeight: THEME.typography.weights.bold,
  },
  activePill: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.primary,
  },
  evaluatorSection: {
    marginTop: 4,
  },
  evaluatorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 212, 170, 0.06)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
  },
  evaluatorBtnText: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  langLabel: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.medium,
  },
  langToggleWrap: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.full,
    padding: 2,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  langBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: THEME.borderRadius.full,
  },
  langBtnActive: {
    backgroundColor: THEME.colors.primary,
  },
  langBtnText: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textMuted,
  },
  langBtnTextActive: {
    color: THEME.colors.bg,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: THEME.colors.surface,
    padding: 10,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: THEME.colors.primary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  userRole: {
    fontSize: 10,
    color: THEME.colors.primary,
    marginTop: 1,
  },
});
