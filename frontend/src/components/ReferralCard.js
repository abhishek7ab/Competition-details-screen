import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function ReferralCard({ user, onShowToast, language }) {
  const [copied, setCopied] = useState(false);
  const referralCode = user?.referralCode || 'referral123';
  const referralUrl = `https://feedants.com/r/${referralCode}`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(referralUrl);
    }
    setCopied(true);
    onShowToast(language === 'hi' ? 'लिंक कॉपी हो गया!' : 'Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Top: Megaphone & Title */}
        <View style={styles.topRow}>
          <View style={styles.iconCircle}>
            <Ionicons name="gift" size={20} color={THEME.colors.primary} />
          </View>

          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {language === 'hi' ? 'दोस्तों को आमंत्रित करें' : 'Invite Friends & Save ₹10'}
            </Text>
            <Text style={styles.subtitle}>
              {language === 'hi' ? 'हर साइनअप पर छूट पाएं' : 'Get instant reward for every friend who joins'}
            </Text>
          </View>
        </View>

        {/* Action Row: Link Box & Refer Button */}
        <View style={styles.actionRow}>
          {/* Link Box with Copy Button */}
          <View style={styles.linkBox}>
            <Text style={styles.linkText} numberOfLines={1}>
              {referralUrl}
            </Text>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopy} activeOpacity={0.7}>
              <Text style={styles.copyBtnText}>
                {copied
                  ? language === 'hi'
                    ? 'कॉपी हुआ!'
                    : 'Copied!'
                  : language === 'hi'
                  ? 'कॉपी'
                  : 'Copy Link'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Refer Now CTA Button */}
          <TouchableOpacity style={styles.referBtn} onPress={handleCopy} activeOpacity={0.8}>
            <Ionicons name="share-social" size={15} color={THEME.colors.bg} />
            <Text style={styles.referBtnText}>
              {language === 'hi' ? 'शेयर करें' : 'Share Link'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: THEME.colors.bg,
  },
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
    ...Platform.select({
      web: { boxShadow: `0 0 20px ${THEME.colors.primaryGlow}` },
    }),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: THEME.colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
  },
  titleWrapper: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'column',
    gap: 10,
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.colors.surfaceElevated,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingLeft: 12,
    paddingRight: 5,
    paddingVertical: 6,
  },
  linkText: {
    flex: 1,
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginRight: 8,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
  copyBtn: {
    backgroundColor: THEME.colors.primaryBg,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: THEME.borderRadius.sm,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  referBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: THEME.colors.primary,
    paddingVertical: 11,
    borderRadius: THEME.borderRadius.md,
    ...Platform.select({
      web: { boxShadow: `0 2px 14px ${THEME.colors.primaryGlow}` },
    }),
  },
  referBtnText: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.bg,
  },
});
