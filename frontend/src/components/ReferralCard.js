import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function ReferralCard({ user, onShowToast, language, isDarkMode = false }) {
  const colors = getThemeColors(isDarkMode);
  const [copied, setCopied] = useState(false);
  const referralCode = user?.referralCode || 'referral123';
  const referralUrl = `https://feedants.com/r/${referralCode}`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(referralUrl);
    }
    setCopied(true);
    if (onShowToast) {
      onShowToast(language === 'hi' ? 'लिंक कॉपी हो गया!' : 'Referral link copied!');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? '#064E3B33' : '#E8F6F0',
          borderColor: isDarkMode ? '#05966955' : '#D1EAE0',
        },
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: isDarkMode ? '#065F46' : '#DCFCE7' },
          ]}
        >
          <Icon name="megaphone-outline" size={24} color={isDarkMode ? '#34D399' : '#16A34A'} />
        </View>

        <View style={styles.contentCol}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {language === 'hi' ? 'रेफ़र करें और अधिक छूट पाएं' : 'Refer & Earn more discount'}
          </Text>

          <View style={styles.inputAndActionsRow}>
            {/* Link Box */}
            <View
              style={[
                styles.linkBox,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.linkText, { color: colors.textSecondary }]} numberOfLines={1}>
                {referralUrl}
              </Text>
              <TouchableOpacity
                style={[
                  styles.copyBtn,
                  { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' },
                ]}
                onPress={handleCopy}
                activeOpacity={0.7}
                accessibilityRole="button"
              >
                <Text style={[styles.copyBtnText, { color: colors.textPrimary }]}>
                  {copied ? 'Copied!' : 'Copy Link'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Refer Now Button & Note */}
            <View style={styles.btnWrap}>
              <TouchableOpacity
                style={[styles.referBtn, { backgroundColor: colors.primary }]}
                onPress={handleCopy}
                activeOpacity={0.8}
                accessibilityRole="button"
              >
                <Text style={styles.referBtnText}>
                  {language === 'hi' ? 'रेफ़र करें' : 'Refer Now'}
                </Text>
              </TouchableOpacity>
              <Text style={[styles.rewardNote, { color: colors.textMuted }]}>
                {language === 'hi' ? 'प्रति साइनअप ₹10 पाएं' : 'You earn ₹10 for every signup'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCol: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  inputAndActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  linkBox: {
    flex: 1.4,
    minWidth: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 4,
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 11,
    flex: 1,
  },
  copyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  copyBtnText: {
    fontSize: 10,
    fontWeight: '700',
  },
  btnWrap: {
    alignItems: 'center',
  },
  referBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  referBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rewardNote: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
});
