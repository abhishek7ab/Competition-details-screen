import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function TrustSection({ disclaimer, onWatchPrizeVideo, onOpenRefundPolicy, language }) {
  const disclaimerText =
    language === 'hi'
      ? disclaimer?.hi || 'केवल सशुल्क प्रतिभागियों के योगदान को ही निर्णय के लिए मान्य माना जाएगा।'
      : disclaimer?.en || 'Only submissions from registered and verified participants are eligible for jury evaluation and prizes.';

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>
        {language === 'hi' ? '🛡️ सुरक्षा एवं नीतियां' : '🛡️ TRUST & VERIFICATION'}
      </Text>

      {/* Disclaimer Box */}
      <View style={styles.disclaimerBox}>
        <Ionicons name="information-circle" size={18} color={THEME.colors.amber} style={styles.infoIcon} />
        <Text style={styles.disclaimerText}>
          <Text style={styles.disclaimerBold}>
            {language === 'hi' ? 'नियम सूचना: ' : 'Official Note: '}
          </Text>
          {disclaimerText}
        </Text>
      </View>

      {/* Trust Cards Row */}
      <View style={styles.cardsRow}>
        {/* Left: How will you receive prize money? */}
        <TouchableOpacity
          style={styles.trustCard}
          onPress={onWatchPrizeVideo}
          activeOpacity={0.8}
        >
          <View style={styles.playCircle}>
            <Ionicons name="play" size={14} color={THEME.colors.bg} style={{ marginLeft: 2 }} />
          </View>
          <View style={styles.trustCardContent}>
            <Text style={styles.trustTitle}>
              {language === 'hi' ? 'पुरस्कार कैसे मिलेगा?' : 'Prize Distribution'}
            </Text>
            <Text style={styles.trustSubtext}>
              {language === 'hi' ? 'प्रक्रिया वीडियो देखें' : 'Watch process video'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Right: Policies & Razorpay */}
        <View style={styles.trustCard}>
          {/* Refund Policy */}
          <TouchableOpacity
            style={styles.policyRow}
            onPress={onOpenRefundPolicy}
            activeOpacity={0.7}
          >
            <Ionicons name="shield-checkmark" size={15} color={THEME.colors.primary} />
            <Text style={styles.policyText}>
              {language === 'hi' ? 'वापसी नीति' : 'Refund Policy'}
            </Text>
          </TouchableOpacity>

          {/* Razorpay Assurance */}
          <View style={[styles.policyRow, { marginTop: 8 }]}>
            <Ionicons name="lock-closed" size={15} color={THEME.colors.gold} />
            <Text style={styles.policyText}>
              {language === 'hi' ? 'सुरक्षित भुगतान: ' : 'Secured by '}
              <Text style={styles.razorpayBrand}>Razorpay</Text>
            </Text>
          </View>
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
  sectionLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: THEME.colors.amberBg,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 66, 0.25)',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 1,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: '#FFE2B8',
    lineHeight: 16,
  },
  disclaimerBold: {
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.amber,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  trustCard: {
    flex: 1,
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0 2px 14px rgba(0,0,0,0.4)' },
    }),
  },
  playCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  trustCardContent: {},
  trustTitle: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
    lineHeight: 16,
  },
  trustSubtext: {
    fontSize: 10,
    color: THEME.colors.primary,
    marginTop: 2,
    fontWeight: THEME.typography.weights.semibold,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  policyText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.medium,
    color: THEME.colors.textSecondary,
  },
  razorpayBrand: {
    fontWeight: '800',
    color: '#58A6FF',
  },
});
