import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function JudgeCard({ judge, onPlayVideo, language }) {
  if (!judge) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionLabel}>
          {language === 'hi' ? '👨‍⚖️ आधिकारिक निर्णायक' : '👨‍⚖️ OFFICIAL JURY LEAD'}
        </Text>
        <View style={styles.juryTag}>
          <Text style={styles.juryTagText}>Master Evaluator</Text>
        </View>
      </View>

      <View style={styles.card}>
        {/* Left: Avatar with Glowing Ring */}
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: judge.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' }}
            style={styles.avatar}
          />
          <View style={styles.verifiedDot}>
            <Ionicons name="checkmark-circle" size={18} color={THEME.colors.primary} />
          </View>
        </View>

        {/* Center: Bio & Accolades */}
        <View style={styles.bio}>
          <Text style={styles.judgeName}>{judge.name || 'Manju Dubey'}</Text>
          <Text style={styles.judgeRole}>{judge.role || 'Kathak Maestro & Senior Choreographer'}</Text>
          
          <View style={styles.expRow}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={11} color={THEME.colors.gold} />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
            <Text style={styles.judgeExp}>
              {judge.experience || '12+ Years Experience'}
            </Text>
          </View>
        </View>

        {/* Right: Interactive Intro Video Button */}
        <TouchableOpacity
          style={styles.videoBtn}
          onPress={() => onPlayVideo(judge.introVideoUrl || '', judge.name)}
          activeOpacity={0.8}
        >
          <View style={styles.playCircle}>
            <Ionicons name="play" size={15} color={THEME.colors.bg} style={{ marginLeft: 2 }} />
          </View>
          <Text style={styles.videoLabel}>
            {language === 'hi' ? 'निर्णायक वीडियो' : 'Watch Intro'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
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
  juryTag: {
    backgroundColor: 'rgba(0, 245, 184, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 184, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  juryTagText: {
    fontSize: 9,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
    letterSpacing: 0.5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.colors.borderStrong,
    gap: 14,
    ...Platform.select({
      web: {
        background:
          'linear-gradient(135deg, rgba(14, 21, 34, 0.95) 0%, rgba(21, 31, 50, 0.8) 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
      },
    }),
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    ...Platform.select({
      web: {
        boxShadow: '0 0 12px rgba(0, 245, 184, 0.35)',
      },
    }),
  },
  verifiedDot: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    backgroundColor: THEME.colors.surface,
    borderRadius: 10,
  },
  bio: {
    flex: 1,
    gap: 3,
  },
  judgeName: {
    fontSize: 16,
    fontWeight: THEME.typography.weights.extrabold,
    color: THEME.colors.textPrimary,
    letterSpacing: -0.2,
  },
  judgeRole: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 16,
  },
  expRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255, 184, 0, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.gold,
  },
  judgeExp: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: THEME.typography.weights.medium,
  },
  videoBtn: {
    alignItems: 'center',
    gap: 5,
    paddingLeft: 6,
  },
  playCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 0 16px rgba(0, 245, 184, 0.45)',
      },
    }),
  },
  videoLabel: {
    fontSize: 10,
    fontWeight: THEME.typography.weights.bold,
    color: THEME.colors.primary,
  },
});

