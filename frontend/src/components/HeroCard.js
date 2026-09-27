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
  const isHot = progressRatio >= 0.7;

  const title = language === 'hi' ? competition?.titleHindi : competition?.title;
  const badgeText = language === 'hi' ? competition?.badgeTextHindi : competition?.badgeText;

  return (
    <View style={styles.card}>
      {/* Decorative top glow bar */}
      <View style={styles.glowBar} />

      {/* Category + Registered Badge Row */}
      <View style={styles.topRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            🎭 {competition?.category || 'Dance'}
          </Text>
        </View>

        {isRegistered && (
          <View style={styles.registeredBadge}>
            <Ionicons name="checkmark-circle" size={13} color={THEME.colors.primary} />
            <Text style={styles.registeredText}>
              {language === 'hi' ? 'पंजीकृत ✓' : 'Registered'}
            </Text>
          </View>
        )}
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={2}>
        {title || 'Feedants Classical Dance Championship'}
      </Text>

      {/* Certificate badge */}
      <View style={styles.badgeRow}>
        <Ionicons name="ribbon-outline" size={13} color={THEME.colors.gold} />
        <Text style={styles.badgeText}>{badgeText || 'Winners get certificate'}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Metrics Grid */}
      <View style={styles.metricsRow}>
        {/* Prize Pool */}
        <View style={styles.metricBox}>
          <Text style={styles.metricIcon}>🏆</Text>
          <Text style={styles.metricLabel}>
            {language === 'hi' ? 'पुरस्कार' : 'Prize Pool'}
          </Text>
          <Text style={styles.prizeValue}>
            ₹<Text style={styles.prizeNumber}>
              {(competition?.prizePool || 1500).toLocaleString('en-IN')}
            </Text>
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.metricDivider} />

        {/* Entry Fee */}
        <View style={styles.metricBox}>
          <Text style={styles.metricIcon}>🎫</Text>
          <Text style={styles.metricLabel}>
            {language === 'hi' ? 'शुल्क' : 'Entry Fee'}
          </Text>
          <Text style={styles.feeValue}>
            ₹<Text style={styles.feeNumber}>{competition?.entryFee || 99}</Text>
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.metricDivider} />

        {/* Spots */}
        <View style={[styles.metricBox, styles.spotsBox]}>
          <Text style={styles.metricIcon}>{isSoldOut ? '🔴' : isHot ? '🔥' : '🎯'}</Text>
          <Text style={[styles.spotsLabel, isSoldOut && { color: THEME.colors.rose }]}>
            {isSoldOut
              ? (language === 'hi' ? 'हाउसफुल!' : 'Sold Out!')
              : language === 'hi'
              ? `${spotsRemaining} शेष`
              : `${spotsRemaining} left`}
          </Text>
          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressRatio * 100}%` },
                isSoldOut && { backgroundColor: THEME.colors.rose },
                isHot && !isSoldOut && { backgroundColor: THEME.colors.amber },
              ]}
            />
          </View>
          <Text style={styles.bookedText}>
            {bookedSpots}/{maxSpots} {language === 'hi' ? 'बुक' : 'booked'}
          </Text>
        </View>
      </View>

      {/* Tags Row */}
      <View style={styles.tagsRow}>
        {competition?.tags?.map((tag, idx) => (
          <View key={idx} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.surface,
    paddingHorizontal: 18,
    paddingTop: 0,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  glowBar: {
    height: 3,
    backgroundColor: THEME.colors.primary,
    marginBottom: 16,
    borderRadius: 0,
    // Web glow
    ...Platform.select({
      web: { boxShadow: `0 0 20px ${THEME.colors.primaryGlow}` },
    }),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: THEME.colors.primaryBg,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.full,
  },
  categoryText: {
    fontSize: THEME.typography.sizes.xs,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
    letterSpacing: 0.4,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: THEME.colors.primaryBg,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: THEME.borderRadius.full,
  },
  registeredText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  title: {
    fontSize: THEME.typography.sizes.xxl,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textPrimary,
    lineHeight: 30,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: THEME.typography.sizes.sm,
    color: THEME.colors.gold,
    fontWeight: THEME.typography.weights.semibold,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.border,
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 4,
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  spotsBox: {
    flex: 1.3,
  },
  metricDivider: {
    width: 1,
    height: 52,
    backgroundColor: THEME.colors.border,
    alignSelf: 'center',
  },
  metricIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  prizeValue: {
    fontSize: 18,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.gold,
  },
  prizeNumber: {
    fontSize: 22,
    fontWeight: THEME.typography.weights.black,
  },
  feeValue: {
    fontSize: 18,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  feeNumber: {
    fontSize: 22,
    fontWeight: THEME.typography.weights.black,
  },
  spotsLabel: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.amber,
    marginBottom: 6,
    textAlign: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 5,
    backgroundColor: THEME.colors.border,
    borderRadius: 99,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: THEME.colors.primary,
    borderRadius: 99,
  },
  bookedText: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    textAlign: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: THEME.colors.surfaceGlass,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.full,
  },
  tagText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.typography.weights.medium,
  },
});
