import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function Header({
  activeTab = 'contests',
  onBackPress,
  language,
  setLanguage,
  onToggleDevBar,
}) {
  const titles = {
    contests: { en: 'Competition Details', hi: 'प्रतियोगिता विवरण' },
    home: { en: 'Feed & Discover', hi: 'मुख्य फ़ीड' },
    browse: { en: 'Browse Contests', hi: 'प्रतियोगिताएं खोजें' },
    profile: { en: 'My Profile & Stats', hi: 'प्रोफ़ाइल' },
  };

  const currentTitle = titles[activeTab] || titles.contests;

  return (
    <View style={styles.container}>
      <View style={styles.innerRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
          <View style={styles.backIconWrap}>
            <Ionicons
              name={activeTab === 'home' ? 'grid-outline' : 'arrow-back'}
              size={17}
              color="#0F172A"
            />
          </View>
          <View>
            <Text style={styles.brandName}>FEEDANTS</Text>
            <Text style={styles.backLabel}>
              {language === 'hi' ? currentTitle.hi : currentTitle.en}
            </Text>
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
            <Ionicons name="options-outline" size={17} color="#0A7075" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.03)' },
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
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0A7075',
    letterSpacing: 1.5,
    lineHeight: 16,
  },
  backLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  langPillContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 9999,
    padding: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 2,
  },
  langPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  langPillActive: {
    backgroundColor: '#0A7075',
  },
  langText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  langTextActive: {
    color: '#FFFFFF',
  },
  devButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
