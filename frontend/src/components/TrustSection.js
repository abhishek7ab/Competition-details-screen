import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

export default function TrustSection({
  disclaimer,
  onWatchPrizeVideo,
  onOpenRefundPolicy,
  onShowInfo,
  language,
  isDarkMode = false,
}) {
  const colors = getThemeColors(isDarkMode);

  const disclaimerText =
    language === 'hi'
      ? disclaimer?.hi || 'केवल सशुल्क प्रतिभागियों के योगदान को ही निर्णय के लिए मान्य माना जाएगा।'
      : disclaimer?.en || 'Only contributions from paid participants will be considered for judging.';

  const handleRazorpayPress = () => {
    const msg =
      'All payments on Feedants are processed via Razorpay with 256-bit SSL encryption.\n\n• Supports UPI (GPay, PhonePe, Paytm, BHIM)\n• All Credit/Debit Cards & Net Banking\n• Instant automated refund if event is cancelled.';
    if (onShowInfo) {
      onShowInfo('Razorpay Verified Security', msg, 'shield-checkmark-outline');
    } else {
      Alert.alert('Razorpay Verified Security', msg);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Disclaimer Banner */}
      <View style={[styles.disclaimerBox, { backgroundColor: isDarkMode ? '#132E35' : '#E8F6F6' }]}>
        <Icon name="information-circle-outline" size={17} color={colors.primary} style={styles.infoIcon} />
        <Text style={[styles.disclaimerText, { color: isDarkMode ? '#5EEAD4' : '#0A7075' }]}>
          <Text style={styles.disclaimerBold}>
            {language === 'hi' ? 'अस्वीकरण: ' : 'Disclaimer: '}
          </Text>
          {disclaimerText}
        </Text>
      </View>

      {/* 2. Two-Column Trust Row */}
      <View style={styles.cardsRow}>
        {/* Left: How will you receive prize money? */}
        <TouchableOpacity
          style={[
            styles.videoCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          onPress={onWatchPrizeVideo}
          activeOpacity={0.8}
          accessibilityRole="button"
        >
          <View style={[styles.playBox, { backgroundColor: isDarkMode ? '#172234' : '#E8F6F6' }]}>
            <Icon name="play" size={16} color={colors.primary} style={{ marginLeft: 2 }} />
          </View>
          <View style={styles.videoCardText}>
            <Text style={[styles.videoTitle, { color: colors.textPrimary }]}>
              {language === 'hi' ? 'पुरस्कार राशि कैसे प्राप्त करें?' : 'How will you receive prize money?'}
            </Text>
            <Text style={[styles.videoSub, { color: colors.textMuted }]}>
              {language === 'hi' ? 'अधिक जानने के लिए वीडियो देखें' : 'Watch video to know more'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Right: Refund policy & Razorpay */}
        <View style={[styles.policyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity
            style={styles.policyRow}
            onPress={onOpenRefundPolicy}
            activeOpacity={0.7}
            accessibilityRole="button"
          >
            <Icon name="shield-checkmark-outline" size={16} color={colors.primary} />
            <Text style={[styles.policyText, { color: colors.textSecondary }]}>
              {language === 'hi' ? 'वापसी नीति' : 'Refund policy'}
            </Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity
            style={styles.policyRow}
            onPress={handleRazorpayPress}
            activeOpacity={0.7}
            accessibilityRole="button"
          >
            <Icon name="shield-checkmark-outline" size={16} color={colors.primary} />
            <Text style={[styles.policyText, { color: colors.textSecondary }]}>
              {language === 'hi' ? 'सुरक्षित भुगतान ' : 'Secure payments powered by '}
              <Text style={[styles.razorpayBrand, { color: isDarkMode ? '#93C5FD' : '#0C2340' }]}>
                Razorpay
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginBottom: 10,
  },
  infoIcon: {
    marginTop: 1,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
  },
  disclaimerBold: {
    fontWeight: '700',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  videoCard: {
    flex: 1.1,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'pointer' },
    }),
  },
  playBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoCardText: {
    flex: 1,
    gap: 2,
  },
  videoTitle: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
  },
  videoSub: {
    fontSize: 10,
  },
  policyCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    justifyContent: 'center',
    gap: 6,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    }),
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  policyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  razorpayBrand: {
    fontWeight: '800',
  },
  divider: {
    height: 1,
  },
});
