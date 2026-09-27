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
            <Ionicons name="sparkles" size={17} color="#FFFFFF" />
          </View>
          <View>
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandTitle}>FEEDANTS</Text>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
            </View>
            <Text style={styles.brandTagline}>Full-Stack Competition Platform</Text>
          </View>
        </View>
      </View>

      {/* Host Competition CTA */}
      <TouchableOpacity style={styles.hostBtn} onPress={onCreatePress} activeOpacity={0.85}>
        <Feather name="plus-circle" size={16} color="#FFFFFF" />
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
                size={18}
                color={isActive ? '#0A7075' : '#64748B'}
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
          <Ionicons name="options-outline" size={15} color="#0A7075" />
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
          <Text style={styles.userName} numberOfLines={1}>{activeUser?.name || 'Pooja Sharma'}</Text>
          <Text style={styles.userRole}>
            {activeUser?.name === 'Pooja Sharma' ? 'Enrolled Performer ✓' : 'Audience Persona'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 270,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    padding: 20,
    gap: 16,
    height: '100vh',
    position: 'sticky',
    top: 0,
    ...Platform.select({
      web: {
        boxShadow: '1px 0 3px rgba(0, 0, 0, 0.03)',
      },
    }),
  },
  brandContainer: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
    backgroundColor: '#0A7075',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 1.5,
  },
  proBadge: {
    backgroundColor: '#E8F6F6',
    borderWidth: 1,
    borderColor: '#B2E2E4',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  proBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0A7075',
  },
  brandTagline: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  hostBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0A7075',
    paddingVertical: 11,
    borderRadius: 10,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 6px rgba(10, 112, 117, 0.25)',
      },
    }),
  },
  hostBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  navSection: {
    gap: 4,
    marginTop: 4,
  },
  navSectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginBottom: 4,
    paddingLeft: 4,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    position: 'relative',
  },
  navLinkActive: {
    backgroundColor: '#E8F6F6',
  },
  navLinkText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },
  navLinkTextActive: {
    color: '#0A7075',
    fontWeight: '700',
  },
  activePill: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0A7075',
  },
  evaluatorSection: {
    marginTop: 4,
  },
  evaluatorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  evaluatorBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0A7075',
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  langLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  langToggleWrap: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 9999,
    padding: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  langBtn: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  langBtnActive: {
    backgroundColor: '#0A7075',
  },
  langBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  langBtnTextActive: {
    color: '#FFFFFF',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#16A34A',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  userRole: {
    fontSize: 10,
    color: '#0A7075',
    marginTop: 1,
    fontWeight: '500',
  },
});

