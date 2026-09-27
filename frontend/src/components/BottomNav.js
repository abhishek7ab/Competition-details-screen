import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

const NAV_ITEMS = [
  { key: 'home', icon: 'home-outline', iconActive: 'home', label: 'Home', labelHi: 'होम' },
  { key: 'browse', icon: 'compass-outline', iconActive: 'compass', label: 'Browse', labelHi: 'ब्राउज़' },
  { key: 'create', label: 'Create', labelHi: 'बनाएं', isCenter: true },
  { key: 'contests', icon: 'trophy-outline', iconActive: 'trophy', label: 'Contest', labelHi: 'प्रतियोगिता' },
  { key: 'profile', label: 'Profile', labelHi: 'प्रोफ़ाइल', isProfile: true },
];

export default function BottomNav({ activeTab = 'contests', onSelectTab, activeUser, language }) {
  return (
    <View style={styles.navBar}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.key;

        if (item.isCenter) {
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.navItem}
              onPress={() => onSelectTab && onSelectTab('create')}
              activeOpacity={0.8}
            >
              <View style={styles.addCircle}>
                <Feather name="plus" size={22} color={THEME.colors.bg} />
              </View>
            </TouchableOpacity>
          );
        }

        if (item.isProfile) {
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.navItem}
              onPress={() => onSelectTab && onSelectTab('profile')}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: activeUser?.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
                }}
                style={[styles.profileAvatar, isActive && styles.profileAvatarActive]}
              />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {language === 'hi' ? item.labelHi : item.label}
              </Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.navItem}
            onPress={() => onSelectTab && onSelectTab(item.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? item.iconActive : item.icon}
              size={21}
              color={isActive ? THEME.colors.primary : THEME.colors.textMuted}
            />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {language === 'hi' ? item.labelHi : item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 8,
    ...Platform.select({
      web: { boxShadow: '0 -2px 12px rgba(0,0,0,0.4)' },
    }),
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 3,
  },
  navLabel: {
    fontSize: 9.5,
    color: THEME.colors.textMuted,
    marginTop: 3,
    fontWeight: THEME.typography.weights.medium,
  },
  navLabelActive: {
    color: THEME.colors.primary,
    fontWeight: THEME.typography.weights.bold,
  },
  addCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: `0 0 16px ${THEME.colors.primaryGlow}` },
    }),
  },
  profileAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: THEME.colors.textMuted,
  },
  profileAvatarActive: {
    borderColor: THEME.colors.primary,
    borderWidth: 2,
    ...Platform.select({
      web: { boxShadow: `0 0 8px ${THEME.colors.primaryGlow}` },
    }),
  },
});
