import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { THEME, getThemeColors } from '../constants/theme';

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

        if (item.isCenter) {
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.centerItem}
              onPress={() => onSelectTab && onSelectTab('create')}
              activeOpacity={0.85}
            >
              <View style={[styles.addCircle, { backgroundColor: colors.primary }]}>
                <Feather name="plus" size={24} color="#FFFFFF" />
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
                  uri:
                    activeUser?.avatarUrl ||
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
                }}
                style={[
                  styles.profileAvatar,
                  isActive && [styles.profileAvatarActive, { borderColor: colors.primary }],
                ]}
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
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  addCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -6,
  },
  profileAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  profileAvatarActive: {
    borderWidth: 2,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});
