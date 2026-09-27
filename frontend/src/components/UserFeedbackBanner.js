import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function UserFeedbackBanner({ onFeedbackPress, language }) {
  return (
    <View style={styles.container}>
      {/* 1. Hear From Our Users banner */}
      <TouchableOpacity
        style={styles.banner}
        onPress={onFeedbackPress}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#0F172A" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {language === 'hi' ? 'हमारे उपयोगकर्ताओं से सुनें' : 'Hear From Our Users'}
          </Text>
          <Text style={styles.subtext}>
            {language === 'hi'
              ? 'देखें कि प्रतिभागी फीडएंट्स के बारे में क्या कहते हैं'
              : 'See what participants say about Feedants'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
      </TouchableOpacity>

      {/* 2. Ad Here spot */}
      <View style={styles.adBox}>
        <Ionicons name="megaphone-outline" size={16} color="#94A3B8" />
        <Text style={styles.adText}>
          {language === 'hi' ? 'विज्ञापन स्थान' : 'Ad Here'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 24,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    }),
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtext: {
    fontSize: 11,
    color: '#64748B',
  },
  adBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
  },
  adText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
});
