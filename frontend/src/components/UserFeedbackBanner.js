import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function UserFeedbackBanner({ onFeedbackPress, language, isDarkMode = false }) {
  const colors = getThemeColors(isDarkMode);

  const handleAdPress = () => {
    Alert.alert(
      'Sponsor & Partner with Feedants',
      'Promote your dance academy, musical institute, or youth brand to 50,000+ classical artists across India.\n\n📧 Partnership Desk: partner@feedants.com\n📞 Contact: +91 98765 43210'
    );
  };

  const handleDefaultFeedbackPress = () => {
    if (onFeedbackPress) {
      onFeedbackPress();
    } else {
      Alert.alert(
        'Feedants Dancer Community (4.9 / 5.0 ★)',
        'Based on 1,420+ verified participant reviews:\n\n"The jury feedback from Manju Dubey helped me refine my Kathak footwork tremendously." — Ananya S., Delhi\n\n"Instant prize disbursal to UPI within 24 hours of results. Very transparent competition platform!" — Priya M., Bangalore'
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Hear From Our Users banner */}
      <TouchableOpacity
        style={[
          styles.banner,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
        onPress={handleDefaultFeedbackPress}
        activeOpacity={0.8}
        accessibilityRole="button"
      >
        <Icon name="chatbubble-ellipses-outline" size={20} color={colors.primary} />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {language === 'hi' ? 'हमारे उपयोगकर्ताओं से सुनें' : 'Hear From Our Users'}
          </Text>
          <Text style={[styles.subtext, { color: colors.textSecondary }]}>
            {language === 'hi'
              ? 'देखें कि प्रतिभागी फीडएंट्स के बारे में क्या कहते हैं (4.9★)'
              : 'See what 1,400+ participants say about Feedants (4.9★)'}
          </Text>
        </View>
        <Icon name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>

      {/* 2. Ad Here spot (interactive) */}
      <TouchableOpacity
        style={[
          styles.adBox,
          {
            backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC',
            borderColor: colors.border,
          },
        ]}
        onPress={handleAdPress}
        activeOpacity={0.7}
        accessibilityRole="button"
      >
        <Icon name="megaphone-outline" size={16} color={colors.primary} />
        <Text style={[styles.adText, { color: colors.textMuted }]}>
          {language === 'hi' ? 'विज्ञापन / प्रायोजक स्थान (टैप करें)' : 'Ad / Sponsor Here (Tap to Partner)'}
        </Text>
      </TouchableOpacity>
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
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    gap: 12,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'pointer' },
    }),
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
  },
  subtext: {
    fontSize: 11,
  },
  adBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 12,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  adText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
