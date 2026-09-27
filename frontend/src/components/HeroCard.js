import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function HeroCard({ competition, computed, language }) {
  const isRegistered = computed?.userState?.isRegistered;
  const spotsRemaining = computed?.spotsRemaining ?? 19;
  const bookedSpots = competition?.bookedSpots ?? 1;
  const maxSpots = competition?.maxSpots ?? 20;
  const progressRatio = Math.min(1, Math.max(0, bookedSpots / maxSpots));
  const isSoldOut = spotsRemaining <= 0;

  const title = language === 'hi' ? competition?.titleHindi : competition?.title;
  const badgeText = language === 'hi' ? competition?.badgeTextHindi : competition?.badgeText;

  return (
    <View style={styles.card}>
      {/* Top Title & Registered Status Row */}
      <View style={styles.titleRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title || 'Feedants Classical Dance'}
        </Text>

        {isRegistered && (
          <View style={styles.registeredBadge}>
            <Ionicons name="checkmark-circle" size={15} color={THEME.colors.primary} />
            <Text style={styles.registeredText}>
              {language === 'hi' ? 'पंजीकृत' : 'Registered'}
            </Text>
          </View>
        )}
      </View>

      {/* Category Tags & Certificate Guarantee */}
      <View style={styles.tagsRow}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryPillText}>{competition?.category || 'Dance'}</Text>
        </View>

        {competition?.tags?.filter(t => t !== 'Dance').map((tag, idx) => (
          <View key={idx} style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>{tag}</Text>
          </View>
        ))}

        <View style={styles.certRow}>
          <Ionicons name="trophy-outline" size={14} color={THEME.colors.primary} />
          <Text style={styles.certText}>
            {badgeText || 'Winners get certificate'}
          </Text>
        </View>
      </View>

      {/* Metrics Row: Prize Pool | Entry Fee | Spots Quota */}
      <View style={styles.metricsRow}>
        {/* 1. Prize Pool */}
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>
            {language === 'hi' ? 'पुरस्कार राशि' : 'Prize Pool'}
          </Text>
          <Text style={styles.prizePoolText}>
            ₹ {(competition?.prizePool || 1500).toLocaleString('en-IN')}
          </Text>
        </View>

        {/* 2. Entry Fee */}
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>
            {language === 'hi' ? 'प्रवेश शुल्क' : 'Entry Fee'}
          </Text>
          <Text style={styles.entryFeeText}>
            ₹ {competition?.entryFee || 99}
          </Text>
        </View>

        {/* 3. Capacity & Progress */}
        <View style={styles.spotsBox}>
          <View style={styles.spotsTopRow}>
            <Ionicons name="people-outline" size={14} color={THEME.colors.primary} />
            <Text style={[styles.spotsLabel, isSoldOut && { color: THEME.colors.rose }]}>
              {isSoldOut
                ? (language === 'hi' ? 'हाउसफुल' : 'Sold out')
                : language === 'hi'
                ? `केवल ${spotsRemaining} स्थान शेष`
                : `Only ${spotsRemaining} spots left`}
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressRatio * 100}%` },
                isSoldOut && { backgroundColor: THEME.colors.rose },
              ]}
            />
          </View>

          <Text style={styles.bookedText}>
            {bookedSpots} / {maxSpots} {language === 'hi' ? 'बुक' : 'Booked'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    ...Platform.select({
      web: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E8F6F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  registeredText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A7075',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoryPill: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  certRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginLeft: 2,
  },
  certText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A7075',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metricBox: {
    gap: 2,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  prizePoolText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A7075',
    letterSpacing: -0.5,
  },
  entryFeeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  spotsBox: {
    alignItems: 'flex-end',
    minWidth: 120,
    gap: 4,
  },
  spotsTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  spotsLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0A7075',
  },
  progressTrack: {
    width: 110,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0A7075',
    borderRadius: 99,
  },
  bookedText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
});


