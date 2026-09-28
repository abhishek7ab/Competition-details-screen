import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

const NAV_ITEMS = [
  { key: 'home', icon: 'home-outline', iconActive: 'home', label: 'Home', labelHi: 'होम' },
  { key: 'browse', icon: 'search-outline', iconActive: 'search', label: 'Explore', labelHi: 'खोजें' },
  { key: 'create', label: '', isCenter: true },
  { key: 'contests', icon: 'trophy-outline', iconActive: 'trophy', label: 'Competitions', labelHi: 'प्रतियोगिता' },
  { key: 'profile', label: 'Profile', labelHi: 'प्रोफ़ाइल', isProfile: true },
];

export default function BottomNav({
  activeTab = 'contests',
  onSelectTab,
  activeUser,
  language,
  isDarkMode = false,
}) {
  const colors = getThemeColors(isDarkMode);

  return (
    <View
      style={[
        styles.navBar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      ]}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.key;

        // Center Action Button (+)
        if (item.isCenter) {
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.centerItem}
              onPress={() => onSelectTab && onSelectTab('create')}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Host a Competition"
            >
              <View style={[styles.addCircle, { backgroundColor: colors.primary }]}>
                <Icon name="plus" size={24} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          );
        }

        // Profile Tab (Avatar with active indicator)
        if (item.isProfile) {
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.navItem}
              onPress={() => onSelectTab && onSelectTab('profile')}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="User Profile"
            >
              <View style={styles.avatarWrapper}>
                <Image
                  source={{
                    uri:
                      activeUser?.avatarUrl ||
                      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
                  }}
                  style={[
                    styles.profileAvatar,
                    isActive && [styles.profileAvatarActive, { borderColor: colors.primary }],
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.navLabel,
                  { color: isActive ? colors.primary : colors.textMuted },
                  isActive && { fontWeight: '700' },
                ]}
              >
                {language === 'hi' ? item.labelHi : item.label}
              </Text>
            </TouchableOpacity>
          );
        }

        // Standard Navigation Items (Home, Explore, Competitions)
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.navItem}
            onPress={() => onSelectTab && onSelectTab(item.key)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <Icon
              name={isActive ? item.iconActive : item.icon}
              size={22}
              color={isActive ? colors.primary : colors.textMuted}
            />
            <Text
              style={[
                styles.navLabel,
                { color: isActive ? colors.primary : colors.textMuted },
                isActive && { fontWeight: '700' },
              ]}
            >
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
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
    ...Platform.select({
      web: {
        userSelect: 'none',
      },
    }),
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
    paddingVertical: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  addCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(10, 112, 117, 0.35)',
      },
    }),
  },
  avatarWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  profileAvatarActive: {
    borderWidth: 2,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
});
