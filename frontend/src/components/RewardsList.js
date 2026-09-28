import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { THEME, getThemeColors } from '../constants/theme';
import Icon from './Icon';

const RANK_ICONS = {
  1: { icon: 'trophy', color: '#F59E0B' },
  2: { icon: 'medal', color: '#9CA3AF' },
  3: { icon: 'medal-outline', color: '#D97706' },
  4: { icon: 'star-outline', color: '#0A7075' },
  5: { icon: 'star-outline', color: '#0A7075' },
  6: { icon: 'star-outline', color: '#0A7075' },
};

export default function RewardsList({ rewards, language, isDarkMode = false, onShowInfo }) {
  if (!rewards || rewards.length === 0) return null;
  const colors = getThemeColors(isDarkMode);

  const handleRewardPress = (reward) => {
    const title = reward.title || `${reward.rank}th Place Reward`;
    const msg = `Prize: ₹${Number(reward.amount).toLocaleString('en-IN')}\n\nWinner receives official Feedants e-certificate, cash disbursed via direct UPI/bank transfer within 48 hours of result announcement, and feature on Feedants Hall of Fame.`;
    if (onShowInfo) {
      onShowInfo(title, msg, 'trophy');
    } else {
      Alert.alert(title, msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        {language === 'hi' ? 'पुरस्कार (सभी स्थान)' : 'Rewards  (All Positions)'}
      </Text>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {rewards.map((reward, idx) => {
          const iconMeta = RANK_ICONS[reward.rank];

          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.row,
                idx < rewards.length - 1 && [styles.rowBorder, { borderBottomColor: colors.border }],
              ]}
              onPress={() => handleRewardPress(reward)}
              activeOpacity={0.7}
              accessibilityRole="button"
            >
              <View style={styles.leftRow}>
                {iconMeta ? (
                  <View style={[styles.rankIconContainer, { backgroundColor: iconMeta.color + '20' }]}>
                    <Icon name={iconMeta.icon} size={16} color={iconMeta.color} />
                  </View>
                ) : (
                  <View style={[styles.rankNumberContainer, { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' }]}>
                    <Text style={[styles.rankNumber, { color: colors.textMuted }]}>{reward.rank}</Text>
                  </View>
                )}
                <Text style={[styles.rankTitle, { color: colors.textPrimary }]}>
                  {language === 'hi'
                    ? `${reward.rank}वां विजेता`
                    : reward.title || `${reward.rank}th Winner`}
                </Text>
              </View>

              <Text style={[styles.prizeAmount, { color: colors.primary }]}>
                ₹ {Number(reward.amount).toLocaleString('en-IN')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    paddingLeft: 2,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      web: { boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  rowBorder: {
    borderBottomWidth: 1,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: 13,
    fontWeight: '700',
  },
  rankTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  prizeAmount: {
    fontSize: 15,
    fontWeight: '800',
  },
});
