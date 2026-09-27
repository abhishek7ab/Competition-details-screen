import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { THEME } from '../constants/theme';

const RANK_META = {
  1: { emoji: '🥇', color: THEME.colors.gold, bg: THEME.colors.goldBg, label: '1st Place' },
  2: { emoji: '🥈', color: '#C0C0C0', bg: 'rgba(192,192,192,0.1)', label: '2nd Place' },
  3: { emoji: '🥉', color: '#CD7F32', bg: 'rgba(205,127,50,0.1)', label: '3rd Place' },
};

export default function RewardsList({ rewards, language }) {
  if (!rewards || rewards.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>
        {language === 'hi' ? '🏆 पुरस्कार' : '🏆 REWARDS'}
      </Text>

      <View style={styles.card}>
        {rewards.map((reward, idx) => {
          const meta = RANK_META[reward.rank] || {
            emoji: '⭐',
            color: THEME.colors.primary,
            bg: THEME.colors.primaryBg,
            label: `${reward.rank}th Place`,
          };

          return (
            <View
              key={idx}
              style={[styles.row, idx < rewards.length - 1 && styles.rowBorder]}
            >
              <View style={[styles.rankBadge, { backgroundColor: meta.bg }]}>
                <Text style={styles.rankEmoji}>{meta.emoji}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.rankTitle}>
                  {language === 'hi'
                    ? `${reward.rank}${reward.rank === 1 ? 'वां' : 'वां'} स्थान`
                    : reward.title || meta.label}
                </Text>
                {reward.perks && (
                  <Text style={styles.perks}>{reward.perks}</Text>
                )}
              </View>

              <View style={[styles.amountBox, { backgroundColor: meta.bg }]}>
                <Text style={[styles.rupee, { color: meta.color }]}>₹</Text>
                <Text style={[styles.amount, { color: meta.color }]}>
                  {Number(reward.amount).toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          );
        })}
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
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    overflow: 'hidden',
    ...Platform.select({
      web: { boxShadow: '0 2px 16px rgba(0,0,0,0.4)' },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankEmoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  rankTitle: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.textPrimary,
  },
  perks: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 1,
  },
  rupee: {
    fontSize: 13,
    fontWeight: THEME.typography.weights.bold,
  },
  amount: {
    fontSize: 17,
    fontWeight: THEME.typography.weights.black,
  },
});
