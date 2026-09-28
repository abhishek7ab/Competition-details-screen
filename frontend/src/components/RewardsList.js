import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

const RANK_ICONS = {
  1: { icon: 'trophy', color: '#F59E0B' },
  2: { icon: 'medal', color: '#9CA3AF' },
  3: { icon: 'medal-outline', color: '#D97706' },
  4: { icon: 'star-outline', color: '#0A7075' },
  5: { icon: 'star-outline', color: '#0A7075' },
  6: { icon: 'star-outline', color: '#0A7075' },
};

export default function RewardsList({ rewards, language }) {
  if (!rewards || rewards.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {language === 'hi' ? 'पुरस्कार (सभी स्थान)' : 'Rewards  (All Positions)'}
      </Text>

      <View style={styles.card}>
        {rewards.map((reward, idx) => {
          const iconMeta = RANK_ICONS[reward.rank];

          return (
            <View
              key={idx}
              style={[styles.row, idx < rewards.length - 1 && styles.rowBorder]}
            >
              <View style={styles.leftRow}>
                {iconMeta ? (
                  <View style={[styles.rankIconContainer, { backgroundColor: iconMeta.color + '20' }]}>
                    <Ionicons name={iconMeta.icon} size={16} color={iconMeta.color} />
                  </View>
                ) : (
                  <View style={styles.rankNumberContainer}>
                    <Text style={styles.rankNumber}>{reward.rank}</Text>
                  </View>
                )}
                <Text style={styles.rankTitle}>
                  {language === 'hi'
                    ? `${reward.rank}वां विजेता`
                    : reward.title || `${reward.rank}th Winner`}
                </Text>
              </View>

              <Text style={styles.prizeAmount}>
                ₹ {Number(reward.amount).toLocaleString('en-IN')}
              </Text>
            </View>
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
    color: '#0F172A',
    marginBottom: 8,
    paddingLeft: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  rankTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  prizeAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0A7075',
  },
});


