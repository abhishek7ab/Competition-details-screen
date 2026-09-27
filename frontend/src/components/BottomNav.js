import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

const NAV_ITEMS = [
  { icon: 'home-outline', iconActive: 'home', label: 'Home', labelHi: 'होम', active: false },
  { icon: 'search-outline', iconActive: 'search', label: 'Explore', labelHi: 'खोजें', active: false },
  { icon: null, label: 'Create', labelHi: 'बनाएं', isCenter: true },
  { icon: 'trophy-outline', iconActive: 'trophy', label: 'Contests', labelHi: 'प्रतियोगिताएं', active: true },
  { icon: 'person-outline', iconActive: 'person', label: 'Profile', labelHi: 'प्रोफ़ाइल', active: false, isProfile: true },
];

export default function BottomNav({ activeUser, language }) {
  return (
    <View style={styles.navBar}>
      {NAV_ITEMS.map((item, idx) => {
        if (item.isCenter) {
          return (
            <TouchableOpacity key={idx} style={styles.navItem} activeOpacity={0.8}>
              <View style={styles.addCircle}>
                <Feather name="plus" size={20} color={THEME.colors.bg} />
              </View>
            </TouchableOpacity>
          );
        }

        if (item.isProfile) {
          return (
            <TouchableOpacity key={idx} style={styles.navItem} activeOpacity={0.7}>
              <Image
                source={{
                  uri: activeUser?.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
                }}
                style={[styles.profileAvatar, item.active && styles.profileAvatarActive]}
              />
              <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>
                {language === 'hi' ? item.labelHi : item.label}
              </Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={idx} style={styles.navItem} activeOpacity={0.7}>
            <Ionicons
              name={item.active ? item.iconActive : item.icon}
              size={21}
              color={item.active ? THEME.colors.primary : THEME.colors.textMuted}
            />
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>
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
    width: 42,
    height: 42,
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
    ...Platform.select({
      web: { boxShadow: `0 0 8px ${THEME.colors.primaryGlow}` },
    }),
  },
});
