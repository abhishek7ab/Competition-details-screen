import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
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

  // Cinematic classical dance banner
  const bannerImageUri =
    'https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&auto=format&fit=crop&q=80';

  return (
    <View style={styles.card}>
      {/* 1. Cinematic Banner Image with Gradient Fade Overlay */}
      <View style={styles.bannerContainer}>
        <Image source={{ uri: bannerImageUri }} style={styles.bannerImage} resizeMode="cover" />
        <View style={styles.bannerOverlay} />
        
        {/* Floating Top Badges */}
        <View style={styles.floatingBadgesRow}>
          <View style={styles.liveBadge}>
            <View style={styles.livePulseDot} />
            <Text style={styles.liveBadgeText}>
              {language === 'hi' ? 'लाइव पंजीकरण' : 'LIVE CONTEST'}
            </Text>
          </View>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              🎭 {competition?.category || 'Dance'}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. Hero Content Body */}
      <View style={styles.bodyContent}>
        {/* Registered status indicator if already enrolled */}
        {isRegistered && (
          <View style={styles.registeredBanner}>
            <Ionicons name="checkmark-circle" size={15} color={THEME.colors.primary} />
            <Text style={styles.registeredText}>
              {language === 'hi' ? 'आप इस प्रतियोगिता में पंजीकृत हैं ✓' : 'You are Registered for this Competition ✓'}
            </Text>
          </View>
        )}

        {/* Title */}
        <Text style={styles.title}>
          {title || 'Feedants Classical Dance Championship'}
        </Text>

        {/* Sub-badge: Certificate & Trust */}
        <View style={styles.subMetaRow}>
          <View style={styles.certBadge}>
            <Ionicons name="ribbon-outline" size={14} color={THEME.colors.gold} />
            <Text style={styles.certBadgeText}>{badgeText || 'Winners get certificate'}</Text>
          </View>
          <View style={styles.verifiedChip}>
            <Ionicons name="shield-checkmark" size={13} color={THEME.colors.primary} />
            <Text style={styles.verifiedText}>Verified Feedants Jury</Text>
          </View>
        </View>

        {/* 3. Luxury Guaranteed Prize Pool Banner Card */}
        <View style={styles.prizePoolCard}>
          <View style={styles.prizePoolLeft}>
            <View style={styles.trophyIconWrap}>
              <Ionicons name="trophy" size={24} color={THEME.colors.gold} />
            </View>
            <View>
              <Text style={styles.prizePoolLabel}>
                {language === 'hi' ? 'कुल नकद पुरस्कार' : 'GUARANTEED CASH POOL'}
              </Text>
              <Text style={styles.prizePoolAmount}>
                ₹{(competition?.prizePool || 1500).toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
          <View style={styles.prizePoolRight}>
            <Text style={styles.payoutBadge}>⚡ Instant UPI</Text>
            <Text style={styles.topWinnersCount}>Top 6 Win</Text>
          </View>
        </View>

        {/* 4. Two Key Metric Cards: Entry Fee & Capacity */}
        <View style={styles.metricsGrid}>
          {/* Entry Fee Box */}
          <View style={styles.metricCard}>
            <View style={styles.metricCardHeader}>
              <Ionicons name="ticket-outline" size={14} color={THEME.colors.primary} />
              <Text style={styles.metricCardLabel}>
                {language === 'hi' ? 'प्रवेश शुल्क' : 'ENTRY FEE'}
              </Text>
            </View>
            <Text style={styles.feeAmount}>
              ₹<Text style={styles.feeAmountLarge}>{competition?.entryFee || 99}</Text>
            </Text>
            <Text style={styles.feeSub}>Per Entry · All-Inclusive</Text>
          </View>

          {/* Spots Remaining Box */}
          <View style={[styles.metricCard, styles.spotsCard]}>
            <View style={styles.metricCardHeader}>
              <Ionicons
                name={isSoldOut ? 'close-circle-outline' : 'flame-outline'}
                size={14}
                color={isSoldOut ? THEME.colors.rose : THEME.colors.amber}
              />
              <Text style={[styles.metricCardLabel, isSoldOut && { color: THEME.colors.rose }]}>
                {isSoldOut
                  ? (language === 'hi' ? 'हाउसफुल' : 'SOLD OUT')
                  : language === 'hi' ? 'स्थान शेष' : 'SPOTS REMAINING'}
              </Text>
            </View>

            <View style={styles.spotsCountRow}>
              <Text style={[styles.spotsCountNum, isSoldOut && { color: THEME.colors.rose }]}>
                {spotsRemaining}
              </Text>
              <Text style={styles.spotsTotal}>/ {maxSpots} Spots</Text>
            </View>

            {/* Glowing Progress Track */}
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
          </View>
        </View>

        {/* 5. Tags Row */}
        <View style={styles.tagsRow}>
          {competition?.tags?.map((tag, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
          <View style={[styles.tag, styles.tagAccent]}>
            <Text style={[styles.tagText, { color: THEME.colors.primary }]}>★ Verified Stage</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.xl,
    borderWidth: 1,
    borderColor: THEME.colors.borderStrong,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
      },
    }),
  },
  bannerContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: '#080C14',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.65,
  },
  bannerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    ...Platform.select({
      web: {
        background:
          'linear-gradient(180deg, rgba(8,12,20,0.2) 0%, rgba(8,12,20,0.7) 60%, #0E1522 100%)',
      },
      default: {
        backgroundColor: 'rgba(8,12,20,0.4)',
      },
    }),
  },
  floatingBadgesRow: {
    position: 'absolute',
    top: 14,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(8, 12, 20, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 184, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: THEME.borderRadius.full,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 14px rgba(0, 245, 184, 0.25)',
      },
    }),
  },
  livePulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: THEME.colors.primary,
    ...Platform.select({
      web: {
        animation: 'pulseGlow 2s infinite ease-in-out',
        boxShadow: '0 0 8px #00F5B8',
      },
    }),
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.extrabold,
    color: THEME.colors.primary,
    letterSpacing: 0.8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(14, 21, 34, 0.85)',
    borderWidth: 1,
    borderColor: THEME.colors.borderStrong,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.borderRadius.full,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      },
    }),
  },
  categoryText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
    letterSpacing: 0.3,
  },
  bodyContent: {
    padding: 20,
    paddingTop: 10,
  },
  registeredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: THEME.colors.primaryBg,
    borderWidth: 1,
    borderColor: THEME.colors.primaryBorder,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: THEME.borderRadius.md,
    marginBottom: 14,
  },
  registeredText: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.textPrimary,
    lineHeight: 32,
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  subMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  certBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: THEME.colors.goldBg,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.full,
  },
  certBadgeText: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.gold,
  },
  verifiedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.full,
  },
  verifiedText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.typography.weights.medium,
  },
  prizePoolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 184, 0, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    ...Platform.select({
      web: {
        background:
          'linear-gradient(135deg, rgba(255, 184, 0, 0.12) 0%, rgba(255, 140, 66, 0.08) 100%)',
        boxShadow: '0 4px 20px rgba(255, 184, 0, 0.15)',
      },
    }),
  },
  prizePoolLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trophyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prizePoolLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.extrabold,
    color: THEME.colors.gold,
    letterSpacing: 1,
    marginBottom: 2,
  },
  prizePoolAmount: {
    fontSize: 26,
    fontWeight: THEME.typography.weights.black,
    color: '#FFE57F',
    letterSpacing: -0.5,
  },
  prizePoolRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  payoutBadge: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
    backgroundColor: 'rgba(0, 245, 184, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  topWinnersCount: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.medium,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: THEME.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
  },
  spotsCard: {
    flex: 1.15,
  },
  metricCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  metricCardLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textMuted,
    letterSpacing: 0.6,
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  feeAmountLarge: {
    fontSize: 22,
    fontWeight: THEME.typography.weights.black,
  },
  feeSub: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  spotsCountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 6,
  },
  spotsCountNum: {
    fontSize: 20,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.primary,
  },
  spotsTotal: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: THEME.typography.weights.medium,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: THEME.colors.primary,
    borderRadius: 99,
    ...Platform.select({
      web: {
        boxShadow: '0 0 10px rgba(0, 245, 184, 0.5)',
      },
    }),
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.borderRadius.full,
  },
  tagAccent: {
    backgroundColor: THEME.colors.primaryBg,
    borderColor: THEME.colors.primaryBorder,
  },
  tagText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.typography.weights.semibold,
  },
});

