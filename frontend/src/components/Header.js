import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function Header({
  activeTab = 'contests',
  onBackPress,
  language,
  setLanguage,
  onToggleDevToolbar,
  isDevToolbarOpen,
}) {
  const titles = {
    contests: { en: 'Go back', hi: 'वापस जाएं' },
    home: { en: 'Feed & Discover', hi: 'मुख्य फ़ीड' },
    browse: { en: 'Browse Contests', hi: 'प्रतियोगिताएं खोजें' },
    profile: { en: 'My Profile & Stats', hi: 'प्रोफ़ाइल' },
  };

  const currentTitle = titles[activeTab] || titles.contests;

  return (
    <View style={styles.container}>
      <View style={styles.innerRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
          <Ionicons
            name={activeTab === 'home' ? 'grid-outline' : 'arrow-back'}
            size={20}
            color="#0F172A"
          />
          <Text style={styles.backTitleText}>
            {language === 'hi' ? currentTitle.hi : currentTitle.en}
          </Text>
        </TouchableOpacity>

        <View style={styles.rightActions}>
          {/* Evaluator Dev Tools Toggle */}
          {onToggleDevToolbar && (
            <TouchableOpacity
              style={[styles.devIconBtn, isDevToolbarOpen && styles.devIconBtnActive]}
              onPress={onToggleDevToolbar}
              activeOpacity={0.7}
              title="Evaluator Dev Tools"
            >
              <Ionicons
                name={isDevToolbarOpen ? 'hardware-chip' : 'hardware-chip-outline'}
                size={17}
                color={isDevToolbarOpen ? '#FFFFFF' : '#0A7075'}
              />
            </TouchableOpacity>
          )}

          {/* Language Switcher */}
          <View style={styles.langPillContainer}>
            <TouchableOpacity
              style={[styles.langPill, language === 'en' && styles.langPillActive]}
              onPress={() => setLanguage('en')}
              activeOpacity={0.8}
            >
              <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>
                ENG
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.langPill, language === 'hi' && styles.langPillActive]}
              onPress={() => setLanguage('hi')}
              activeOpacity={0.8}
            >
              <Text style={[styles.langText, language === 'hi' && styles.langTextActive]}>
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
    gap: 8,
  },
  backTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  devIconBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#E8F6F6',
    borderWidth: 1,
    borderColor: '#0A7075',
    alignItems: 'center',
    justifyContent: 'center',
  },
  devIconBtnActive: {
    backgroundColor: '#0A7075',
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
});
