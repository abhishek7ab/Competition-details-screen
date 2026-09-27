import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function TrustSection({ disclaimer, onWatchPrizeVideo, onOpenRefundPolicy, language }) {
  const disclaimerText =
    language === 'hi'
      ? disclaimer?.hi || 'केवल सशुल्क प्रतिभागियों के योगदान को ही निर्णय के लिए मान्य माना जाएगा।'
      : disclaimer?.en || 'Only contributions from paid participants will be considered for judging.';

  return (
    <View style={styles.container}>
      {/* 1. Disclaimer Banner */}
      <View style={styles.disclaimerBox}>
        <Ionicons name="information-circle-outline" size={17} color="#0A7075" style={styles.infoIcon} />
        <Text style={styles.disclaimerText}>
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
          style={styles.videoCard}
          onPress={onWatchPrizeVideo}
          activeOpacity={0.8}
        >
          <View style={styles.playBox}>
            <Ionicons name="play" size={16} color="#0A7075" style={{ marginLeft: 2 }} />
          </View>
          <View style={styles.videoCardText}>
            <Text style={styles.videoTitle}>
              {language === 'hi' ? 'पुरस्कार राशि कैसे प्राप्त करें?' : 'How will you receive prize money?'}
            </Text>
            <Text style={styles.videoSub}>
              {language === 'hi' ? 'अधिक जानने के लिए वीडियो देखें' : 'Watch video to know more'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Right: Refund policy & Razorpay */}
        <View style={styles.policyCard}>
          <TouchableOpacity
            style={styles.policyRow}
            onPress={onOpenRefundPolicy}
            activeOpacity={0.7}
          >
            <Ionicons name="shield-checkmark-outline" size={16} color="#0A7075" />
            <Text style={styles.policyText}>
              {language === 'hi' ? 'वापसी नीति' : 'Refund policy'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.policyRow}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#0A7075" />
            <Text style={styles.policyText}>
              {language === 'hi' ? 'सुरक्षित भुगतान ' : 'Secure payments powered by '}
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
    marginBottom: 12,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F6F6',
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
    color: '#0A7075',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    }),
  },
  playBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E8F6F6',
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
    color: '#0F172A',
    lineHeight: 15,
  },
  videoSub: {
    fontSize: 10,
    color: '#64748B',
  },
  policyCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
  },
  policyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  razorpayBrand: {
    fontWeight: '800',
    color: '#0C2340',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
