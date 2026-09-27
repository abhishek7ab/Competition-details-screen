import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function RewardsList({ rewards, language }) {
  if (!rewards || rewards.length === 0) return null;

  const firstPrize = rewards.find((r) => r.rank === 1) || rewards[0];
  const otherRewards = rewards.filter((r) => r.rank !== 1);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionLabel}>
          {language === 'hi' ? '🏆 पुरस्कार वितरण' : '🏆 REWARDS & CASH PRIZES'}
        </Text>
        <Text style={styles.subCount}>6 Winning Spots</Text>
      </View>

      {/* 1. Grand 1st Place Champion Spotlight */}
      {firstPrize && (
        <View style={styles.championCard}>
          <View style={styles.championGlowAccent} />
          <View style={styles.championContent}>
            <View style={styles.championBadge}>
              <Text style={styles.crownEmoji}>👑</Text>
              <Text style={styles.championBadgeText}>1ST WINNER · CHAMPION</Text>
            </View>

            <View style={styles.championMainRow}>
              <View>
                <Text style={styles.championTitle}>
                  {language === 'hi' ? 'प्रथम विजेता पुरस्कार' : 'Grand Champion Prize'}
                </Text>
                <Text style={styles.championPerk}>
                  Gold Certificate of Excellence + Featured on Feedants
                </Text>
              </View>

              <View style={styles.championAmountWrap}>
                <Text style={styles.championRupee}>₹</Text>
                <Text style={styles.championAmount}>
                  {Number(firstPrize.amount).toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 2. Ranks 2-6 Clean List */}
      <View style={styles.listCard}>
        {otherRewards.map((reward, idx) => {
          const isSecond = reward.rank === 2;
          const isThird = reward.rank === 3;
          const rankColor = isSecond ? '#E2E8F0' : isThird ? '#F59E0B' : THEME.colors.primary;

          return (
            <View
              key={idx}
              style={[styles.row, idx < otherRewards.length - 1 && styles.rowBorder]}
            >
              <View
                style={[
                  styles.rankCircle,
                  isSecond && styles.rankCircleSilver,
                  isThird && styles.rankCircleBronze,
                ]}
              >
                <Text style={[styles.rankCircleText, { color: rankColor }]}>
                  {reward.rank}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.rankTitle}>
                  {language === 'hi'
                    ? `${reward.rank}वां स्थान`
                    : reward.title || `${reward.rank}th Place Winner`}
                </Text>
                <Text style={styles.perks}>
                  {reward.rank <= 3 ? 'Podium Trophy Certificate' : 'Official Merit Certificate'}
                </Text>
              </View>

              <View style={styles.amountPill}>
                <Text style={[styles.rupee, { color: rankColor }]}>₹</Text>
                <Text style={[styles.amount, { color: rankColor }]}>
                  {Number(reward.amount).toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* 3. Guaranteed Participation Certificate Assurance */}
      <View style={styles.assuranceBox}>
        <Ionicons name="ribbon-outline" size={16} color={THEME.colors.gold} />
        <Text style={styles.assuranceText}>
          {language === 'hi'
            ? 'सभी सत्यापित प्रतिभागियों को आधिकारिक भागीदारी प्रमाणपत्र प्राप्त होगा।'
            : 'All paid participants receive an Official Feedants Certificate of Participation.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.extrabold,
    color: THEME.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  subCount: {
    fontSize: 10,
    color: THEME.colors.primary,
    fontWeight: THEME.typography.weights.bold,
  },
  championCard: {
    backgroundColor: 'rgba(255, 184, 0, 0.08)',
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 184, 0, 0.4)',
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
    ...Platform.select({
      web: {
        background:
          'linear-gradient(135deg, rgba(255, 184, 0, 0.15) 0%, rgba(255, 140, 66, 0.08) 100%)',
        boxShadow: '0 4px 24px rgba(255, 184, 0, 0.18)',
      },
    }),
  },
  championGlowAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: THEME.colors.gold,
    ...Platform.select({
      web: {
        boxShadow: '0 0 12px #FFB800',
      },
    }),
  },
  championContent: {
    padding: 16,
  },
  championBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  crownEmoji: {
    fontSize: 14,
  },
  championBadgeText: {
    fontSize: 11,
    fontWeight: THEME.typography.weights.black,
    color: THEME.colors.gold,
    letterSpacing: 0.8,
  },
  championMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  championTitle: {
    fontSize: 16,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
    marginBottom: 3,
  },
  championPerk: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    maxWidth: 260,
  },
  championAmountWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'rgba(255, 184, 0, 0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.35)',
  },
  championRupee: {
    fontSize: 16,
    fontWeight: THEME.typography.weights.bold,
    color: '#FFE57F',
  },
  championAmount: {
    fontSize: 24,
    fontWeight: THEME.typography.weights.black,
    color: '#FFE57F',
  },
  listCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.borderStrong,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 14,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  rankCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: THEME.colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankCircleSilver: {
    borderColor: 'rgba(226, 232, 240, 0.4)',
    backgroundColor: 'rgba(226, 232, 240, 0.08)',
  },
  rankCircleBronze: {
    borderColor: 'rgba(245, 158, 11, 0.4)',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
  },
  rankCircleText: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.black,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  rankTitle: {
    fontSize: 14,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  perks: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  amountPill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 1,
  },
  rupee: {
    fontSize: 12,
    fontWeight: THEME.typography.weights.bold,
  },
  amount: {
    fontSize: 16,
    fontWeight: THEME.typography.weights.black,
  },
  assuranceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 184, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: THEME.borderRadius.md,
    marginTop: 10,
  },
  assuranceText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    flex: 1,
    lineHeight: 15,
  },
});

